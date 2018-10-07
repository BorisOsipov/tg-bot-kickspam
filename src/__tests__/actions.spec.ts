import {notify, restrictUser} from "../actions";

const message = require("./fixtures/messageWithLink.json");

describe("#restrictUser", () => {
  let bot: any;

  beforeEach(() => {
    bot = {
      deleteMessage: jest.fn(() => {}),
      kickChatMember: jest.fn(() => {}),
    };
  });

  test("should delete spam message", async () => {
    await restrictUser(bot as any, message);

    expect(bot.deleteMessage).toBeCalledTimes(1);
    expect(bot.deleteMessage).toBeCalledWith(message.chat.id, message.message_id.toString());
  });

  test("should ban user", async () => {
    await restrictUser(bot as any, message);

    expect(bot.kickChatMember).toBeCalledTimes(1);
    expect(bot.kickChatMember).toBeCalledWith(message.chat.id, message.from.id.toString());
  });
});

describe("#notify", () => {
  test("should send some info to chat", async () => {
    const bot = {
      sendMessage: jest.fn(() => {}),
    };
    await notify(bot as any, message);
    expect(bot.sendMessage).toBeCalledTimes(1);
  });
});
