import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, QrCode, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ReceivePageProps {
  onBack: () => void;
}

export const ReceivePage: React.FC<ReceivePageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [selectedToken, setSelectedToken] = useState('ICP');
  const [copied, setCopied] = useState(false);

  const tokens = [
    { symbol: 'ICP', name: 'Internet Computer', address: 'rdmx6-jaaaa-aaaah-qcaiq-cai' },
    { symbol: 'ckBTC', name: 'Chain Key Bitcoin', address: 'rdmx6-jaaaa-aaaah-qcaiq-cai' },
    { symbol: 'ckETH', name: 'Chain Key Ethereum', address: 'rdmx6-jaaaa-aaaah-qcaiq-cai' },
    { symbol: 'USDT', name: 'Tether USD', address: 'rdmx6-jaaaa-aaaah-qcaiq-cai' }
  ];

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);
  const voiceId = 'myusername.voice';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{t('receiveCrypto')}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Token Selection */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Token</h2>
            <div className="grid grid-cols-2 gap-2">
              {tokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token.symbol)}
                  className={`p-3 rounded-xl border-2 transition-colors ${
                    selectedToken === token.symbol
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{token.symbol}</p>
                    <p className="text-xs text-gray-500">{token.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* VoiceChain ID */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">VoiceChain ID</h2>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Your Voice ID</p>
                  <p className="text-lg font-bold text-blue-800">{voiceId}</p>
                </div>
                <button
                  onClick={() => handleCopy(voiceId)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                Share this ID for easy VoiceChain-to-VoiceChain transfers
              </p>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedToken} Address
            </h2>
            
            {/* QR Code Placeholder */}
            <div className="bg-gray-100 rounded-xl p-8 mb-4 flex items-center justify-center">
              <div className="text-center">
                <QrCode className="h-24 w-24 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">QR Code for {selectedToken}</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-3">
                  <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                  <p className="text-sm font-mono text-gray-800 break-all">
                    {selectedTokenData?.address}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(selectedTokenData?.address || '')}
                  className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-xs text-yellow-800">
                ⚠️ Only send {selectedToken} to this address. Sending other tokens may result in permanent loss.
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Receive</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <p>Share your VoiceChain ID ({voiceId}) for easy transfers from other VoiceChain users</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">2</span>
                </div>
                <p>Or share your wallet address for transfers from external wallets and exchanges</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-600">3</span>
                </div>
                <p>Transactions typically confirm within 2-5 seconds on the Internet Computer network</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};