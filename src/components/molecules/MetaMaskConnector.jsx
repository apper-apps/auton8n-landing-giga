import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import useMetaMask from '@/hooks/useMetaMask';

const MetaMaskConnector = ({ 
  className = "",
  showAccount = true,
  size = "default" // "small", "default", "large"
}) => {
  const {
    isConnected,
    account,
    chainId,
    isLoading,
    error,
    isMetaMaskInstalled,
    connect,
    disconnect,
    clearError
  } = useMetaMask();

  // Format account address
  const formatAccount = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get network name
  const getNetworkName = (id) => {
    const networks = {
      '1': 'Ethereum',
      '137': 'Polygon',
      '56': 'BSC',
      '43114': 'Avalanche',
      '42161': 'Arbitrum',
      '10': 'Optimism'
    };
    return networks[id] || `Chain ${id}`;
  };

  // Handle connection
  const handleConnect = async () => {
    try {
      clearError();
      await connect();
    } catch (err) {
      // Error is already handled in the hook
      console.error('Connection failed:', err);
    }
  };

  // Handle disconnection
  const handleDisconnect = async () => {
    try {
      clearError();
      await disconnect();
    } catch (err) {
      console.error('Disconnection failed:', err);
    }
  };

  // If MetaMask is not installed
  if (!isMetaMaskInstalled) {
    return (
      <div className={`${className}`}>
        <Error
          message="MetaMask is not installed. Please install MetaMask to connect your wallet."
          onRetry={() => window.open('https://metamask.io/download/', '_blank')}
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
        />
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Loading 
          message="Connecting to MetaMask..." 
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`${className}`}>
        <Error
          message={error}
          onRetry={clearError}
          className="bg-gray-800/50 border border-gray-700 rounded-lg p-4"
        />
      </div>
    );
  }

  // Connected state
  if (isConnected && account) {
    return (
      <motion.div 
        className={`glass rounded-lg p-4 ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          {showAccount && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <ApperIcon name="Wallet" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {formatAccount(account)}
                </p>
                {chainId && (
                  <p className="text-xs text-gray-400">
                    {getNetworkName(chainId)}
                  </p>
                )}
              </div>
            </div>
          )}
          
          <Button
            variant="outline"
            size={size === "small" ? "sm" : "md"}
            onClick={handleDisconnect}
            className="ml-3"
          >
            <ApperIcon name="LogOut" size={16} className="mr-2" />
            Disconnect
          </Button>
        </div>
      </motion.div>
    );
  }

  // Disconnected state
  return (
    <motion.div 
      className={`${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="primary"
        size={size === "small" ? "sm" : size === "large" ? "lg" : "md"}
        onClick={handleConnect}
        className="w-full"
      >
        <ApperIcon name="Wallet" size={16} className="mr-2" />
        Connect MetaMask
      </Button>
    </motion.div>
  );
};

export default MetaMaskConnector;