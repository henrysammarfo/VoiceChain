import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, User, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SendPageProps {
  onBack: () => void;
}

export const SendPage: React.FC<SendPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('ICP');
  const [pin, setPin] = useState('');
  const [step, setStep] = useState<'details' | 'confirm' | 'pin' | 'success'>('details');

  const tokens = [
    { symbol: 'ICP', name: 'Internet Computer', balance: 245.67 },
    { symbol: 'ckBTC', name: 'Chain Key Bitcoin', balance: 0.0847 },
    { symbol: 'ckETH', name: 'Chain Key Ethereum', balance: 1.234 },
    { symbol: 'USDT', name: 'Tether USD', balance: 1500.00 }
  ];

  const handleSend = () => {
    if (step === 'details') {
      setStep('confirm');
    } else if (step === 'confirm') {
      setStep('pin');
    } else if (step === 'pin') {
      setStep('success');
      setTimeout(() => {
        onBack();
      }, 3000);
    }
  };

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);

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
          <h1 className="text-2xl font-bold text-gray-900">{t('sendCrypto')}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          {step === 'details' && (
            <div className="space-y-6">
              {/* Token Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Token
                </label>
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
                        <p className="text-xs text-gray-500">{token.balance.toFixed(4)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('enterRecipient')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="alice.voice or rdmx6-jaaaa-aaaah-qcaiq-cai"
                    className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('enterAmount')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 pl-12 pr-16 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
                    {selectedToken}
                  </span>
                </div>
                {selectedTokenData && (
                  <p className="text-sm text-gray-500 mt-1">
                    Available: {selectedTokenData.balance.toFixed(4)} {selectedToken}
                  </p>
                )}
              </div>

              <button
                onClick={handleSend}
                disabled={!recipient || !amount}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('confirmTransaction')}</h2>
                <p className="text-gray-600">Please review the transaction details</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium text-gray-900">{recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">{amount} {selectedToken}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Network Fee:</span>
                  <span className="font-medium text-gray-900">0.0001 ICP</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-semibold text-gray-900">
                    {(parseFloat(amount) + 0.0001).toFixed(4)} {selectedToken}
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  {t('back')}
                </button>
                <button
                  onClick={handleSend}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  {t('confirm')}
                </button>
              </div>
            </div>
          )}

          {step === 'pin' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('enterPin')}</h2>
                <p className="text-gray-600">Enter your 4-digit PIN to authorize the transaction</p>
              </div>

              <div className="flex justify-center space-x-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="password"
                    maxLength={1}
                    value={pin[index] || ''}
                    onChange={(e) => {
                      const newPin = pin.split('');
                      newPin[index] = e.target.value;
                      setPin(newPin.join(''));
                      if (e.target.value && index < 3) {
                        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
                        nextInput?.focus();
                      }
                    }}
                    data-index={index}
                    className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
              </div>

              <button
                onClick={handleSend}
                disabled={pin.length !== 4}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Authorize Transaction
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Send className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Transaction Sent!</h2>
                <p className="text-gray-600">
                  Your transaction has been submitted to the network and will be confirmed shortly.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Transaction Hash:</p>
                <p className="text-xs font-mono text-gray-800 break-all">
                  0x1234567890abcdef1234567890abcdef12345678
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};