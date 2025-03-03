// api/ogp.js
import ogs from 'open-graph-scraper';

export default async function handler(req, res) {
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
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    // OGPデータを取得
    const { result } = await ogs({ url });
    
    // 結果を返す
    return res.status(200).json({
      title: result.ogTitle || '',
      image: result.ogImage && result.ogImage.url ? result.ogImage.url : '',
      description: result.ogDescription || '',
      url: url
    });
  } catch (error) {
    console.error('OGP fetch error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch OGP data',
      message: error.message
    });
  }
}
