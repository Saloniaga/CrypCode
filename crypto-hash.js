<<<<<<< HEAD
// const crypto = require("crypto");

// const cryptoHash = (...inputs) => {
//   const hash = crypto.createHash("sha256");
//   hash.update(inputs.sort().join(" "));
//   return hash.digest("hex");
// };
// module.exports = cryptoHash;

=======
>>>>>>> ac04102a482c1fcd47bdafc832259a83823ff333
const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");

  hash.update(
    inputs
      .map((input) => JSON.stringify(input))
      .sort()
      .join(" ")
  );

  return hash.digest("hex");
};

module.exports = cryptoHash;
