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
            
            <div class="grid grid-2">
                <div class="card team-card">
                    <div class="card-body">
                        <img src="assets/images/NEWh_Koike.jpg" alt="小池祐介" class="team-img">
                        <h3>小池祐介</h3>
                        <p class="team-role">AI Innovation Node Director</p>
                        <p>アサヒビールやデジタルマーケティング会社での経験を経て、イノベーションデザインコンサルティングファームWHITE Inc.にて、ビジネスデザインの専門知識を活かし、大企業向けの新規事業開発支援モデルを事業化。2021年1月、新たな挑戦としてNEWh Inc.を創業し、取締役に就任。新規事業開発における伴走支援はもちろん、人材育成や組織開発に関わる仕組みの構築にも力を入れ、新規事業をきっかけとした企業変革を多角的に支援している。</p>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <img src="assets/images/iino.jpeg" alt="飯野希" class="team-img">
                        <h3>飯野希</h3>
                        <p class="team-role">Business Designer</p>
                        <p>新卒でメーカーにて、ユーザビリティエンジニアとしてHCDの啓蒙活動に従事。その後、スタートアップにて、新規事業立ち上げ・グロース・子会社化を連続で行う。AIニュースメディア『Ledge.ai』、社内コミュニケーションSaaS『ourly』などを生み出し、執行役員として事業を牽引。独立後は、主にスタートアップの外部CxOとして活動、また海外大学院でクリエイティブ・テクノロジー・ビジネスの融合点を学びなおす。研究内容は生成AIと事業開発。2024年6月にNEWhにジョイン。。</p>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <img src="assets/images/NEWh_Furukawa.jpg" alt="古川亮太郎" class="team-img">
                        <h3>古川亮太朗</h3>
                        <p class="team-role">Service Designer</p>
                        <p>デジタル広告会社にて、インターネットの文脈とテクノロジーを掛け合わせた広告プロモーションを企画するクリエイティブプランナーに従事。その後、デザインコンサルティングファームに参画し、サービスデザイナーとして企業の新規事業開発支援、自社サービスの開発/グロース業務を担当。2021年1月より現職。ユーザーリサーチからコンセプトデザイン、サービス開発までを一気通貫でおこなう。新しい文化/新しい価値観を見つけ、実装し、世の中へ広げていくことを目指す。</p>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <img src="assets/images/NEWh_Okamoto.jpg" alt="岡本あかね" class="team-img">
                        <h3>岡本あかね</h3>
                        <p class="team-role">Project Designer</p>
                        <p>デザイン思考的アプローチで住民参加型のプロジェクトを実践するデザインチームに2014年4月より参画。2018年10月にデザインコンサルティングファームへ移り、企業の事業開発・サービス開発をプロジェクトマネージャーとして支援。2021年1月より現職に就く傍ら、サステナブル領域のスタートアップや官公庁の情報発信を支援するWebメディア運営にも携わる。人と人が出会うことで生まれる不確実なものにおもしろさを見出し、立場を超えた共創的アプローチで日々プロジェクト課題に向き合う。</p>
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
