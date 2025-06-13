class Hero extends HTMLElement {
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
  
  // WebGLアニメーションの初期化
  initWebGLAnimation() {
    // WebGLが利用可能かチェック
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    // 簡易的なアニメーションを実装（実際のプロジェクトではThree.jsなどを使用）
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // キャンバスサイズをウィンドウに合わせる
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // パーティクルの設定
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: '#800020', // バーガンディカラー
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
      });
    }
    
    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);
      
      // キャンバスをクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // パーティクルを描画
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // パーティクルを移動
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // 画面外に出たら反対側から再登場
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // パーティクル同士を線で結ぶ
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(128, 0, 32, ${0.2 * (1 - distance / 100)})`; // バーガンディカラー
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
  }
  
  // コンポーネントをレンダリングする関数
  render() {
    // innerHTMLの代わりに安全なDOM操作を使用
    this.innerHTML = ''; // 既存のコンテンツをクリア
    
    const section = document.createElement('section');
    section.className = 'hero';
    section.id = 'home';
    // ビデオ背景の作成
    const videoBackground = document.createElement('div');
    videoBackground.className = 'video-background';
    
    const video = document.createElement('video');
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    
    const source = document.createElement('source');
    source.src = 'assets/images/ main-image.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
    
    const fallbackImg = document.createElement('img');
    fallbackImg.src = 'assets/images/main-image.png';
    fallbackImg.alt = 'AI Innovation Node ビジュアル';
    video.appendChild(fallbackImg);
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    videoBackground.appendChild(video);
    videoBackground.appendChild(overlay);
    section.appendChild(videoBackground);
    
    // メインコンテンツの作成
    const container = document.createElement('div');
    container.className = 'container';
    
    const heroContent = document.createElement('div');
    heroContent.className = 'hero-content';
    
    const heroTitle = document.createElement('h1');
    heroTitle.className = 'hero-title';
    heroTitle.innerHTML = '生成AIで<br>新規事業開発を<br>革新する';
    
    const heroSubtitle = document.createElement('p');
    heroSubtitle.className = 'hero-subtitle';
    heroSubtitle.textContent = 'NEWhの新規事業開発ノウハウと最新AI技術の融合で、10倍速い開発と100倍の選択肢から未来の可能性を発散させます';
    // ボタングループの作成
    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';
    
    // お問い合わせボタン
    const contactBtn = document.createElement('a');
    contactBtn.href = '#contact';
    contactBtn.className = 'btn btn-primary';
    contactBtn.textContent = 'お問い合わせ';
    
    const contactIcon = document.createElement('span');
    contactIcon.className = 'btn-icon';
    contactIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>`;
    contactBtn.appendChild(contactIcon);
    
    // 資料ダウンロードボタン
    const downloadBtn = document.createElement('a');
    downloadBtn.href = '#';
    downloadBtn.className = 'btn btn-secondary btn-download-white';
    downloadBtn.textContent = '資料ダウンロード';
    
    const downloadIcon = document.createElement('span');
    downloadIcon.className = 'btn-icon';
    downloadIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>`;
    downloadBtn.appendChild(downloadIcon);
    
    btnGroup.appendChild(contactBtn);
    btnGroup.appendChild(downloadBtn);
    
    heroContent.appendChild(heroTitle);
    heroContent.appendChild(heroSubtitle);
    heroContent.appendChild(btnGroup);
    container.appendChild(heroContent);
    section.appendChild(container);
    
    // スクロールインジケーターの作成
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'hero__scroll-indicator';
    
    const line = document.createElement('span');
    line.className = 'line';
    
    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = 'スクロール';
    
    scrollIndicator.appendChild(line);
    scrollIndicator.appendChild(text);
    section.appendChild(scrollIndicator);
    
    // 記事ローテーション表示の作成
    const insightCarousel = document.createElement('div');
    insightCarousel.className = 'hero-insight-carousel';
    
    const insightContainer = document.createElement('div');
    insightContainer.className = 'hero-insight-container';
    
    const insightSlides = document.createElement('div');
    insightSlides.className = 'hero-insight-slides';
    
    // スライドの作成
    this.articleData.forEach((article, index) => {
      const slide = document.createElement('div');
      slide.className = 'hero-insight-slide';
      if (index === 0) slide.classList.add('active');
      
      const embed = document.createElement('div');
      embed.className = 'hero-insight-embed';
      
      const iframe = document.createElement('iframe');
      iframe.className = 'note-embed';
      iframe.src = `https://note.com/embed/notes/${article.noteId}`;
      iframe.style.cssText = 'border: 0; display: block; max-width: 100%; width: 100%; padding: 0px; margin: 0px; position: static; visibility: visible;';
      iframe.height = '200';
      
      embed.appendChild(iframe);
      slide.appendChild(embed);
      insightSlides.appendChild(slide);
    });
    
    // ドットインジケーターの作成
    const insightDots = document.createElement('div');
    insightDots.className = 'hero-insight-dots';
    
    this.articleData.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'hero-insight-dot';
      if (index === 0) dot.classList.add('active');
      insightDots.appendChild(dot);
    });
    
    insightContainer.appendChild(insightSlides);
    insightContainer.appendChild(insightDots);
    insightCarousel.appendChild(insightContainer);
    section.appendChild(insightCarousel);
    
    // セクションをこのコンポーネントに追加
    this.appendChild(section);
    
    // 記事のローテーション機能を初期化
    this.initInsightCarousel();
  }
  
  initInsightCarousel() {
    // 現在のスライドインデックス
    let currentSlideIndex = 0;
    
    // 要素の取得
    const slides = document.querySelectorAll('.hero-insight-slide');
    const dots = document.querySelectorAll('.hero-insight-dot');
    
    if (!slides.length || !dots.length) return;
    
    // 自動ローテーション用のタイマー
    const rotationInterval = 5000; // 5秒ごとに切り替え
    
    // スライドを切り替える関数
    const showSlide = (index) => {
      // 現在のスライドとドットから active クラスを削除
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // 新しいスライドとドットに active クラスを追加
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // 現在のインデックスを更新
      currentSlideIndex = index;
    };
    
    // ドットクリックイベントの設定
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // 自動ローテーション
    const intervalId = setInterval(() => {
      let nextIndex = (currentSlideIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, rotationInterval);
    
    // コンポーネントが削除されたときにインターバルをクリア
    this.addEventListener('disconnected', () => {
      clearInterval(intervalId);
    });
  }
}

customElements.define('hero-component', Hero);
