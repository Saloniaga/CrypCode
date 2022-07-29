const Blockchain = require("./blockchain");
const Block = require("./block");
describe("BlockChain()", () => {
  //   const blockchain = new Blockchain();
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
  });
  it("contains a `chain` Array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with genesis block", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });
  it("adds a new block to the chain", () => {
    const newData = "foo bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });
  describe("isValidChain()", () => {
    describe("when the chain does not starts with the genesis block", () => {
      it("returns false", () => {
        blockchain.chain[0] = { data: "fake-genesis" };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe("when the chain structure starts with genesis block and has multiple blocks", () => {
      beforeEach(() => {
        blockchain.addBlock({ data: "cat" });
        blockchain.addBlock({ data: "dog" });
        blockchain.addBlock({ data: "horses" });
      });

      describe("and a lashHash ref has changed", () => {
        it("returns false", () => {
          blockchain.chain[2].lastHash = "broken-lastHash";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe("and the chain contains a block with an invalid field", () => {
        it("returns false", () => {
          blockchain.chain[2].data = "some-changed-data";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe("and the chain does not contain any invalid blocks", () => {
        it("returns true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
});
