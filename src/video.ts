// YouTube動画の設定
// 動画IDを設定してください（例: https://www.youtube.com/watch?v=VIDEO_ID の VIDEO_ID 部分）
export const YOUTUBE_VIDEO_ID = ''; // ここに動画IDを入力

export function initVideo(): void {
  const container = document.querySelector('.video__container');
  if (!container) return;

  if (YOUTUBE_VIDEO_ID) {
    // YouTube動画を埋め込み
    container.innerHTML = `
      <div class="video__wrapper">
        <iframe
          class="video__iframe"
          src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}"
          title="かます結びの動画解説"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    `;
  } else {
    // プレースホルダーを表示
    container.innerHTML = `
      <div class="video__placeholder">
        <p class="video__placeholder-text">
          📹 YouTube動画のURLを設定してください
        </p>
        <p class="video__placeholder-hint">
          （動画IDを src/video.ts の YOUTUBE_VIDEO_ID に設定すると表示されます）
        </p>
      </div>
    `;
  }
}

