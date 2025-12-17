// かます結びの手順データ
export interface Step {
  number: number;
  title: string;
  description: string;
  svg: string; // SVGコード（後で図を追加）
}

// SVG図（簡易版 - 後で実際の図に置き換え可能）
function getStep1SVG(): string {
  return `
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="50" x2="180" y2="50" stroke="#4A90E2" stroke-width="4" stroke-linecap="round"/>
      <text x="100" y="30" text-anchor="middle" font-size="14" fill="#666">紐を準備</text>
    </svg>
  `;
}

function getStep2SVG(): string {
  return `
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="20" x2="50" y2="80" stroke="#4A90E2" stroke-width="4" stroke-linecap="round"/>
      <line x1="20" y1="50" x2="80" y2="50" stroke="#E24A4A" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="5" fill="#FFD700"/>
      <text x="100" y="30" text-anchor="middle" font-size="14" fill="#666">交差させる</text>
    </svg>
  `;
}

function getStep3SVG(): string {
  return `
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 20 Q 100 50 50 80" stroke="#4A90E2" stroke-width="4" fill="none" stroke-linecap="round"/>
      <line x1="20" y1="50" x2="80" y2="50" stroke="#E24A4A" stroke-width="4" stroke-linecap="round"/>
      <text x="100" y="30" text-anchor="middle" font-size="14" fill="#666">輪を作る</text>
    </svg>
  `;
}

function getStep4SVG(): string {
  return `
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 20 Q 100 50 50 80" stroke="#4A90E2" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 50 25 Q 100 50 50 75" stroke="#4A90E2" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.7"/>
      <line x1="20" y1="50" x2="80" y2="50" stroke="#E24A4A" stroke-width="4" stroke-linecap="round"/>
      <text x="100" y="30" text-anchor="middle" font-size="14" fill="#666">もう一度輪を作る</text>
    </svg>
  `;
}

function getStep5SVG(): string {
  return `
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M 50 20 Q 100 50 50 80" stroke="#4A90E2" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 50 25 Q 100 50 50 75" stroke="#4A90E2" stroke-width="4" fill="none" stroke-linecap="round"/>
      <line x1="20" y1="50" x2="80" y2="50" stroke="#E24A4A" stroke-width="4" stroke-linecap="round"/>
      <circle cx="50" cy="50" r="8" fill="#4CAF50" opacity="0.3"/>
      <text x="100" y="30" text-anchor="middle" font-size="14" fill="#666">引き締める</text>
    </svg>
  `;
}

export const steps: Step[] = [
  {
    number: 1,
    title: '紐を準備する',
    description: '結びたい2本の紐を用意します。同じ長さの紐を使うと結びやすいです。',
    svg: getStep1SVG(),
  },
  {
    number: 2,
    title: '紐を交差させる',
    description: '2本の紐を十字に交差させます。交差する位置は、結びたい位置に合わせて調整しましょう。',
    svg: getStep2SVG(),
  },
  {
    number: 3,
    title: '輪を作る',
    description: '片方の紐の端を、もう片方の紐の下を通して輪を作ります。',
    svg: getStep3SVG(),
  },
  {
    number: 4,
    title: 'もう一度輪を作る',
    description: '同じ方向にもう一度輪を作ります。最初の輪と同じ方向に回すのがポイントです。',
    svg: getStep4SVG(),
  },
  {
    number: 5,
    title: '引き締める',
    description: '両方の紐を引っ張って、結び目をしっかりと引き締めます。',
    svg: getStep5SVG(),
  },
];

// 手順を表示する関数
export function initSteps(): void {
  const container = document.getElementById('stepsContainer');
  if (!container) return;

  container.innerHTML = steps
    .map(
      (step) => `
    <div class="step-card" data-step="${step.number}">
      <div class="step-card__number">${step.number}</div>
      <div class="step-card__content">
        <h3 class="step-card__title">${step.title}</h3>
        <div class="step-card__diagram">
          ${step.svg}
        </div>
        <p class="step-card__description">${step.description}</p>
      </div>
    </div>
  `
    )
    .join('');

  // アニメーション効果を追加
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('step-card--visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  container.querySelectorAll('.step-card').forEach((card) => {
    observer.observe(card);
  });
}

