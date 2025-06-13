class Cases extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Case studies data
    const cases = [
      {
        image: 'assets/images/yomiko.webp',
        alt: '株式会社読売広告社',
        tags: ['広告', '戦略AIスプリント'],
        title: '大手広告会社との新規事業戦略構築',
        description: 'メガトレンドと社内アセットを組み合わせ、生成AIベースで45の事業方向性を策定。大量のアイデアを絞り込み、会社としての戦略を2ヶ月でまとめあげました。'
      },
      {
        image: 'assets/images/dnp.jpeg',
        alt: '大日本印刷株式会社',
        tags: ['印刷', '新規事業AIスプリント'],
        title: '印刷会社の短期間事業構想',
        description: '1.5ヶ月という短期間で新規事業の市場調査から事業構想までを実施。生成AIを活用しながら、情報量、選択肢の量と期間というトレードオフを突破しました。'
      },
      {
        image: 'assets/images/asd.jpg',
        alt: '飲料メーカー',
        tags: ['飲料', 'グローバル商品企画'],
        title: '飲料メーカーのグローバル展開',
        description: '製品の海外展開を目指すプロジェクトで、アメリカ市場の状況を生成AIを活用して調査。30近くのアイデアを1.5ヶ月で作成し、3つに絞り込んで社内提案を実現しました。'
      }
    ];
    
    // Clear existing content
    this.innerHTML = '';
    
    // Create section
    const section = document.createElement('section');
    section.className = 'section section-dark';
    section.id = 'cases';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create section tag
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag section-tag-light';
    sectionTag.textContent = 'WORK';
    container.appendChild(sectionTag);
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'section-title section-title-light';
    title.textContent = 'CASE STUDIES';
    container.appendChild(title);
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'section-subtitle section-subtitle-light';
    subtitle.textContent = '様々な業界のクライアント企業と共に、生成AIを活用した新規事業開発を実現しています。';
    container.appendChild(subtitle);
    
    // Create grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-3';
    
    // Create case cards
    cases.forEach(caseData => {
      const card = this.createCaseCard(caseData);
      grid.appendChild(card);
    });
    container.appendChild(grid);
    
    // Create CTA container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'mt-5 text-center';
    
    const ctaLink = document.createElement('a');
    ctaLink.href = '#contact';
    ctaLink.className = 'btn btn-primary';
    ctaLink.textContent = 'お問い合わせ';
    
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
  }
  
  createCaseCard(caseData) {
    const card = document.createElement('div');
    card.className = 'case-card';
    
    // Image container
    const imgContainer = document.createElement('div');
    imgContainer.className = 'case-img-container';
    
    const img = document.createElement('img');
    img.setAttribute('data-lazy', caseData.image);
    img.alt = caseData.alt;
    img.className = 'case-img lazy-image';
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    
    // Content container
    const content = document.createElement('div');
    content.className = 'case-content';
    
    // Tags
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'case-tags';
    
    caseData.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'case-tag';
      tagSpan.textContent = tag;
      tagsContainer.appendChild(tagSpan);
    });
    content.appendChild(tagsContainer);
    
    // Title
    const caseTitle = document.createElement('h3');
    caseTitle.className = 'case-title';
    caseTitle.textContent = caseData.title;
    content.appendChild(caseTitle);
    
    // Description
    const description = document.createElement('p');
    description.className = 'case-description';
    description.textContent = caseData.description;
    content.appendChild(description);
    
    card.appendChild(content);
    return card;
  }
}

customElements.define('cases-component', Cases);
