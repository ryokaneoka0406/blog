---
title: DjangoとOpenCVを使ったウェブサービスをHerokuにデプロイするまでに読んだ記事まとめ
date: "2020-03-30 09:00:00"
template: "post"
draft: false
slug: "django-opencv-heroku-deploy"
category: "develop"
tags:
  - "Develop"
  - "Service"
description: "個人開発でコピペプログラミングから脱し、ついにデプロイまで終えた。読んだ記事のまとめ"
socialImage: "/media/everydaynews.jpg"
---

## TL;DR
- [画像加工くん](https://gazokako.dev/)というウェブサービスをDjangoで実装、herokuにデプロイして無料・独自ドメインで運営しはじめた（ドメイン購入費は別、あとGoogle Cloud Storageが数円かかるかも？という範囲）。
- その時に見た参照した情報をまとめておく（書いてくださったみなさま、ありがとうございました）。サービス化のためにやった工夫も少し書いている。
- 当然ネット上のHow toは調整しないとそのまま使えない。大した機能のないサービスでもデプロイするためにはものすごくたくさんのインプットが必要だった。ちょっと論文に似ている。

## アジェンダ
- サービスの概要
- 読んだ記事たち
- 余談：自分のスペック
- 余談：学習＋開発の進め方

## サービスの概要
-  [画像加工くん](https://gazokako.dev/)
- 画像をアップロードすると白黒化か顔判別＋モザイク処理ができるウェブサービス
- 開発期間：2ヶ月
- 使用技術：Django/OpenCV/heroku/Bootstrap4/Cloudflare/Google cloud storage

## 読んだ記事たち
### OpenCV画像処理
- [Python, OpenCVで画像にモザイク処理（全面、一部、顔など） | note.nkmk.me](https://note.nkmk.me/python-opencv-mosaic/)
- 上のコードをJupyter Notebookで試し、実際に入力と出力を確かめながらやりたいことができるか確認して進めた

### Django
-  [公式チュートリアル](https://docs.djangoproject.com/ja/3.0/intro/tutorial01/)
- Djangoは公式チュートリアルが強いので、これを一通り写経してDjangoプロジェクトの作り方を一通り一般化した
- [こんな感じ](https://ryopenguin.com/posts/start-django)。

### Django + OpenCV
- [【Django】ファイルアップロード機能を実装する | yamagablog](https://ymgsapo.com/2018/11/05/file-upload/)
-  [【Django】画像をグレー変換する | yamagablog](https://ymgsapo.com/2018/11/08/gray-scale-app/)
- そのものずばりがあるじゃん！と思って最初はこのコードを写経して使わせていただこうと思っていた
- とりあえず写経して構造を理解した

### URLとリダイレクト
- [Django、リダイレクト時にGETパラメータも渡す - Narito Blog](https://narito.ninja/blog/detail/74/)
- [【Django】パラメータを渡してリダイレクトさせる(redirect関数) - Djangoの学習ができるチュートリアルサイトDjangoBrothers](https://djangobrothers.com/blogs/django_redirect_with_parameters/)
- 上の「Django+OpenCV」であげたコードはおそらくローカルで動かす前提であるため、デプロイ時には工夫が必要（しかし作者の方、ありがとうございます）。特にアップロードした画像のIDを一意に特定していないため複数人で使うと他の人の画像がアップロードした画像が見えちゃう可能性もある
- 自分の場合は**画像をアップロード→画像IDを持ったまま次のページにリダイレクト→次のページで画像処理（OpenCVを実行する関数）を実行**という設計にした
- ちなみに直リンクを防止するために（{URL}/1とかして他人があげた画像を見られないように）URLはランダム化をしている
- しかしクエリパラメータとURLパスどちらでIDを渡すのがいいかはイマイチわかっていない。

### GCSによる静的ファイル配信
- [Django + Google Cloud Strageで、ImageFieldの画像をサーバでも正常に表示させる - Qiita](https://qiita.com/waka424/items/1e40e169375b807f715b)
- [python djangoで画像をmodelのImageFieldに保存する時の話。 - 自称フルスタックエンジニアのぶろぐ。](https://murabo.hatenablog.com/entry/2018/02/06/141813)
- [django-storagesでGoogle Cloud Storageから静的ファイルの配信をできるようにする · PengNote - 勉強した事や行った場所の感想を書くブログ](https://blog.daisukekonishi.com/post/django-storages/)
- [Djangoで静的ファイルとうまくやる](https://tell-k.github.io/djangocongressjp2019/#1)
- お恥ずかしい話でImageFieldを持つDjangoアプリをデプロイしようとすると外部にストレージが必要なのがわかっていなかった（ここらへんの基礎教養が欠けているのが悲しいところ）
- 上のコードでアップロードする画像、BootstrapのCSS、JSファイルをGCSで配信することにした。

### Viewの中でGCSを使う+OpenCVにGCSファイルを読み込ませる
- [【GoogleCloudPlatform】pythonでGCSバケットのデータを読み出す/書き出す - Qiita](https://qiita.com/Gri_Gra/items/8a0a35225058aca71dc8)
- [Python 一時ファイルを作成する(tempfileモジュール） | Hibiki Programming Notes](https://hibiki-press.tech/learn_prog/python/tempfile-md/2829)
- [Pythonで一時ディレクトリを作って安全に後始末する - Qiita](https://qiita.com/everylittle/items/aa7c6f612ff0a9db7f01)
- [Python3で一時ディレクトリ(tmp/temp)を使う方法](https://cre8cre8.com/python/tempfile-temporarydirectory.htm)
- 今回開発したサービスの場合、画像処理をDjangoのImageFieldでアップロード→**View内の関数でアップロードした画像を読み取り→画像処理→処理した画像をGCSにアップロード→処理した画像のURLをDBに登録**という手順で行った
- そのためView内の関数でGCSを使えるようにするために、読み出し＋書き出しを実施した。
- OpenCVにGCSのパス（URL）を渡すとエラーになる上、アップロードもGCSのAPI仕様上、ローカルのパスが必要となる。そのため一時ディレクトリにGCS画像ダウンロード→一時ディレクトリに保存→一時ディレクトリからGCSにアップロードしている（ベストプラクティスかはちょっとわからない）

### デプロイ
- [DjangoアプリをHerokuにデプロイする方法 - Qiita](https://qiita.com/frosty/items/66f5dff8fc723387108c)
- [Google Cloudの無料チュートリアル - GAEにDjangoアプリをデプロイしてみよう！ | Udemy](https://www.udemy.com/share/102jKsA0QScV1URn4=/)
- 実はHerokuとGAE、どちらにもデプロイしてみた
- 上のチュートリアルはどちらもすごくわかりやすい上に簡単だった。自分は結局、ランニングコストの面でHerokuを利用（CloudSQLが結構お高い。マネタイズを考えていない趣味サービスはHerokuがよさそう）
- ちなみにGoogle系サービスを利用するアプリなら圧倒的にGAEの方が簡単。上の動画見れば2時間くらいでデプロイを完遂できると思う
- Herokuも簡単だが、外部サービスとの連携で詰まった（後述）

### HerokuでOpenCVを使う
- [herokuでOpenCVを利用する Python3 - Qiita](https://qiita.com/haru1843/items/210cb08024195b9d1bc8)
- Ubuntuに必要なファイルを入れるためにAptの設定がいるそうだ
- サーバーサイドに弱い、、もっと勉強しよう

### HerokuでGCSを使う（一番詰まった）
- [Heroku + Python で GoogleAPIを使うときにシークレットをソースに入れない話 - Qiita](https://qiita.com/yume_yu/items/171b04fb81dd67604683)
- [【Heroku】環境変数にサービスアカウント の情報を入れる - Qiita](https://qiita.com/sanoyo/items/6f29191cd24dd0d3afa8)
- [Google Vision APIをHerokuで使う - Qiita](https://qiita.com/hasokon/items/f6ed020ef91276e3e34a)
- GCSをサービスアカウント経由で使っていたのだが、HerokuはAUTH_KEYをアップロードできないので環境変数で秘密鍵を読みこむ必要がある
- なので上の方法でJSONを環境変数に加えたのだが、なぜか全く読み込まなくて途方にくれた、、2週間くらいロスした覚えがある。
- `os.environ.get(’GOOGLE_APPLICATION_CREDENTIALS’)` すると返ってくるのは文字列で、辞書型でもJSONでもないのが問題のようだった。
- 最終的に、一時ファイルに環境変数を書き込み、そのファイルを使ってGCS認証をするという変な実装になった。以下。

```
with tempfile.TemporaryDirectory() as tmpdir:
        filename = “AUTH_KEY.json”
        auth_key = os.environ.get(‘GOOGLE_APPLICATION_CREDENTIALS’)
        auth_path = os.path.join(tmpdir, filename)
        with open(auth_path, ‘w’) as fp:
            fp.write(auth_key)
        client = storage.Client.from_service_account_json(auth_path)
```

- 自分の実装が変なだけな気もしている 

### 独自ドメイン＋SSL化
- [【完全無料】Herokuで独自ドメイン + HTTPSに対応する【Rails】 - Qiita](https://qiita.com/serinuntius/items/f7f08b2221f5ad068f5d)
- [『Heroku + Cloudflare』でルートドメインかつSSLでサイトを運用する | vdeep](http://vdeep.net/cloudflare-rootdomain-ssl-heroku)
- Herokuは独自ドメイン＋SSL対応すると有料なので、Cloudflareを使って無料SSL＋独自ドメイン化を実施
- 年1,400円ドメイン維持費がかかるが、まあそれは必要な投資だと思っている

### Heroku Scheduler
- [最も低コストでプロダクトを公開したい - Qiita](https://qiita.com/Taro_man/items/cea8c095fe8680ab12f3)
- Herokuはほっておくと30分でスリープになり、立ち上がりに時間がかかるのでHeroku Schedulerでコマンドを送っている

### 完成
- てな訳で完成している。よかったら遊んでやってください。
- [画像加工くん](https://gazokako.dev/)は完全に趣味のサービスだが、似たような発想でマネタイズできそうなサービスのアイデアがあるのでこれからそれを作る。
- しかしプログラミングは最高に楽しいしお金もそんなかからないので、在宅での遊び中心になる昨今おすすめである。

## 余談：自分のスペック
- 職種：コンサル→プロダクトマネージャー
- 文系卒IT系5年目（もう直ぐ6年目）
- プログラミング歴は約半年（ちょこちょこつまみ食いしているがちゃんとはじめたのはこの半年くらい）。本業ではデータ分析のためにちょこっとSQLを書く＋Tableauを扱っている。

## 余談：学習＋開発の進め方
- 2019/9-12: [PyQ（パイキュー）](https://pyq.jp/)のDjango系のコース、[Progate ](https://prog-8.com/)のPython・HTML・CSS・Sass・JavaScript・Reactコース
	- 自分のリテラシー的に、Progateくらいの難度から入らないと公式チュートリアルも危険だった
	- PyQには大いに助けられた。もっと流行ってもよい良サービス
- 2020/1: [公式チュートリアル](https://docs.djangoproject.com/ja/3.0/intro/tutorial01/)
	- ProgateのPython編やったくらいで取り掛かるのがおすすめ
	- 公式チュートリアルが充実していて大変ありがたかった
- 2020/2~: [現役シリコンバレーエンジニアが教えるPython 3 入門 + 応用 +アメリカのシリコンバレー流コードスタイル | Udemy](https://www.udemy.com/share/1013hkA0QScV1URn4=/)
	- Udemyのこの講座を少しずつやりながら作りたいサービスのコードを書いていった
- サービスを考えてメモする→コア機能をJupyterで検証→Djangoで実装みたいな流れを今のところ踏んでいる。Pythonの場合はJupyterがあるのが大きい。モッキングはこれで済む



