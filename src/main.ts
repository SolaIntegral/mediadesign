import { initSteps } from './steps';
import { initVideo } from './video';

function initSectionSnapAnimations(): void {
  const sections = document.querySelectorAll<HTMLElement>('.snap-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.classList.add('snap-section--active');
        } else {
          target.classList.remove('snap-section--active');
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  initSteps();
  initVideo();
  initSectionSnapAnimations();
});

