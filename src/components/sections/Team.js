class Team extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Team members data
    const teamMembers = [
      {
        image: 'assets/images/NEWh_Koike.jpg',
        alt: '小池祐介',
        role: 'DIRECTOR',
        name: '小池祐介',
        bio: 'アサヒビールやデジタルマーケティング会社での経験を経て、イノベーションデザインコンサルティングファームWHITE Inc.にて、ビジネスデザインの専門知識を活かし、大企業向けの新規事業開発支援モデルを事業化。2021年1月、新たな挑戦としてNEWh Inc.を創業し、取締役に就任。'
      },
      {
        image: 'assets/images/iino.jpeg',
        alt: '飯野希',
        role: 'BUSINESS DESIGNER',
        name: '飯野希',
        bio: '新卒でメーカーにて、ユーザビリティエンジニアとしてHCDの啓蒙活動に従事。その後、スタートアップにて、新規事業立ち上げ・グロース・子会社化を連続で行う。AIニュースメディア『Ledge.ai』、社内コミュニケーションSaaS『ourly』などを生み出し、執行役員として事業を牽引。'
      },
      {
        image: 'assets/images/NEWh_Furukawa.jpg',
        alt: '古川亮太郎',
        role: 'SERVICE DESIGNER',
        name: '古川亮太朗',
        bio: 'デジタル広告会社にて、インターネットの文脈とテクノロジーを掛け合わせた広告プロモーションを企画するクリエイティブプランナーに従事。その後、デザインコンサルティングファームに参画し、サービスデザイナーとして企業の新規事業開発支援、自社サービスの開発/グロース業務を担当。'
      },
      {
        image: 'assets/images/NEWh_Okamoto.jpg',
        alt: '岡本あかね',
        role: 'PROJECT DESIGNER',
        name: '岡本あかね',
        bio: 'デザイン思考的アプローチで住民参加型のプロジェクトを実践するデザインチームに2014年4月より参画。2018年10月にデザインコンサルティングファームへ移り、企業の事業開発・サービス開発をプロジェクトマネージャーとして支援。2021年1月より現職に就く。'
      }
    ];
    
    // Clear existing content
    this.innerHTML = '';
    
    // Create section
    const section = document.createElement('section');
    section.className = 'section section-dark';
    section.id = 'team';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create section tag
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag section-tag-light';
    sectionTag.textContent = 'TEAM';
    container.appendChild(sectionTag);
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'section-title section-title-light';
    title.textContent = 'EXPERTS';
    container.appendChild(title);
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'section-subtitle section-subtitle-light';
    subtitle.textContent = '多様なバックグラウンドを持つ専門家が集まり、生成AIを活用した新規事業開発を支援します。';
    container.appendChild(subtitle);
    
    // Create grid
    const grid = document.createElement('div');
    grid.className = 'grid grid-2';
    
    // Create team cards
    teamMembers.forEach(member => {
      const card = this.createTeamCard(member);
      grid.appendChild(card);
    });
    container.appendChild(grid);
    
    // Create CTA container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'mt-5 text-center';
    
    const ctaLink = document.createElement('a');
    ctaLink.href = '#contact';
    ctaLink.className = 'btn btn-primary';
    ctaLink.textContent = 'お問い合わせ →';
    
    ctaContainer.appendChild(ctaLink);
    container.appendChild(ctaContainer);
    
    section.appendChild(container);
    this.appendChild(section);
  }
  
  createTeamCard(member) {
    const card = document.createElement('div');
    card.className = 'card team-card';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    // Image container
    const imgContainer = document.createElement('div');
    imgContainer.className = 'team-img-container';
    
    const img = document.createElement('img');
    img.setAttribute('data-lazy', member.image);
    img.alt = member.alt;
    img.className = 'team-img lazy-image';
    imgContainer.appendChild(img);
    cardBody.appendChild(imgContainer);
    
    // Info container
    const info = document.createElement('div');
    info.className = 'team-info';
    
    // Header
    const header = document.createElement('div');
    header.className = 'team-header';
    
    const role = document.createElement('span');
    role.className = 'team-role';
    role.textContent = member.role;
    header.appendChild(role);
    
    const name = document.createElement('h3');
    name.className = 'team-name';
    name.textContent = member.name;
    header.appendChild(name);
    
    info.appendChild(header);
    
    // Bio
    const bio = document.createElement('p');
    bio.className = 'team-bio';
    bio.textContent = member.bio;
    info.appendChild(bio);
    
    cardBody.appendChild(info);
    card.appendChild(cardBody);
    
    return card;
  }
}

customElements.define('team-component', Team);
