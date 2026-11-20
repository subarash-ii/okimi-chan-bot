import type { Message } from "node-telegram-bot-api";
import TelegramBot from "node-telegram-bot-api";
import Link from "../../../db/models/Link.ts";
import { Queries } from "../../queries.ts";

export default async function onUnlink(bot: TelegramBot, msg: Message): Promise<Message | undefined> {
  const tgName = msg.from?.username;

  if (!tgName) {
    return;
  }

  const candidate = await Link.findOne({ tgName });

  if (!candidate) {
    return await bot.sendMessage(msg.chat.id, `Ваш Telegram-аккаунт @${ tgName } не привязан к osu! профилю.`);
  }

  await bot.sendMessage(msg.chat.id, `**⚠️ Вы действительно хотите отвязать Telegram-аккаунт от osu! профиля** ${ candidate.osuName }**?**`, {
    parse_mode: "Markdown",
    reply_to_message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
        [{ text: "Да ✅", callback_data: Queries.Unlink }, { text: "Нет ❌", callback_data: Queries.Null }]
      ]
    }
  });

}
