import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Coins, Users, Vote, Lock, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DeFiPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const DeFiPage: React.FC<DeFiPageProps> = ({ onBack, onNavigate }) => {
  const { t } = useTranslation();

  const defiServices = [
    {
      id: 'staking',
      title: t('stakingRewards'),
      description: 'Earn up to 15% APY by staking your ICP tokens',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'from-green-500 to-emerald-600',
      apy: '10.5%',
      tvl: '$2.4B',
      available: true
    },
    {
      id: 'liquidity',
      title: t('liquidityPools'),
      description: 'Provide liquidity and earn trading fees',
      icon: <Coins className="h-8 w-8" />,
      color: 'from-blue-500 to-cyan-600',
      apy: '12.3%',
      tvl: '$450M',
      available: true
    },
    {
      id: 'yield',
      title: t('yieldFarming'),
      description: 'Farm tokens and maximize your returns',
      icon: <Zap className="h-8 w-8" />,
      color: 'from-purple-500 to-pink-600',
      apy: '18.7%',
      tvl: '$180M',
      available: true
    },
    {
      id: 'lending',
      title: t('lending'),
      description: 'Lend your assets and earn interest',
      icon: <Users className="h-8 w-8" />,
      color: 'from-orange-500 to-red-600',
      apy: '8.2%',
      tvl: 'Coming Soon',
      available: false
    },
    {
      id: 'borrowing',
      title: t('borrowing'),
      description: 'Borrow against your crypto collateral',
      icon: <Lock className="h-8 w-8" />,
      color: 'from-indigo-500 to-purple-600',
      apy: '5.5%',
      tvl: 'Coming Soon',
      available: false
    },
    {
      id: 'governance',
      title: t('governance'),
      description: 'Vote on protocol proposals and earn rewards',
      icon: <Vote className="h-8 w-8" />,
      color: 'from-teal-500 to-green-600',
      apy: '3.2%',
      tvl: '$1.8B',
      available: true
    }
  ];

  const handleServiceClick = (serviceId: string) => {
    if (serviceId === 'staking') {
      onNavigate('stake');
    } else if (serviceId === 'liquidity' || serviceId === 'yield') {
      // Navigate to respective pages when implemented
      console.log(`Navigate to ${serviceId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">DeFi Services</h1>
            <p className="text-gray-600">Decentralized Finance on Internet Computer</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Value Locked</p>
                  <p className="text-2xl font-bold text-gray-900">$3.2B</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Coins className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Your Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">12.34 ICP</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">45.2K</p>
                </div>
              </div>
            </div>
          </div>

          {/* DeFi Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {defiServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => service.available && handleServiceClick(service.id)}
                className={`relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-transform hover:scale-105 ${
                  service.available ? '' : 'opacity-75'
                }`}
              >
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-white">{service.icon}</div>
                    {!service.available && (
                      <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white text-opacity-90 text-sm mb-4">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-opacity-75 text-xs">APY</p>
                      <p className="text-lg font-bold">{service.apy}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-opacity-75 text-xs">TVL</p>
                      <p className="text-lg font-bold">{service.tvl}</p>
                    </div>
                  </div>
                </div>
                
                {service.available && (
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-sm p-3">
                    <p className="text-white text-sm font-medium text-center">
                      {service.id === 'staking' ? 'Start Staking' : 
                       service.id === 'governance' ? 'View Proposals' : 
                       'Explore Opportunities'}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Featured Opportunities */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">ICP 8-Year Staking</p>
                    <p className="text-sm text-gray-600">Maximum rewards with 8-year lock</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">15.0% APY</p>
                  <button 
                    onClick={() => onNavigate('stake')}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Stake Now →
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Coins className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">ICP/ckBTC Pool</p>
                    <p className="text-sm text-gray-600">High-yield liquidity provision</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">12.3% APY</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Add Liquidity →
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Multi-Token Farm</p>
                    <p className="text-sm text-gray-600">Farm multiple rewards simultaneously</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600">18.7% APY</p>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                    Start Farming →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Risk Disclaimer</h3>
            <p className="text-sm text-yellow-700">
              DeFi protocols involve smart contract risks, impermanent loss, and market volatility. 
              Please understand the risks before participating. Past performance does not guarantee future results. 
              Only invest what you can afford to lose.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};