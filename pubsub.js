const PubNub = require("pubnub");

const credentials = {
  publishKey: "pub-c-e3bdc200-7be5-4960-94f4-6fad0d41155d",
  subscribeKey: "sub-c-c4d1ef89-6409-4b92-9248-ec8fbf62a6c2",
  secretKey: "sec-c-NzNkYmMxYzUtNGExOC00ZTkzLWFjOWEtMzY4NDI4MjFhMzQ0",
};

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
  //   TRANSACTION: 'TRANSACTION'
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    // this.transactionPool = transactionPool;
    // this.wallet = wallet;

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
        const parsedMessage = JSON.parse(message);

        switch (channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(parsedMessage, true, () => {
              //   this.transactionPool.clearBlockchainTransactions({
              //     chain: parsedMessage.chain,
              //   });
            });
            break;
          //   case CHANNELS.TRANSACTION:
          //     if (
          //       !this.transactionPool.existingTransaction({
          //         inputAddress: this.wallet.publicKey,
          //       })
          //     ) {
          //       this.transactionPool.setTransaction(parsedMessage);
          //     }
          //     break;
          default:
            return;
        }
      },
    };
  }
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  //   subscribeToChannels() {
  //     this.pubnub.subscribe({
  //       channels: [Object.values(CHANNELS)],
  //     });
  //   }

  publish({ channel, message }) {
    // there is an unsubscribe function in pubnub
    // but it doesn't have a callback that fires after success
    // therefore, redundant publishes to the same local subscriber will be accepted as noisy no-ops
    this.pubnub.publish({ message, channel });
  }
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

module.exports = PubSub;
