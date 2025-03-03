class About extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-light" id="about">
        <div class="container">
            <div class="section-tag">ABOUT</div>
            <h2 class="section-title section-title-left">AI innovation node</h2>
            <div class="grid grid-asymmetric">
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
                    <img src="assets/images/main-image.png" alt="AI Innovation Node チーム" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
            </div>
            
            <div class="mt-5">
              <div class="highlight-grid">
                <!-- パートナー企業 -->
                <div class="highlight-item highlight-item-1 animate-in animate-delay-1">
                  <div class="highlight-tag">パートナー企業</div>
                  <h2 class="highlight-number">実績<br>150+</h2>
                  <p class="highlight-text">Sony、Asahi、TOYOTA、docomoなど業界リーダー企業との協業実績。製造業、金融、IT、小売などの多様な業界トップ企業と新規事業開発に取り組み、イノベーションと事業変革を共に実現してきました。</p>
                </div>
                
                <!-- 顧客満足度 -->
                <div class="highlight-item highlight-item-2 animate-in animate-delay-2">
                  <div class="highlight-tag">顧客推奨度</div>
                  <h2 class="highlight-number">NPS® 50+</h2>
                  <p class="highlight-text">日本平均が0〜-20、業界平均が-30〜-40の中で圧倒的な満足度を実現。「伴走型で考える力を引き出していただきました」「提案を具体化する最適なプロセス・手法が採用できた」など、高い評価をいただいています。</p>
                </div>
                
                <!-- 革新的アプローチ -->
                <div class="highlight-item highlight-item-3 animate-in animate-delay-3">
                  <div class="highlight-tag">アプローチ</div>
                  <h2 class="highlight-number">生成AI主導</h2>
                  <p class="highlight-text">生成AIにより、新規事業開発がより早く、より広く、より深く進化。当社独自の10倍速い開発プロセスと100倍の選択肢から事業構想を創出するアプローチが、クライアントのイノベーションを加速させています。</p>
                </div>
                
                <!-- 共創の哲学 -->
                <div class="highlight-item highlight-item-4 animate-in animate-delay-4">
                  <div class="highlight-tag">共創理念</div>
                  <h2 class="highlight-number">論理的な確信</h2>
                  <p class="highlight-text">不確実な時代の新規事業で重要なのは「結論」ではなく「熱量」「推進力」そして「適応力」です。NEWhの独自フレームワークと柔軟なプロセス設計により、"自分たちで考え尽くす"経験を通じて確信を生み出し、事業の成功を支えます。</p>
                </div>
              </div>
            </div>
        </div>
      </section>
    `;
  }
}

customElements.define('about-component', About);
