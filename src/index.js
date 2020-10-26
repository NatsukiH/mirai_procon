/**
 * TextAlive App API Lottie example
 * https://github.com/TextAliveJp/textalive-app-lottie
 *
 * Adobe After Effects で作成したアニメーションを Lottie プラグインで
 * 書き出したものをビートに合わせて表示するサンプルコードです。
 * Lottie 関係の部分以外は basic example そのままです。
 * 
 * - https://github.com/TextAliveJp/textalive-app-basic
 * - https://developer.textalive.jp/app/
 */

import {
  Player
} from "textalive-app-api";
import lottie from "lottie-web";

// TextAlive Player を作る
// Instantiate a TextAlive Player instance
const player = new Player({
  app: {
    appAuthor: "Natsuki Hashimoto",
    appName: "",
  },
  mediaElement: document.querySelector("#media"),
});

// Lottie のアニメーションを読み込む
// Load Lottie animation
const lottieContainer_lightblueStar = document.querySelector("#lottie_lightblueStar");
const lottiePhase_lightblueStar = 0.05;
const lottieAnimation_lightblueStar = lottie.loadAnimation({
  container: lottieContainer_lightblueStar,
  renderer: "svg",
  loop: true,
  autoplay: false,
  path: "./lightblueStar.json",
});
// lottieContainer.style.opacity = 0;
lottieContainer_lightblueStar.style.opacity = 0;
  
const lottieContainer_blueLine = document.querySelector("#lottie_blueLine");
const lottiePhase_blueLine = 0.05;
const lottieAnimation_blueLine = lottie.loadAnimation({
  container: lottieContainer_blueLine,
  renderer: "svg",
  loop: true,
  autoplay: false,
  path: "./blueLine.json",
});
lottieContainer_blueLine.style.opacity = 0;

const lottieContainer_beatBar = document.querySelector("#lottie_beatBar");
const lottiePhase_beatBar = 0.05;
const lottieAnimation_beatBar = lottie.loadAnimation({
  container: lottieContainer_beatBar,
  renderer: "svg",
  loop: true,
  autoplay: false,
  path: "./beatBar.json",
});
lottieContainer_beatBar.style.opacity = 0;

// TextAlive Player のイベントリスナを登録する
// Register event listeners
player.addListener({
  onAppReady,
  onVideoReady,
  onTimerReady,
  onTimeUpdate,
  onPlay,
  onPause,
  onStop,
});

const playBtns = document.querySelectorAll(".play");
const jumpBtn = document.querySelector("#jump");
const pauseBtn = document.querySelector("#pause");
const rewindBtn = document.querySelector("#rewind");

const textSpan = document.querySelector("#text");
const artistSpan = document.querySelector("#artist span");
const songSpan = document.querySelector("#song span");

/**
 * TextAlive App が初期化されたときに呼ばれる
 *
 * @param {IPlayerApp} app - https://developer.textalive.jp/packages/textalive-app-api/interfaces/iplayerapp.html
 */
function onAppReady(app) {
  // 楽曲URLが指定されていなければ マジカルミライ 2020テーマ曲を読み込む
  // Load a song when a song URL is not specified
  if (!app.songUrl) {
    player.createFromSongUrl("https://www.youtube.com/watch?v=XSLhsjepelI");
  }

  // TextAlive ホストと接続されていたら何もしない
  // Do nothing if connected to a TextAlive host
  if (app.managed) {
    return;
  }

  // TextAlive ホストと接続されていなければ再生コントロールを表示する
  // Show control if this app is launched standalone (not connected to a TextAlive host)
  document.querySelector("#control").style.display = "block";

  // 再生ボタン / Start music playback
  playBtns.forEach((playBtn) =>
    playBtn.addEventListener("click", () => {
      player.video && player.requestPlay();
    })
  );

  // 歌詞頭出しボタン / Seek to the first character in lyrics text
  jumpBtn.addEventListener(
    "click",
    () =>
    player.video && player.requestMediaSeek(player.video.firstChar.startTime)
  );

  // 一時停止ボタン / Pause music playback
  pauseBtn.addEventListener(
    "click",
    () => player.video && player.requestPause()
  );

  // 巻き戻しボタン / Rewind music playback
  rewindBtn.addEventListener(
    "click",
    () => player.video && player.requestMediaSeek(0)
  );
}

/**
 * 動画オブジェクトの準備が整ったとき（楽曲に関する情報を読み込み終わったとき）に呼ばれる
 *
 * @param {IVideo} v - https://developer.textalive.jp/packages/textalive-app-api/interfaces/ivideo.html
 */
