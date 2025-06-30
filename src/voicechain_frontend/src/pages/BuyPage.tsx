import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Building, Smartphone, DollarSign, Shield, Globe, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BuyPageProps {
  onBack: () => void;
}

export const BuyPage: React.FC<BuyPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [selectedToken, setSelectedToken] = useState('ICP');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [step, setStep] = useState<'details' | 'confirm' | 'processing' | 'success'>('details');

  const tokens = [
    { symbol: 'ICP', name: 'Internet Computer', price: 12.45 },
    { symbol: 'ckBTC', name: 'Chain Key Bitcoin', price: 43250.30 },
    { symbol: 'ckETH', name: 'Chain Key Ethereum', price: 2650.75 },
    { symbol: 'USDT', name: 'Tether USD', price: 1.00 },
    { symbol: 'USDC', name: 'USD Coin', price: 1.00 }
  ];

  const paymentMethods = [
    { 
      id: 'card', 
      name: t('creditDebitCard'), 
      icon: <CreditCard className="h-6 w-6" />,
      fee: '2.9%',
      time: 'Instant'
    },
    { 
      id: 'bank', 
      name: t('bankTransfer'), 
      icon: <Building className="h-6 w-6" />,
      fee: '1.5%',
      time: '1-3 days'
    },
    { 
      id: 'applepay', 
      name: t('applePay'), 
      icon: <Smartphone className="h-6 w-6" />,
      fee: '2.9%',
      time: 'Instant'
    },
    { 
      id: 'googlepay', 
      name: t('googlePay'), 
      icon: <Smartphone className="h-6 w-6" />,
      fee: '2.9%',
      time: 'Instant'
    },
    { 
      id: 'paypal', 
      name: t('paypal'), 
      icon: <DollarSign className="h-6 w-6" />,
      fee: '3.5%',
      time: 'Instant'
    }
  ];

  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);
  const selectedPaymentData = paymentMethods.find(p => p.id === selectedPaymentMethod);
  const purchaseAmountNum = parseFloat(purchaseAmount) || 0;
  const processingFee = purchaseAmountNum * (parseFloat(selectedPaymentData?.fee || '0') / 100);
  const totalAmount = purchaseAmountNum + processingFee;
  const tokensToReceive = selectedTokenData ? purchaseAmountNum / selectedTokenData.price : 0;

  const handlePurchase = () => {
    if (step === 'details') {
      setStep('confirm');
    } else if (step === 'confirm') {
      setStep('processing');
      setTimeout(() => {
        setStep('success');
        setTimeout(() => {
          onBack();
        }, 3000);
      }, 2000);
    }
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
          <h1 className="text-2xl font-bold text-gray-900">{t('buyCrypto')}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {step === 'details' && (
            <>
              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <Zap className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">{t('instantPurchase')}</p>
                  <p className="text-xs text-gray-500">{t('instantPurchaseDesc')}</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <Shield className="h-6 w-6 text-green-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">{t('securePurchase')}</p>
                  <p className="text-xs text-gray-500">{t('securePurchaseDesc')}</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                  <Globe className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-900">{t('globalSupport')}</p>
                  <p className="text-xs text-gray-500">{t('globalSupportDesc')}</p>
                </div>
              </div>

              {/* Token Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('selectToken')}</h2>
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
                        <p className="text-xs text-gray-500">${token.price.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Amount */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('enterPurchaseAmount')}</h2>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <DollarSign className="h-6 w-6 text-gray-400" />
                    <input
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 bg-transparent text-xl font-semibold text-gray-900 focus:outline-none"
                    />
                    <span className="text-lg font-semibold text-gray-600">USD</span>
                  </div>
                  {purchaseAmount && selectedTokenData && (
                    <div className="text-sm text-gray-600">
                      <p>{t('youWillReceive')}: {tokensToReceive.toFixed(6)} {selectedToken}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('selectPaymentMethod')}</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-colors ${
                        selectedPaymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-600">{method.icon}</div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{method.fee}</p>
                          <p className="text-xs text-gray-500">fee</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={!purchaseAmount || !selectedPaymentMethod}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('continue')}
              </button>
            </>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('confirmTransaction')}</h2>
                <p className="text-gray-600">Please review your purchase details</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token:</span>
                    <span className="font-medium text-gray-900">{selectedToken}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-gray-900">${purchaseAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('youWillReceive')}:</span>
                    <span className="font-medium text-gray-900">{tokensToReceive.toFixed(6)} {selectedToken}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('processingFee')}:</span>
                    <span className="font-medium text-gray-900">${processingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium text-gray-900">{selectedPaymentData?.name}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">{t('estimatedTotal')}:</span>
                    <span className="font-semibold text-gray-900">${totalAmount.toFixed(2)}</span>
                  </div>
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
                  onClick={handlePurchase}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  {t('purchaseWith', { method: selectedPaymentData?.name })}
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t('processing')}</h2>
                <p className="text-gray-600">
                  Processing your purchase with {selectedPaymentData?.name}...
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Purchase Successful!</h2>
                <p className="text-gray-600">
                  You have successfully purchased {tokensToReceive.toFixed(6)} {selectedToken}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">Transaction ID:</p>
                <p className="text-xs font-mono text-gray-800 break-all">
                  0xabcdef1234567890abcdef1234567890abcdef12
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};