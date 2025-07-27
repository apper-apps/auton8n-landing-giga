import { ethers } from 'ethers';

class MetaMaskService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.isConnected = false;
    this.account = null;
    this.chainId = null;
    this.listeners = new Set();
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled() {
    return typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask;
  }

  // Connect to MetaMask
  async connect() {
    try {
      if (!this.isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask and try again.');
      }

      // Initialize provider and signer
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.account = accounts[0];
      this.isConnected = true;

      // Get network information
      const network = await this.provider.getNetwork();
      this.chainId = network.chainId.toString();

      // Set up event listeners
      this.setupEventListeners();

      // Notify listeners
      this.notifyListeners({
        type: 'CONNECTION_SUCCESS',
        account: this.account,
        chainId: this.chainId
      });

      return {
        success: true,
        account: this.account,
        chainId: this.chainId
      };

    } catch (error) {
      console.error('MetaMask connection error:', error);
      
      let errorMessage = 'Failed to connect to MetaMask';
      
      if (error.code === 4001) {
        errorMessage = 'Connection rejected. Please approve the connection request.';
      } else if (error.code === -32002) {
        errorMessage = 'Connection request pending. Please check MetaMask.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      this.notifyListeners({
        type: 'CONNECTION_ERROR',
        error: errorMessage
      });

      throw new Error(errorMessage);
    }
  }

  // Disconnect from MetaMask
  async disconnect() {
    try {
      this.provider = null;
      this.signer = null;
      this.account = null;
      this.chainId = null;
      this.isConnected = false;

      // Remove event listeners
      this.removeEventListeners();

      this.notifyListeners({
        type: 'DISCONNECTION_SUCCESS'
      });

      return { success: true };
    } catch (error) {
      console.error('MetaMask disconnection error:', error);
      throw new Error('Failed to disconnect from MetaMask');
    }
  }

  // Get current account
  async getCurrentAccount() {
    try {
      if (!this.isMetaMaskInstalled()) {
        throw new Error('MetaMask is not installed');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts && accounts.length > 0) {
        this.account = accounts[0];
        this.isConnected = true;
        return accounts[0];
      }

      this.isConnected = false;
      return null;
    } catch (error) {
      console.error('Error getting current account:', error);
      return null;
    }
  }

  // Get network information
  async getNetwork() {
    try {
      if (!this.provider) {
        throw new Error('Provider not initialized');
      }

      const network = await this.provider.getNetwork();
      return {
        chainId: network.chainId.toString(),
        name: network.name
      };
    } catch (error) {
      console.error('Error getting network:', error);
      throw new Error('Failed to get network information');
    }
  }

  // Switch network
  async switchNetwork(chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${parseInt(chainId).toString(16)}` }],
      });

      this.chainId = chainId;
      return { success: true };
    } catch (error) {
      console.error('Error switching network:', error);
      throw new Error(`Failed to switch to network ${chainId}`);
    }
  }

  // Set up event listeners
  setupEventListeners() {
    if (!window.ethereum) return;

    // Account change
    window.ethereum.on('accountsChanged', this.handleAccountsChanged.bind(this));
    
    // Chain change  
    window.ethereum.on('chainChanged', this.handleChainChanged.bind(this));
    
    // Disconnect
    window.ethereum.on('disconnect', this.handleDisconnect.bind(this));
  }

  // Remove event listeners
  removeEventListeners() {
    if (!window.ethereum) return;

    window.ethereum.removeListener('accountsChanged', this.handleAccountsChanged.bind(this));
    window.ethereum.removeListener('chainChanged', this.handleChainChanged.bind(this));
    window.ethereum.removeListener('disconnect', this.handleDisconnect.bind(this));
  }

  // Handle account changes
  async handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      this.account = null;
      this.isConnected = false;
      this.notifyListeners({
        type: 'ACCOUNT_DISCONNECTED'
      });
    } else {
      this.account = accounts[0];
      this.notifyListeners({
        type: 'ACCOUNT_CHANGED',
        account: this.account
      });
    }
  }

  // Handle chain changes
  handleChainChanged(chainId) {
    this.chainId = parseInt(chainId, 16).toString();
    this.notifyListeners({
      type: 'CHAIN_CHANGED',
      chainId: this.chainId
    });
    
    // Reload page on chain change to avoid issues
    window.location.reload();
  }

  // Handle disconnect
  handleDisconnect() {
    this.account = null;
    this.isConnected = false;
    this.provider = null;
    this.signer = null;
    
    this.notifyListeners({
      type: 'DISCONNECTED'
    });
  }

  // Add event listener
  addEventListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Notify all listeners
  notifyListeners(event) {
    this.listeners.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Error in MetaMask event listener:', error);
      }
    });
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      account: this.account,
      chainId: this.chainId,
      isMetaMaskInstalled: this.isMetaMaskInstalled()
    };
  }
}

// Create singleton instance
const metamaskService = new MetaMaskService();

export default metamaskService;