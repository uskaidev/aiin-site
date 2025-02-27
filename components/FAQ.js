class FAQ extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <section class="section section-light section-grid" id="faq">
        <div class="container">
            <div class="section-tag">FAQ</div>
            <h2 class="section-title section-title-left">よくある質問</h2>
            <p class="section-subtitle">生成AIを活用した新規事業開発に関するよくある質問にお答えします。</p>
            
            <div class="faq-list">
                <div class="faq-item">
                    <div class="faq-question">
                        <span>生成AIを活用した事業開発に必要なITスキルはどの程度必要ですか？</span>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>基本的なPC操作ができれば問題ありません。当社のワークショップでは、AIツールの使い方から丁寧に指導し、プロンプト作成などのスキルを身につけることができます。専門的なITスキルは必要ありません。</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>生成AIを活用すると、どのくらい開発期間が短縮されますか？</span>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>プロジェクトの内容によって異なりますが、従来の新規事業開発プロセスと比較して約3〜10倍のスピードアップが可能です。特に情報収集や初期のアイデア創出フェーズでは大幅な時間短縮を実現しています。</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>AIが出力したアイデアの著作権や知的財産権はどうなりますか？</span>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>当社のサービスを通じて生成されたアイデアや事業コンセプトの知的財産権はクライアント企業に帰属します。AI自体の出力に関しては、各AIサービスの利用規約に準拠しますが、当社では適切な利用方法を指導し、法的リスクを最小限に抑えます。</p>
                    </div>
                </div>
                <div class="faq-item">
                    <div class="faq-question">
                        <span>AIスプリントの具体的な進め方を教えてください</span>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>AIスプリントは、キックオフ→事業機会の発見（4週間）→事業コンセプトの創造（3週間）→Why us/Why now（3週間）→成長ストーリー（2週間）の流れで進みます。各フェーズでは生成AIを活用したリサーチや発散、収束を行い、週1回の定例会でフィードバックを重ねながら進行します。</p>
                    </div>
                </div>
            </div>
            
            <div class="mt-5 text-center">
                <a href="#contact" class="btn btn-primary">
                    その他の質問はこちら
                    <span class="btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </span>
                </a>
            </div>
        </div>
      </section>
    `;
  }
}

customElements.define('faq-component', FAQ);