function onVideoReady(v) {
  // メタデータを表示する
  // Show meta data
  artistSpan.textContent = player.data.song.artist.name;
  songSpan.textContent = player.data.song.name;
}

/**
 * 音源の再生準備が完了した時に呼ばれる
 *
 * @param {Timer} t - https://developer.textalive.jp/packages/textalive-app-api/interfaces/timer.html
 */
function onTimerReady(t) {
  // ボタンを有効化する
  // Enable buttons
  if (!player.app.managed) {
    document
      .querySelectorAll("button")
      .forEach((btn) => (btn.disabled = false));
  }

  // 歌詞がなければ歌詞頭出しボタンを無効にする
  // Disable jump button if no lyrics is available
  jumpBtn.disabled = !player.video.firstChar;

  // 60 fps を狙う
  // Aim at 60fps
  player.timer.wait = 1000 / 60;
}

// 再生が始まったら #overlay を非表示に
// Hide #overlay when music playback started
function onPlay() {
  document.querySelector("#overlay").style.display = "none";
}

// 再生が一時停止したら Lottie のアニメーションも停止
// Stop Lottie animation when music playback is paused
function onPause() {
  lottieAnimation_lightblueStar.stop();
  lottieAnimation_blueLine.stop();
  lottieAnimation_beatBar.stop();
}

// 再生が停止したら歌詞表示をリセット
// Reset lyrics text field when music playback is stopped
function onStop() {
  textSpan.textContent = "";
  lottieAnimation_lightblueStar.stop();
  lottieAnimation_blueLine.stop();
  lottieAnimation_beatBar.stop();
  lottieContainer_lightblueStar.style.opacity = 0;
  lottieContainer_blueLine.style.opacity = 0;
  lottieContainer_beatBar.style.opacity = 0;
}

/**
 * 動画の再生位置が変更されたときに呼ばれる
 *
 * @param {number} position - https://developer.textalive.jp/packages/textalive-app-api/interfaces/playereventlistener.html#ontimeupdate
 */
function onTimeUpdate(position) {
  handleChar(position);
  handleBeat(position);
}

let phrase = null,
  beat = null;

/**
 * 歌詞を表示 / Show lyrics
 */
function handleChar(position) {
  if (phrase && phrase.contains(position)) {
    return;
  }
  phrase = player.video.findPhrase(position);
  if (phrase) {
    lottieContainer_lightblueStar.style.opacity = 1;
    lottieContainer_blueLine.style.opacity = 1;
    lottieContainer_beatBar.style.opacity = 1;
    textSpan.textContent = phrase.text;
  } else {
    lottieContainer_lightblueStar.style.opacity = 0.3;
    lottieContainer_blueLine.style.opacity = 0.3;
    lottieContainer_beatBar.style.opacity = 0.3;
    textSpan.textContent = "";
  }
}

/**
 * ビートに合わせて Lottie アニメーションを再生 / Play Lottie animation in response to beats
 */

function handleBeat(position) {
  if (beat && beat.contains(position)) {
    return;
  }
  beat = player.findBeat(position);
  if (!beat) {
    return;
  }
  const duration = lottieAnimation_lightblueStar.getDuration() * 1000;
  const speed = beat.duration / duration;
  const offset =
    (position - beat.startTime + duration * lottiePhase_lightblueStar) % duration;
  lottieAnimation_lightblueStar.setSpeed(speed * 10);
  lottieAnimation_lightblueStar.goToAndPlay(offset);


  if (player.findChorus(position) != null) {
    lottieAnimation_blueLine.stop();
    const offset =
      (position - beat.startTime + duration * lottiePhase_lightblueStar) % duration;
    lottieAnimation_lightblueStar.setSpeed(speed * 9);
    lottieAnimation_lightblueStar.goToAndPlay(offset);
  } else {
    lottieAnimation_lightblueStar.stop();
    const offset =
      (position - beat.startTime + duration * lottiePhase_blueLine) % duration;
    lottieAnimation_blueLine.setSpeed(speed * 9);
    lottieAnimation_blueLine.goToAndPlay(offset);
  }

  const duration_beatBar = lottieAnimation_beatBar.getDuration() * 1000;
  const speed_beatBar = beat.duration / duration_beatBar;
  const offset_beatBar =
    (position - beat.startTime + duration_beatBar * lottiePhase_beatBar) % duration_beatBar;
  lottieAnimation_beatBar.setSpeed(speed_beatBar * 10);
  lottieAnimation_beatBar.goToAndPlay(offset_beatBar);

}