class Insight extends HTMLElement {
  constructor() {
    super();
    // 記事のURLとIDのマッピング
    this.articleData = [
      {
        title: 'AIファーストの運用モデルへの変革',
        url: 'https://note.com/koike_newh/n/n584ec72e0860',
        noteId: 'n584ec72e0860'
      },
      {
        title: 'AIと人間の協働の未来',
        url: 'https://note.com/koike_newh/n/n3f48c8ee7f35',
        noteId: 'n3f48c8ee7f35'
      },
      {
        title: 'データ駆動型意思決定の重要性',
        url: 'https://note.com/nozomuiino/n/n73ee2853e6e3',
        noteId: 'n73ee2853e6e3'
      }
    ];
  }

  connectedCallback() {
    this.render();
    
    // note.comの埋め込みスクリプトを読み込む
    if (!document.querySelector('script[src="https://note.com/scripts/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://note.com/scripts/embed.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    }
  }
  
  // コンポーネントをレンダリングする関数
  render() {
    // Clear existing content
    this.innerHTML = '';
    
    // Create section
    const section = document.createElement('section');
    section.id = 'insight';
    section.className = 'section section-light';
    
    // Create container
    const container = document.createElement('div');
    container.className = 'container';
    
    // Create section tag
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag';
    sectionTag.textContent = 'INSIGHTS';
    container.appendChild(sectionTag);
    
    // Create title
    const title = document.createElement('h2');
    title.className = 'section-title section-title-left';
    title.textContent = 'インサイト＆ナレッジ';
    container.appendChild(title);
    
    // Create subtitle
    const subtitle = document.createElement('p');
    subtitle.className = 'section-subtitle';
    subtitle.textContent = '最新の知見と洞察を共有し、生成AIの可能性を探求します。';
    container.appendChild(subtitle);
    
    // Create main container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'insight-main-container';
    
    // Create left guide section
    const mainGuide = document.createElement('div');
    mainGuide.className = 'insight-main-guide';
    
    const guideContent = document.createElement('div');
    guideContent.className = 'insight-guide-content';
    
    const guideTitle = document.createElement('h2');
    guideTitle.className = 'insight-guide-title';
    guideTitle.textContent = '事業開発✕生成AI実践ガイド';
    guideContent.appendChild(guideTitle);
    
    const guideSubtitle = document.createElement('p');
    guideSubtitle.className = 'insight-guide-subtitle';
    guideSubtitle.textContent = '人間と生成AIの最適なコラボレーションを実現するための実践ガイド。新規事業開発プロセスを加速させる戦略とベストプラクティス。';
    guideContent.appendChild(guideSubtitle);
    
    const guideButton = document.createElement('a');
    guideButton.href = '#';
    guideButton.className = 'insight-guide-button';
    guideButton.textContent = 'ガイドを入手する';
    guideContent.appendChild(guideButton);
    
    mainGuide.appendChild(guideContent);
    
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'insight-guide-image-wrapper';
    
    const guideImage = document.createElement('img');
    guideImage.src = 'assets/images/guide.png';
    guideImage.alt = '事業開発✕生成AI実践ガイド';
    guideImage.className = 'insight-guide-image';
    imageWrapper.appendChild(guideImage);
    
    mainGuide.appendChild(imageWrapper);
    mainContainer.appendChild(mainGuide);
    
    // Create right prompt section
    const promptCollection = document.createElement('div');
    promptCollection.className = 'insight-prompt-collection';
    
    const promptTitle = document.createElement('h2');
    promptTitle.className = 'insight-prompt-title';
    promptTitle.textContent = '事業開発のためのシステムプロンプトライブラリ';
    promptCollection.appendChild(promptTitle);
    
    const promptButton = document.createElement('a');
    promptButton.href = 'prompt-library.html';
    promptButton.className = 'insight-guide-button';
    promptButton.textContent = 'プロンプトを探す';
    promptCollection.appendChild(promptButton);
    
    mainContainer.appendChild(promptCollection);
    container.appendChild(mainContainer);
    
    // Create insight grid
    const insightGrid = document.createElement('div');
    insightGrid.className = 'insight-grid';
    
    // Create article embeds
    this.articleData.forEach((article, index) => {
      const embedDiv = document.createElement('div');
      embedDiv.className = `insight-embed animate-in animate-delay-${index + 1}`;
      
      const iframe = document.createElement('iframe');
      iframe.className = 'note-embed';
      iframe.src = `https://note.com/embed/notes/${article.noteId}`;
      iframe.style.cssText = 'border: 0; display: block; max-width: 100%; width: 100%; padding: 0px; margin: 0px; position: static; visibility: visible;';
      iframe.height = '400';
      
      embedDiv.appendChild(iframe);
      insightGrid.appendChild(embedDiv);
    });
    container.appendChild(insightGrid);
    
    // Create CTA container
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'text-center mt-5';
    
    const ctaLink = document.createElement('a');
    ctaLink.href = 'https://note.com/newh_inc/m/m78d8ce75f8fd';
    ctaLink.className = 'btn btn-primary no-uppercase';
    ctaLink.target = '_blank';
    ctaLink.textContent = 'noteで記事を読む →';
    
    ctaContainer.appendChild(ctaLink);
    container.appendChild(ctaContainer);
    
    section.appendChild(container);
    this.appendChild(section);
  }
}

customElements.define('insight-component', Insight);
