import { ethers } from 'ethers';

/**
 * Web3 utility functions for blockchain operations
 */

// Validate Ethereum address
export const isValidAddress = (address) => {
  try {
    return ethers.isAddress(address);
  } catch (error) {
    return false;
  }
};

// Format Ethereum address for display
export const formatAddress = (address, length = 4) => {
  if (!address || !isValidAddress(address)) return '';
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
};

// Convert Wei to Ether
export const weiToEther = (wei) => {
  try {
    return ethers.formatEther(wei);
  } catch (error) {
    console.error('Error converting wei to ether:', error);
    return '0';
  }
};

// Convert Ether to Wei
export const etherToWei = (ether) => {
  try {
    return ethers.parseEther(ether.toString());
  } catch (error) {
    console.error('Error converting ether to wei:', error);
    return BigInt(0);
  }
};

// Format token amount with decimals
export const formatTokenAmount = (amount, decimals = 18, displayDecimals = 4) => {
  try {
    const formatted = ethers.formatUnits(amount, decimals);
    const num = parseFloat(formatted);
    return num.toFixed(displayDecimals);
  } catch (error) {
    console.error('Error formatting token amount:', error);
    return '0';
  }
};

// Parse token amount to BigInt
export const parseTokenAmount = (amount, decimals = 18) => {
  try {
    return ethers.parseUnits(amount.toString(), decimals);
  } catch (error) {
    console.error('Error parsing token amount:', error);
    return BigInt(0);
  }
};

// Get network configuration
export const getNetworkConfig = (chainId) => {
  const networks = {
    '1': {
      name: 'Ethereum Mainnet',
      currency: 'ETH',
      decimals: 18,
      blockExplorer: 'https://etherscan.io',
      rpcUrl: 'https://mainnet.infura.io/v3/'
    },
    '137': {
      name: 'Polygon',
      currency: 'MATIC',
      decimals: 18,
      blockExplorer: 'https://polygonscan.com',
      rpcUrl: 'https://polygon-rpc.com'
    },
    '56': {
      name: 'Binance Smart Chain',
      currency: 'BNB',
      decimals: 18,
      blockExplorer: 'https://bscscan.com',
      rpcUrl: 'https://bsc-dataseed.binance.org'
    },
    '43114': {
      name: 'Avalanche',
      currency: 'AVAX',
      decimals: 18,
      blockExplorer: 'https://snowtrace.io',
      rpcUrl: 'https://api.avax.network/ext/bc/C/rpc'
    },
    '42161': {
      name: 'Arbitrum One',
      currency: 'ETH',
      decimals: 18,
      blockExplorer: 'https://arbiscan.io',
      rpcUrl: 'https://arb1.arbitrum.io/rpc'
    },
    '10': {
      name: 'Optimism',
      currency: 'ETH',
      decimals: 18,
      blockExplorer: 'https://optimistic.etherscan.io',
      rpcUrl: 'https://mainnet.optimism.io'
    },
    // Testnets
    '11155111': {
      name: 'Sepolia Testnet',
      currency: 'SepoliaETH',
      decimals: 18,
      blockExplorer: 'https://sepolia.etherscan.io',
      rpcUrl: 'https://sepolia.infura.io/v3/'
    },
    '80001': {
      name: 'Mumbai Testnet',
      currency: 'MATIC',
      decimals: 18,
      blockExplorer: 'https://mumbai.polygonscan.com',
      rpcUrl: 'https://rpc-mumbai.maticvigil.com'
    }
  };

  return networks[chainId] || {
    name: `Unknown Network (${chainId})`,
    currency: 'ETH',
    decimals: 18,
    blockExplorer: '',
    rpcUrl: ''
  };
};

// Generate block explorer URL
export const getBlockExplorerUrl = (chainId, hash, type = 'tx') => {
  const network = getNetworkConfig(chainId);
  if (!network.blockExplorer) return '';
  
  const baseUrl = network.blockExplorer;
  
  switch (type) {
    case 'tx':
      return `${baseUrl}/tx/${hash}`;
    case 'address':
      return `${baseUrl}/address/${hash}`;
    case 'block':
      return `${baseUrl}/block/${hash}`;
    case 'token':
      return `${baseUrl}/token/${hash}`;
    default:
      return baseUrl;
  }
};

// Validate transaction hash
export const isValidTxHash = (hash) => {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
};

// Validate block number
export const isValidBlockNumber = (blockNumber) => {
  return /^\d+$/.test(blockNumber.toString()) && parseInt(blockNumber) >= 0;
};

// Format gas price in Gwei
export const formatGasPrice = (gasPrice) => {
  try {
    const gwei = ethers.formatUnits(gasPrice, 'gwei');
    return `${parseFloat(gwei).toFixed(2)} Gwei`;
  } catch (error) {
    console.error('Error formatting gas price:', error);
    return '0 Gwei';
  }
};

// Calculate transaction fee
export const calculateTxFee = (gasUsed, gasPrice) => {
  try {
    const fee = BigInt(gasUsed) * BigInt(gasPrice);
    return ethers.formatEther(fee);
  } catch (error) {
    console.error('Error calculating transaction fee:', error);
    return '0';
  }
};

// Generate random wallet (for testing only)
export const generateRandomWallet = () => {
  try {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase || ''
    };
  } catch (error) {
    console.error('Error generating random wallet:', error);
    return null;
  }
};

// Validate mnemonic phrase
export const isValidMnemonic = (mnemonic) => {
  try {
    ethers.Mnemonic.fromPhrase(mnemonic);
    return true;
  } catch (error) {
    return false;
  }
};

// Validate private key
export const isValidPrivateKey = (privateKey) => {
  try {
    new ethers.Wallet(privateKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Add hex prefix if missing
export const addHexPrefix = (value) => {
  if (typeof value !== 'string') return value;
  return value.startsWith('0x') ? value : `0x${value}`;
};

// Remove hex prefix
export const removeHexPrefix = (value) => {
  if (typeof value !== 'string') return value;
  return value.startsWith('0x') ? value.slice(2) : value;
};

// Convert number to hex
export const toHex = (value) => {
  return `0x${parseInt(value).toString(16)}`;
};

// Convert hex to number
export const fromHex = (value) => {
  return parseInt(value, 16);
};

// Wait for transaction confirmation
export const waitForTransaction = async (provider, txHash, confirmations = 1) => {
  try {
    const receipt = await provider.waitForTransaction(txHash, confirmations);
    return receipt;
  } catch (error) {
    console.error('Error waiting for transaction:', error);
    throw error;
  }
};

// Get current gas price
export const getCurrentGasPrice = async (provider) => {
  try {
    const gasPrice = await provider.getFeeData();
    return gasPrice;
  } catch (error) {
    console.error('Error getting gas price:', error);
    throw error;
  }
};

// Estimate gas for transaction
export const estimateGas = async (signer, transaction) => {
  try {
    const gasEstimate = await signer.estimateGas(transaction);
    return gasEstimate;
  } catch (error) {
    console.error('Error estimating gas:', error);
    throw error;
  }
};

export default {
  isValidAddress,
  formatAddress,
  weiToEther,
  etherToWei,
  formatTokenAmount,
  parseTokenAmount,
  getNetworkConfig,
  getBlockExplorerUrl,
  isValidTxHash,
  isValidBlockNumber,
  formatGasPrice,
  calculateTxFee,
  generateRandomWallet,
  isValidMnemonic,
  isValidPrivateKey,
  addHexPrefix,
  removeHexPrefix,
  toHex,
  fromHex,
  waitForTransaction,
  getCurrentGasPrice,
  estimateGas
};