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
          <p class="section-subtitle section-subtitle-light">事業開発に活用できる生成AIを活用したツールを提供しています。ご自由にご活用ください。</p>
          
          <div class="toolbox-grid">
            <div class="tool-card animate-in animate-delay-1">
              <div class="tool-icon">
                <i class="fas fa-magnifying-glass-chart"></i>
              </div>
              <h3 class="tool-title">業界トレンド調査</h3>
              <p class="tool-description">
                業界とエリアを入力すると、業界トレンドが生成されます。
                事業開発初期に業界の全体感を把握するのに最適なツールです。
              </p>
              <a href="toolbox.html?tool=megatrend" class="tool-link">利用する</a>
            </div>
            
            <div class="tool-card animate-in animate-delay-2">
              <div class="tool-icon">
                <i class="fas fa-building-shield"></i>
              </div>
              <h3 class="tool-title">競合調査</h3>
              <p class="tool-description">
                新規事業を検討している市場における競合を調査します。
                完全競合、代替競合、目的競合など様々なカテゴリの調査が可能です。
              </p>
              <a href="toolbox.html?tool=competitor" class="tool-link">利用する</a>
            </div>
            
            <div class="tool-card animate-in animate-delay-3">
              <div class="tool-icon">
                <i class="fas fa-table-cells"></i>
              </div>
              <h3 class="tool-title">SWOT分析</h3>
              <p class="tool-description">
                会社名と市場を入力すると、簡易のSWOT分析が提供されます。
                事業を検討している市場における自社の分析から戦略的な示唆が得られます。
              </p>
              <a href="toolbox.html?tool=swot" class="tool-link">利用する</a>
            </div>
            
            <div class="tool-card animate-in animate-delay-4">
              <div class="tool-icon">
                <i class="fas fa-lightbulb"></i>
              </div>
              <h3 class="tool-title">事業コンセプト発散</h3>
              <p class="tool-description">
                会社名と想定顧客と課題を入力すると事業コンセプトが生成されます。
                さまざまな人物の発送方法からユニークはアイデアを発散します。
              </p>
              <a href="toolbox.html?tool=concept" class="tool-link">利用する</a>
            </div>
          </div>
          
          <div class="mt-5 text-center">
            <a href="toolbox.html" class="btn btn-primary">
                ツールボックスを確認 →
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('toolbox-component', Toolbox);
