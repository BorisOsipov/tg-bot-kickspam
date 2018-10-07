import * as TelegramBot from "node-telegram-bot-api";
import {Message} from "node-telegram-bot-api";
import {notify, restrictUser} from "./actions";
import {containsLink, isWatchedChannel} from "./filters";
import {messagesLogger} from "./logger";

const token = process.env.TG_TOKEN;
const bot = new TelegramBot(token, { polling: true });

export const checkMessage = async (message: Message) => {
  messagesLogger.info(JSON.stringify(message, null, 2));
  if (isWatchedChannel(message) && containsLink(message)) {
    await restrictUser(bot, message);
    await notify(bot, message);
    return true;
  }
  return false;
};

bot.on("message", checkMessage);
