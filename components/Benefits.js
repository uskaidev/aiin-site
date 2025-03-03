class Benefits extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-dark" id="benefits">
        <div class="container">
            <div class="section-tag section-tag-light">BENEFITS</div>
            <h2 class="section-title section-title-light">ADVANTAGES</h2>
            <p class="section-subtitle section-subtitle-light">生成AIを活用することで新規事業開発がより早く、より広く、より深く</p>
            
            <div class="grid grid-2">
                <div class="card card-dark benefit-card animate-in animate-delay-1">
                    <div class="card-body">
                        <h3>RAPID DEVELOPMENT</h3>
                        <p>情報収集・分析・発散が瞬時に行えます。プロセスの大幅な短縮と効率化を実現します。従来の方法と比較して最大10倍のスピードアップが可能です。</p>
                    </div>
                </div>
                <div class="card card-dark benefit-card animate-in animate-delay-2">
                    <div class="card-body">
                        <h3>MULTI-PERSPECTIVE FEEDBACK</h3>
                        <p>生成AIにより多角的な視点と即時のフィードバックが提供され、品質と適応性の向上につながります。多様な視点からのアイデア検証が可能になります。</p>
                    </div>
                </div>
                <div class="card card-dark benefit-card animate-in animate-delay-3">
                    <div class="card-body">
                        <h3>CREATIVE AUTONOMY</h3>
                        <p>AIとの協働による膨大な"経験"の蓄積が創造的思考力の自律的な育成に貢献します。チームの創造性と問題解決能力が飛躍的に向上します。</p>
                    </div>
                </div>
                <div class="card card-dark benefit-card animate-in animate-delay-4">
                    <div class="card-body">
                        <h3>REPRODUCIBLE INNOVATION</h3>
                        <p>フレームワークとプロンプトの標準化が新規事業開発の組織的な再現性を高めます。成功パターンを組織全体で共有し、スケールすることが可能になります。</p>
                    </div>
                </div>
            </div>
            
            <div class="mt-5 text-center">
                <a href="#services" class="btn btn-primary">
                    EXPLORE SERVICES
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
