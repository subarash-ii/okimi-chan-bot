# Okimi-Chan Bot

Telegram bot that renders osu! player statistics into profile card images.

[![Telegram](https://img.shields.io/badge/Telegram-@okimi__chan__bot-26A5E4?logo=telegram&logoColor=white)](https://t.me/okimi_chan_bot)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Overview

The bot fetches player data from the osu! API v2 and renders it into a JPEG stat card (pp, global and country rank, accuracy, level, playcount). Cards are generated from an HTML/CSS template with Handlebars and screenshotted by headless Chromium (Playwright). Rendered images are uploaded to a cache chat once and re-served via Telegram `file_id`. Account links (Telegram user → osu! username) are stored in MongoDB.

## Commands

| Command | Description |
|---|---|
| `/user <username>` | Stat card for any player |
| `/link <username>` | Link a Telegram account to an osu! profile |
| `/me` | Stat card for the linked profile |
| `/unlink` | Remove the link |
| `/help` | Command reference |

Inline mode: `@okimi_chan_bot <username>` works in any chat.

## Requirements

- Node.js 20+ (or Docker)
- MongoDB
- Telegram bot token ([@BotFather](https://t.me/BotFather))
- osu! OAuth client ([account settings → OAuth](https://osu.ppy.sh/home/account/edit#oauth))

## Setup

```bash
git clone https://github.com/subarash-ii/okimi-chan-bot.git
cd okimi-chan-bot
npm install
npx playwright install chromium
cp .env.example .env
```

### Environment variables

| Variable | Description |
|---|---|
| `BOT_TOKEN` | Telegram bot token |
| `OSU_CLIENT_ID` | osu! OAuth client ID |
| `OSU_CLIENT_SECRET` | osu! OAuth client secret |
| `DB_URI` | MongoDB connection string |
| `CACHE_CHAT_ID` | Chat ID used to cache rendered cards |

### Run

```bash
npm start      # production
npm run dev    # watch mode
```

### Docker

The image is based on the official Playwright image; Chromium is preinstalled.

```bash
docker compose up --build -d
```

Pushes to `master` are deployed automatically via [GitHub Actions](.github/workflows/deploy.yml).

## Developers

[@Subarash\_ii](https://t.me/Subarash_ii) · [@Samedy\_y](https://t.me/Samedy_y) · [@paarvex](https://t.me/paarvex)

## License

[MIT](LICENSE) © 2025 Maksym Ryaboshapka
