class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const currentYear = new Date().getFullYear();
    
    this.innerHTML = `
      <footer>
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>NEWh プロンプトライブラリ</h3>
              <p>ビジネスや個人的なタスクに最適化されたプロンプト集</p>
            </div>
          </div>
          <div class="footer-copyright">
            &copy; ${currentYear} NEWh. All rights reserved.
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);
