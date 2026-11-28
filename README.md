<div align="center">

# Okimi-Chan Bot

**Telegram bot that renders osu! player stats into shareable profile card images.**

[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?logo=telegram&logoColor=white)](https://t.me/okimi_chan_bot)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com)
[![License: MIT](https://img.shields.io/badge/License%3A%20MIT-green)](./LICENSE)

[Overview](#overview) · [Commands](#commands) · [Installation](#installation) · [Configuration](#configuration) · [License](#license)

</div>

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
- Telegram bot token ([@BotFather](https://t.me/BotFather))
- osu! OAuth client ([account settings → OAuth](https://osu.ppy.sh/home/account/edit#oauth))

> [!NOTE]
> MongoDB is not required on the host — it runs as a container alongside the bot via Docker Compose.

## Installation

### Docker (recommended)

```bash
git clone https://github.com/subarash-ii/okimi-chan-bot.git
cd okimi-chan-bot
touch .env
```

Fill in the [environment variables](#configuration) in `.env`, then start both containers:

```bash
docker compose up --build -d
```

The image is based on the official Playwright image, so Chromium is preinstalled. Pushes to `master` are deployed automatically via [GitHub Actions](.github/workflows/deploy.yml).

### Manual

```bash
git clone https://github.com/subarash-ii/okimi-chan-bot.git
cd okimi-chan-bot
npm install
npx playwright install chromium
touch .env
```

Provide a `DB_URI` pointing to your MongoDB instance in `.env`, then run:

```bash
npm start      # production
npm run dev    # watch mode
```

## Configuration

Create a `.env` file in the project root:

| Variable | Description | Required |
|---|---|---|
| `BOT_TOKEN` | Telegram bot token from [@BotFather](https://t.me/BotFather) | ✅ |
| `OSU_CLIENT_ID` | osu! OAuth client ID | ✅ |
| `OSU_CLIENT_SECRET` | osu! OAuth client secret | ✅ |
| `DB_URI` | MongoDB connection string. In Docker it defaults to `mongodb://mongo:27017/okimi-chan` | ✅ |
| `CACHE_CHAT_ID` | Chat ID used to cache rendered cards | ✅ |

## License

Distributed under the [MIT](LICENSE) license.