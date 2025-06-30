import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Key, Copy, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WalletGenerationProps {
  onWalletGenerated: (walletData: {
    address: string;
    privateKey: string;
  }) => void;
}

export const WalletGeneration: React.FC<WalletGenerationProps> = ({ onWalletGenerated }) => {
  const { t } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [walletData, setWalletData] = useState({
    address: '',
    privateKey: ''
  });

  useEffect(() => {
    // Simulate wallet generation
    setTimeout(() => {
      const mockWalletData = {
        address: 'rdmx6-jaaaa-aaaah-qcaiq-cai',
        privateKey: 'demo-private-key-for-voicechain-presentation-do-not-use-in-production'
      };
      setWalletData(mockWalletData);
      setIsGenerating(false);
      setIsGenerated(true);
    }, 3000);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
  };

  const handleCopyPrivateKey = () => {
    navigator.clipboard.writeText(walletData.privateKey);
  };

  const handleProceed = () => {
    onWalletGenerated(walletData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="h-8 w-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isGenerating ? t('generatingWallet') : t('walletGenerated')}
          </h1>
          <p className="text-gray-600">
            {isGenerating 
              ? t('creatingSecureWallet')
              : t('walletReady')
            }
          </p>
        </div>

        {isGenerating && (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-blue-500 font-medium">{t('generatingSecureKeys')}</p>
          </div>
        )}

        {isGenerated && (
          <div className="space-y-6">
            {/* Wallet Address */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{t('walletAddress')}</h3>
                <button
                  onClick={handleCopyAddress}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Copy className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              <p className="text-sm font-mono text-gray-700 break-all">
                {walletData.address}
              </p>
            </div>

            {/* Private Key */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Key className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold text-red-800">{t('privateKey')}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowPrivateKey(!showPrivateKey)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    {showPrivateKey ? (
                      <EyeOff className="h-4 w-4 text-red-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-red-500" />
                    )}
                  </button>
                  <button
                    onClick={handleCopyPrivateKey}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Copy className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-sm font-mono text-red-700 break-all">
                {showPrivateKey ? walletData.privateKey : '•'.repeat(50)}
              </p>
              <div className="mt-3 p-3 bg-red-100 rounded-lg">
                <p className="text-xs text-red-800 font-medium">
                  {t('criticalWarning')}
                </p>
              </div>
            </div>

            <motion.button
              onClick={handleProceed}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{t('accessDashboard')}</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>{t('securedWithCrypto')}</p>
          <p>{t('readyForTransactions')}</p>
        </div>
      </motion.div>
    </div>
  );
};