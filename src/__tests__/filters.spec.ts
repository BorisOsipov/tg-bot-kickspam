import {isForwardContainsLink, isMessageContainsLink, isMessageEntitiesContainLink, isWatchedChannel} from "../filters";
const goodMessage = require("./fixtures/goodMessage.json");
const messageWithLink = require("./fixtures/messageWithLink.json");
const forwardWithLink = require("./fixtures/forwardWithLink.json");
const messageWithEntities = require("./fixtures/messageWithEntities.json");

describe("#isWatchedChannel", () => {
  test("should return true for watched chanel", () => {
    expect(isWatchedChannel(goodMessage)).toEqual(true);
  });
  test("should return false for others", () => {
    const fooMessage = Object.assign(goodMessage, {chat: {username: "foo"}});
    expect(isWatchedChannel(fooMessage)).toEqual(false);
  });
});

describe("#isMessageContainsLink", () => {
  test("should return true for message with links", () => {
    expect(isMessageContainsLink(messageWithLink)).toEqual(true);
  });

  test("should return false for message without links", () => {
    const fooMessage = Object.assign(goodMessage, {text: "foo"});
    expect(isMessageContainsLink(fooMessage)).toEqual(false);
  });

  test("should return false for messages without text", () => {
    const fooMessage = Object.assign(goodMessage, {text: undefined});
    expect(isMessageContainsLink(fooMessage)).toEqual(false);
  });

  test("should return false for forward", () => {
    expect(isMessageContainsLink(forwardWithLink)).toEqual(false);
  });
});

describe("#isForwardContainsLink", () => {
  test("should return true for message with links", () => {
    expect(isForwardContainsLink(forwardWithLink)).toEqual(true);
  });

  test("should return false for message without links", () => {
    const fooMessage = Object.assign(forwardWithLink, {caption: "foo"});
    expect(isForwardContainsLink(fooMessage)).toEqual(false);
  });

  test("should return false for messages without caption", () => {
    const fooMessage = Object.assign(forwardWithLink, {caption: undefined});
    expect(isForwardContainsLink(fooMessage)).toEqual(false);
  });

  test("should return false for messages not forward", () => {
    expect(isForwardContainsLink(goodMessage)).toEqual(false);
    expect(isForwardContainsLink(messageWithLink)).toEqual(false);
  });
});

describe("#isMessageEntitiesContainsLink", () => {
  test("should return true for message with links", () => {
    expect(isMessageEntitiesContainLink(messageWithEntities)).toEqual(true);
  });

  test("should return false for message without links", () => {
    const fooMessage = Object.assign(messageWithEntities, {entities: []});
    expect(isMessageEntitiesContainLink(fooMessage)).toEqual(false);
  });

  test("should return false for message without links", () => {
    const fooMessage = Object.assign(messageWithEntities, {entities: [{url: "foo"}]});
    expect(isMessageEntitiesContainLink(fooMessage)).toEqual(false);
  });

  test("should return false for messages without entities", () => {
    const fooMessage = Object.assign(messageWithEntities, {entities: undefined});
    expect(isMessageEntitiesContainLink(fooMessage)).toEqual(false);
  });

});
