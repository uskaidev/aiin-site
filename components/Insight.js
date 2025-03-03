class Insight extends HTMLElement {
  constructor() {
    super();
    // 記事のURLリスト
    this.articleUrls = [
      'https://note.com/koike_newh/n/n584ec72e0860',
      'https://note.com/koike_newh/n/n3f48c8ee7f35',
      'https://note.com/nozomuiino/n/n73ee2853e6e3'
    ];
    
    // 記事データを保存する配列
    this.articleData = [
      { 
        title: 'AIファーストの運用モデルへの変革', 
        image: 'assets/images/main-image.png',
        description: '生成AIの最新動向と、ビジネスへの応用事例について解説します。企業がどのように生成AIを活用して競争優位性を確立しているかを探ります。',
        url: this.articleUrls[0]
      },
      { 
        title: 'AIと人間の協働の未来', 
        image: 'assets/images/main-image.png',
        description: 'AIと人間がどのように協力して新しい価値を創造できるのか、その可能性と課題について考察します。',
        url: this.articleUrls[1]
      },
      { 
        title: 'データ駆動型意思決定の重要性', 
        image: 'assets/images/main-image.png',
        description: 'ビジネスにおけるデータ駆動型アプローチの重要性と、それを実現するためのAI活用方法について解説します。',
        url: this.articleUrls[2]
      }
    ];
  }

  connectedCallback() {
    this.render();
    
    // OGPデータを取得
    this.fetchOgpData();
  }
  
  // OGPデータを取得する関数
  async fetchOgpData() {
    try {
      // 各記事のOGPデータを取得
      const promises = this.articleUrls.map(async (url, index) => {
        try {
          const response = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch OGP data: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          // 記事データを更新
          if (data.title) this.articleData[index].title = data.title;
          if (data.image) this.articleData[index].image = data.image;
          if (data.description) this.articleData[index].description = data.description;
          
          return data;
        } catch (error) {
          console.error(`Error fetching OGP for ${url}:`, error);
          return null;
        }
      });
      
      // すべてのリクエストが完了するのを待つ
      const results = await Promise.all(promises);
      
      // 有効なデータがあれば再レンダリング
      if (results.some(result => result !== null)) {
        this.render();
      }
    } catch (error) {
      console.error('Error fetching OGP data:', error);
    }
  }
  
  // コンポーネントをレンダリングする関数
  render() {
    this.innerHTML = `
      <section id="insight" class="section section-light">
        <div class="container">
          <div class="section-tag">INSIGHTS</div>
          <h2 class="section-title section-title-left">インサイト＆ナレッジ</h2>
          <p class="section-subtitle">最新の知見と洞察を共有し、生成AIの可能性を探求します。</p>
          
          <!-- メインバナー -->
          <div class="insight-main-banner">
            <div class="insight-main-content">
              <h2 class="insight-main-title">AI戦略ガイド</h2>
              <p class="insight-main-subtitle">模倣が困難な自律的な製品、サービス、機能、ワークフローを提供する指数関数的な成長戦略を作成します。</p>
              <a href="#" class="btn btn-primary">コピーを入手する</a>
            </div>
            <div class="insight-main-image">
              <!-- 画像は仮置き -->
            </div>
          </div>
          
          <div class="insight-grid">
            ${this.articleData.map((article, index) => `
              <div class="insight-card animate-in animate-delay-${index + 1}">
                <div class="insight-image">
                  <img src="${article.image}" alt="${article.title}">
                </div>
                <div class="insight-content">
                  <h3 class="insight-title">${article.title}</h3>
                  <p class="insight-text">${article.description}</p>
                  <a href="${article.url}" target="_blank" class="insight-link">続きを読む</a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('insight-component', Insight);
