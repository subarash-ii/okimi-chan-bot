import TelegramBot from "node-telegram-bot-api";
import type { Message } from "node-telegram-bot-api";
import Link from "../../../db/models/Link.ts";
import getUser from "../../../services/osu/getUser.ts";
import log from "../../../services/logs/logger.ts";
import cleanUpFormatting from "../../utils/cleanUpFormatting.ts";

export default async function onLink(bot: TelegramBot, msg: Message, match: RegExpExecArray | null): Promise<Message | undefined> {
  const tgName = msg.from?.username;
  const osuName = match && match[1] ? match[1].trim() : null;

  if (!osuName || !tgName) {
    await bot.sendMessage(msg.chat.id, "Пожалуйста, введите имя пользователя после /link");
    return;
  }

  const user = await getUser(osuName);

  if (!user) {

    const osuSafeName = cleanUpFormatting(osuName);

    return await bot.sendMessage(msg.chat.id, `Пользователь <b>${ osuSafeName }</b> не найден.`, { parse_mode: "HTML" });
  }

  await Link.deleteOne({ tgName });

  await Link.create({ tgName, osuName: user.username });

  const osuSafeName = cleanUpFormatting(user.username)

  await bot.sendMessage(
      msg.chat.id,
      `Аккаунт @${ tgName } успешно привязан к <b>${ osuSafeName }</b>. Профиль доступен по команде /me.`, { parse_mode: "HTML" }
  );

  log("INFO", `${ tgName } linked his account to ${ user.username }`);
}