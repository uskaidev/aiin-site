class Benefits extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-dark" id="benefits">
        <div class="container">
            <div class="section-tag section-tag-light">Benefits</div>
            <h2 class="section-title section-title-light">導入メリット</h2>
            <p class="section-subtitle section-subtitle-light">生成AIを活用した新規事業開発により、以下のようなメリットを得ることができます。</p>
            
            <div class="grid grid-4">
                <div class="card card-dark benefit-card">
                    <div class="card-body">
                        <h3>10倍速い開発プロセス</h3>
                        <p>情報収集・分析が瞬時に行えます。新規事業開発プロセスの大幅な短縮と効率化を実現します。</p>
                    </div>
                </div>
                <div class="card card-dark benefit-card">
                    <div class="card-body">
                        <h3>多角的な視点と即時フィードバック</h3>
                        <p>多角的な視点と即時のフィードバックが新規事業の品質と適応性の向上につながります。</p>
                    </div>
                </div>
                <div class="card card-dark benefit-card">
                    <div class="card-body">
                        <h3>創造性の加速的育成</h3>
                        <p>AIとの協働による膨大な"経験"の蓄積が創造的思考力の加速的育成に貢献します。</p>
                    </div>
                </div>
                <div class="card card-dark benefit-card">
                    <div class="card-body">
                        <h3>再現性の向上</h3>
                        <p>フレームワークとプロンプトの標準化が新規事業開発の再現性を高めます。</p>
                    </div>
                </div>
            </div>
            
            <div class="mt-5 text-center">
                <a href="#services" class="btn btn-dark">
                    サービス内容を見る
                    <span class="btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </span>
                </a>
            </div>
        </div>
      </section>
    `;
  }
}

customElements.define('benefits-component', Benefits);
