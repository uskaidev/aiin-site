class Contact extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = ''; // 既存のコンテンツをクリア
    this.render();
    this.setupEventListeners();
  }

  render() {
    // セクション要素の作成
    const section = document.createElement('section');
    section.className = 'section section-dark';
    section.id = 'contact';

    const container = document.createElement('div');
    container.className = 'container';

    // セクションタグとタイトル
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag section-tag-light';
    sectionTag.textContent = 'CONTACT';

    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'section-title section-title-light';
    sectionTitle.textContent = '私たちにお任せください';

    const sectionSubtitle = document.createElement('p');
    sectionSubtitle.className = 'section-subtitle section-subtitle-light';
    sectionSubtitle.textContent = 'AIドリブンなイノベーションを共に創っていきましょう';

    // グリッドコンテナ
    const grid = document.createElement('div');
    grid.className = 'grid grid-2';

    // 左カラム：お問い合わせ情報
    const leftColumn = this.createContactInfo();

    // 右カラム：フォーム
    const rightColumn = this.createContactForm();

    // 要素の組み立て
    grid.appendChild(leftColumn);
    grid.appendChild(rightColumn);

    container.appendChild(sectionTag);
    container.appendChild(sectionTitle);
    container.appendChild(sectionSubtitle);
    container.appendChild(grid);

    section.appendChild(container);
    this.appendChild(section);
  }

  createContactInfo() {
    const div = document.createElement('div');

    const title = document.createElement('h3');
    title.style.cssText = 'color: var(--white); margin-bottom: 2rem;';
    title.textContent = 'お問い合わせ';

    const description = document.createElement('p');
    description.style.color = 'var(--gray-300)';
    description.textContent = '新規事業開発やAI活用についてのご相談、サービスに関するお問い合わせなど、お気軽にご連絡ください。専門チームが最適なソリューションをご提案いたします。';

    // 所在地情報
    const addressContainer = document.createElement('p');
    addressContainer.style.cssText = 'color: var(--gray-300); margin-top: 2rem;';
    
    const addressLabel = document.createElement('strong');
    addressLabel.style.color = 'var(--white)';
    addressLabel.textContent = '所在地:';
    
    addressContainer.appendChild(addressLabel);
    addressContainer.appendChild(document.createElement('br'));
    addressContainer.appendChild(document.createTextNode('〒100-0004'));
    addressContainer.appendChild(document.createElement('br'));
    addressContainer.appendChild(document.createTextNode('東京都千代田区大手町1-6-1'));
    addressContainer.appendChild(document.createElement('br'));
    addressContainer.appendChild(document.createTextNode('大手町ビルB1F'));

    // Email情報
    const emailContainer = document.createElement('p');
    emailContainer.style.color = 'var(--gray-300)';
    
    const emailLabel = document.createElement('strong');
    emailLabel.style.color = 'var(--white)';
    emailLabel.textContent = 'Email:';
    
    emailContainer.appendChild(emailLabel);
    emailContainer.appendChild(document.createElement('br'));
    emailContainer.appendChild(document.createTextNode('customer@newh.co.jp'));

    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(addressContainer);
    div.appendChild(emailContainer);

    return div;
  }

  createContactForm() {
    const div = document.createElement('div');
    
    const form = document.createElement('form');
    form.className = 'form';
    form.id = 'contact-form';

    // お名前フィールド
    const nameGroup = this.createFormGroup('name', 'お名前', 'text', '山田 太郎', true);
    
    // 会社名フィールド
    const companyGroup = this.createFormGroup('company', '会社名', 'text', '株式会社〇〇', false);
    
    // メールアドレスフィールド
    const emailGroup = this.createFormGroup('email', 'メールアドレス', 'email', 'example@company.com', true);
    
    // お問い合わせ内容フィールド
    const messageGroup = this.createTextareaGroup('message', 'お問い合わせ内容', 'お問い合わせ内容をご記入ください');

    // 送信ボタン
    const submitButton = this.createSubmitButton();

    form.appendChild(nameGroup);
    form.appendChild(companyGroup);
    form.appendChild(emailGroup);
    form.appendChild(messageGroup);
    form.appendChild(submitButton);

    div.appendChild(form);
    return div;
  }

  createFormGroup(id, labelText, type, placeholder, required = false) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.className = 'form-label';
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    input.className = 'form-control';
    input.placeholder = placeholder;
    if (required) {
      input.required = true;
    }

    group.appendChild(label);
    group.appendChild(input);

    return group;
  }

  createTextareaGroup(id, labelText, placeholder) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.className = 'form-label';
    label.textContent = labelText;

    const textarea = document.createElement('textarea');
    textarea.id = id;
    textarea.name = id;
    textarea.className = 'form-control';
    textarea.rows = 5;
    textarea.placeholder = placeholder;

    group.appendChild(label);
    group.appendChild(textarea);

    return group;
  }

  createSubmitButton() {
    const button = document.createElement('button');
    button.type = 'submit';
    button.className = 'btn btn-primary';
    button.style.width = '100%';
    button.textContent = '送信する';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'btn-icon';
    iconSpan.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;

    button.appendChild(iconSpan);
    return button;
  }

  setupEventListeners() {
    const form = this.querySelector('#contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit(form);
      });
    }
  }

  handleFormSubmit(form) {
    // フォームデータの取得
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // 入力値のサニタイズ
    const sanitizedData = {};
    for (const [key, value] of Object.entries(data)) {
      sanitizedData[key] = this.sanitizeInput(value);
    }

    // ここで実際の送信処理を行う
    console.log('Form submitted:', sanitizedData);
    
    // 成功メッセージの表示
    this.showSuccessMessage();
  }

  sanitizeInput(input) {
    // 基本的なサニタイズ処理
    return String(input).trim()
      .replace(/[<>]/g, '') // HTMLタグを除去
      .substring(0, 1000); // 最大文字数制限
  }

  showSuccessMessage() {
    const form = this.querySelector('#contact-form');
    if (form) {
      // 成功メッセージの作成
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-success';
      successMessage.style.cssText = 'background: var(--success); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem;';
      successMessage.textContent = 'お問い合わせありがとうございます。担当者より追ってご連絡させていただきます。';

      // フォームを非表示にして成功メッセージを表示
      form.style.display = 'none';
      form.parentElement.appendChild(successMessage);

      // 3秒後にフォームを再表示
      setTimeout(() => {
        form.style.display = 'block';
        form.reset();
        successMessage.remove();
      }, 3000);
    }
  }
}

customElements.define('contact-component', Contact);