class Cases extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-dark" id="cases">
        <div class="container">
            <div class="section-tag section-tag-light">Case Studies</div>
            <h2 class="section-title section-title-light">導入事例</h2>
            <p class="section-subtitle section-subtitle-light">様々な業界のクライアント企業と共に、生成AIを活用した新規事業開発を実現しています。</p>
            
            <div class="grid grid-3">
                <div class="card card-dark">
                    <img src="assets/images/main-image.png" alt="導入事例 1" class="case-img">
                    <div class="card-body">
                        <div class="mb-1">
                            <span class="case-tag">広告会社</span>
                            <span class="case-tag">戦略設計</span>
                        </div>
                        <h3>大手広告会社との新規事業戦略構築</h3>
                        <p>メガトレンドと社内アセットを組み合わせ、生成AIベースで45の事業方向性を策定。大量のアイデアを絞り込み、会社としての戦略を2ヶ月でまとめあげました。</p>
                    </div>
                </div>
                <div class="card card-dark">
                    <img src="assets/images/main-image.png" alt="導入事例 2" class="case-img">
                    <div class="card-body">
                        <div class="mb-1">
                            <span class="case-tag">印刷会社</span>
                            <span class="case-tag">伴走支援</span>
                        </div>
                        <h3>印刷会社の短期間事業構想</h3>
                        <p>1.5ヶ月という短期間で新規事業の市場調査から事業構想までを実施。生成AIを活用しながら、情報量、選択肢の量と期間というトレードオフを突破しました。</p>
                    </div>
                </div>
                <div class="card card-dark">
                    <img src="assets/images/main-image.png" alt="導入事例 3" class="case-img">
                    <div class="card-body">
                        <div class="mb-1">
                            <span class="case-tag">飲料メーカー</span>
                            <span class="case-tag">海外展開</span>
                        </div>
                        <h3>飲料メーカーのグローバル展開</h3>
                        <p>製品の海外展開を目指すプロジェクトで、アメリカ市場の状況を生成AIを活用して調査。30近くのアイデアを1.5ヶ月で作成し、3つに絞り込んで社内提案を実現しました。</p>
                    </div>
                </div>
            </div>
            
            <div class="mt-5 text-center">
                <a href="#contact" class="btn btn-dark">
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
