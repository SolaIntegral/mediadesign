import { initSteps } from './steps';
import { initVideo } from './video';

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  initSteps();
  initVideo();
});

