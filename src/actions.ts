import * as TelegramBot from "node-telegram-bot-api";
import {Message} from "node-telegram-bot-api";
import {banLogger, errorLogger} from "./logger";
const config = require("./config/config.json");

export async function notify(bot: TelegramBot, tgMessage: Message) {
  try {
    const message = `
Remove and ban message
From: ${tgMessage.from.first_name} ${tgMessage.from.last_name} @${tgMessage.from.username}
Text: ${tgMessage.text}
`;
    await bot.sendMessage(config.forwardToChanelId, message);
  } catch (e) {
    errorLogger.error(e);
  }
}

export async function restrictUser(bot: TelegramBot, message: Message) {
  try {
    await bot.deleteMessage(message.chat.id, message.message_id.toString());
    await bot.kickChatMember(message.chat.id, message.from.id.toString());
    banLogger.warn(JSON.stringify(message, null, 2));
  } catch (e) {
    errorLogger.error(e);
  }
}
