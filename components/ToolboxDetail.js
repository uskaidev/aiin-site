class ToolboxDetail extends HTMLElement {
  constructor() {
    super();
    this.tools = [
      {
        id: 'megatrend',
        title: '業界トレンド調査',
        description: '業界とエリアを入力すると、業界トレンドが生成されます。事業開発初期に業界の全体感を把握するのに最適なツールです。',
        icon: 'fas fa-magnifying-glass-chart',
        url: 'https://udify.app/chat/iFRDkGxb63EMIXm8'
      },
      {
        id: 'competitor',
        title: '競合調査',
        description: '新規事業を検討している市場における競合を調査します。完全競合、代替競合、目的競合など様々なカテゴリの調査が可能です。',
        icon: 'fas fa-building-shield',
        url: 'https://udify.app/chat/KKPJeWGOGj2Ayjlx'
      },
      {
        id: 'swot',
        title: 'SWOT分析',
        description: '会社名と市場を入力すると、簡易のSWOT分析が提供されます。事業を検討している市場における自社の分析から戦略的な示唆が得られます。',
        icon: 'fas fa-table-cells',
        url: 'https://udify.app/chat/MVi6iYS1i4a9q3A1'
      },
      {
        id: 'concept',
        title: '事業コンセプト発散',
        description: '会社名と想定顧客と課題を入力すると事業コンセプトが生成されます。さまざまな人物の発送方法からユニークはアイデアを発散します。',
        icon: 'fas fa-lightbulb',
        url: 'https://udify.app/chat/JsWCillp6JhvA7Ci'
      }
    ];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="toolbox-detail">
        <!-- カードビュー（初期表示） -->
        <div class="toolbox-cards">
          <div class="toolbox-grid">
            ${this.tools.map(tool => this.renderToolCard(tool)).join('')}
          </div>
        </div>
        
        <!-- 詳細ビュー（ツール選択時） -->
        <div class="toolbox-detail-view">
          <!-- 左カラム：メニュー -->
          <div class="toolbox-menu">
            <div class="toolbox-menu-header">
              <button class="back-to-cards" aria-label="カード一覧に戻る">
                <i class="fas fa-arrow-left"></i> 一覧に戻る
              </button>
            </div>
            <nav class="toolbox-nav">
              <ul>
                ${this.tools.map(tool => this.renderMenuItem(tool)).join('')}
              </ul>
            </nav>
          </div>
          
          <!-- 右カラム：ツール表示エリア -->
          <div class="toolbox-content">
            <div class="iframe-container">
              <div class="loading-indicator">
                <div class="spinner"></div>
                <p>ツールを読み込んでいます...</p>
              </div>
              <iframe id="tool-iframe" src="" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderToolCard(tool) {
    return `
      <div class="tool-card animate-in" data-tool-id="${tool.id}">
        <div class="tool-icon">
          <i class="${tool.icon}"></i>
        </div>
        <h3 class="tool-title">${tool.title}</h3>
        <p class="tool-description">
          ${tool.description}
        </p>
        <a href="toolbox.html?tool=${tool.id}" class="tool-link">利用する</a>
      </div>
    `;
  }

  renderMenuItem(tool) {
    return `
      <li class="toolbox-menu-item" data-tool-id="${tool.id}">
        <a href="toolbox.html?tool=${tool.id}" class="toolbox-menu-link">
          <i class="${tool.icon}"></i>
          <span>${tool.title}</span>
        </a>
      </li>
    `;
  }

  setupEventListeners() {
    // URLパラメータからツールIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const toolId = urlParams.get('tool');
    
    if (toolId) {
      this.activateTool(toolId);
    }
    
    // カードクリックイベント
    const toolCards = this.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // カード内のリンクをクリックした場合は通常の動作を許可
        if (e.target.classList.contains('tool-link')) {
          return;
        }
        
        e.preventDefault();
        const toolId = card.getAttribute('data-tool-id');
        window.location.href = `toolbox.html?tool=${toolId}`;
      });
    });
    
    // メニュー項目クリックイベント
    const menuItems = this.querySelectorAll('.toolbox-menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // メニュー内のリンクをクリックした場合は通常の動作を許可
        if (e.target.tagName === 'A') {
          return;
        }
        
        e.preventDefault();
        const toolId = item.getAttribute('data-tool-id');
        this.activateTool(toolId);
        
        // URLを更新（ブラウザの履歴に追加）
        const url = new URL(window.location);
        url.searchParams.set('tool', toolId);
        window.history.pushState({}, '', url);
      });
    });
    
    // 「一覧に戻る」ボタンのイベント
    const backButton = this.querySelector('.back-to-cards');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.deactivateTool();
        
        // URLからパラメータを削除
        const url = new URL(window.location);
        url.searchParams.delete('tool');
        window.history.pushState({}, '', url);
      });
    }
  }

  activateTool(toolId) {
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) return;
    
    // 詳細ビューに切り替え
    const detailContainer = this.querySelector('.toolbox-detail');
    detailContainer.classList.add('detail-view');
    
    // メニュー項目をアクティブ化
    const menuItems = this.querySelectorAll('.toolbox-menu-item');
    menuItems.forEach(item => {
      if (item.getAttribute('data-tool-id') === toolId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // iframeのソースを設定
    const iframe = this.querySelector('#tool-iframe');
    const loadingIndicator = this.querySelector('.loading-indicator');
    
    if (iframe && loadingIndicator) {
      // ローディング表示
      loadingIndicator.style.display = 'flex';
      iframe.style.opacity = '0';
      
      // iframeのロードイベント
      iframe.onload = () => {
        setTimeout(() => {
          loadingIndicator.style.display = 'none';
          iframe.style.opacity = '1';
        }, 500);
      };
      
      // iframeのソースを設定
      iframe.src = tool.url;
    }
  }

  deactivateTool() {
    // カードビューに戻す
    const detailContainer = this.querySelector('.toolbox-detail');
    detailContainer.classList.remove('detail-view');
    
    // iframeのソースをクリア
    const iframe = this.querySelector('#tool-iframe');
    if (iframe) {
      iframe.src = '';
    }
  }
}

customElements.define('toolbox-detail-component', ToolboxDetail);
