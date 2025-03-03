class Services extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-light" id="services">
        <div class="container">
            <div class="section-tag">SERVICES</div>
            <h2 class="section-title section-title-left">SOLUTIONS</h2>
            <p class="section-subtitle">生成AIを活用した新規事業開発を支援するサービスを提供しています。</p>
            
            <div class="grid grid-2">
                <div class="service-card">
                    <h3 class="service-title">新規事業AIスプリント</h3>
                    <p class="service-description">NEWhの100超のプロジェクト経験から得た事業構想ノウハウの生成AIとの融合。革新的なスプリントが、最短2ヶ月で解像度の高い事業構想を創出します。</p>
                    <ul class="service-list">
                        <li>事業機会の発見</li>
                        <li>事業コンセプトの創造</li>
                        <li>Why us / Why now</li>
                        <li>成長ストーリー</li>
                    </ul>
                    <div class="mt-2">
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
                <div class="service-card">
                    <h3 class="service-title">生成AIワークショップ</h3>
                    <p class="service-description">生成AIの使用方法はもちろん、「どう事業に活用するか」までを手を動かしながら学ぶ2Daysのワークショップ。すぐに業務に活かせるのが特徴です。</p>
                    <ul class="service-list">
                        <li>基本的な生成AIの使い方実習</li>
                        <li>市場分析セッション</li>
                        <li>事業コンセプト発散</li>
                        <li>アイデアの評価と改善</li>
                    </ul>
                    <div class="mt-2">
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
            </div>
        </div>
      </section>
    `;
  }
}

customElements.define('services-component', Services);
