// api/ogp.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// noteのURLからnoteIDを抽出する関数
function extractNoteId(url) {
  // URLが note.com/username/n/noteId の形式かチェック
  const noteRegex = /https?:\/\/note\.com\/[\w-]+\/n\/([\w-]+)/;
  const match = url.match(noteRegex);
  
  if (match && match[1]) {
    return match[1]; // noteIDを返す
  }
  
  return null; // 一致しない場合はnullを返す
}

module.exports = async function handler(req, res) {
  console.log('OGP API called with URL:', req.query.url);
  
  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // キャッシュヘッダーを設定（1週間）
  res.setHeader('Cache-Control', 's-maxage=604800');
  
  // OPTIONSリクエストの場合は早期に返す
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // URLパラメータを取得
  const { url } = req.query;
  
  if (!url) {
    console.log('URL parameter is missing');
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    // noteのURLかどうかチェック
    const noteId = extractNoteId(url);
    console.log('Extracted note ID:', noteId);
    
    if (noteId) {
      // noteの公式APIを使用して記事データを取得
      const apiUrl = `https://note.com/api/v3/notes/${noteId}`;
      console.log('Fetching from note API:', apiUrl);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        console.error('Note API response not OK:', response.status, response.statusText);
        throw new Error(`Failed to fetch note data: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Note API response structure:', JSON.stringify(data, null, 2).substring(0, 500) + '...');
      
      // 記事データから必要な情報を抽出
      if (!data || !data.data) {
        console.error('Invalid note data structure:', data);
        throw new Error('Invalid note data structure');
      }
      
      const noteData = data.data;
      
      // 結果オブジェクトを作成
      const result = {
        title: '',
        image: '',
        description: '',
        url: url
      };
      
      // タイトルを取得（複数のフィールドを試す）
      if (noteData.name) result.title = noteData.name;
      else if (noteData.title) result.title = noteData.title;
      else if (data.name) result.title = data.name;
      else if (data.title) result.title = data.title;
      
      // 画像を取得（複数のフィールドを試す）
      if (noteData.eyecatch) result.image = noteData.eyecatch;
      else if (noteData.thumbnail) result.image = noteData.thumbnail;
      else if (noteData.ogp_image) result.image = noteData.ogp_image;
      else if (noteData.header_image) result.image = noteData.header_image;
      
      // 説明を取得（複数のフィールドを試す）
      if (noteData.body) result.description = noteData.body.substring(0, 200) + '...';
      else if (noteData.text) result.description = noteData.text.substring(0, 200) + '...';
      else if (noteData.description) result.description = noteData.description;
      else if (noteData.summary) result.description = noteData.summary;
      
      console.log('Returning OGP data:', result);
      
      // 結果を返す
      return res.status(200).json(result);
    } else {
      // noteのURL以外の場合はフォールバック処理
      console.log('URL is not a note.com URL:', url);
      return res.status(400).json({ 
        error: 'Only note.com URLs are supported',
        message: 'This API only supports note.com URLs'
      });
    }
  } catch (error) {
    console.error('Note API fetch error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch note data',
      message: error.message,
      stack: error.stack
    });
  }
}
