require("chai")
  .use(require("chai-as-promised"))
  .should();

const Color = artifacts.require("./Color.sol");

contract("Color", (accounts) => {
  let contract;

  before(async () => {
    contract = await Color.deployed();
  });

  describe("Deploy contract", async () => {
    it("should deploy successfully", async () => {
      console.log(contract.address);
      assert.notEqual(contract.address, 0x0);
      assert.notEqual(contract.address, "");
      assert.notEqual(contract.address, null);
      assert.notEqual(contract.address, undefined);
    });

    it("should return name", async () => {
      const name = await contract.name();
      assert.equal(name, "MyColor");
    });

    it("should return symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "MyC");
    });
  });

  describe("Mint new token", async () => {
    it("should mint new token", async () => {
      await contract.mint(
        "#000000",
        "QmfMGDjV5rfohHmdR3V3YasvskokLMF5y3MgNgTZyYL7wa"
      );
      let balance = await contract.balanceOf(accounts[0]);
      balance = Number(balance.toString());
      assert.notEqual(balance, 0);
    });
  });

  describe("Token URI", async () => {
    it("should return tokenURI", async () => {
      const tokenURI = await contract.tokenURI(0);
      assert.equal(
        tokenURI,
        "ipfs://QmfMGDjV5rfohHmdR3V3YasvskokLMF5y3MgNgTZyYL7wa"
      );
    });
  });

  describe("Minting duplicated color", async () => {
    it("should throw error", async () => {
      await contract.mint(
        "#000000",
        "QmfMGDjV5rfohHmdR3V3YasvskokLMF5y3MgNgTZyYL7wa"
      ).should.be.rejected;
    });
  });
});
