import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Send, 
  ArrowDownToLine, 
  RefreshCw, 
  TrendingUp, 
  Settings, 
  ShoppingBag,
  Mic
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';
import { BalanceCard } from '../components/BalanceCard';
import { TokenCard } from '../components/TokenCard';
import { useCryptoData } from '../hooks/useCryptoData';
import { User, Token } from '../types';

interface DashboardProps {
  user: User;
  onNavigate?: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [hideBalance, setHideBalance] = useState(false);
  const [balanceBackground, setBalanceBackground] = useState({
    type: 'color' as 'color' | 'image',
    value: '#3B82F6'
  });

  const { prices, loading } = useCryptoData();

  // Mock user portfolio data
  const mockTokens: Token[] = [
    {
      symbol: 'ICP',
      name: 'Internet Computer',
      balance: 245.67,
      value: 3056.84,
      change24h: 5.67,
      icon: '🌐'
    },
    {
      symbol: 'ckBTC',
      name: 'Chain Key Bitcoin',
      balance: 0.0847,
      value: 3663.45,
      change24h: -2.34,
      icon: '₿'
    },
    {
      symbol: 'ckETH',
      name: 'Chain Key Ethereum',
      balance: 1.234,
      value: 3272.03,
      change24h: 3.21,
      icon: 'Ξ'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD',
      balance: 1500.00,
      value: 1500.00,
      change24h: 0.01,
      icon: '💵'
    }
  ];

  const totalBalance = mockTokens.reduce((sum, token) => sum + token.value, 0);
  const portfolioChange = 4.12;

  const handleBackgroundChange = (type: 'color' | 'image', value: string) => {
    setBalanceBackground({ type, value });
  };

  const tabs = [
    { id: 'portfolio', label: t('portfolio'), icon: <Home className="h-5 w-5" /> },
    { id: 'transact', label: t('transact'), icon: <Send className="h-5 w-5" /> },
    { id: 'defi', label: t('defi'), icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'shop', label: t('shop'), icon: <ShoppingBag className="h-5 w-5" /> }
  ];

  const quickActions = [
    { id: 'send', label: t('send'), icon: <Send className="h-5 w-5" />, color: 'bg-blue-500 dark:bg-blue-600' },
    { id: 'receive', label: t('receive'), icon: <ArrowDownToLine className="h-5 w-5" />, color: 'bg-green-500 dark:bg-green-600' },
    { id: 'swap', label: t('swap'), icon: <RefreshCw className="h-5 w-5" />, color: 'bg-purple-500 dark:bg-purple-600' },
    { id: 'stake', label: t('stake'), icon: <TrendingUp className="h-5 w-5" />, color: 'bg-orange-500 dark:bg-orange-600' }
  ];

  const handleQuickAction = (actionId: string) => {
    onNavigate?.(actionId);
  };

  const handleSettingsClick = () => {
    onNavigate?.('settings');
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'defi') {
      onNavigate?.('defi');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VC</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">VoiceChain</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Welcome, {user.username}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
              <button 
                onClick={handleSettingsClick}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Card */}
        <div className="mb-8">
          <BalanceCard
            balance={totalBalance}
            change24h={portfolioChange}
            hideBalance={hideBalance}
            onToggleBalance={() => setHideBalance(!hideBalance)}
            backgroundImage={balanceBackground.type === 'image' ? balanceBackground.value : undefined}
            backgroundColor={balanceBackground.type === 'color' ? balanceBackground.value : undefined}
            onBackgroundChange={handleBackgroundChange}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl transition-colors">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Portfolio</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Last updated: just now</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {mockTokens.map((token, index) => (
                    <motion.div
                      key={token.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <TokenCard token={token} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'transact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('quickActions')}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={action.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleQuickAction(action.id)}
                      className={`${action.color} text-white p-6 rounded-2xl hover:opacity-90 transition-opacity shadow-lg`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        {action.icon}
                        <span className="font-semibold">{action.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Voice Commands</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>• "Send 50 ICP to alice.voice"</p>
                    <p>• "Buy 100 dollars worth of Bitcoin"</p>
                    <p>• "Show me my transaction history"</p>
                    <p>• "What's my portfolio balance?"</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shop' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Voice Commerce</h2>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Universal Payment Gateway</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Merchant Integration</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Pay at partner stores with voice commands</p>
                      </div>
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">Coming Soon</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Global Remittance</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Send money worldwide with voice</p>
                      </div>
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">Coming Soon</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Prices */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Prices</h3>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {prices.slice(0, 5).map((price) => (
                    <div key={price.symbol} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{price.symbol}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">${price.price.toFixed(2)}</p>
                      </div>
                      <div className={`text-sm font-medium ${
                        price.change24h >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {price.change24h >= 0 ? '+' : ''}{price.change24h.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Assistant CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Mic className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Meet {user.assistantName}</h3>
              </div>
              <p className="text-blue-100 mb-4 text-sm">
                Your AI-powered financial advisor is ready to help with trading strategies, 
                portfolio management, and DeFi guidance.
              </p>
              <p className="text-blue-100 text-sm">
                💬 Tap the floating voice button to start a conversation!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
