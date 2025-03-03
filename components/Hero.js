class Hero extends HTMLElement {
  constructor() {
    super();
    // 記事のURLリスト
    this.articleUrls = [
      'https://note.com/koike_newh/n/n584ec72e0860',
      'https://note.com/koike_newh/n/n3f48c8ee7f35',
      'https://note.com/nozomuiino/n/n73ee2853e6e3'
    ];
    
    // 記事データを保存する配列
    this.articleData = [
      { 
        title: 'AIファーストの運用モデルへの変革', 
        image: 'assets/images/main-image.png',
        url: this.articleUrls[0]
      },
      { 
        title: 'AIと人間の協働の未来', 
        image: 'assets/images/main-image.png',
        url: this.articleUrls[1]
      },
      { 
        title: 'データ駆動型意思決定の重要性', 
        image: 'assets/images/main-image.png',
        url: this.articleUrls[2]
      }
    ];
  }

  connectedCallback() {
    this.render();
    
    // OGPデータを取得
    this.fetchOgpData();
  }
  
  // OGPデータを取得する関数
  async fetchOgpData() {
    try {
      // 各記事のOGPデータを取得
      const promises = this.articleUrls.map(async (url, index) => {
        try {
          const response = await fetch(`/api/ogp?url=${encodeURIComponent(url)}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch OGP data: ${response.statusText}`);
          }
          
          const data = await response.json();
          
          // 記事データを更新
          if (data.title) this.articleData[index].title = data.title;
          if (data.image) this.articleData[index].image = data.image;
          
          return data;
        } catch (error) {
          console.error(`Error fetching OGP for ${url}:`, error);
          return null;
        }
      });
      
      // すべてのリクエストが完了するのを待つ
      const results = await Promise.all(promises);
      
      // 有効なデータがあれば再レンダリング
      if (results.some(result => result !== null)) {
        this.render();
        this.initInsightCarousel();
      }
    } catch (error) {
      console.error('Error fetching OGP data:', error);
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
    this.innerHTML = `
      <section class="hero" id="home">
        <div class="video-background">
            <video autoplay loop muted playsinline>
                <source src="assets/images/ main-image.mp4" type="video/mp4">
                <!-- 動画が再生できない場合のフォールバック -->
                <img src="assets/images/main-image.png" alt="AI Innovation Node ビジュアル">
            </video>
            <div class="overlay"></div>
        </div>
        
        <div class="container">
            <div class="hero-content">
                <h1 class="hero-title">生成AIで<br>新規事業開発を<br>革新する</h1>
                <p class="hero-subtitle">NEWhの新規事業開発ノウハウと最新AI技術の融合で、10倍速い開発と100倍の選択肢から未来の可能性を発散させます</p>
                <div class="btn-group">
                    <a href="#contact" class="btn btn-primary">
                      お問い合わせ
                      <span class="btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </a>
                    <a href="#" class="btn btn-secondary btn-download-white">
                      資料ダウンロード
                      <span class="btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                      </span>
                    </a>
                </div>
            </div>
        </div>
        
        <!-- スクロールインジケーター -->
        <div class="hero__scroll-indicator">
          <span class="line"></span>
          <span class="text">スクロール</span>
        </div>
        
        <!-- 記事ローテーション表示 -->
        <div class="hero-insight-carousel">
          <div class="hero-insight-container">
            <div class="hero-insight-slides">
              ${this.articleData.map((article, index) => `
                <!-- 記事${index + 1} -->
                <div class="hero-insight-slide ${index === 0 ? 'active' : ''}">
                  <div class="hero-insight-card">
                    <div class="hero-insight-tag">記事</div>
                    <div class="hero-insight-image">
                      <img src="${article.image}" alt="${article.title}">
                    </div>
                    <div class="hero-insight-content">
                      <h3 class="hero-insight-title">${article.title}</h3>
                      <a href="${article.url}" target="_blank" class="hero-insight-link">続きを読む</a>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            
            <!-- ドット・インジケーター -->
            <div class="hero-insight-dots">
              ${this.articleData.map((_, index) => `
                <span class="hero-insight-dot ${index === 0 ? 'active' : ''}"></span>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
    
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
