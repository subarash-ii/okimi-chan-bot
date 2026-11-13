import TelegramBot, { type CallbackQuery } from "node-telegram-bot-api";
import Link from "../../db/models/Link.ts";
import log from "../../services/logs/logger.ts";

export default async function unlinkHandler(bot: TelegramBot, query: CallbackQuery) {
  await bot.answerCallbackQuery(query.id);

  const tgName = query.from.username;

  if (!tgName) {
    return;
  }

  const link = await Link.findOne({ tgName });

  if (!link) {
    return;
  }

  const { osuName } = link;

  await Link.deleteOne({ osuName });

  if (!query.message?.chat.id) {
    return;
  }

  const osuSafeName = osuName
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

  await bot.sendMessage(query.message.chat.id, `<b>Привязка успешно удалена.</b> Ваш Telegram-аккаунт больше не связан с профилем <b>${ osuSafeName }</b>.`, { parse_mode: "HTML" });

  log("INFO", `${ tgName } unlinked his account from ${ osuName }`);
}