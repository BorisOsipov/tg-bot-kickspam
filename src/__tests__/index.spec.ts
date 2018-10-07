import {checkMessage} from "../index";
const badMessage = require("./fixtures/messageWithLink.json");
const goodMessage = require("./fixtures/goodMessage.json");

describe("#notify", () => {
  test("should send some info to chat", async () => {
      expect(await checkMessage(badMessage)).toEqual(true);
      expect(await checkMessage(goodMessage)).toEqual(false);
  });
});
