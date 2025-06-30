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
  Mic,
  ShoppingCart,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { BalanceCard } from '../components/BalanceCard';
import { TokenLogo } from '../components/TokenLogo';
import { VoiceLogo } from '../components/VoiceLogo';
import TradingViewWidget from '../components/TradingViewWidget';
import { useCryptoData } from '../hooks/useCryptoData';
import { User, Token } from '../types';

interface DashboardProps {
  user: User;
  onNavigate?: (page: string) => void;
  onTokenClick?: (token: Token) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onTokenClick }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [hideBalance, setHideBalance] = useState(false);
  const [balanceBackground, setBalanceBackground] = useState({
    type: 'color' as 'color' | 'image',
    value: '#3B82F6'
  });

  const { prices, loading } = useCryptoData();

  // Enhanced portfolio data with proper logos and blockchain info
  const mockTokens: Token[] = [
    {
      symbol: 'ICP',
      name: 'Internet Computer',
      balance: 245.67,
      value: 3056.84,
      change24h: 5.67,
      icon: '∞'
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
      icon: '₮'
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
    { id: 'buy', label: t('buy'), icon: <ShoppingCart className="h-5 w-5" />, color: 'bg-green-500' },
    { id: 'send', label: t('send'), icon: <Send className="h-5 w-5" />, color: 'bg-blue-500' },
    { id: 'receive', label: t('receive'), icon: <ArrowDownToLine className="h-5 w-5" />, color: 'bg-purple-500' },
    { id: 'swap', label: t('swap'), icon: <RefreshCw className="h-5 w-5" />, color: 'bg-orange-500' },
    { id: 'stake', label: t('stake'), icon: <TrendingUp className="h-5 w-5" />, color: 'bg-red-500' }
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

  const handleTokenCardClick = (token: Token) => {
    onTokenClick?.(token);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <VoiceLogo size="sm" showText={true} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t('language') === 'en' ? 'Welcome' : t('language') === 'es' ? 'Bienvenido' : t('language') === 'fr' ? 'Bienvenue' : t('language') === 'tw' ? 'Akwaaba' : t('language') === 'sw' ? 'Karibu' : 'Welcome'}, {user.username}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button 
                onClick={handleSettingsClick}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
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
        <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl transition-colors duration-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
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
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('yourPortfolio')}</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{t('lastUpdated')}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Enhanced Token Cards with Proper Logos */}
                <div className="grid gap-4">
                  {mockTokens.map((token, index) => (
                    <motion.div
                      key={token.symbol}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleTokenCardClick(token)}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <TokenLogo symbol={token.symbol} size="lg" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{token.symbol}</h3>
                              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">ICP</span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{token.name}</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">Internet Computer Protocol</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <div>
                              <p className="text-xl font-bold text-gray-900 dark:text-white">
                                {token.balance.toFixed(4)}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{token.symbol}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{t('value')}</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                              ${token.value.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">24h {t('change24h')}</p>
                            <div className="flex items-center space-x-1">
                              {token.change24h >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : (
                                <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                              )}
                              <span className={`text-sm font-medium ${
                                token.change24h >= 0 ? 'text-green-500' : 'text-red-500'
                              }`}>
                                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Blockchain Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 transition-colors duration-200">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">🔗 On-Chain Verification</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                    All your assets are secured on the Internet Computer Protocol blockchain. Every transaction is verifiable and immutable.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600 dark:text-blue-400">Network</p>
                      <p className="font-semibold text-blue-800 dark:text-blue-300">Internet Computer</p>
                    </div>
                    <div>
                      <p className="text-blue-600 dark:text-blue-400">Wallet Address</p>
                      <p className="font-mono text-xs text-blue-800 dark:text-blue-300">rdmx6-jaaaa-aaaah-qcaiq-cai</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('quickActions')}</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('voiceCommands')}</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {t('voiceCommandExamples', { returnObjects: true }).map((example: string, index: number) => (
                      <p key={index}>{example}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shop' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('voiceCommerce')}</h2>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('universalPaymentGateway')}</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{t('merchantIntegration')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('merchantIntegrationDesc')}</p>
                      </div>
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">{t('comingSoon')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-200">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{t('globalRemittance')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('globalRemittanceDesc')}</p>
                      </div>
                      <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">{t('comingSoon')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Market Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ICP/USDT Live Chart</h3>
              <div className="h-64">
                <TradingViewWidget 
                  symbol="BINANCE:ICPUSDT"
                  theme="dark"
                  height="100%"
                  interval="15"
                />
              </div>
            </div>

            {/* Market Prices */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('livePrices')}</h3>
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
                      <div className="flex items-center space-x-2">
                        <TokenLogo symbol={price.symbol} size="sm" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{price.symbol}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${price.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${
                        price.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {price.change24h >= 0 ? '+' : ''}{price.change24h.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Voice Assistant CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Mic className="h-6 w-6" />
                <h3 className="text-lg font-semibold">{t('meetAssistant', { assistantName: user.assistantName })}</h3>
              </div>
              <p className="text-blue-100 mb-4 text-sm">
                {t('aiAdvisorDesc')}
              </p>
              <p className="text-blue-100 text-sm">
                {t('tapVoiceButton')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};