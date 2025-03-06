class PromptLibraryDetail extends HTMLElement {
  constructor() {
    super();
    this.prompts = []; // GASから取得するため空配列で初期化
    this.categories = [
      '全てのプロンプト',
      '戦略策定',
      '市場調査',
      '事業コンセプト',
      '収益モデル',
      '成長ストーリー'
    ];
    this.activeCategory = '全てのプロンプト';
    this.searchTerm = '';
    
    // GAS WebアプリのURL
    this.apiUrl = 'https://script.google.com/macros/s/AKfycbxDe5yTUmo88fCVOBwceOFDHrQACqL6lFdyhEHfddW3Fi8fRuMz6s-IAcn84moYoyy2/exec';
  }

  connectedCallback() {
    this.loadPrompts();
  }
  
  // GASからプロンプト一覧を取得
  loadPrompts() {
    // JSONP形式でデータを取得
    const script = document.createElement('script');
    script.src = `${this.apiUrl}?action=list&callback=handlePromptsData`;
    document.body.appendChild(script);
    
    // グローバルコールバック関数を定義
    window.handlePromptsData = (data) => {
      this.prompts = data.prompts || [];
      this.render();
      this.setupEventListeners();
      document.body.removeChild(script);
    };
  }
  
  // 特定のプロンプト詳細を取得
  loadPromptDetail(promptId) {
    // IDを文字列に確実に変換
    const idStr = String(promptId);
    const script = document.createElement('script');
    script.src = `${this.apiUrl}?action=detail&id=${idStr}&callback=handlePromptDetail`;
    document.body.appendChild(script);
    
    // グローバルコールバック関数を定義
    window.handlePromptDetail = (data) => {
      if (data.prompt) {
        this.displayPromptDetail(data.prompt);
      }
      document.body.removeChild(script);
    };
  }

  // 検索とフィルタリング
  filterPrompts() {
    return this.prompts.filter(prompt => {
      // カテゴリフィルター
      const categoryMatch = this.activeCategory === '全てのプロンプト' || 
                           prompt.category === this.activeCategory;
      
      // 検索フィルター
      const searchMatch = this.searchTerm === '' || 
                         prompt.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  }

  // UIレンダリング
  render() {
    this.innerHTML = `
      <div class="prompt-library-detail">
        <!-- 検索とフィルター -->
        <div class="prompt-library-controls">
          <div class="search-container">
            <input type="text" class="search-input" placeholder="検索...">
            <i class="fas fa-search search-icon"></i>
          </div>
          <div class="category-filter">
            <select class="category-select">
              ${this.categories.map(category => 
                `<option value="${category}" ${this.activeCategory === category ? 'selected' : ''}>${category}</option>`
              ).join('')}
            </select>
          </div>
        </div>

        <!-- カードビュー（初期表示） -->
        <div class="prompt-library-cards">
          <div class="prompt-library-grid">
            ${this.filterPrompts().map(prompt => this.renderPromptCard(prompt)).join('')}
          </div>
        </div>
        
        <!-- 詳細ビュー（プロンプト選択時） -->
        <div class="prompt-library-detail-view">
          <!-- 左カラム：メニュー -->
          <div class="prompt-library-menu">
            <div class="prompt-library-menu-header">
              <button class="back-to-cards" aria-label="カード一覧に戻る">
                <i class="fas fa-arrow-left"></i> 一覧に戻る
              </button>
            </div>
            <nav class="prompt-library-nav">
              <ul>
                ${this.prompts.map(prompt => this.renderMenuItem(prompt)).join('')}
              </ul>
            </nav>
          </div>
          
          <!-- 右カラム：プロンプト詳細表示エリア -->
          <div class="prompt-library-content">
            <div class="prompt-detail-container">
              <div class="loading-indicator">
                <div class="spinner"></div>
                <p>プロンプトを読み込んでいます...</p>
              </div>
              <div class="prompt-detail" style="display: none;">
                <h2 class="prompt-detail-title"></h2>
                <div class="prompt-detail-category"></div>
                
                <div class="prompt-section">
                  <h3>プロンプト</h3>
                  <div class="prompt-text-container">
                    <pre class="prompt-text"></pre>
                    <button class="copy-button" data-target="prompt">
                      <i class="fas fa-copy"></i> コピー
                    </button>
                  </div>
                </div>
                
                <div class="prompt-section">
                  <h3>出力例</h3>
                  <div class="output-example-container">
                    <div class="output-example"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderPromptCard(prompt) {
    return `
      <div class="prompt-card animate-in" data-prompt-id="${prompt.id}">
        <div class="prompt-icon">
          <i class="${prompt.icon}"></i>
        </div>
        <h3 class="prompt-title">${prompt.title}</h3>
        <p class="prompt-description">
          ${prompt.description}
        </p>
        <a href="prompt-library.html?prompt=${prompt.id}" class="prompt-link">詳細を見る</a>
      </div>
    `;
  }

  renderMenuItem(prompt) {
    return `
      <li class="prompt-library-menu-item" data-prompt-id="${prompt.id}">
        <a href="prompt-library.html?prompt=${prompt.id}" class="prompt-library-menu-link">
          <i class="${prompt.icon}"></i>
          <span>${prompt.title}</span>
        </a>
      </li>
    `;
  }

  // プロンプト詳細表示
  displayPromptDetail(prompt) {
    const detailContainer = this.querySelector('.prompt-detail');
    const loadingIndicator = this.querySelector('.loading-indicator');
    
    if (detailContainer && loadingIndicator) {
      // タイトルと情報を設定
      this.querySelector('.prompt-detail-title').textContent = prompt.title;
      this.querySelector('.prompt-detail-category').textContent = prompt.category;
      
      // プロンプト本文を設定
      this.querySelector('.prompt-text').textContent = prompt.prompt;
      
      // 出力例を設定（Markdownとして解釈）
      const outputContainer = this.querySelector('.output-example');
      outputContainer.innerHTML = this.markdownToHtml(prompt.outputExample);
      
      // 表示切替
      loadingIndicator.style.display = 'none';
      detailContainer.style.display = 'block';
    }
  }

  // Markdownを簡易的にHTMLに変換
  markdownToHtml(markdown) {
    if (!markdown) return '';
    
    // 見出し
    let html = markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    
    // 太字
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // リスト
    html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
    html = html.replace(/<\/li>\n<li>/g, '</li><li>');
    html = html.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
    
    // 段落
    html = html.replace(/\n\n/g, '</p><p>');
    
    return `<p>${html}</p>`;
  }

  // イベントリスナーの設定
  setupEventListeners() {
    // URLパラメータからプロンプトIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const promptId = urlParams.get('prompt');
    
    if (promptId) {
      // IDを文字列に確実に変換
      const idStr = String(promptId);
      
      // 詳細ビューに切り替え
      const detailContainer = this.querySelector('.prompt-library-detail');
      if (detailContainer) {
        detailContainer.classList.add('detail-view');
      }
      
      // メニュー項目をアクティブ化
      const menuItems = this.querySelectorAll('.prompt-library-menu-item');
      menuItems.forEach(item => {
        if (item.getAttribute('data-prompt-id') === idStr) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      // プロンプト詳細を取得
      this.loadPromptDetail(promptId);
    }
    
    // 検索機能
    const searchInput = this.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value;
        this.updateFilteredPrompts();
      });
    }
    
    // カテゴリフィルター
    const categorySelect = this.querySelector('.category-select');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        this.activeCategory = e.target.value;
        this.updateFilteredPrompts();
      });
    }
    
    // カードクリックイベント
    const promptCards = this.querySelectorAll('.prompt-card');
    promptCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // カード内のリンクをクリックした場合は通常の動作を許可
        if (e.target.classList.contains('prompt-link')) {
          return;
        }
        
        e.preventDefault();
        const promptId = card.getAttribute('data-prompt-id');
        window.location.href = `prompt-library.html?prompt=${promptId}`;
      });
    });
    
    // メニュー項目クリックイベント
    const menuItems = this.querySelectorAll('.prompt-library-menu-item');
    menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // メニュー内のリンクをクリックした場合は通常の動作を許可
        if (e.target.tagName === 'A') {
          return;
        }
        
        e.preventDefault();
        const promptId = item.getAttribute('data-prompt-id');
        this.activatePrompt(promptId);
        
        // URLを更新（ブラウザの履歴に追加）
        const url = new URL(window.location);
        url.searchParams.set('prompt', promptId);
        window.history.pushState({}, '', url);
      });
    });
    
    // 「一覧に戻る」ボタンのイベント
    const backButton = this.querySelector('.back-to-cards');
    if (backButton) {
      backButton.addEventListener('click', () => {
        this.deactivatePrompt();
        
        // URLからパラメータを削除
        const url = new URL(window.location);
        url.searchParams.delete('prompt');
        window.history.pushState({}, '', url);
      });
    }
    
    // コピーボタンのイベント
    const copyButtons = this.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-target');
        let textToCopy = '';
        
        if (target === 'prompt') {
          textToCopy = this.querySelector('.prompt-text').textContent;
        }
        
        // クリップボードにコピー
        navigator.clipboard.writeText(textToCopy).then(() => {
          // コピー成功表示
          const originalText = button.innerHTML;
          button.innerHTML = '<i class="fas fa-check"></i> コピーしました';
          
          setTimeout(() => {
            button.innerHTML = originalText;
          }, 2000);
        });
      });
    });
  }

  // フィルタリングされたプロンプトの更新
  updateFilteredPrompts() {
    const filteredPrompts = this.filterPrompts();
    const grid = this.querySelector('.prompt-library-grid');
    
    if (grid) {
      grid.innerHTML = filteredPrompts.map(prompt => this.renderPromptCard(prompt)).join('');
      this.setupCardEventListeners();
    }
  }

  // カードのイベントリスナーを再設定
  setupCardEventListeners() {
    const promptCards = this.querySelectorAll('.prompt-card');
    promptCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('prompt-link')) {
          return;
        }
        
        e.preventDefault();
        const promptId = card.getAttribute('data-prompt-id');
        window.location.href = `prompt-library.html?prompt=${promptId}`;
      });
    });
  }

  // プロンプト詳細表示の有効化
  activatePrompt(promptId) {
    // IDを文字列に確実に変換
    const idStr = String(promptId);
    
    // 詳細ビューに切り替え
    const detailContainer = this.querySelector('.prompt-library-detail');
    detailContainer.classList.add('detail-view');
    
    // メニュー項目をアクティブ化
    const menuItems = this.querySelectorAll('.prompt-library-menu-item');
    menuItems.forEach(item => {
      if (item.getAttribute('data-prompt-id') === idStr) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    
    // ローディング表示
    const loadingIndicator = this.querySelector('.loading-indicator');
    const promptDetail = this.querySelector('.prompt-detail');
    
    if (loadingIndicator && promptDetail) {
      loadingIndicator.style.display = 'flex';
      promptDetail.style.display = 'none';
      
      // プロンプト詳細を取得
      this.loadPromptDetail(promptId);
    }
  }

  // プロンプト詳細表示の無効化
  deactivatePrompt() {
    // カードビューに戻す
    const detailContainer = this.querySelector('.prompt-library-detail');
    detailContainer.classList.remove('detail-view');
  }
}

customElements.define('prompt-library-detail-component', PromptLibraryDetail);
