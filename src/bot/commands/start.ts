import TelegramBot from "node-telegram-bot-api";
import type { Message } from "node-telegram-bot-api";

export default async function onStart(bot: TelegramBot, msg: Message): Promise<void> {
  const startMsg = `
*📊 Добро пожаловать в Okimi-Chan — вашего помощника для работы со статистикой osu!*

🗓 Наш бот получает актуальные данные через API и создает карточки профилей в виде изображения. Теперь делиться своими достижениями стало еще проще.

*Основные функции:*
📈 *Просмотр статистики:* Используйте /user ник\\_игрока
🔗 *Привязка аккаунта:* Команда /link ник\\_игрока
👤 *Ваш профиль:* Быстрый доступ через /me
🌎 *Используйте где угодно* с помощью @okimi\\_chan\\_bot ник\\_игрока, вы можете использовать бота в личных чатах, и группах где его нет


Для полного списка команд и дополнительной информации используйте /help

*🛠️ Разработчики:*
@Subarash_ii • @ByteMe6 • @ArchiPank
`;

  await bot.sendSticker(msg.chat.id, "CAACAgIAAxkBAAE-NAVpIb_kUswE4rTMPRRfSjvOTsXS_AACZ4EAAulSIUtSawUNN0GDCzYE");
  await bot.sendMessage(msg.chat.id, startMsg, { parse_mode: "Markdown" });
}