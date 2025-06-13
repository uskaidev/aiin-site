/**
 * Vercel サーバーレス関数
 * プロンプトライブラリのAPIエンドポイント
 */

export default async function handler(req, res) {
  // CORSヘッダーの設定
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { action, id } = req.query;

  try {
    // GAS WebアプリのURL
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbxDe5yTUmo88fCVOBwceOFDHrQACqL6lFdyhEHfddW3Fi8fRuMz6s-IAcn84moYoyy2/exec';
    
    let gasUrl = `${GAS_URL}?action=${action}`;
    if (id) {
      gasUrl += `&id=${id}`;
    }

    // GASにリクエストを転送
    const response = await fetch(gasUrl);
    const data = await response.json();

    // レスポンスを返す
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from GAS:', error);
    res.status(500).json({ 
      error: 'Failed to fetch prompts',
      message: error.message 
    });
  }
}