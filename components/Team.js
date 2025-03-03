class Team extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-dark" id="team">
        <div class="container">
            <div class="section-tag section-tag-light">TEAM</div>
            <h2 class="section-title section-title-light">EXPERTS</h2>
            <p class="section-subtitle section-subtitle-light">多様なバックグラウンドを持つ専門家が集まり、生成AIを活用した新規事業開発を支援します。</p>
            
            <div class="grid grid-2">
                <div class="card team-card">
                    <div class="card-body">
                        <div class="team-img-container">
                            <img src="assets/images/NEWh_Koike.jpg" alt="小池祐介" class="team-img">
                        </div>
                        <div class="team-info">
                            <div class="team-header">
                                <span class="team-role">DIRECTOR</span>
                                <h3 class="team-name">小池祐介</h3>
                            </div>
                            <p class="team-bio">アサヒビールやデジタルマーケティング会社での経験を経て、イノベーションデザインコンサルティングファームWHITE Inc.にて、ビジネスデザインの専門知識を活かし、大企業向けの新規事業開発支援モデルを事業化。2021年1月、新たな挑戦としてNEWh Inc.を創業し、取締役に就任。</p>
                        </div>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <div class="team-img-container">
                            <img src="assets/images/iino.jpeg" alt="飯野希" class="team-img">
                        </div>
                        <div class="team-info">
                            <div class="team-header">
                                <span class="team-role">BUSINESS DESIGNER</span>
                                <h3 class="team-name">飯野希</h3>
                            </div>
                            <p class="team-bio">新卒でメーカーにて、ユーザビリティエンジニアとしてHCDの啓蒙活動に従事。その後、スタートアップにて、新規事業立ち上げ・グロース・子会社化を連続で行う。AIニュースメディア『Ledge.ai』、社内コミュニケーションSaaS『ourly』などを生み出し、執行役員として事業を牽引。</p>
                        </div>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <div class="team-img-container">
                            <img src="assets/images/NEWh_Furukawa.jpg" alt="古川亮太郎" class="team-img">
                        </div>
                        <div class="team-info">
                            <div class="team-header">
                                <span class="team-role">SERVICE DESIGNER</span>
                                <h3 class="team-name">古川亮太朗</h3>
                            </div>
                            <p class="team-bio">デジタル広告会社にて、インターネットの文脈とテクノロジーを掛け合わせた広告プロモーションを企画するクリエイティブプランナーに従事。その後、デザインコンサルティングファームに参画し、サービスデザイナーとして企業の新規事業開発支援、自社サービスの開発/グロース業務を担当。</p>
                        </div>
                    </div>
                </div>
                <div class="card team-card">
                    <div class="card-body">
                        <div class="team-img-container">
                            <img src="assets/images/NEWh_Okamoto.jpg" alt="岡本あかね" class="team-img">
                        </div>
                        <div class="team-info">
                            <div class="team-header">
                                <span class="team-role">PROJECT DESIGNER</span>
                                <h3 class="team-name">岡本あかね</h3>
                            </div>
                            <p class="team-bio">デザイン思考的アプローチで住民参加型のプロジェクトを実践するデザインチームに2014年4月より参画。2018年10月にデザインコンサルティングファームへ移り、企業の事業開発・サービス開発をプロジェクトマネージャーとして支援。2021年1月より現職に就く。</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-5 text-center">
                <a href="#contact" class="btn btn-primary">
                    お問い合わせ →
                </a>
            </div>
        </div>
      </section>
    `;
  }
}

customElements.define('team-component', Team);
