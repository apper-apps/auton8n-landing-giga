import { useState, useEffect, useCallback } from 'react';
import metamaskService from '@/services/web3/metamaskService';

const useMetaMask = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  // Initialize MetaMask state
  const initializeMetaMask = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if MetaMask is installed
      const installed = metamaskService.isMetaMaskInstalled();
      setIsMetaMaskInstalled(installed);

      if (!installed) {
        setError('MetaMask is not installed');
        return;
      }

      // Check if already connected
      const currentAccount = await metamaskService.getCurrentAccount();
      if (currentAccount) {
        setAccount(currentAccount);
        setIsConnected(true);

        // Get network info
        try {
          const network = await metamaskService.getNetwork();
          setChainId(network.chainId);
        } catch (networkError) {
          console.warn('Could not get network info:', networkError);
        }
      }
    } catch (err) {
      console.error('Error initializing MetaMask:', err);
      setError(err.message || 'Failed to initialize MetaMask');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Connect to MetaMask
  const connect = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await metamaskService.connect();
      
      if (result.success) {
        setAccount(result.account);
        setChainId(result.chainId);
        setIsConnected(true);
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || 'Failed to connect to MetaMask';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Disconnect from MetaMask
  const disconnect = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await metamaskService.disconnect();
      
      setAccount(null);
      setChainId(null);
      setIsConnected(false);
    } catch (err) {
      const errorMessage = err.message || 'Failed to disconnect from MetaMask';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Switch network
  const switchNetwork = useCallback(async (targetChainId) => {
    try {
      setIsLoading(true);
      setError(null);

      await metamaskService.switchNetwork(targetChainId);
      setChainId(targetChainId);
    } catch (err) {
      const errorMessage = err.message || `Failed to switch to network ${targetChainId}`;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Handle MetaMask events
  useEffect(() => {
    const handleMetaMaskEvent = (event) => {
      switch (event.type) {
        case 'CONNECTION_SUCCESS':
          setAccount(event.account);
          setChainId(event.chainId);
          setIsConnected(true);
          setError(null);
          break;

        case 'CONNECTION_ERROR':
          setError(event.error);
          setIsConnected(false);
          break;

        case 'ACCOUNT_CHANGED':
          setAccount(event.account);
          setError(null);
          break;

        case 'ACCOUNT_DISCONNECTED':
          setAccount(null);
          setIsConnected(false);
          break;

        case 'CHAIN_CHANGED':
          setChainId(event.chainId);
          break;

        case 'DISCONNECTED':
          setAccount(null);
          setChainId(null);
          setIsConnected(false);
          break;

        case 'DISCONNECTION_SUCCESS':
          setAccount(null);
          setChainId(null);
          setIsConnected(false);
          setError(null);
          break;

        default:
          break;
      }
    };

    // Add event listener
    const removeListener = metamaskService.addEventListener(handleMetaMaskEvent);

    // Initialize on mount
    initializeMetaMask();

    // Cleanup
    return () => {
      removeListener();
    };
  }, [initializeMetaMask]);

  return {
    // State
    isConnected,
    account,
    chainId,
    isLoading,
    error,
    isMetaMaskInstalled,

    // Actions
    connect,
    disconnect,
    switchNetwork,
    clearError,
    
    // Utils
    getConnectionStatus: () => metamaskService.getConnectionStatus()
  };
};

export default useMetaMask;