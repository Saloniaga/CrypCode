const PubNub = require("pubnub");

const credentials = {
  publishKey: "pub-c-e3bdc200-7be5-4960-94f4-6fad0d41155d",
  subscribeKey: "sub-c-c4d1ef89-6409-4b92-9248-ec8fbf62a6c2",
  secretKey: "sec-c-NzNkYmMxYzUtNGExOC00ZTkzLWFjOWEtMzY4NDI4MjFhMzQ0",
};

const CHANNELS = {
  TEST: "TEST",
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

    this.pubnub.addListener(this.listener());
  }
  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;

        console.log(
          `Message received. Channel: ${channel}. Message: ${message}`
        );
      },
    };
  }
  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

module.exports = PubSub;
