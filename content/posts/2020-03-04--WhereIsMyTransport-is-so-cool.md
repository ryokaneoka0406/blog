---
title: 今日の気になったニュースとサービス（エッジ組み込み、途上国交通データ、DjangoとOpenCVで作ったデモ）
date: "2020-03-05 24:00:00"
template: "post"
draft: false
slug: "WhereIsMyTransport-is-so-cool"
category: "News"
tags:
  - "News"
  - "Service"
description: "ソフトでハードの性能をあげる系の組み込みソフトウェア、途上国の交通データ、ぼやきと僕の作ったデモ。"
socialImage: "/media/everydaynews.jpg"
---

### [Audiotelligence](https://www.audiotelligence.com/)

デバイス組み込み式のソフトウェア。電力やコンピュータリソースに限りのあるデバイスでも音がクリアに聴こえるように補正してくれる。渋いけどデバイスパワーをソフトウェアで乗り越えるのはとてもニーズありそう。

昔IoTの仕事をしてたとき、ハードウェア制約（往々にして、予算に関わる）でなかなか開発が進まないものがあった。ハードウェアは拡張性のあるミニマムなもの（それこそラズパイ）にして、ソフトウェアでいろいろ乗り越えるのはこれからのデバイスのあり方なのかもしれん。カメラとかは結構事例出ている気がする。

余談ですが、[Amazon Dashのヤバさの解説記事](https://link.medium.com/8dPvd1sxx4)を思い出した。

### [WhereIsMyTransport](https://www.whereismytransport.com/)

新興国（アフリカ、インド、ラテンアメリカなど）の公式、非公式交通データを独自に収集、APIとして提供するサービス。Googleと豊田通商が投資しているそうな。まだデータ化されていないものをデータ化するの、大変だけど絶対ニーズあると思う。地理データ生成が本業なので痺れた。

[Agribuddy](https://www.agribuddy.com/)を思い出した。

### ぼやき

<iframe width="560" height="315" src="https://www.youtube.com/embed/X2QTcqVO7Nk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- 数日前に画像をアップロードしたらOpenCVにあるカスケード顔分類器で顔認識、モザイクをかけるデモをDjangoで作った。一応[コード](https://github.com/ryokaneoka0406/image-uploder)も公開している。我ながら冗長なコードだと思うのでなんとかしたいが。。
- 認証なしでファイルをアップロードするサービスは色々考えること多くて大変である（地味にURLを暗号化したりして他人のアップロードした画像にアクセスできないようにしている）。早くデプロイしてグローバルから触れるようにしたい。友達にGCPのCloud Runをおすすめされたのでチャレンジする予定。あとアップロードした静的コンテンツはストレージからの配信になるのでGCSとも連携しなければならない。本業でBigQueryなら自分でも叩くのでGCP好き。
- 1月からちゃんとプログラミング勉強し始めて拙いなりに動くものができるのは楽しい。ただテストコードもっと書いて「独学だけど結構ちゃんとしている」というのを目指したい。『テスト駆動開発』買いました。
