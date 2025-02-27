class About extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-light section-grid" id="about">
        <div class="container">
            <div class="section-tag">About Us</div>
            <h2 class="section-title section-title-left">AI Innovation Nodeとは</h2>
            <div class="grid grid-2">
                <div>
                    <h3>生成AIを活用した新規事業開発の専門チーム</h3>
                    <p>AI Innovation Nodeは、NEWhが長年培ってきた新規事業開発のノウハウとAI技術を融合させ、新規事業開発プロセスを革新的に加速・進化させる専門組織です。</p>
                    <p>ビジネスストラテジスト、サービスデザイナー、プロジェクトマネージャーなど、多様な専門家が集結し、最新AI技術を駆使した新規事業開発支援サービスを提供いたします。</p>
                    <p>複雑化する事業環境において、生成AIの活用でより早く、より広く、より深い事業構想を実現します。生成AIと人間の最適なコラボレーションにより、革新的なビジネスを創出します。</p>
                    <div class="mt-2">
                      <a href="#services" class="btn btn-primary">
                        サービスを見る
                        <span class="btn-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </span>
                      </a>
                    </div>
                </div>
                <div>
                    <img src="assets/images/main-image.png" alt="AI Innovation Node チーム" style="border-radius: 12px; box-shadow: var(--box-shadow-medium);">
                </div>
            </div>
        </div>
      </section>
    `;
  }
}

customElements.define('about-component', About);
