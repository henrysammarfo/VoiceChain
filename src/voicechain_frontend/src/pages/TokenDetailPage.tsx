import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, ArrowDownToLine, RefreshCw, ShoppingCart, TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { TokenLogo } from '../components/TokenLogo';
import TradingViewWidget from '../components/TradingViewWidget';

interface TokenDetailPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  token: {
    symbol: string;
    name: string;
    balance: number;
    value: number;
    change24h: number;
    icon: string;
    price: number;
  };
}

export const TokenDetailPage: React.FC<TokenDetailPageProps> = ({ onBack, onNavigate, token }) => {
  const { t } = useTranslation();
  const [timeframe, setTimeframe] = useState('24h');

  const quickActions = [
    { id: 'receive', label: t('receive'), icon: <ArrowDownToLine className="h-5 w-5" />, color: 'bg-blue-500' },
    { id: 'send', label: t('send'), icon: <Send className="h-5 w-5" />, color: 'bg-green-500' },
    { id: 'swap', label: t('swap'), icon: <RefreshCw className="h-5 w-5" />, color: 'bg-purple-500' },
    { id: 'buy', label: t('buy'), icon: <ShoppingCart className="h-5 w-5" />, color: 'bg-orange-500' }
  ];

  const timeframes = ['1h', '24h', '7d', '30d', '1y'];

  const mockTransactions = [
    {
      id: '1',
      type: 'receive',
      amount: 25.5,
      from: 'alice.voice',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: '2',
      type: 'send',
      amount: 10.0,
      to: 'bob.voice',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed'
    },
    {
      id: '3',
      type: 'swap',
      amount: 50.0,
      swapTo: 'ckBTC',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed'
    }
  ];

  const handleQuickAction = (actionId: string) => {
    onNavigate(actionId);
  };

  const isPositive = token.change24h >= 0;

  // Get trading symbol for chart
  const getTradingSymbol = () => {
    switch (token.symbol) {
      case 'ICP': return 'BINANCE:ICPUSDT';
      case 'ckBTC': return 'BINANCE:BTCUSDT';
      case 'ckETH': return 'BINANCE:ETHUSDT';
      case 'USDT': return 'BINANCE:USDTUSDT';
      default: return 'BINANCE:ICPUSDT';
    }
  };

  const getIntervalFromTimeframe = (tf: string) => {
    switch (tf) {
      case '1h': return '5';
      case '24h': return '15';
      case '7d': return '1H';
      case '30d': return '4H';
      case '1y': return '1D';
      default: return '15';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="flex items-center space-x-3">
            <TokenLogo symbol={token.symbol} size="md" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{token.symbol}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{token.name}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Token Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
            >
              <div className="text-center">
                <p className="text-blue-100 text-sm mb-2">{t('balance')}</p>
                <h2 className="text-3xl font-bold mb-2">
                  {token.balance.toFixed(4)} {token.symbol}
                </h2>
                <p className="text-xl font-semibold text-blue-100">
                  ${token.value.toFixed(2)}
                </p>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-300" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-300" />
                  )}
                  <span className={`text-sm font-medium ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                    {isPositive ? '+' : ''}{token.change24h.toFixed(2)}% (24h)
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('quickActions')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className={`${action.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      {action.icon}
                      <span className="font-medium text-sm">{action.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Token Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Token Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Current Price</span>
                  <span className="font-medium text-gray-900 dark:text-white">${token.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">24h Change</span>
                  <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Your Holdings</span>
                  <span className="font-medium text-gray-900 dark:text-white">{token.balance.toFixed(4)} {token.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Portfolio Value</span>
                  <span className="font-medium text-gray-900 dark:text-white">${token.value.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Network</span>
                  <span className="font-medium text-gray-900 dark:text-white">Internet Computer</span>
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 transition-colors duration-200">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🔗 On-Chain Verification</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                This {token.symbol} token is secured on the Internet Computer Protocol blockchain. 
                All transactions are verifiable and immutable.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-600 dark:text-blue-400">Token Standard</p>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">ICRC-1</p>
                </div>
                <div>
                  <p className="text-blue-600 dark:text-blue-400">Network</p>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">Internet Computer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Chart & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{token.symbol} Price Chart</h3>
                <div className="flex space-x-1">
                  {timeframes.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        timeframe === tf
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-96">
                <TradingViewWidget 
                  symbol={getTradingSymbol()}
                  theme="dark"
                  height="100%"
                  interval={getIntervalFromTimeframe(timeframe)}
                />
              </div>
            </motion.div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('transactionHistory')}</h3>
              <div className="space-y-3">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'receive' ? 'bg-green-100 dark:bg-green-900' : 
                        tx.type === 'send' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-purple-100 dark:bg-purple-900'
                      }`}>
                        {tx.type === 'receive' && <ArrowDownToLine className="h-4 w-4 text-green-600 dark:text-green-400" />}
                        {tx.type === 'send' && <Send className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                        {tx.type === 'swap' && <RefreshCw className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">{tx.type}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {tx.type === 'receive' && `From ${tx.from}`}
                          {tx.type === 'send' && `To ${tx.to}`}
                          {tx.type === 'swap' && `To ${tx.swapTo}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        tx.type === 'receive' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {tx.type === 'receive' ? '+' : tx.type === 'send' ? '-' : ''}
                        {tx.amount} {token.symbol}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tx.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};