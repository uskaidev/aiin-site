class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="container">
            <div class="grid grid-3">
                <div>
                    <h3 class="footer-title">NEWh</h3>
                    <p>新規事業によって大企業のトランスフォーメーションを促進するデザインコンサルティング＆スタジオ</p>
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        <a href="#" class="social-link" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                            </svg>
                        </a>
                        <a href="#" class="social-link" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h3 class="footer-title">サービス</h3>
                    <ul>
                        <li><a href="#services" class="footer-link">新規事業AIスプリント</a></li>
                        <li><a href="#services" class="footer-link">生成AIワークショップ</a></li>
                        <li><a href="#services" class="footer-link">新規事業戦略の設計</a></li>
                        <li><a href="#services" class="footer-link">新規事業開発の伴走/共創</a></li>
                        <li><a href="#services" class="footer-link">新規事業インフラの開発</a></li>
                        <li><a href="#services" class="footer-link">イノベーション人材育成</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="footer-title">お問い合わせ</h3>
                    <p>〒100-0004<br>東京都千代田区大手町1-6-1<br>大手町ビルB1F</p>
                    <p>Email: <a href="mailto:customer@newh.co.jp" style="color: rgba(255, 255, 255, 0.7);">customer@newh.co.jp</a></p>
                    <p>担当: 川﨑</p>
                </div>
            </div>
            <div class="copyright">
                &copy; 2025 NEWh Inc. All rights reserved.
            </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);
