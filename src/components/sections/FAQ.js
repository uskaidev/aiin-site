class FAQ extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // FAQ data
    const faqs = [
      {
        question: '生成AIを活用した事業開発に必要なITスキルはどの程度必要ですか？',
        answer: '基本的なPC操作ができれば問題ありません。当社のワークショップでは、AIツールの使い方から丁寧に指導し、プロンプト作成などのスキルを身につけることができます。専門的なITスキルは必要ありません。'
      },
      {
        question: '生成AIを活用すると、どのくらい開発期間が短縮されますか？',
        answer: 'プロジェクトの内容によって異なりますが、従来の新規事業開発プロセスと比較して約3〜10倍のスピードアップが可能です。特に情報収集や初期のアイデア創出フェーズでは大幅な時間短縮を実現しています。'
      },
      {
        question: 'AIが出力したアイデアの著作権や知的財産権はどうなりますか？',
        answer: '当社のサービスを通じて生成されたアイデアや事業コンセプトの知的財産権はクライアント企業に帰属します。AI自体の出力に関しては、各AIサービスの利用規約に準拠しますが、当社では適切な利用方法を指導し、法的リスクを最小限に抑えます。'
      },
      {
        question: 'AIスプリントの具体的な進め方を教えてください',
        answer: 'AIスプリントは、キックオフ→事業機会の発見（4週間）→事業コンセプトの創造（3週間）→Why us/Why now（3週間）→成長ストーリー（2週間）の流れで進みます。各フェーズでは生成AIを活用したリサーチや発散、収束を行い、週1回の定例会でフィードバックを重ねながら進行します。'
      }
    ];
    
    // Clear existing content
    this.innerHTML = '';
    
    // Create section
    const section = document.createElement('section');
    section.className = 'section section-light';
    section.id = 'faq';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create section tag
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag';
    sectionTag.textContent = 'FAQ';
    container.appendChild(sectionTag);
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'section-title section-title-left';
    title.textContent = 'QUESTIONS';
    container.appendChild(title);
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'section-subtitle';
    subtitle.textContent = '生成AIを活用した新規事業開発に関するよくある質問にお答えします。';
    container.appendChild(subtitle);
    
    // Create FAQ list
    const faqList = document.createElement('div');
    faqList.className = 'faq-list';
    
    // Create FAQ items
    faqs.forEach(faq => {
      const item = this.createFAQItem(faq);
      faqList.appendChild(item);
    });
    container.appendChild(faqList);
    
    // Create CTA container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'mt-5 text-center';
    
    const ctaLink = document.createElement('a');
    ctaLink.href = '#contact';
    ctaLink.className = 'btn btn-primary';
    ctaLink.textContent = 'CONTACT US';
    
    const btnIcon = document.createElement('span');
    btnIcon.className = 'btn-icon';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '5');
    line.setAttribute('y1', '12');
    line.setAttribute('x2', '19');
    line.setAttribute('y2', '12');
    svg.appendChild(line);
    
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', '12 5 19 12 12 19');
    svg.appendChild(polyline);
    
    btnIcon.appendChild(svg);
    ctaLink.appendChild(btnIcon);
    ctaContainer.appendChild(ctaLink);
    container.appendChild(ctaContainer);
    
    section.appendChild(container);
    this.appendChild(section);
    
    // Setup FAQ interactions
    this.setupFAQInteractions();
  }
  
  createFAQItem(faq) {
    const item = document.createElement('div');
    item.className = 'faq-item';
    
    // Question
    const questionDiv = document.createElement('div');
    questionDiv.className = 'faq-question';
    
    const questionText = document.createElement('span');
    questionText.textContent = faq.question;
    questionDiv.appendChild(questionText);
    
    const toggle = document.createElement('span');
    toggle.className = 'faq-toggle';
    toggle.textContent = '+';
    questionDiv.appendChild(toggle);
    
    item.appendChild(questionDiv);
    
    // Answer
    const answerDiv = document.createElement('div');
    answerDiv.className = 'faq-answer';
    
    const answerPara = document.createElement('p');
    answerPara.textContent = faq.answer;
    answerDiv.appendChild(answerPara);
    
    item.appendChild(answerDiv);
    
    return item;
  }
  
  setupFAQInteractions() {
    const faqItems = this.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Toggle current item
        item.classList.toggle('active');
        
        // Close other items (accordion behavior)
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
      });
    });
  }
}

customElements.define('faq-component', FAQ);
