---
title: OpenCVとDjangoで画像加工できるWEBサービス作っている
date: "2020-02-16 22:00:00"
template: "post"
draft: false
slug: "opencv-and-django-imageapp"
category: "Develop"
tags:
  - "Develop"
  - "Service"
description: "掲題の通り。コードを書かず、ポチポチするだけで画像加工できるウェブアプリを開発中。サービス作るのバンバン慣れていきたい。"
socialImage: "/media/everydaynews.jpg"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/r55YJzFDmqI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

動画を見てもらうのがはやいが、個人開発としてDjangoでウェブサービスを作っている。
画像をアップロードすれば白黒にしたり、顔に自動でモザイクをかけるといった機能にする予定(後者は検証済みなので関数1つ増やせばいけると思う)。2月中にはConohaでデプロイ（Google App Engineかも。安い方）、Adsenseを導入した上で運用する計画。

### 参考文献
- https://ymgsapo.com/2018/11/08/gray-scale-app/
- https://qiita.com/takuto412/items/fb2d84c2a0ac03522005
  - ただ、上記の実装は公開することをおそらく前提とされておらず、多人数でアクセスすると自分以外のユーザーのアップロードした画像が見えてしまう(クエリングで最新の画像を取得しているため)。なので画面遷移することで以上の問題を回避している（多分）。

### 今後やること
- 顔認識し、モザイクをかける処理の機能を足す（そもそも、企業展示会の内容をブログに書く時のモザイク加工が楽になればいいなと思いはじめた）。以下を参考にする
  - https://note.nkmk.me/python-opencv-mosaic/
- テストコードを書く
  - 初心者プログラマゆえ都度動くかどうか実行しながらでないとわからない、、だがようやくやりたいことはできたっぽいので堅牢にしていく
- bootstrapで体裁を整える
  - 意外と大事だと思う。