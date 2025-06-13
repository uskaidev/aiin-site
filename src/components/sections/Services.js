class Services extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Services data
    const services = [
      {
        title: '新規事業AIスプリント',
        description: 'NEWhの100超のプロジェクト経験から得た事業構想ノウハウの生成AIとの融合。革新的なスプリントが、最短2ヶ月で解像度の高い事業構想を創出します。',
        items: [
          '事業機会の発見',
          '事業コンセプトの創造',
          'Why us / Why now',
          '成長ストーリー'
        ]
      },
      {
        title: '生成AIワークショップ',
        description: '生成AIの使用方法はもちろん、「どう事業に活用するか」までを手を動かしながら学ぶ2Daysのワークショップ。すぐに業務に活かせるのが特徴です。',
        items: [
          '基本的な生成AIの使い方実習',
          '市場分析セッション',
          '事業コンセプト発散',
          'アイデアの評価と改善'
        ]
      }
    ];
    
    // Clear existing content
    this.innerHTML = '';
    
    // Create section
    const section = document.createElement('section');
    section.className = 'section section-light';
    section.id = 'services';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create section tag
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag';
    sectionTag.textContent = 'SERVICES';
    container.appendChild(sectionTag);
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'section-title section-title-left';
    title.textContent = 'SOLUTIONS';
    container.appendChild(title);
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'section-subtitle';
    subtitle.textContent = '生成AIを活用した新規事業開発を支援するサービスを提供しています。';
    container.appendChild(subtitle);
    
    // Create grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-2';
    
    // Create service cards
    services.forEach(service => {
      const card = this.createServiceCard(service);
      grid.appendChild(card);
    });
    container.appendChild(grid);
    
    section.appendChild(container);
    this.appendChild(section);
  }
  
  createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    
    // Title
    const title = document.createElement('h3');
    title.className = 'service-title';
    title.textContent = service.title;
    card.appendChild(title);
    
    // Description
    const description = document.createElement('p');
    description.className = 'service-description';
    description.textContent = service.description;
    card.appendChild(description);
    
    // List
    const list = document.createElement('ul');
    list.className = 'service-list';
    
    service.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    card.appendChild(list);
    
    // CTA container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'mt-2';
    
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
    card.appendChild(ctaContainer);
    
    return card;
  }
}

customElements.define('services-component', Services);
