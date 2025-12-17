import { steps } from './steps';
import { initVideo } from './video';

// インタラクティブスライダーの状態
let currentStep = 0;
let isPlaying = true;
let progress = 0;
let progressTimer: number | null = null;
let stepTimer: number | null = null;
let touchStartX = 0;
let touchEndX = 0;

const DURATION = 2000; // 2秒

// プログレスバーのアニメーション
function startProgressAnimation(): void {
  if (progressTimer) clearInterval(progressTimer);
  if (stepTimer) clearTimeout(stepTimer);

  progress = 0;
  const startTime = Date.now();

  progressTimer = window.setInterval(() => {
    const elapsed = Date.now() - startTime;
    progress = Math.min((elapsed / DURATION) * 100, 100);
    updateProgressBar();

    if (progress >= 100) {
      if (progressTimer) clearInterval(progressTimer);
    }
  }, 16); // ~60fps

  stepTimer = window.setTimeout(() => {
    if (isPlaying) {
      goToNextStep();
    }
  }, DURATION);
}

// プログレスバーを更新
function updateProgressBar(): void {
  const bars = document.querySelectorAll<HTMLElement>('.progress-bar__item');
  bars.forEach((bar, index) => {
    const barFill = bar.querySelector<HTMLElement>('.progress-bar__fill');
    if (!barFill) return;

    if (index < currentStep) {
      barFill.style.width = '100%';
      barFill.style.opacity = '1';
    } else if (index === currentStep) {
      barFill.style.width = `${progress}%`;
      barFill.style.opacity = '1';
    } else {
      barFill.style.width = '0%';
      barFill.style.opacity = '0.3';
    }
  });
}

// ステップを表示
function renderStep(stepIndex: number): void {
  const container = document.getElementById('interactiveStepsContainer');
  if (!container) return;

  const stepData = steps[stepIndex];
  const imageArea = container.querySelector<HTMLElement>('.step-slider__image');
  const stepNumber = container.querySelector<HTMLElement>('.step-slider__number');
  const stepTitle = container.querySelector<HTMLElement>('.step-slider__title');
  const stepDescription = container.querySelector<HTMLElement>('.step-slider__description');
  const importantBadge = container.querySelector<HTMLElement>('.step-slider__important');

  if (imageArea) {
    // 画像が存在する場合は画像を表示、存在しない場合はSVGプレースホルダーを表示
    const img = new Image();
    img.onload = () => {
      imageArea.innerHTML = `<img src="${stepData.imagePath}" alt="${stepData.title}" style="width: 100%; height: 100%; object-fit: contain;" />`;
    };
    img.onerror = () => {
      // 画像が存在しない場合はSVGプレースホルダーを表示
      imageArea.innerHTML = stepData.svg;
    };
    img.src = stepData.imagePath;
  }
  if (stepNumber) {
    stepNumber.textContent = stepData.number.toString();
    stepNumber.className = `step-slider__number ${stepData.isImportant ? 'step-slider__number--important' : ''}`;
  }
  if (stepTitle) {
    stepTitle.textContent = stepData.title;
  }
  if (stepDescription) {
    stepDescription.textContent = stepData.description;
  }
  if (importantBadge) {
    importantBadge.style.display = stepData.isImportant ? 'flex' : 'none';
  }

  // サムネイルのアクティブ状態を更新
  const thumbnails = container.querySelectorAll<HTMLElement>('.step-thumbnail');
  thumbnails.forEach((thumb, index) => {
    if (index === stepIndex) {
      thumb.classList.add('step-thumbnail--active');
    } else {
      thumb.classList.remove('step-thumbnail--active');
    }
  });
}

// 次のステップへ
function goToNextStep(): void {
  currentStep = (currentStep + 1) % steps.length;
  renderStep(currentStep);
  if (isPlaying) {
    startProgressAnimation();
  }
}

// 前のステップへ
function goToPreviousStep(): void {
  currentStep = (currentStep - 1 + steps.length) % steps.length;
  renderStep(currentStep);
  if (isPlaying) {
    startProgressAnimation();
  }
}

// 特定のステップへ移動
function goToStep(index: number): void {
  if (index < 0 || index >= steps.length) return;
  currentStep = index;
  renderStep(currentStep);
  if (isPlaying) {
    startProgressAnimation();
  } else {
    // 一時停止中はプログレスバーをリセット
    progress = 0;
    updateProgressBar();
  }
}

