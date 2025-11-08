import { ethers } from "../../ethers/ethers@6.5.0.js";

let RPC;
let provider;

// ---------- CONSTANTS ----------
const INTERFACE_ERC165 = ["function supportsInterface(bytes4) view returns (bool)"];
const INTERFACE_ID_ERC721 = "0x80ac58cd";
const INTERFACE_ID_ERC1155 = "0xd9b67a26";

const ERC721_ABI = ["function balanceOf(address) view returns (uint256)"];
const ERC1155_ABI = ["function balanceOf(address,uint256) view returns (uint256)"];

// ---------- MAIN FUNCTIONS ----------

// Detect if the contract is ERC721 or ERC1155
async function detectStandard(address) {
  const contract = new ethers.Contract(address, INTERFACE_ERC165, provider);
  try {
    const isERC721 = await contract.supportsInterface(INTERFACE_ID_ERC721);
    const isERC1155 = await contract.supportsInterface(INTERFACE_ID_ERC1155);

    if (isERC721) return "ERC721";
    if (isERC1155) return "ERC1155";
    return "Unknown";
  } catch {
    return "Unknown";
  }
}

// Get ERC721 NFT balance
async function getERC721Balance(address, owner) {
  const contract = new ethers.Contract(address, ERC721_ABI, provider);
  const balance = await contract.balanceOf(owner);
  return balance.toString();
}

// Get ERC1155 NFT balance for a specific token ID
async function getERC1155Balance(address, owner, tokenId) {
  const contract = new ethers.Contract(address, ERC1155_ABI, provider);
  const balance = await contract.balanceOf(owner, tokenId);
  return balance.toString();
}

// Wrapper function — detects type and gets balance
async function getNFTBalance({ rpcUrl }, nftAddress, wallet, tokenId = 0) {

   RPC = rpcUrl;
   provider = new ethers.JsonRpcProvider(RPC);

  const standard = await detectStandard(nftAddress);

  if (standard === "ERC721") {
    const balance = await getERC721Balance(nftAddress, wallet);
    return { standard, tokenId: null, balance };
  } else if (standard === "ERC1155") {
    const balance = await getERC1155Balance(nftAddress, wallet, tokenId);
    return { standard, tokenId, balance };
  } else {
    throw new Error("Unknown NFT standard or contract does not support ERC165");
  }
}

export { getNFTBalance };