class Hero extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="hero" id="home">
        <div class="video-background">
            <video autoplay loop muted playsinline>
                <source src="assets/images/ main-image.mp4" type="video/mp4">
                <!-- 動画が再生できない場合のフォールバック -->
                <img src="assets/images/main-image.png" alt="AI Innovation Node ビジュアル">
            </video>
            <div class="overlay"></div>
        </div>
        
        <div class="container">
            <div class="hero-content">
                <div class="section-tag">AI Innovation Node</div>
                <h1 class="hero-title">生成AIで新規事業開発を革新する</h1>
                <p class="hero-subtitle">NEWhの新規事業開発ノウハウと最新AI技術の融合で、10倍速い開発と100倍の選択肢から未来の可能性を発散させます</p>
                <div class="btn-group">
                    <a href="#contact" class="btn btn-primary">
                      無料相談を予約
                      <span class="btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </a>
                    <a href="#" class="btn btn-secondary">
                      資料ダウンロード
                      <span class="btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </span>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="floating-shape shape-purple shape-rect"></div>
        <div class="floating-shape shape-pink shape-blob"></div>
        <div class="floating-shape shape-turquoise"></div>
        <div class="floating-shape shape-yellow"></div>
        <div class="floating-shape shape-green shape-blob"></div>
      </section>
    `;
  }
}

customElements.define('hero-component', Hero);
