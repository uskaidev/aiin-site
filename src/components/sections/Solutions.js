class Solutions extends HTMLElement {
  constructor() {
    super();
    this.solutions = [
      {
        id: 'strategy',
        category: 'Strategy',
        title: '高速かつ多角的な新規事業戦略設計',
        subtitle: '「戦略AIスプリント」',
        overview: '従来の戦略策定プロセスを根本から変革します。市場調査からメガトレンド分析、競合評価まで、AIが膨大なデータを迅速に処理・分析し、人間の創造性とAIの処理能力の最適な組み合わせにより、戦略立案の質とスピードを両立させます。',
        benefits: [
          {
            title: '時間効率の革新',
            description: '従来数ヶ月かかる戦略策定プロセスを最短2ヶ月に短縮'
          },
          {
            title: '多角的視点の獲得',
            description: 'AIが100倍以上の選択肢から多様な視点を提供し、盲点を減少'
          },
          {
            title: 'データ駆動の意思決定',
            description: 'リアルタイムでの市場データ分析により、より確実な意思決定が可能に'
          },
          {
            title: '戦略の再現性向上',
            description: '標準化されたプロンプトとフレームワークにより、戦略策定プロセスを再現可能に'
          }
        ],
        tags: ['メガトレンド調査・分析', '競合分析・ポジショニング', '戦略テーマの立案', 'ロードマップ', 'シナリオプランニング'],
        caseStudy: '広告会社の事例: メガトレンドと社内アセットを組み合わせ、生成AIを活用して45の事業方向性を策定。人間によるインタビューとAIによる調査・アイディエーションを組み合わせ、短期間でアセットの整理から戦略策定まで実施。大量のアイデアを整理し、会社としての戦略を2ヶ月でまとめ上げました。',
        icon: 'fa-chart-line',
        color: 'var(--accent-burgundy)'
      },
      {
        id: 'business-concept',
        category: 'Business Concept',
        title: 'アイデアを事業構想への高速で昇華する',
        subtitle: '「新規事業AIスプリント」',
        overview: '生成AIと人間のクリエイティビティを最適に融合させ、革新的な事業コンセプトを生み出すソリューション。AIによる迅速な市場分析とアイデア生成、そして人間による洞察と判断を組み合わせることで、短期間で高解像度の事業コンセプトを構築します。',
        benefits: [
          {
            title: 'アイデア発散の飛躍的拡大',
            description: 'AIがパターン認識を活用し、人間だけでは思いつかない組み合わせを提案'
          },
          {
            title: '即時フィードバック',
            description: 'コンセプト案に対するAIによる即時評価で素早い改善サイクルを実現'
          },
          {
            title: '効率的な検証',
            description: '複数のビジネスモデル案を同時に評価・比較し、最適解を効率的に導出'
          },
          {
            title: '説得力のある事業コンセプト',
            description: 'データに基づいた客観的な評価により社内合意形成を加速'
          }
        ],
        tags: ['ビジネスコンセプト創出', '課題検証ワークショップ', '収益モデル設計', 'Why us/Why now分析', '成長ストーリー構築'],
        caseStudy: '印刷会社の事例: 1.5ヶ月という短期間で新規事業の市場調査から事業構想までを実施。生成AIを活用し、情報量、選択肢の量と期間というトレードオフを突破。プロジェクトの各工程でリサーチ、発散、収束、評価のプロンプトをNEWhが作成し、AIがラフ案を生成。人間がそれをブラッシュアップして議論することで、短期間での質の高い事業構想を実現しました。',
        icon: 'fa-lightbulb',
        color: 'var(--accent-teal)'
      },
      {
        id: 'prototype',
        category: 'Prototype',
        title: '迅速かつ高精度な事業検証',
        subtitle: '「AIプロトタイピング」',
        overview: '事業アイデアを素早く形にし、市場での検証を加速するためのAI活用ソリューション。生成AIを活用したユーザーニーズの分析、プロトタイプの作成から検証まで、最小限のリソースで最大の学びを得られるプロセスを提供します。',
        benefits: [
          {
            title: 'プロトタイプ開発の迅速化',
            description: 'AIが複数のプロトタイプ案を短時間で生成し、開発期間を大幅に短縮'
          },
          {
            title: 'ユーザーフィードバックの効率的分析',
            description: '収集したフィードバックをAIが分析し、改善点を抽出'
          },
          {
            title: 'インタビューの効率化',
            description: 'ユーザー、エキスパートなど時間がかかるインタビューを仮想で実施し効率化'
          },
          {
            title: 'イテレーションの高速化',
            description: 'AIが改善案を提案することで、プロトタイプの進化速度を向上'
          }
        ],
        tags: ['ラピッドプロトタイピング', '仮想インタビュー（ユーザー、エキスパート）', 'フィードバック分析', 'MVPデザイン支援'],
        caseStudy: '飲料メーカーの事例: 製品の海外展開を狙うプロジェクトにおいて、アメリカ市場の状況を生成AIを活用しながら調査。アイデア作成にも生成AIを活用し、30近くのアイデアを1.5ヶ月で作成、3つに絞り込んで社内に提案。生成AIを活用して普段は数ヶ月かかるプロセスを短期化し、次回以降も社内で短期プロジェクトに対応できるよう、生成AIのスキルトランスファーも実施しました。',
        icon: 'fa-rocket',
        color: 'var(--accent-amber)'
      },
      {
        id: 'workshop',
        category: 'Workshop',
        title: 'イノベーションスキルの実践的習得',
        subtitle: '「生成AI活用ワークショップ」',
        overview: '生成AIを活用した事業開発手法を実践的に習得できるワークショップ。基礎的な生成AIの使い方から、事業開発における具体的な活用シーンまで、手を動かしながら学ぶことで、明日からすぐに業務に活かせるスキルを提供します。',
        benefits: [
          {
            title: '業務効率の即時向上',
            description: 'ワークショップで学んだスキルをすぐに実務に適用可能'
          },
          {
            title: '組織的AIリテラシーの向上',
            description: '実践を通じて組織全体のAI活用能力を高める'
          },
          {
            title: '創造的思考の拡張',
            description: 'AIとのコラボレーションによる創造的思考力の向上'
          },
          {
            title: 'チーム内イノベーション文化の醸成',
            description: 'AIを活用した新たな働き方の浸透'
          }
        ],
        tags: ['オープンセミナー (全社員向け)', '実践型ワークショップ (選抜メンバー向け)', 'リスキリング研修プログラム', 'AI活用カタリスト育成'],
        caseStudy: '新規事業担当者向け生成AIセミナー: 約90名が参加し、満足度100%を達成。生成AIの基礎から事業開発での活用方法まで、実践的な内容を提供。参加者からは「プロンプト作成のコツ」「事業開発アイデア探索への活用方法」など、具体的な知識が得られたという声が多数寄せられました。生成AIを使いこなすための実践的スキルを習得し、業務に即適用できる内容が好評でした。',
        icon: 'fa-users-gear',
        color: 'var(--navy-700)'
      },
      {
        id: 'tool-build',
        category: 'Tool Build',
        title: '新規事業創出プロセスの自動化・効率化',
        subtitle: '「生成AIツール開発」',
        overview: '生成AIを活用した新規事業開発プロセスを効率化・標準化するためのツール開発ソリューション。プロンプトエンジニアリングからワークフロー自動化まで、企業の新規事業開発を加速する専用ツールを提供します。',
        benefits: [
          {
            title: '開発プロセスの標準化',
            description: 'AIツールにより組織内の事業開発プロセスが統一され、品質が安定'
          },
          {
            title: '知識の蓄積と活用',
            description: '過去の事業開発の知見をAIが学習し、次のプロジェクトに活用'
          },
          {
            title: 'リソース最適化',
            description: 'ルーティン作業の自動化により、創造的タスクにリソースを集中'
          },
          {
            title: 'スケーラビリティの向上',
            description: 'AIツールにより、同時進行する複数のプロジェクト管理が容易に'
          }
        ],
        tags: ['プロンプトライブラリ開発', 'AI活用フレームワーク構築', 'ステージゲート評価システム', '事業創出プロセス最適化ツール', '新規事業AIスプリントシステム'],
        caseStudy: '機械メーカーの事例: 新規事業アイデアを客観的に評価するためのプロンプト、ワークフローの設計。現状を分析し、生成AI、人間／ワークフローのどちらで解決していくべき課題であるかを議論しました。プロンプトを設計し、反復テストを実施することで、企業にとって最適な生成AIツールを開発しました。',
        icon: 'fa-gears',
        color: 'var(--accent-teal-light)'
      }
    ];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    // Clear existing content
    this.innerHTML = '';
    
    // Create section
    const section = document.createElement('section');
    section.className = 'section section-light';
    section.id = 'solutions';
    
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
    
    // Create solutions grid
    const solutionsGrid = document.createElement('div');
    solutionsGrid.className = 'solutions-grid';
    
    // Add solution cards
    this.solutions.forEach((solution, index) => {
      const card = this.createSolutionCard(solution, index);
      solutionsGrid.appendChild(card);
    });
    container.appendChild(solutionsGrid);
    
    // Create modal
    const modal = this.createModal();
    container.appendChild(modal);
    
    section.appendChild(container);
    this.appendChild(section);
  }

  createSolutionCard(solution, index) {
    const card = document.createElement('div');
    card.className = `solution-card animate-in animate-delay-${index + 1}`;
    card.setAttribute('data-solution-id', solution.id);
    
    const category = document.createElement('div');
    category.className = 'solution-category';
    category.textContent = solution.category;
    card.appendChild(category);
    
    const subtitle = document.createElement('h3');
    subtitle.className = 'solution-subtitle-large';
    subtitle.textContent = solution.subtitle.replace(/「|」/g, '');
    card.appendChild(subtitle);
    
    const title = document.createElement('h4');
    title.className = 'solution-title-small';
    title.textContent = solution.title;
    card.appendChild(title);
    
    const button = document.createElement('button');
    button.className = 'solution-detail-btn';
    button.setAttribute('data-solution-id', solution.id);
    button.textContent = '詳細を見る';
    card.appendChild(button);
    
    return card;
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'solution-modal';
    modal.id = 'solution-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'solution-modal-content';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'solution-modal-close';
    closeButton.setAttribute('aria-label', '閉じる');
    
    const closeIcon = document.createElement('i');
    closeIcon.className = 'fas fa-times';
    closeButton.appendChild(closeIcon);
    modalContent.appendChild(closeButton);
    
    const modalBody = document.createElement('div');
    modalBody.className = 'solution-modal-body';
    modalContent.appendChild(modalBody);
    
    modal.appendChild(modalContent);
    return modal;
  }
  
  renderModalContent(solution) {
    const container = document.createElement('div');
    
    // Category
    const category = document.createElement('div');
    category.className = 'solution-modal-category';
    category.textContent = solution.category;
    container.appendChild(category);
    
    // Subtitle
    const subtitle = document.createElement('h3');
    subtitle.className = 'solution-modal-subtitle-large';
    subtitle.textContent = solution.subtitle.replace(/「|」/g, '');
    container.appendChild(subtitle);
    
    // Title
    const title = document.createElement('h4');
    title.className = 'solution-modal-title-small';
    title.textContent = solution.title;
    container.appendChild(title);
    
    // Overview section
    const overviewSection = document.createElement('div');
    overviewSection.className = 'solution-modal-section';
    
    const overviewTitle = document.createElement('h5');
    overviewTitle.className = 'solution-modal-section-title';
    overviewTitle.textContent = '概要';
    overviewSection.appendChild(overviewTitle);
    
    const overviewText = document.createElement('p');
    overviewText.textContent = solution.overview;
    overviewSection.appendChild(overviewText);
    container.appendChild(overviewSection);
    
    // Benefits section
    const benefitsSection = document.createElement('div');
    benefitsSection.className = 'solution-modal-section';
    
    const benefitsTitle = document.createElement('h5');
    benefitsTitle.className = 'solution-modal-section-title';
    benefitsTitle.textContent = '生成AIの活用メリット';
    benefitsSection.appendChild(benefitsTitle);
    
    const benefitsList = document.createElement('ul');
    benefitsList.className = 'solution-benefits-list';
    
    solution.benefits.forEach(benefit => {
      const li = document.createElement('li');
      const strong = document.createElement('strong');
      strong.textContent = benefit.title + ':';
      li.appendChild(strong);
      li.appendChild(document.createTextNode(' ' + benefit.description));
      benefitsList.appendChild(li);
    });
    benefitsSection.appendChild(benefitsList);
    container.appendChild(benefitsSection);
    
    // Tags section
    const tagsSection = document.createElement('div');
    tagsSection.className = 'solution-modal-section';
    
    const tagsTitle = document.createElement('h5');
    tagsTitle.className = 'solution-modal-section-title';
    tagsTitle.textContent = 'カテゴリ';
    tagsSection.appendChild(tagsTitle);
    
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'solution-tags';
    
    solution.tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.className = 'solution-tag';
      tagSpan.textContent = tag;
      tagsContainer.appendChild(tagSpan);
    });
    tagsSection.appendChild(tagsContainer);
    container.appendChild(tagsSection);
    
    // Case study section
    const caseSection = document.createElement('div');
    caseSection.className = 'solution-modal-section';
    
    const caseTitle = document.createElement('h5');
    caseTitle.className = 'solution-modal-section-title';
    caseTitle.textContent = '事例';
    caseSection.appendChild(caseTitle);
    
    const caseText = document.createElement('p');
    caseText.textContent = solution.caseStudy;
    caseSection.appendChild(caseText);
    container.appendChild(caseSection);
    
    return container;
  }

  setupEventListeners() {
    // カードクリックイベント
    const solutionCards = this.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // 詳細ボタンをクリックした場合は、ボタンのイベントハンドラに任せる
        if (e.target.classList.contains('solution-detail-btn')) {
          return;
        }
        
        const solutionId = card.getAttribute('data-solution-id');
        this.openModal(solutionId);
      });
    });
    
    // 詳細ボタンクリックイベント
    const detailButtons = this.querySelectorAll('.solution-detail-btn');
    detailButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const solutionId = button.getAttribute('data-solution-id');
        this.openModal(solutionId);
      });
    });
    
    // モーダル閉じるボタンイベント
    const closeButton = this.querySelector('.solution-modal-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeModal();
      });
    }
    
    // モーダル外クリックで閉じる
    const modal = this.querySelector('.solution-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  openModal(solutionId) {
    const solution = this.solutions.find(s => s.id === solutionId);
    if (!solution) return;
    
    const modalBody = this.querySelector('.solution-modal-body');
    // Clear existing content
    modalBody.innerHTML = '';
    
    // Add new content
    const content = this.renderModalContent(solution);
    modalBody.appendChild(content);
    
    const modal = this.querySelector('.solution-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // スクロール防止
  }

  closeModal() {
    const modal = this.querySelector('.solution-modal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // スクロール再開
  }
}

customElements.define('solutions-component', Solutions);
