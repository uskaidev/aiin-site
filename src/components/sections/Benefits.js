class Benefits extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Benefits data
    const benefits = [
      {
        title: 'RAPID DEVELOPMENT',
        description: '情報収集・分析・発散が瞬時に行えます。プロセスの大幅な短縮と効率化を実現します。従来の方法と比較して最大10倍のスピードアップが可能です。',
        delay: 1
      },
      {
        title: 'MULTI-PERSPECTIVE FEEDBACK',
        description: '生成AIにより多角的な視点と即時のフィードバックが提供され、品質と適応性の向上につながります。多様な視点からのアイデア検証が可能になります。',
        delay: 2
      },
      {
        title: 'CREATIVE AUTONOMY',
        description: 'AIとの協働による膨大な"経験"の蓄積が創造的思考力の自律的な育成に貢献します。チームの創造性と問題解決能力が飛躍的に向上します。',
        delay: 3
      },
      {
        title: 'REPRODUCIBLE INNOVATION',
        description: 'フレームワークとプロンプトの標準化が新規事業開発の組織的な再現性を高めます。成功パターンを組織全体で共有し、スケールすることが可能になります。',
        delay: 4
      }
    ];
    
    // Clear existing content
    this.innerHTML = '';
    
    // Create section
    const section = document.createElement('section');
    section.className = 'section section-dark';
    section.id = 'benefits';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create section tag
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag section-tag-light';
    sectionTag.textContent = 'BENEFITS';
    container.appendChild(sectionTag);
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'section-title section-title-light';
    title.textContent = 'ADVANTAGES';
    container.appendChild(title);
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'section-subtitle section-subtitle-light';
    subtitle.textContent = '生成AIを活用することで新規事業開発がより早く、より広く、より深く';
    container.appendChild(subtitle);
    
    // Create grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-2';
    
    // Create benefit cards
    benefits.forEach(benefit => {
      const card = this.createBenefitCard(benefit);
      grid.appendChild(card);
    });
    container.appendChild(grid);
    
    // Create CTA container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'mt-5 text-center';
    
    const ctaLink = document.createElement('a');
    ctaLink.href = '#services';
    ctaLink.className = 'btn btn-primary';
    ctaLink.textContent = 'EXPLORE SERVICES';
    
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
  
  createBenefitCard(benefit) {
    const card = document.createElement('div');
    card.className = `card card-dark benefit-card animate-in animate-delay-${benefit.delay}`;
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const title = document.createElement('h3');
    title.textContent = benefit.title;
    cardBody.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = benefit.description;
    cardBody.appendChild(description);
    
    card.appendChild(cardBody);
    return card;
  }
}

customElements.define('benefits-component', Benefits);
