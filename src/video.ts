// YouTube動画の設定
// 今回埋め込む動画: https://youtu.be/Q38OD5uIZwE
// 上記URLの「/」以降の文字列が動画IDです
export const YOUTUBE_VIDEO_ID = 'Q38OD5uIZwE';

export function initVideo(): void {
  const container = document.getElementById('videoContainer');
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