// 再生/一時停止を切り替え
function togglePlayPause(): void {
  isPlaying = !isPlaying;
  const playButton = document.querySelector<HTMLElement>('.step-slider__play-button');
  if (playButton) {
    playButton.innerHTML = isPlaying
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21"></polygon></svg>';
  }

  if (isPlaying) {
    startProgressAnimation();
  } else {
    if (progressTimer) clearInterval(progressTimer);
    if (stepTimer) clearTimeout(stepTimer);
  }
}

// スワイプジェスチャー
function handleTouchStart(e: TouchEvent): void {
  touchStartX = e.touches[0].clientX;
}

function handleTouchMove(e: TouchEvent): void {
  touchEndX = e.touches[0].clientX;
}

function handleTouchEnd(): void {
  const swipeDistance = touchStartX - touchEndX;
  const minSwipeDistance = 50;

  if (Math.abs(swipeDistance) > minSwipeDistance) {
    if (swipeDistance > 0) {
      // 左にスワイプ → 次へ
      isPlaying = false;
      togglePlayPause();
      goToNextStep();
    } else {
      // 右にスワイプ → 前へ
      isPlaying = false;
      togglePlayPause();
      goToPreviousStep();
    }
  }
}

// 画像クリックで前後移動
function handleImageClick(e: MouseEvent): void {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const width = rect.width;

  if (x < width / 3) {
    // 左1/3をクリック → 前へ
    isPlaying = false;
    togglePlayPause();
    goToPreviousStep();
  } else if (x > (2 * width) / 3) {
    // 右1/3をクリック → 次へ
    isPlaying = false;
    togglePlayPause();
    goToNextStep();
  }
}

// インタラクティブスライダーを初期化
function initInteractiveSteps(): void {
  const container = document.getElementById('interactiveStepsContainer');
  if (!container) return;

  container.innerHTML = `
    <div class="step-slider">
      <!-- プログレスバー -->
      <div class="progress-bar">
        ${steps
          .map(
            (step) => `
          <div class="progress-bar__item">
            <div class="progress-bar__fill ${step.isImportant ? 'progress-bar__fill--important' : ''}" style="width: 0%; opacity: 0.3;"></div>
          </div>
        `
          )
          .join('')}
      </div>

      <!-- メイン画像エリア -->
      <div class="step-slider__image-wrapper">
        <div class="step-slider__image" style="cursor: pointer;">
          ${steps[0].svg}
        </div>
        <!-- 左右矢印（ヒント） -->
        <div class="step-slider__arrow step-slider__arrow--left">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div class="step-slider__arrow step-slider__arrow--right">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>

      <!-- 再生/一時停止ボタン -->
      <div class="step-slider__controls">
        <button class="step-slider__play-button" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
      </div>

      <!-- サムネイルストリップ -->
      <div class="step-thumbnails">
        ${steps
          .map(
            (step, index) => `
          <button class="step-thumbnail ${index === 0 ? 'step-thumbnail--active' : ''} ${step.isImportant ? 'step-thumbnail--important' : ''}" type="button" data-step="${index}">
            <span class="sr-only">ステップ ${step.number}</span>
          </button>
        `
          )
          .join('')}
      </div>

      <!-- テキストエリア -->
      <div class="step-slider__text">
        <div class="step-slider__header">
          <div class="step-slider__number step-slider__number--important">0</div>
          <h3 class="step-slider__title">下準備</h3>
          <div class="step-slider__important" style="display: none;">
            <span>⚠️</span>
            <span>ここがポイント！</span>
          </div>
        </div>
        <p class="step-slider__description">紐を二重にして、二本の輪を作ります。</p>
      </div>
    </div>
  `;

  // イベントリスナーを設定
  const imageWrapper = container.querySelector<HTMLElement>('.step-slider__image-wrapper');
  const playButton = container.querySelector<HTMLElement>('.step-slider__play-button');
  const thumbnails = container.querySelectorAll<HTMLElement>('.step-thumbnail');

  if (imageWrapper) {
    const image = imageWrapper.querySelector<HTMLElement>('.step-slider__image');
    if (image) {
      image.addEventListener('click', handleImageClick as EventListener);
      image.addEventListener('touchstart', handleTouchStart as EventListener);
      image.addEventListener('touchmove', handleTouchMove as EventListener);
      image.addEventListener('touchend', handleTouchEnd);
    }
  }

  if (playButton) {
    playButton.addEventListener('click', togglePlayPause);
  }

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      isPlaying = false;
      togglePlayPause();
      goToStep(index);
    });
  });

  // 初期表示
  renderStep(0);
  if (isPlaying) {
    startProgressAnimation();
  }
}

