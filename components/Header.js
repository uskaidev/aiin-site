class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // 現在のページがindex.htmlかどうかを判定
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname === '';
    
    // リンクのプレフィックスを設定
    const linkPrefix = isHomePage ? '#' : 'index.html#';
    
    // ナビゲーションリンクを生成
    const aboutLink = `${linkPrefix}about`;
    const servicesLink = `${linkPrefix}services`;
    const casesLink = `${linkPrefix}cases`;
    const teamLink = `${linkPrefix}team`;
    const insightLink = `${linkPrefix}insight`;
    const toolboxLink = `${linkPrefix}toolbox`;
    const contactLink = `${linkPrefix}contact`;
    
    this.innerHTML = `
      <header class="header dark" id="header">
        <div class="container flex flex-between flex-center">
            <a href="index.html" class="logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552.977 142.455" class="logo-svg" style="height: 40px; width: auto;">
                <g id="レイヤー_2" data-name="レイヤー 2">
                  <g id="contents">
                    <g fill="white">
                      <path d="M0,0H19.98L99.027,92.479V0h27.8V142.455h-19.98L27.8,49.976v92.479H0Z"/>
                      <path d="M158.306,142.432V.032h93.8v24.8h-66v33.4h56.2v24.8h-56.2v34.6h66v24.8Z"/>
                      <path d="M410.041,142.432h-23.2l-26.2-86.4-26.2,86.4h-23.2l-38-142.4h29l22,89.8,26-89.8h20.8l26,89.8,22.2-89.8h29Z"/>
                      <path d="M478.786,65.162q.4-.8,1.092-2.334a36.9,36.9,0,0,1,3.576-5.413,37.345,37.345,0,0,1,6.5-6.8A37.529,37.529,0,0,1,500.089,45.2a39.663,39.663,0,0,1,14.252-2.483A36.312,36.312,0,0,1,541.8,54.534q11.173,11.82,11.174,29.9v58h-6.059v-58q0-15.891-9.286-25.723a30.691,30.691,0,0,0-23.291-9.833q-15.494,0-25.524,10.677T478.786,87.508v54.924h-6.159V.008h6.159Z"/>
                    </g>
                  </g>
                </g>
              </svg>
            </a>
            <nav class="nav-menu">
                <button class="nav-toggle" id="navToggle" aria-label="メニュー">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                <ul class="nav-list" id="navList">
                    <li class="nav-item"><a href="${aboutLink}" class="nav-link">About</a></li>
                    <li class="nav-item"><a href="${servicesLink}" class="nav-link">Services</a></li>
                    <li class="nav-item"><a href="${casesLink}" class="nav-link">Work</a></li>
                    <li class="nav-item"><a href="${teamLink}" class="nav-link">Team</a></li>
                    <li class="nav-item"><a href="${insightLink}" class="nav-link">Insight</a></li>
                    <li class="nav-item"><a href="${toolboxLink}" class="nav-link">Tools</a></li>
                    <li class="nav-item"><a href="#" id="logoutButton" class="nav-link">Logout</a></li>
                </ul>
                <a href="${contactLink}" class="btn btn-dark nav-cta">
                  Contact
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
    
    // ログアウト機能の追加
    setTimeout(() => {
      const logoutButton = document.getElementById('logoutButton');
      if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
          e.preventDefault();
          sessionStorage.removeItem('authenticated');
          window.location.href = 'login.html';
        });
      }
      
      // モバイルメニューの開閉
      const navToggle = document.getElementById('navToggle');
      const navList = document.getElementById('navList');
      
      if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
          navList.classList.toggle('active');
          document.body.classList.toggle('menu-open');
        });
        
        // メニュー項目をクリックしたらメニューを閉じる
        const navLinks = navList.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
          link.addEventListener('click', () => {
            navList.classList.remove('active');
            document.body.classList.remove('menu-open');
          });
        });
      }
      
      // スクロール時のヘッダースタイル変更
      window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }
      });
    }, 0);
  }
}

customElements.define('header-component', Header);
