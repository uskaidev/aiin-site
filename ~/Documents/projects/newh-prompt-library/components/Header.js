class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header id="header">
        <div class="container header-container">
          <a href="index.html" class="logo">NEWh プロンプトライブラリ</a>
          <nav class="header-nav">
            <ul class="nav-list">
              <li class="nav-item">
                <a href="#" id="logoutButton">ログアウト</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    `;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    const logoutButton = this.querySelector('#logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        // セッションストレージから認証情報を削除
        sessionStorage.removeItem('authenticated');
        // ログインページにリダイレクト
        window.location.href = 'login.html';
      });
    }
  }
}

customElements.define('header-component', Header);
