class About extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = ''; // 既存のコンテンツをクリア
    
    // セクション要素の作成
    const section = document.createElement('section');
    section.className = 'section section-light';
    section.id = 'about';
    const container = document.createElement('div');
    container.className = 'container';
    
    const sectionTag = document.createElement('div');
    sectionTag.className = 'section-tag';
    sectionTag.textContent = 'ABOUT';
    
    const sectionTitle = document.createElement('h2');
    sectionTitle.className = 'section-title section-title-left';
    sectionTitle.textContent = 'AI innovation node';
    const gridAsymmetric = document.createElement('div');
    gridAsymmetric.className = 'grid grid-asymmetric';
    
    const textContent = document.createElement('div');
    
    const h3 = document.createElement('h3');
    h3.textContent = '生成AIを活用した新規事業開発の専門チーム';
    textContent.appendChild(h3);
    
    const p1 = document.createElement('p');
    p1.textContent = 'AI Innovation Nodeは、NEWhが長年培ってきた新規事業開発のノウハウとAI技術を融合させ、新規事業開発プロセスを革新的に加速・進化させる専門組織です。';
    textContent.appendChild(p1);
    
    const p2 = document.createElement('p');
    p2.textContent = 'ビジネスストラテジスト、サービスデザイナー、プロジェクトマネージャーなど、多様な専門家が集結し、最新AI技術を駆使した新規事業開発支援サービスを提供いたします。';
    textContent.appendChild(p2);
    
    const p3 = document.createElement('p');
    p3.textContent = '複雑化する事業環境において、生成AIの活用でより早く、より広く、より深い事業構想を実現します。生成AIと人間の最適なコラボレーションにより、革新的なビジネスを創出します。';
    textContent.appendChild(p3);
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'mt-2';
    
    const serviceBtn = document.createElement('a');
    serviceBtn.href = '#solutions';
    serviceBtn.className = 'btn btn-primary';
    serviceBtn.textContent = 'サービスを見る';
    
    const btnIcon = document.createElement('span');
    btnIcon.className = 'btn-icon';
    btnIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>`;
    serviceBtn.appendChild(btnIcon);
    buttonDiv.appendChild(serviceBtn);
    textContent.appendChild(buttonDiv);
    
    const imageDiv = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('data-lazy', 'assets/images/main-image.png');
    img.alt = 'AI Innovation Node チーム';
    img.className = 'lazy-image';
    img.style.cssText = 'width: 100%; height: 100%; object-fit: contain;';
    imageDiv.appendChild(img);
    
    gridAsymmetric.appendChild(textContent);
    gridAsymmetric.appendChild(imageDiv);
    
    const mt5Div = document.createElement('div');
    mt5Div.className = 'mt-5';
    
    const highlightGrid = document.createElement('div');
    highlightGrid.className = 'highlight-grid';
    
    // パートナー企業
    const item1 = document.createElement('div');
    item1.className = 'highlight-item highlight-item-1 animate-in animate-delay-1';
    
    const tag1 = document.createElement('div');
    tag1.className = 'highlight-tag';
    tag1.textContent = 'パートナー企業';
    
    const number1 = document.createElement('h2');
    number1.className = 'highlight-number';
    number1.innerHTML = '実績<br>150+';
    
    const text1 = document.createElement('p');
    text1.className = 'highlight-text';
    text1.textContent = 'Sony、Asahi、TOYOTA、docomoなど業界リーダー企業との協業実績。製造業、金融、IT、小売などの多様な業界トップ企業と新規事業開発に取り組み、イノベーションと事業変革を共に実現してきました。';
    
    item1.appendChild(tag1);
    item1.appendChild(number1);
    item1.appendChild(text1);
    
    // 顧客満足度
    const item2 = document.createElement('div');
    item2.className = 'highlight-item highlight-item-2 animate-in animate-delay-2';
    
    const tag2 = document.createElement('div');
    tag2.className = 'highlight-tag';
    tag2.textContent = '顧客推奨度';
    
    const number2 = document.createElement('h2');
    number2.className = 'highlight-number';
    number2.textContent = 'NPS® 50+';
    
    const text2 = document.createElement('p');
    text2.className = 'highlight-text';
    text2.textContent = '日本平均が0〜-20、業界平均が-30〜-40の中で圧倒的な満足度を実現。「伴走型で考える力を引き出していただきました」「提案を具体化する最適なプロセス・手法が採用できた」など、高い評価をいただいています。';
    
    item2.appendChild(tag2);
    item2.appendChild(number2);
    item2.appendChild(text2);
    
    // 革新的アプローチ
    const item3 = document.createElement('div');
    item3.className = 'highlight-item highlight-item-3 animate-in animate-delay-3';
    
    const tag3 = document.createElement('div');
    tag3.className = 'highlight-tag';
    tag3.textContent = 'アプローチ';
    
    const number3 = document.createElement('h2');
    number3.className = 'highlight-number';
    number3.textContent = '生成AI主導';
    
    const text3 = document.createElement('p');
    text3.className = 'highlight-text';
    text3.textContent = '生成AIにより、新規事業開発がより早く、より広く、より深く進化。当社独自の10倍速い開発プロセスと100倍の選択肢から事業構想を創出するアプローチが、クライアントのイノベーションを加速させています。';
    
    item3.appendChild(tag3);
    item3.appendChild(number3);
    item3.appendChild(text3);
    
    // 共創の哲学
    const item4 = document.createElement('div');
    item4.className = 'highlight-item highlight-item-4 animate-in animate-delay-4';
    
    const tag4 = document.createElement('div');
    tag4.className = 'highlight-tag';
    tag4.textContent = '共創理念';
    
    const number4 = document.createElement('h2');
    number4.className = 'highlight-number';
    number4.textContent = '論理的な確信';
    
    const text4 = document.createElement('p');
    text4.className = 'highlight-text';
    text4.textContent = '不確実な時代の新規事業で重要なのは「結論」ではなく「熱量」「推進力」そして「適応力」です。NEWhの独自フレームワークと柔軟なプロセス設計により、"自分たちで考え尽くす"経験を通じて確信を生み出し、事業の成功を支えます。';
    
    item4.appendChild(tag4);
    item4.appendChild(number4);
    item4.appendChild(text4);
    
    highlightGrid.appendChild(item1);
    highlightGrid.appendChild(item2);
    highlightGrid.appendChild(item3);
    highlightGrid.appendChild(item4);
    
    mt5Div.appendChild(highlightGrid);
    
    // すべての要素をコンテナに追加
    container.appendChild(sectionTag);
    container.appendChild(sectionTitle);
    container.appendChild(gridAsymmetric);
    container.appendChild(mt5Div);
    
    section.appendChild(container);
    this.appendChild(section);
  }
}

customElements.define('about-component', About);
