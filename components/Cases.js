class Cases extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-dark" id="cases">
        <div class="container">
            <div class="section-tag section-tag-light">WORK</div>
            <h2 class="section-title section-title-light">CASE STUDIES</h2>
            <p class="section-subtitle section-subtitle-light">様々な業界のクライアント企業と共に、生成AIを活用した新規事業開発を実現しています。</p>
            
            <div class="grid grid-3">
                <div class="case-card">
                    <div class="case-img-container">
                        <img src="assets/images/yomiko.webp" alt="株式会社読売広告社" class="case-img">
                    </div>
                    <div class="case-content">
                        <div class="case-tags">
                            <span class="case-tag">広告</span>
                            <span class="case-tag">戦略AIスプリント</span>
                        </div>
                        <h3 class="case-title">大手広告会社との新規事業戦略構築</h3>
                        <p class="case-description">メガトレンドと社内アセットを組み合わせ、生成AIベースで45の事業方向性を策定。大量のアイデアを絞り込み、会社としての戦略を2ヶ月でまとめあげました。</p>
                    </div>
                </div>
                <div class="case-card">
                    <div class="case-img-container">
                        <img src="assets/images/dnp.jpeg" alt="大日本印刷株式会社" class="case-img">
                    </div>
                    <div class="case-content">
                        <div class="case-tags">
                            <span class="case-tag">印刷</span>
                            <span class="case-tag">新規事業AIスプリント</span>
                        </div>
                        <h3 class="case-title">印刷会社の短期間事業構想</h3>
                        <p class="case-description">1.5ヶ月という短期間で新規事業の市場調査から事業構想までを実施。生成AIを活用しながら、情報量、選択肢の量と期間というトレードオフを突破しました。</p>
                    </div>
                </div>
                <div class="case-card">
                    <div class="case-img-container">
                        <img src="assets/images/asd.jpg" alt="飲料メーカー" class="case-img">
                    </div>
                    <div class="case-content">
                        <div class="case-tags">
                            <span class="case-tag">飲料</span>
                            <span class="case-tag">グローバル商品企画</span>
                        </div>
                        <h3 class="case-title">飲料メーカーのグローバル展開</h3>
                        <p class="case-description">製品の海外展開を目指すプロジェクトで、アメリカ市場の状況を生成AIを活用して調査。30近くのアイデアを1.5ヶ月で作成し、3つに絞り込んで社内提案を実現しました。</p>
                    </div>
                </div>
            </div>
            
            <div class="mt-5 text-center">
                <a href="#contact" class="btn btn-primary">
                    お問い合わせ
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

customElements.define('cases-component', Cases);
