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
          
          <!-- メインコンテナ - グリッドレイアウト用 -->
          <div class="insight-main-container">
            <!-- 左側：事業開発✕生成AI実践ガイド（2カラム分） -->
            <div class="insight-main-guide">
              <div class="insight-guide-content">
                <h2 class="insight-guide-title">事業開発✕生成AI実践ガイド</h2>
                <p class="insight-guide-subtitle">人間と生成AIの最適なコラボレーションを実現するための実践ガイド。新規事業開発プロセスを加速させる戦略とベストプラクティス。</p>
                <a href="#" class="insight-guide-button">ガイドを入手する</a>
              </div>
              <div class="insight-guide-image-wrapper">
                <img src="assets/images/guide.png" alt="事業開発✕生成AI実践ガイド" class="insight-guide-image">
              </div>
            </div>
            
            <!-- 右側：システムプロンプト集（1カラム分） -->
            <div class="insight-prompt-collection">
              <h2 class="insight-prompt-title">事業開発のためのシステムプロンプト集</h2>
              <a href="#" class="insight-guide-button">プロンプトを探す</a>
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
          
          <div class="text-center mt-5">
            <a href="https://note.com/newh_inc/m/m78d8ce75f8fd" class="btn btn-primary no-uppercase">noteで記事を読む →</a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('insight-component', Insight);
