const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

const token = process.env.TG_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const { watchGroupNames } = config;

const TELEGRAM_URL_REGEX = /(https?:\/\/)?(www[.])?(telegram|t)\.me\/joinchat\/([a-zA-Z0-9_-]*)\/?/ig;

const isMessageContainsLink = (message) => {
  let isLink = false;

  if (message.forward_from_message_id) {
    if (message.caption) {
      isLink = isLink || TELEGRAM_URL_REGEX.test(message.caption);
    }
  }
  return isLink;
};

const performActionsToSender = async (tgMessage) => {
  await bot.deleteMessage(tgMessage.chat.id, tgMessage.message_id);
  await bot.kickChatMember(tgMessage.chat.id, tgMessage.from.id);
};

const clearMessage = async (tgMessage) => {
  const isLink = isMessageContainsLink(tgMessage);

  const isWatchedChannel = watchGroupNames.find(name =>
    (tgMessage.chat.username ? name === tgMessage.chat.username : false));

  if (isWatchedChannel && isLink) {
    try {
      await performActionsToSender(tgMessage);
      const message = `
Remove and ban message
From: ${tgMessage.from.first_name} ${tgMessage.from.last_name} @${tgMessage.from.username}
Text: ${tgMessage.text}
Link: https://t.me/${tgMessage.chat.username}/${tgMessage.message_id}
`;
      await bot.sendMessage(config.forwardToChanelId, message);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }
};

bot.on('message', clearMessage);
