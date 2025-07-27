// Legacy file for backward compatibility
// This file has been restructured for better maintainability
// New MetaMask integration is located in:
// - src/services/web3/metamaskService.js (Core service)
// - src/hooks/useMetaMask.js (React hook)
// - src/components/molecules/MetaMaskConnector.jsx (UI component)

import metamaskService from '@/services/web3/metamaskService';

// Export the main service for backward compatibility
export default metamaskService;

// Legacy function exports
export const connectMetaMask = () => metamaskService.connect();
export const disconnectMetaMask = () => metamaskService.disconnect();
export const isMetaMaskInstalled = () => metamaskService.isMetaMaskInstalled();
export const getCurrentAccount = () => metamaskService.getCurrentAccount();
export const getNetwork = () => metamaskService.getNetwork();

// Error handling wrapper for legacy code
export const handleMetaMaskError = (error) => {
  console.error('MetaMask Error:', error);
  
  let message = 'Failed to connect to MetaMask';
  
  if (error.code === 4001) {
    message = 'Connection rejected by user';
  } else if (error.code === -32002) {
    message = 'Connection request pending';
  } else if (error.message) {
    message = error.message;
  }
  
  return message;
};

// Initialize MetaMask connection
export const initializeMetaMask = async () => {
  try {
    if (!metamaskService.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }
    
    const account = await metamaskService.getCurrentAccount();
    return account;
  } catch (error) {
    throw new Error(handleMetaMaskError(error));
  }
};