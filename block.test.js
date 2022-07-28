const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe("Block", () => {
  const timestamp = "adate";
  const lastHash = "lasthash";
  const hash = "hash";
  const data = ["data1", "data2"];
  const block = new Block({ timestamp, data, hash, lastHash });

  it("has all four parameters.", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
    expect(block.lastHash).toEqual(lastHash);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("returns a genesis block", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });
    it("returns genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });
});
