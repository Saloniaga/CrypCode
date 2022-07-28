const cryptoHash = require("./crypto-hash");

describe("cryptoHash()", () => {
  it("generates a SHA-256 hashed output", () => {
    expect(cryptoHash("shaalu")).toEqual(
      "052824ba461c4fb3bc032d6797fe227325fa115d7a7fe84d4689e36b309b888f"
    );
  });
  it("produces the same hash with the same input arguments in any order", () => {
    expect(cryptoHash("one", "two", "three")).toEqual(
      cryptoHash("three", "one", "two")
    );
  });
});
