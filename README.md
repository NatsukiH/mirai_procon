# 概要
### 作品名：「夜空に煌めくグリーンライツ」
![demo3](https://user-images.githubusercontent.com/39262759/97947213-f1f91200-1dcf-11eb-8194-66d4897de251.gif)

# デモ動画
画像をクリックするとYouTubeに飛びます.
### フルver
[![デモ動画](http://img.youtube.com/vi/0HFIuts8mSY/0.jpg)](http://www.youtube.com/watch?v=0HFIuts8mSY "")

### UI操作ver
実際にUIを操作した例を動画にしました．  
[![デモ動画](http://img.youtube.com/vi/V-sTHr-Fv24/0.jpg)](http://www.youtube.com/watch?v=V-sTHr-Fv24 "")

# アピールポイント
初めてこの曲を聞いたときに感じた「星の煌めき感」をコンセプトとして，グリーライツ・セレナーデの世界観を表現しました．  
波長でビートを刻み，サビに入ると星が瞬き出します．  
さらに，「グリーンライツ」の瞬間には星が溢れ出すエフェクトをつけました．  
色味は全て初音ミクのカラーリングで統一感を持たせました．  
UIを含め全体的にシンプルなデザインを心掛け，まるで星空にオーディオが浮かんでいるような作品となっています．  


制作するにあたって，Lottieを用いたサンプルコードをベースに，自分が感じたグリーンライツ・セレナーデの世界観を落とし込むことに注力しました．  
TextAlive App APIを初めて扱ったため，慣れないことも多かったですが，楽しく制作することができました:satisfied:


# 用いたサンプルコードの詳細
用いたサンプルコードのREADMEを記載します．  
本作品の実行方法は以下の方法と同じです．

<details>
<summary>
TextAlive App API lottie example
</summary>

Adobe After Effects で作成したアニメーションを Lottie プラグインで書き出したものをビートに合わせて表示するサンプルコードです。 Lottie 関係の部分以外は [basic example](https://github.com/TextAliveJp/textalive-app-basic) そのままです。

リポジトリに含まれている [fw_white.json](src/assets/fw_white.json) が Lottie のアニメーションデータです。他のアニメーションに差し替えて遊んでみてください。アニメーションを作成する環境がない場合は LottieFiles で公開されている無償のアセットを探してみてください。

- デモページ: https://textalivejp.github.io/textalive-app-lottie/
- Lottie: https://airbnb.io/lottie/
- LottieFiles: https://lottiefiles.com/

TextAlive ホストと接続された状態をテストするには [TextAlive App Debugger](https://developer.textalive.jp/app/run/?ta_app_url=https%3A%2F%2Ftextalivejp.github.io%2Ftextalive-app-lottie%2F&ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DygY2qObZv24) のページにアクセスしてください。

**English version available in [README.en.md](./README.en.md).**

## 違う楽曲で試すには

TextAlive App API で開発されたWebアプリケーションは、（特定の楽曲向けに作り込んでいない限り）URLのクエリパラメタで `ta_song_url={楽曲のURL}` を指定すると異なる楽曲で演出を試せます。

- [ブレス・ユア・ブレス by 和田たけあき feat. 初音ミク](https://textalivejp.github.io/textalive-app-lottie/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Da-Nf3QUFkOU)
- [グリーンライツ・セレナーデ by Omoi feat. 初音ミク](https://textalivejp.github.io/textalive-app-lottie/?ta_song_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DXSLhsjepelI)

## 開発

[Node.js](https://nodejs.org/) をインストールしている環境で以下のコマンドを実行すると、開発用サーバが起動します。

```sh
npm install
npm run dev
```

## ビルド

以下のコマンドで `docs` 以下にビルド済みファイルが生成されます。 [サンプルコードのデモページ](https://textalivejp.github.io/textalive-app-lottie/) は [GitHub Pages](https://pages.github.com/) で、このリポジトリの `docs` 以下のファイルが提供されています。

```sh
npm run build
```

## TextAlive App API

![TextAlive](https://i.gyazo.com/thumb/1000/5301e6f642d255c5cfff98e049b6d1f3-png.png)

TextAlive App API は、音楽に合わせてタイミングよく歌詞が動くWebアプリケーション（リリックアプリ）を開発できるJavaScript用のライブラリです。

TextAlive App API について詳しくはWebサイト [TextAlive for Developers](https://developer.textalive.jp/) をご覧ください。


</details>
https://github.com/TextAliveJp/textalive-app-lottie
