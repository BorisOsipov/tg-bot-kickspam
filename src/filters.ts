import {Message} from "node-telegram-bot-api";
const config = require("./config/config.json");
const { watchGroupNames } = config;

const TELEGRAM_URL_PATTERN = "/join2chat/";

export const isMessageContainsLink = (message: Message) => {
  if (message.text) {
    return message.text.toLowerCase().includes(TELEGRAM_URL_PATTERN);
  }
  return false;
};

export const isForwardContainsLink = (message: Message) => {
  if (message.forward_from_message_id && message.caption) {
    return message.caption.toLowerCase().includes(TELEGRAM_URL_PATTERN);
  }
  return false;
};

export const isMessageEntitiesContainLink = (message: Message) => {
  if (message.entities && message.entities.length > 0) {
    return message.entities.some((entity) => {
      if (entity.url) {
        return entity.url.toLowerCase().includes(TELEGRAM_URL_PATTERN);
      }
      return false;
    });
  }
  return false;
};

export const isMessageCaptionEntitiesContainLink = (message: Message) => {
  // @ts-ignore
  if (message.caption_entities && message.caption_entities.length > 0) {
    // @ts-ignore
    return message.caption_entities.some((entity) => {
      if (entity.url) {
        return entity.url.toLowerCase().includes(TELEGRAM_URL_PATTERN);
      }
      return false;
    });
  }
  return false;
};

export const isWatchedChannel = (message: Message): boolean => {
  return watchGroupNames.some((name: string) =>
    (message.chat.username ? name === message.chat.username : false));
};

export const containsLink = (message: Message) => {
  return isMessageContainsLink(message)
    || isForwardContainsLink(message)
    || isMessageEntitiesContainLink(message)
    || isMessageCaptionEntitiesContainLink(message);
};
