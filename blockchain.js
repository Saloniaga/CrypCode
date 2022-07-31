const Block = require("./block");
const cryptoHash = require("./crypto-hash");
const crystoHash = require("./crypto-hash");
class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      data,
      lastBlock: this.chain[this.chain.length - 1],
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error("the incoming chain must be longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("the incoming chain must be valid");
      return;
    }
    console.log("repacing chain with ", chain);
    this.chain = chain;
  }
  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const actualLastHash = chain[i - 1].hash;

      const { timestamp, data, hash, lastHash } = chain[i];

      if (actualLastHash !== lastHash) return false;

      const validatedHash = cryptoHash(timestamp, data, lastHash);
      if (validatedHash !== hash) return false;
    }
    return true;
  }
}
module.exports = Blockchain;
