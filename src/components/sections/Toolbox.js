class Toolbox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Tools data
    const tools = [
      {
        icon: 'fa-magnifying-glass-chart',
        title: '業界トレンド調査',
        description: '業界とエリアを入力すると、業界トレンドが生成されます。\n事業開発初期に業界の全体感を把握するのに最適なツールです。',
        link: 'toolbox.html?tool=megatrend',
        delay: 1
      },
      {
        icon: 'fa-building-shield',
        title: '競合調査',
        description: '新規事業を検討している市場における競合を調査します。\n完全競合、代替競合、目的競合など様々なカテゴリの調査が可能です。',
        link: 'toolbox.html?tool=competitor',
        delay: 2
      },
      {
        icon: 'fa-table-cells',
        title: 'SWOT分析',
        description: '会社名と市場を入力すると、簡易のSWOT分析が提供されます。\n事業を検討している市場における自社の分析から戦略的な示唆が得られます。',
        link: 'toolbox.html?tool=swot',
        delay: 3
      },
      {
        icon: 'fa-lightbulb',
        title: '事業コンセプト発散',
        description: '会社名と想定顧客と課題を入力すると事業コンセプトが生成されます。\nさまざまな人物の発送方法からユニークはアイデアを発散します。',
        link: 'toolbox.html?tool=concept',
        delay: 4
      }
    ];
    
    // Clear existing content
    this.innerHTML = '';
    
    // Create section
    const section = document.createElement('section');
    section.id = 'toolbox';
    section.className = 'section toolbox-section';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create section tag
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag section-tag-light';
    sectionTag.textContent = 'RESOURCES';
    container.appendChild(sectionTag);
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'section-title section-title-light';
    title.textContent = 'TOOLBOX';
    container.appendChild(title);
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'section-subtitle section-subtitle-light';
    subtitle.textContent = '事業開発に活用できる生成AIを活用したツールを提供しています。ご自由にご活用ください。';
    container.appendChild(subtitle);
    
    // Create toolbox grid
    const toolboxGrid = document.createElement('div');
    toolboxGrid.className = 'toolbox-grid';
    
    // Create tool cards
    tools.forEach(tool => {
      const card = this.createToolCard(tool);
      toolboxGrid.appendChild(card);
    });
    container.appendChild(toolboxGrid);
    
    // Create CTA container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'mt-5 text-center';
    
    const ctaLink = document.createElement('a');
    ctaLink.href = 'toolbox.html';
    ctaLink.className = 'btn btn-primary';
    ctaLink.textContent = 'ツールボックスを確認 →';
    
    ctaContainer.appendChild(ctaLink);
    container.appendChild(ctaContainer);
    
    section.appendChild(container);
    this.appendChild(section);
  }
  
  createToolCard(tool) {
    const card = document.createElement('div');
    card.className = `tool-card animate-in animate-delay-${tool.delay}`;
    
    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.className = 'tool-icon';
    
    const icon = document.createElement('i');
    icon.className = `fas ${tool.icon}`;
    iconDiv.appendChild(icon);
    card.appendChild(iconDiv);
    
    // Title
    const title = document.createElement('h3');
    title.className = 'tool-title';
    title.textContent = tool.title;
    card.appendChild(title);
    
    // Description
    const description = document.createElement('p');
    description.className = 'tool-description';
    
    // Handle line breaks in description
    const descLines = tool.description.split('\n');
    descLines.forEach((line, index) => {
      if (index > 0) {
        description.appendChild(document.createElement('br'));
      }
      description.appendChild(document.createTextNode(line));
    });
    card.appendChild(description);
    
    // Link
    const link = document.createElement('a');
    link.href = tool.link;
    link.className = 'tool-link';
    link.textContent = '利用する';
    card.appendChild(link);
    
    return card;
  }
}

customElements.define('toolbox-component', Toolbox);
