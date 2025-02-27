class Contact extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-dark" id="contact">
        <div class="container">
            <div class="section-tag section-tag-light">Contact</div>
            <h2 class="section-title section-title-light section-title-center">お問い合わせ</h2>
            <p class="section-subtitle section-subtitle-light text-center">AIドリブンなイノベーションを共に創っていきましょう</p>
            
            <div class="card" style="max-width: 700px; margin: 0 auto;">
                <div class="card-body">
                    <form class="form">
                        <div class="form-group">
                            <label for="name" class="form-label">お名前</label>
                            <input type="text" id="name" class="form-control" placeholder="山田 太郎" required>
                        </div>
                        <div class="form-group">
                            <label for="company" class="form-label">会社名</label>
                            <input type="text" id="company" class="form-control" placeholder="株式会社〇〇">
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">メールアドレス</label>
                            <input type="email" id="email" class="form-control" placeholder="example@company.com" required>
                        </div>
                        <div class="form-group">
                            <label for="message" class="form-label">お問い合わせ内容</label>
                            <textarea id="message" class="form-control" rows="5" placeholder="お問い合わせ内容をご記入ください"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">
                            送信する
                            <span class="btn-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>
    `;
  }
}

customElements.define('contact-component', Contact);
