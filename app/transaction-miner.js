class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }
  mineTransaction() {
    //get the transacrion pools valid transactions
    //generate the miners reward
    //add a block consisteing of these transactions to the blokcchain
    //broadcast the updated blokchain
    //clear the pool
  }
}
module.exports = TransactionMiner;
