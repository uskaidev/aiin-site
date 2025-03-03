class Insight extends HTMLElement {
  constructor() {
    super();
    // 記事のURLとIDのマッピング
    this.articleData = [
      {
        title: 'AIファーストの運用モデルへの変革',
        url: 'https://note.com/koike_newh/n/n584ec72e0860',
        noteId: 'n584ec72e0860'
      },
      {
        title: 'AIと人間の協働の未来',
        url: 'https://note.com/koike_newh/n/n3f48c8ee7f35',
        noteId: 'n3f48c8ee7f35'
      },
      {
        title: 'データ駆動型意思決定の重要性',
        url: 'https://note.com/nozomuiino/n/n73ee2853e6e3',
        noteId: 'n73ee2853e6e3'
      }
    ];
  }

  connectedCallback() {
    this.render();
    
    // note.comの埋め込みスクリプトを読み込む
    if (!document.querySelector('script[src="https://note.com/scripts/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://note.com/scripts/embed.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
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
              <div class="insight-embed animate-in animate-delay-${index + 1}">
                <iframe class="note-embed" 
                  src="https://note.com/embed/notes/${article.noteId}" 
                  style="border: 0; display: block; max-width: 100%; width: 100%; padding: 0px; margin: 0px; position: static; visibility: visible;" 
                  height="400"></iframe>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('insight-component', Insight);
