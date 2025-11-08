class getTokenBalance {
  constructor(rpcUrl, tokenAddress, walletAddress) {
    this.rpcUrl = rpcUrl;
    this.tokenAddress = tokenAddress;
    this.walletAddress = walletAddress;

    this.functionSignatures = {
      balanceOf: "0x70a08231",
      decimals: "0x313ce567",
      symbol: "0x95d89b41",
      name: "0x06fdde03",
    };
  }

  // Make RPC call
  async makeRpcCall(method, params) {
    try {
      const response = await fetch(this.rpcUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: method,
          params: params,
          id: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`RPC Error: ${data.error.message}`);
      }

      return data.result;
    } catch (error) {
      console.error("RPC call failed:", error);
      throw error;
    }
  }

  encodeFunctionCall(functionName, params = []) {
    const functionSignature = this.functionSignatures[functionName];
    if (!functionSignature) {
      throw new Error(`Function signature not found for ${functionName}`);
    }

    let data = functionSignature;
    if (params.length > 0) {
      const paramHex = params[0].replace("0x", "").padStart(64, "0");
      data += paramHex;
    }

    return data;
  }

  async getTokenBalance() {
    try {
      const data = this.encodeFunctionCall("balanceOf", [this.walletAddress]);

      const result = await this.makeRpcCall("eth_call", [
        {
          to: this.tokenAddress,
          data: data,
        },
        "latest",
      ]);

      if (!result || result === "0x") {
        return "0";
      }

      const balance = BigInt(result);
      return balance.toString();
    } catch (error) {
      console.error("Error getting token balance:", error);
      throw error;
    }
  }

  async getTokenDecimals() {
    try {
      const data = this.encodeFunctionCall("decimals");

      const result = await this.makeRpcCall("eth_call", [
        {
          to: this.tokenAddress,
          data: data,
        },
        "latest",
      ]);

      if (!result || result === "0x") {
        return 18;
      }

      return parseInt(result, 16);
    } catch (error) {
      console.error("Error getting token decimals:", error);
      return 18;
    }
  }

  async getFormattedBalance() {
    try {
      const [balance, decimals] = await Promise.all([
        this.getTokenBalance(),
        this.getTokenDecimals(),
      ]);

      const divisor = BigInt(10 ** decimals);
      const rawBalance = BigInt(balance);
      const formattedBalance =
        Number(rawBalance / divisor) +
        Number(rawBalance % divisor) / Number(divisor);

      return {
        balance: balance,
        rawBalance: balance,
        formattedBalance: formattedBalance.toLocaleString("en-US", {
          maximumFractionDigits: decimals,
        }),
        decimals: decimals,
        tokenAddress: this.tokenAddress,
        walletAddress: this.walletAddress,
      };
    } catch (error) {
      console.error("Error getting formatted balance:", error);
      throw error;
    }
  }
}

export { getTokenBalance };