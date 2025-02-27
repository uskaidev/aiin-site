class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header class="header" id="header">
        <div class="container flex flex-between flex-center">
            <a href="#" class="logo">
              <img src="assets/logos/00-logo.svg" alt="NEWh Logo" class="logo-svg">
            </a>
            <nav class="nav-menu">
                <button class="nav-toggle" id="navToggle" aria-label="メニュー">
                    ☰
                </button>
                <ul class="nav-list" id="navList">
                    <li class="nav-item"><a href="#about" class="nav-link">AI Innovation Node</a></li>
                    <li class="nav-item"><a href="#benefits" class="nav-link">メリット</a></li>
                    <li class="nav-item"><a href="#services" class="nav-link">サービス</a></li>
                    <li class="nav-item"><a href="#cases" class="nav-link">導入事例</a></li>
                    <li class="nav-item"><a href="#team" class="nav-link">チーム</a></li>
                </ul>
                <a href="#contact" class="btn btn-primary nav-cta">
                  お問い合わせ
                  <span class="btn-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </a>
            </nav>
        </div>
      </header>
    `;
  }
}

customElements.define('header-component', Header);
