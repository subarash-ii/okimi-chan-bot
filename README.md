<div align="center">

<img src="assets/bg.png" alt="Okimi-Chan" width="300">

# Okimi-Chan Bot

**A Telegram bot that turns osu! player stats into beautiful shareable profile cards.**

[![Telegram](https://img.shields.io/badge/Telegram-@okimi__chan__bot-26A5E4?logo=telegram&logoColor=white)](https://t.me/okimi_chan_bot)
[![osu!](https://img.shields.io/badge/osu!-API%20v2-FF66AA?logo=osu&logoColor=white)](https://osu.ppy.sh/docs/index.html)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](#-running-with-docker)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## ✨ What it does

Okimi-Chan fetches live player data from the **osu! API v2** and renders it into a high-resolution stat card image — pp, global & country rank, accuracy, level, playcount and more — right inside Telegram.

- 🖼 **Image cards** — profiles rendered from an HTML/CSS template via headless Chromium (Playwright), 3× device scale for crisp output
- 🔗 **Account linking** — bind your Telegram account to an osu! username once, then just type `/me`
- 🌐 **Inline mode** — type `@okimi_chan_bot <username>` in *any* chat, even where the bot isn't added
- ⚡ **Smart caching** — rendered cards are uploaded once and re-served via Telegram `file_id`
- 📎 **Extras** — quick links to [osu!track](https://ameobea.me/osutrack/) and [osu!Skills](https://osuskills.com/), achievements & ranked score summary

## 🤖 Commands

| Command | Description |
|---|---|
| `/start` | Welcome message and quick overview |
| `/help` | Full command reference |
| `/user <username>` | Stat card for any osu! player |
| `/link <username>` | Link your Telegram account to an osu! profile |
| `/me` | Stat card for your linked profile |
| `/unlink` | Remove the current link |
| `@okimi_chan_bot <username>` | Inline mode — works in any chat |

## 🏗 How it works

```
Telegram update ──▶ bot handlers ──▶ osu! API v2 (OAuth client credentials)
                                          │
                                          ▼
                       Handlebars template (userCard.hbs + CSS)
                                          │
                                          ▼
                    Playwright (headless Chromium) screenshot ──▶ JPEG card
                                          │
                                          ▼
                 cache chat upload ──▶ file_id ──▶ answer to the user
```

Account links are stored in **MongoDB** (Mongoose). A single shared browser instance is reused across renders and closed gracefully on `SIGINT`/`SIGTERM`.

## 🚀 Getting started

### Prerequisites

- **Node.js 20+** (or Docker — see below)
- **MongoDB** instance (local or [Atlas](https://www.mongodb.com/atlas))
- A **Telegram bot token** from [@BotFather](https://t.me/BotFather)
- An **osu! OAuth client** — create one at [osu! account settings → OAuth](https://osu.ppy.sh/home/account/edit#oauth)

### Setup

```bash
git clone https://github.com/subarash-ii/okimi-chan-bot.git
cd okimi-chan-bot
npm install
npx playwright install chromium   # browser for card rendering
cp .env.example .env              # then fill in your values
```

### Configuration

All configuration lives in `.env` (see [`.env.example`](.env.example)):

| Variable | Description |
|---|---|
| `BOT_TOKEN` | Telegram bot token from @BotFather |
| `OSU_CLIENT_ID` | osu! OAuth client ID |
| `OSU_CLIENT_SECRET` | osu! OAuth client secret |
| `DB_URI` | MongoDB connection string |
| `CACHE_CHAT_ID` | ID of a private chat/channel used to cache rendered cards (add the bot there and grab the chat ID) |

### Run

```bash
npm start      # production
npm run dev    # development with hot reload (tsx watch)
```

## 🐳 Running with Docker

The image is based on the official Playwright image, so Chromium comes preinstalled:

```bash
docker compose up --build -d
```

Deployment to production happens automatically via [GitHub Actions](.github/workflows/deploy.yml) on every push to `master`.

## 📁 Project structure

```
src/
├── index.ts              # entry point: DB connect + polling + graceful shutdown
├── bot.ts                # bot instance & command routing
├── bot/
│   ├── commands/         # /start, /help, /user, /link, /me, /unlink
│   ├── inline/           # inline query handler
│   └── handlers/         # callback handlers
├── services/
│   ├── osu/              # osu! API v2 client (token + user fetch)
│   ├── render/           # Handlebars → Playwright card renderer
│   └── logs/             # logger
├── templates/            # userCard.hbs + userCard.css
├── db/                   # Mongoose models & schemas
└── config/               # typed env configuration
```

## 👥 Developers

Made with ❤️ by
[@Subarash\_ii](https://t.me/Subarash_ii) • [@Samedy\_y](https://t.me/Samedy_y) • [@paarvex](https://t.me/paarvex)

## 📄 License

[MIT](LICENSE) © 2025 Maksym Ryaboshapka
