// かます結びの手順データ（インタラクティブスライダー用）
export interface Step {
  number: number;
  title: string;
  description: string;
  isImportant: boolean;
  imagePath: string; // 画像ファイルのパス
  svg: string; // 画像プレースホルダー用のSVG（画像がない場合に使用）
}

// 画像プレースホルダー用の簡易SVG（かます結びをイメージ）
function getStepSVG(stepNumber: number): string {
  const svgs = [
    // Step 0: 下準備
    `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <circle cx="200" cy="150" r="30" fill="#e5e7eb" stroke="#111" stroke-width="3"/>
      <circle cx="200" cy="250" r="30" fill="#e5e7eb" stroke="#111" stroke-width="3"/>
      <path d="M 170 150 Q 200 200 170 250" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 230 150 Q 200 200 230 250" stroke="#111" stroke-width="4" fill="none" stroke-linecap="round"/>
      <text x="200" y="320" text-anchor="middle" font-size="32" font-weight="bold" fill="#111">Step 0</text>
    </svg>`,
    // Step 1: 交差
    `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <line x1="100" y1="200" x2="300" y2="200" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
      <line x1="200" y1="100" x2="200" y2="300" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
      <circle cx="200" cy="200" r="15" fill="#fbbf24" stroke="#111" stroke-width="2"/>
      <text x="200" y="320" text-anchor="middle" font-size="32" font-weight="bold" fill="#111">Step 1</text>
    </svg>`,
    // Step 2: くぐらせ
    `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <line x1="100" y1="200" x2="300" y2="200" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
      <path d="M 200 100 Q 250 200 200 300" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="200" cy="200" r="12" fill="#fbbf24" stroke="#111" stroke-width="2"/>
      <text x="200" y="320" text-anchor="middle" font-size="32" font-weight="bold" fill="#111">Step 2</text>
    </svg>`,
    // Step 3: 1回目のくぐらせ
    `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <line x1="100" y1="200" x2="300" y2="200" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
      <path d="M 200 100 Q 250 200 200 300" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 200 110 Q 260 200 200 290" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"/>
      <circle cx="200" cy="200" r="12" fill="#fbbf24" stroke="#111" stroke-width="2"/>
      <text x="200" y="320" text-anchor="middle" font-size="32" font-weight="bold" fill="#111">Step 3</text>
    </svg>`,
    // Step 4: 2回目のくぐらせ
    `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <line x1="100" y1="200" x2="300" y2="200" stroke="#3b82f6" stroke-width="6" stroke-linecap="round"/>
      <path d="M 200 100 Q 250 200 200 300" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 200 110 Q 260 200 200 290" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="200" cy="200" r="15" fill="#10b981" stroke="#111" stroke-width="2" opacity="0.5"/>
      <text x="200" y="320" text-anchor="middle" font-size="32" font-weight="bold" fill="#111">Step 4</text>
    </svg>`,
    // Step 5: 固定＆完成
    `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <path d="M 150 150 Q 200 200 150 250" stroke="#3b82f6" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 250 150 Q 200 200 250 250" stroke="#ef4444" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="200" cy="200" r="20" fill="#10b981" stroke="#111" stroke-width="3"/>
      <path d="M 190 200 L 200 210 L 210 190" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <text x="200" y="320" text-anchor="middle" font-size="32" font-weight="bold" fill="#111">Step 5</text>
    </svg>`,
  ];
  return svgs[stepNumber] || svgs[0];
}

// 画像ファイルのパスを取得（絶対パス）
function getImagePath(stepNumber: number): string {
  const imagePaths = [
    '/mediadesign/images/step0.png',
    '/mediadesign/images/step1.png',
    '/mediadesign/images/step2.png',
    '/mediadesign/images/step3.png',
    '/mediadesign/images/step4.png',
    '/mediadesign/images/step5.png',
  ];
  return imagePaths[stepNumber] || imagePaths[0];
}

export const steps: Step[] = [
  {
    number: 0,
    title: '下準備',
    description: '紐を二重にして、二本の輪を作ります。',
    isImportant: false,
    imagePath: getImagePath(0),
    svg: getStepSVG(0),
  },
  {
    number: 1,
    title: '輪を作る',
    description: '二本の輪を交差させて、輪を作ります。',
    isImportant: false,
    imagePath: getImagePath(1),
    svg: getStepSVG(1),
  },
  {
    number: 2,
    title: '紐を上に乗せる',
    description: '上側の輪を下側の輪の上に乗せます。',
    isImportant: false,
    imagePath: getImagePath(2),
    svg: getStepSVG(2),
  },
  {
    number: 3,
    title: '紐を下に潜らせる',
    description: '上側の輪を下側の輪の下に潜らせます。ここが重要なポイントです。',
    isImportant: true,
    imagePath: getImagePath(3),
    svg: getStepSVG(3),
  },
  {
    number: 4,
    title: '輪に紐を通す',
    description: '輪に紐を通して、結び目を形成します。ここも重要なポイントです。',
    isImportant: true,
    imagePath: getImagePath(4),
    svg: getStepSVG(4),
  },
  {
    number: 5,
    title: '紐を引っ張って完成',
    description: '両端を引っ張ると、結び目がロックされて完成です。',
    isImportant: false,
    imagePath: getImagePath(5),
    svg: getStepSVG(5),
  },
];
