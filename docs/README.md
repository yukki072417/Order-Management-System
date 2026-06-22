# 注文管理システム (legacy)

## 概要

高校の文化祭で実際に運用していたコードです。
文化祭当日に発生したDB接続上限エラー(too many connections)の原因となった
実装がそのまま残っています。

リファクタリング済みのバージョンは `master` ブランチをご覧ください。

## 必須環境

- Docker Engine

## 初期設定

プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下を記載してください。

```env
ROOT_PASSWORD=<強力なパスワード>
ROOT_PASSWORD=<強力なパスワード>
```

プロジェクトの`Frontend`ディレクトリに `.env` ファイルを作成し、以下を記載してください。

```env
VITE_PRIVATE_IP=localhost
```

## 起動

```bash
# 起動
docker compose up -d

# 終了
docker compose down
```