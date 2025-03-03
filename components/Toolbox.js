class Toolbox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section id="toolbox" class="section toolbox-section">
        <div class="container">
          <div class="section-tag section-tag-light">RESOURCES</div>
          <h2 class="section-title section-title-light">TOOLBOX</h2>
          <p class="section-subtitle section-subtitle-light">生成AIを活用するための最先端ツールを提供しています。</p>
          
          <div class="toolbox-grid">
            <div class="tool-card animate-in animate-delay-1">
              <div class="tool-icon">
                <i class="fas fa-robot"></i>
              </div>
              <h3 class="tool-title">AI TEXT GENERATOR</h3>
              <p class="tool-description">
                高品質なテキストコンテンツを自動生成するAIツール。
                マーケティング資料、レポート、ブログ記事などの作成に最適です。
              </p>
              <a href="#" class="tool-link">EXPLORE</a>
            </div>
            
            <div class="tool-card animate-in animate-delay-2">
              <div class="tool-icon">
                <i class="fas fa-image"></i>
              </div>
              <h3 class="tool-title">AI IMAGE CREATOR</h3>
              <p class="tool-description">
                テキストプロンプトから高品質な画像を生成するAIツール。
                デザイン、マーケティング、コンテンツ制作に活用できます。
              </p>
              <a href="#" class="tool-link">EXPLORE</a>
            </div>
            
            <div class="tool-card animate-in animate-delay-3">
              <div class="tool-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3 class="tool-title">AI DATA ANALYZER</h3>
              <p class="tool-description">
                ビジネスデータを分析し、インサイトを抽出するAIツール。
                データ駆動型の意思決定をサポートします。
              </p>
              <a href="#" class="tool-link">EXPLORE</a>
            </div>
            
            <div class="tool-card animate-in animate-delay-4">
              <div class="tool-icon">
                <i class="fas fa-code"></i>
              </div>
              <h3 class="tool-title">AI CODE ASSISTANT</h3>
              <p class="tool-description">
                プログラミングをサポートするAIツール。
                コード生成、デバッグ、最適化を支援します。
              </p>
              <a href="#" class="tool-link">EXPLORE</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('toolbox-component', Toolbox);
