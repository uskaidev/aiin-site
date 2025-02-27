class Team extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-light section-grid" id="team">
        <div class="container">
            <div class="section-tag">Our Team</div>
            <h2 class="section-title section-title-left">チームメンバー</h2>
            <p class="section-subtitle">多様なバックグラウンドを持つ専門家が集まり、生成AIを活用した新規事業開発を支援します。</p>
            
            <div class="grid grid-4">
                <div class="card team-card">
                    <div class="card-body">
                        <img src="assets/images/main-image.png" alt="小池祐介" class="team-img">
                        <h3>小池祐介</h3>
                        <p class="team-role">AI Innovation Node Director</p>
                        <p>NEWh取締役として、新規事業開発における伴走支援や人材育成、組織開発に関わる仕組みの構築に力を入れています。</p>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <img src="assets/images/main-image.png" alt="飯野希" class="team-img">
                        <h3>飯野希</h3>
                        <p class="team-role">Business Designer</p>
                        <p>スタートアップでの新規事業立ち上げ経験を持ち、AIニュースメディア『Ledge.ai』や社内コミュニケーションSaaS『ourly』などの開発に携わりました。</p>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <img src="assets/images/main-image.png" alt="古川亮太郎" class="team-img">
                        <h3>古川亮太郎</h3>
                        <p class="team-role">Service Designer</p>
                        <p>サービスデザイナーとして企業の新規事業開発支援、自社サービスの開発/グロース業務を担当。ユーザーリサーチからコンセプト設計まで一貫して行います。</p>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <img src="assets/images/main-image.png" alt="岡本あかね" class="team-img">
                        <h3>岡本あかね</h3>
                        <p class="team-role">Project Designer</p>
                        <p>デザイン思考的アプローチで住民参加型のプロジェクトを実践。立場を超えた共創的アプローチで日々プロジェクト課題に向き合います。</p>
                    </div>
                </div>
            </div>
            
            <div class="mt-5 text-center">
                <a href="#contact" class="btn btn-primary">
                    チームに相談する
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

customElements.define('team-component', Team);