// コツセクションを初期化
function initTips(): void {
  const tipsList = document.getElementById('tipsList');
  if (!tipsList) return;

  const tips = [
    {
      icon: '✓',
      text: '「2回くぐらせる」だけを意識',
      description: '最初の交差のあと、上側の輪を2回連続で下側の輪の下にくぐらせるだけです。',
    },
    {
      icon: '→',
      text: '引っ張る前に形を確認',
      description: '結び目がしっかり形成されていることを確認してから、ゆっくり引っ張りましょう。',
    },
    {
      icon: '⚡',
      text: '練習は3回で十分',
      description: '何度か繰り返すと、手が自然に覚えます。初めは動画を見ながらゆっくりどうぞ。',
    },
  ];

  tipsList.innerHTML = tips
    .map(
      (tip) => `
    <div class="tip-item">
      <div class="tip-item__icon">
        <span>${tip.icon}</span>
      </div>
      <div class="tip-item__content">
        <h3 class="tip-item__title">${tip.text}</h3>
        <p class="tip-item__description">${tip.description}</p>
      </div>
    </div>
  `
    )
    .join('');
}

// 背景画像のアニメーション初期化
function initBackgroundSplashes(): void {
  const container = document.querySelector<HTMLElement>('.background-splashes');
  if (!container) return;

  // 背景画像の色リスト
  const colors = ['red', 'blue', 'green', 'pink', 'purple'];
  
  // ランダムな枚数を生成（各色1-3枚、合計5-15枚）
  const totalImages = Math.floor(Math.random() * 11) + 5; // 5-15枚
  
  // 各色の画像をランダムに配置
  for (let i = 0; i < totalImages; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const splash = document.createElement('div');
    splash.className = 'background-splash';
    splash.setAttribute('data-color', color);
    
    // ランダムな位置とサイズ
    const size = Math.floor(Math.random() * 200) + 150; // 150-350px
    const left = Math.random() * 100; // 0-100%
    const top = Math.random() * 100; // 0-100%
    const delay = Math.random() * 2; // 0-2秒の遅延
    const duration = Math.random() * 2 + 3; // 3-5秒のアニメーション時間
    
    splash.style.width = `${size}px`;
    splash.style.height = `${size}px`;
    splash.style.left = `${left}%`;
    splash.style.top = `${top}%`;
    splash.style.backgroundImage = `url('/mediadesign/images/${color}.png')`;
    splash.style.animationDelay = `${delay}s`;
    splash.style.animationDuration = `${duration}s`;
    
    container.appendChild(splash);
  }
  
  // スクロールに応じて位置が変わる（parallax効果）
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const splashes = container.querySelectorAll<HTMLElement>('.background-splash');
        
        splashes.forEach((splash, index) => {
          // 各画像が異なる速度で動く（parallax効果）
          const speed = (index % 3 + 1) * 0.1; // 0.1, 0.2, 0.3
          const offsetY = scrollY * speed;
          splash.style.transform = `translateY(${offsetY}px)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

// セクションスナップアニメーション
function initSectionSnapAnimations(): void {
  const sections = document.querySelectorAll<HTMLElement>('.snap-section');
  if (!sections.length) return;

  // アクティブなセクションを検出するObserver
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          target.classList.add('snap-section--active');
          target.classList.remove('snap-section--next-visible');
        } else {
          target.classList.remove('snap-section--active');
        }
      });
    },
    {
      threshold: [0, 0.5, 1],
    }
  );

  // 次のセクションを少し見えるようにするObserver
  const nextVisibleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        // セクションがビューポートの下部に少し見えている場合
        if (entry.isIntersecting && entry.intersectionRatio > 0 && entry.intersectionRatio < 0.3) {
          // アクティブでない場合のみ、次のセクションとして表示
          if (!target.classList.contains('snap-section--active')) {
            target.classList.add('snap-section--next-visible');
          }
        } else {
          target.classList.remove('snap-section--next-visible');
        }
      });
    },
    {
      threshold: [0, 0.1, 0.2, 0.3],
      rootMargin: '0px 0px -80% 0px', // ビューポートの下部20%に入ったら表示
    }
  );

  sections.forEach((section) => {
    activeObserver.observe(section);
    nextVisibleObserver.observe(section);
  });
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  initBackgroundSplashes();
  initInteractiveSteps();
  initVideo();
  initTips();
  initSectionSnapAnimations();
});
