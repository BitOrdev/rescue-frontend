import { ethers } from "../../ethers/ethers@6.5.0.js";

// ---------- MAIN FUNCTION ----------
async function readContract({ rpcUrl }, tx) {
  let provider;

  try {
    provider = new ethers.JsonRpcProvider(rpcUrl);
    await provider.getBlockNumber();
  } catch {
    return { status: false, data: { message: "RPC URL invalid." } };
  }

  const { to, data, value } = tx;

  if (typeof data === "object" && data.abi && data.functionName) {
    const iface = new ethers.Interface(data.abi);
    const encodedData = iface.encodeFunctionData(
      data.functionName,
      data.args || []
    );

    return await callContract(provider, {
      to,
      data: encodedData,
      value: value ?? 0n,
      abi: data.abi,
      functionName: data.functionName,
    });
  } else if (typeof data === "string" && data.startsWith("0x")) {
    return await callContract(provider, { to, data, value: value ?? 0n });
  } else {
    return {
      status: false,
      data: { message: "Invalid data format. Must be object or raw hex." },
    };
  }
}

async function callContract(provider, { to, data, value, abi, functionName }) {
  try {
    const result = await provider.call({ to, data, value });

    if (abi && functionName) {
      try {
        const iface = new ethers.Interface(abi);
        const decoded = iface.decodeFunctionResult(functionName, result);
        return { status: true, data: decoded };
      } catch {
        return { status: true, data: result };
      }
    }

    return { status: true, data: result };
  } catch (error) {
    return { status: false, data: { message: error.reason || error.message } };
  }
}

export { readContract };
