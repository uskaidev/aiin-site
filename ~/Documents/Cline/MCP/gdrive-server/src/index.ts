#!/usr/bin/env node

/**
 * Google Drive MCP Server
 * 
 * This MCP server integrates with Google Drive to allow listing, reading, and searching over files.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { parse } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Environment variables for credentials
const GDRIVE_OAUTH_PATH = process.env.GDRIVE_OAUTH_PATH || path.resolve(process.cwd(), 'gcp-oauth.keys.json');
const GDRIVE_CREDENTIALS_PATH = process.env.GDRIVE_CREDENTIALS_PATH || path.resolve(process.cwd(), '.gdrive-server-credentials.json');

// MIME type mappings for Google Workspace files
const GOOGLE_MIME_TYPE_EXPORTS = {
  'application/vnd.google-apps.document': 'text/markdown',
  'application/vnd.google-apps.spreadsheet': 'text/csv',
  'application/vnd.google-apps.presentation': 'text/plain',
  'application/vnd.google-apps.drawing': 'image/png',
};

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
}

interface GoogleDriveCredentials {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

interface GoogleOAuthKeys {
  installed: {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
  };
}

class GoogleDriveServer {
  private server: Server;
  private credentials: GoogleDriveCredentials | null = null;
  private oauthKeys: GoogleOAuthKeys | null = null;
  private authServer: any = null;
  private authServerPort = 3000;

  constructor() {
    this.server = new Server(
      {
        name: 'gdrive-server',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupResourceHandlers();
    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private async loadCredentials(): Promise<boolean> {
    try {
      // Load OAuth keys
      try {
        const oauthKeysData = await fs.readFile(GDRIVE_OAUTH_PATH, 'utf8');
        this.oauthKeys = JSON.parse(oauthKeysData);
      } catch (error) {
        console.error('Error loading OAuth keys:', error);
        return false;
      }

      // Load credentials if they exist
      try {
        const credentialsData = await fs.readFile(GDRIVE_CREDENTIALS_PATH, 'utf8');
        this.credentials = JSON.parse(credentialsData);
        
        // Check if credentials are expired
        if (this.credentials && this.credentials.expiry_date < Date.now()) {
          await this.refreshToken();
        }
        
        return true;
      } catch (error) {
        console.error('Credentials not found or invalid. Authentication required.');
        return false;
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
      return false;
    }
  }

  private async refreshToken(): Promise<void> {
    if (!this.oauthKeys || !this.credentials) {
      throw new Error('OAuth keys or credentials not loaded');
    }

    try {
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: this.oauthKeys.installed.client_id,
        client_secret: this.oauthKeys.installed.client_secret,
        refresh_token: this.credentials.refresh_token,
        grant_type: 'refresh_token',
      });

      this.credentials.access_token = response.data.access_token;
      this.credentials.expiry_date = Date.now() + (response.data.expires_in * 1000);
      
      await fs.writeFile(GDRIVE_CREDENTIALS_PATH, JSON.stringify(this.credentials));
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  private async authenticate(): Promise<void> {
    if (!this.oauthKeys) {
      throw new Error('OAuth keys not loaded');
    }

    return new Promise((resolve, reject) => {
      const { client_id, client_secret, redirect_uris } = this.oauthKeys.installed;
      const redirectUri = redirect_uris[0];
      
      // Create a local server to handle the OAuth callback
      this.authServer = createServer(async (req, res) => {
        const parsedUrl = parse(req.url || '', true);
        
        if (parsedUrl.pathname === '/oauth2callback') {
          const { code } = parsedUrl.query;
          
          if (code) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Authentication successful!</h1><p>You can close this window now.</p>');
            
            try {
              // Exchange code for tokens
              const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
                code,
                client_id,
                client_secret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
              });
              
              this.credentials = {
                access_token: tokenResponse.data.access_token,
                refresh_token: tokenResponse.data.refresh_token,
                scope: tokenResponse.data.scope,
                token_type: tokenResponse.data.token_type,
                expiry_date: Date.now() + (tokenResponse.data.expires_in * 1000),
              };
              
              await fs.writeFile(GDRIVE_CREDENTIALS_PATH, JSON.stringify(this.credentials));
              
              this.authServer.close(() => {
                console.log('Authentication server closed');
                resolve();
              });
            } catch (error) {
              console.error('Error exchanging code for tokens:', error);
              reject(error);
            }
          } else {
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end('<h1>Authentication failed</h1><p>No authorization code received.</p>');
            reject(new Error('No authorization code received'));
          }
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not found');
        }
      });
      
      this.authServer.listen(this.authServerPort, () => {
        const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirectUri}&response_type=code&scope=https://www.googleapis.com/auth/drive.readonly&access_type=offline&prompt=consent`;
        
        console.log(`Please open the following URL in your browser to authenticate:\n${authUrl}`);
        
        // Try to open the URL in the default browser
        try {
          const platform = process.platform;
          const cmd = platform === 'win32' ? 'start' : platform === 'darwin' ? 'open' : 'xdg-open';
          execAsync(`${cmd} "${authUrl}"`);
        } catch (error) {
          console.error('Failed to open browser automatically. Please open the URL manually.');
        }
      });
    });
  }

  private async listFiles(query?: string): Promise<GoogleDriveFile[]> {
    if (!this.credentials) {
      throw new Error('Not authenticated');
    }

    try {
      const params: any = {
        pageSize: 100,
        fields: 'files(id, name, mimeType)',
      };

      if (query) {
        params.q = query;
      }

      const response = await axios.get('https://www.googleapis.com/drive/v3/files', {
        headers: {
          Authorization: `Bearer ${this.credentials.access_token}`,
        },
        params,
      });

      return response.data.files;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  private async getFile(fileId: string, mimeType?: string): Promise<string> {
    if (!this.credentials) {
      throw new Error('Not authenticated');
    }

    try {
      const fileResponse = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${this.credentials.access_token}`,
        },
        params: {
          fields: 'id,name,mimeType',
        },
      });

      const fileMimeType = fileResponse.data.mimeType;
      const exportMimeType = GOOGLE_MIME_TYPE_EXPORTS[fileMimeType];

      let fileContent: string;

      if (exportMimeType) {
        // Google Workspace file - export it
        const exportResponse = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}/export`, {
          headers: {
            Authorization: `Bearer ${this.credentials.access_token}`,
          },
          params: {
            mimeType: exportMimeType,
          },
          responseType: 'text',
        });
        fileContent = exportResponse.data;
      } else {
        // Regular file - download it
        const downloadResponse = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
          headers: {
            Authorization: `Bearer ${this.credentials.access_token}`,
          },
          params: {
            alt: 'media',
          },
          responseType: 'text',
        });
        fileContent = downloadResponse.data;
      }

      return fileContent;
    } catch (error) {
      console.error(`Error getting file ${fileId}:`, error);
      throw error;
    }
  }

  private setupResourceHandlers() {
    // Resource templates for dynamic resources
    this.server.setRequestHandler(
      ListResourceTemplatesRequestSchema,
      async () => ({
        resourceTemplates: [
          {
            uriTemplate: 'gdrive:///{file_id}',
            name: 'Google Drive File',
            description: 'Access a file from Google Drive by its ID',
          },
        ],
      })
    );

    // Read resource handler
    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        const match = request.params.uri.match(/^gdrive:\/\/\/([^\/]+)$/);
        if (!match) {
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Invalid URI format: ${request.params.uri}`
          );
        }
        
        const fileId = match[1];
        
        try {
          // Ensure we're authenticated
          if (!this.credentials) {
            const authenticated = await this.loadCredentials();
            if (!authenticated) {
              throw new McpError(
                ErrorCode.Unauthorized,
                'Not authenticated with Google Drive. Please run the server with the "auth" argument first.'
              );
            }
          }
          
          // Get file metadata
          const fileResponse = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
            headers: {
              Authorization: `Bearer ${this.credentials.access_token}`,
            },
            params: {
              fields: 'id,name,mimeType',
            },
          });
          
          const fileMimeType = fileResponse.data.mimeType;
          const exportMimeType = GOOGLE_MIME_TYPE_EXPORTS[fileMimeType];
          
          // Get file content
          const fileContent = await this.getFile(fileId);
          
          return {
            contents: [
              {
                uri: request.params.uri,
                mimeType: exportMimeType || fileMimeType,
                text: fileContent,
              },
            ],
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              // Token expired, try to refresh
              try {
                await this.refreshToken();
                return this.server.handleRequest(request);
              } catch (refreshError) {
                throw new McpError(
                  ErrorCode.Unauthorized,
                  'Authentication failed. Please run the server with the "auth" argument again.'
                );
              }
            } else if (error.response?.status === 404) {
              throw new McpError(
                ErrorCode.NotFound,
                `File not found: ${fileId}`
              );
            }
            
            throw new McpError(
              ErrorCode.InternalError,
              `Google Drive API error: ${error.response?.data?.error?.message || error.message}`
            );
          }
          
          throw error;
        }
      }
    );
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'search',
          description: 'Search for files in Google Drive',
          inputSchema: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'Search query',
              },
            },
            required: ['query'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== 'search') {
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
      }

      const query = request.params.arguments?.query;
      if (typeof query !== 'string') {
        throw new McpError(
          ErrorCode.InvalidParams,
          'Query parameter must be a string'
        );
      }

      try {
        // Ensure we're authenticated
        if (!this.credentials) {
          const authenticated = await this.loadCredentials();
          if (!authenticated) {
            throw new McpError(
              ErrorCode.Unauthorized,
              'Not authenticated with Google Drive. Please run the server with the "auth" argument first.'
            );
          }
        }

        const files = await this.listFiles(`fullText contains '${query}'`);
        
        const formattedResults = files.map(file => 
          `- ${file.name} (${file.mimeType}) - gdrive:///${file.id}`
        ).join('\n');
        
        return {
          content: [
            {
              type: 'text',
              text: files.length > 0 
                ? `Found ${files.length} files matching "${query}":\n\n${formattedResults}`
                : `No files found matching "${query}".`,
            },
          ],
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            // Token expired, try to refresh
            try {
              await this.refreshToken();
              return this.server.handleRequest(request);
            } catch (refreshError) {
              return {
                content: [
                  {
                    type: 'text',
                    text: 'Authentication failed. Please run the server with the "auth" argument again.',
                  },
                ],
                isError: true,
              };
            }
          }
          
          return {
            content: [
              {
                type: 'text',
                text: `Google Drive API error: ${error.response?.data?.error?.message || error.message}`,
              },
            ],
            isError: true,
          };
        }
        
        throw error;
      }
    });
  }

  async run(args: string[] = []) {
    // Check if we're in auth mode
    if (args.includes('auth')) {
      try {
        await this.loadCredentials();
        await this.authenticate();
        console.log('Authentication successful!');
        process.exit(0);
      } catch (error) {
        console.error('Authentication failed:', error);
        process.exit(1);
      }
    } else {
      // Normal server mode
      try {
        const authenticated = await this.loadCredentials();
        if (!authenticated) {
          console.error('Not authenticated. Please run with the "auth" argument first.');
          process.exit(1);
        }
        
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Google Drive MCP server running on stdio');
      } catch (error) {
        console.error('Server error:', error);
        process.exit(1);
      }
    }
  }
}

const server = new GoogleDriveServer();
server.run(process.argv.slice(2)).catch(console.error);
