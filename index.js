const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

const token = process.env.TG_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const banPhrases = config.banPhrases.map(el => el.toLowerCase());
const { watchGroupNames } = config;

const clearMessage = async (tgMessage) => {
  const isForbiddenMessage = banPhrases.find((phrase) => {
    if (!tgMessage.text) {
      return false;
    }
    const text = tgMessage.text.toLowerCase();
    return text.includes(phrase);
  });

  const isWatchedChannel = watchGroupNames.find(name =>
    (tgMessage.chat.username ? name === tgMessage.chat.username : false));

  if (isWatchedChannel && isForbiddenMessage) {
    try {
      await bot.kickChatMember(tgMessage.chat.id, tgMessage.from.id);
      await bot.deleteMessage(tgMessage.chat.id, tgMessage.message_id);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  }
};

bot.on('message', clearMessage);
