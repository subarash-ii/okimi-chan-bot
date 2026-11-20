import TelegramBot from "node-telegram-bot-api";
import type { CallbackQuery } from "node-telegram-bot-api";
import type { Message } from "node-telegram-bot-api";
import { Queries } from "../queries.ts";
import Link from "../../db/models/Link.ts";
import log from "../../services/logs/logger.ts";

export default async function onCallback(bot: TelegramBot, query: CallbackQuery): Promise<Message | undefined> {
  await bot.answerCallbackQuery(query.id);

  if (!query.message?.chat.id) {
    return;
  }

  try {
    await bot.deleteMessage(query.message?.chat.id, query.message?.message_id);
  } catch {
    return;
  }

  const tgName = query.from.username;

  if (!tgName) {
    return;
  }

  if (query.data === Queries.Unlink) {
    const link = await Link.findOne({ tgName });

    if (!link) {
      await bot.sendMessage(query.message?.chat.id, `Ваш Telegram-аккаунт @${ tgName } не привязан к osu! профилю.`);
      return;
    }

    const { osuName } = link;
    await Link.deleteOne({ osuName });

    await bot.sendMessage(query.message?.chat.id, `**Привязка успешно удалена.** Ваш Telegram-аккаунт больше не связан с профилем *${ osuName }*.`, { parse_mode: "Markdown" });

    log("INFO", `${ tgName } unlinked his account from ${ osuName }`);

  } else if (query.data === Queries.Null) {

    await bot.sendMessage(query.message?.chat.id, "Отвязка отменена.");

  }
}
