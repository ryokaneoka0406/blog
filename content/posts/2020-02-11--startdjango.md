---
title: お勉強メモ:Django開発をはじめるときの一連動作
date: "2020-02-11 18:23:00"
template: "post"
draft: false
slug: "start-django"
category: "Develop"
tags:
  - "Develop"
  - "Django"
description: "Djangoで開発を始めた時、最初にやる一連の動作をまとめておく。"
socialImage: "/media/image-2.jpg"
---

## 概要
- Pythonのフレームワーク
- ディレクトリ構造（project配下にappを1つ立ち上げた場合）
- プロジェクトの中にアプリがあり、アプリは何個立ち上げてもよい（後述）
	- 以下projectはプロジェクト、appはアプリを差す

```
project
	- project
		- __pycache__
		- asgi.py
		- settings.py
		- urls.py
		- wsgi.py
  - app
		- __pycache__
		- migrations
		- static
			- app
				- css/xxx.css
				- js/xxx.js
		- templates
			- app
				- index.html
		- __init__.py
		- admin.py
		- apps.py
		- forms.py
		- models.py	
		- tests.py
		- urls.py
		- views.py
	- db.sqlite3
	- manage.py
```


## 開発手順
### プロジェクト開始時
- `$ django-admin startproject myapp`
- 上のディレクトリの`project`の中のものができる
- その配下にアプリを作っていく
- `$ python manage.py startapp app`

### 初期設定あれこれ
- appのurlsはappで完結させたい
	- projectのurlsにincludeをインポート
	- `path(‘app/‘, include(‘app.urls’)),` を追記
- settings.py
	- アプリケーションをsettingsに加える
	- `INSTALLED_APPS` に`app`を加える
	- setting.pyを開いたついでに、言語とタイムゾーンの設定。
```
LANGUAGE_CODE = ‘ja-JP’
TIME_ZONE = ‘Asia/Tokyo’
```

- migration
	- modelにDBの構造を定義
		- modelのスキーマを用いた演算処理とかはモデル内のメソッドで持たせておくとよいっぽい
	- modelを作れたら以下を実施

```
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```

-  admin
	-  テストデータの管理用にadminにmodelから該当モデルをインポート
	- `admin.site.register(モデル名)` を追記
	- `$ python manage.py createsuperuser`でアドレス登録