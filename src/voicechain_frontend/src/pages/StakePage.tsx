import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StakePageProps {
  onBack: () => void;
}

export const StakePage: React.FC<StakePageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('1year');

  const stakingOptions = [
    { period: '6months', label: '6 Months', apy: 8.5, multiplier: 1.06 },
    { period: '1year', label: '1 Year', apy: 10.0, multiplier: 1.25 },
    { period: '2years', label: '2 Years', apy: 11.5, multiplier: 1.5 },
    { period: '4years', label: '4 Years', apy: 13.0, multiplier: 1.75 },
    { period: '8years', label: '8 Years', apy: 15.0, multiplier: 2.0 }
  ];

  const selectedOption = stakingOptions.find(opt => opt.period === selectedPeriod);
  const icpBalance = 245.67;
  const estimatedRewards = stakeAmount ? (parseFloat(stakeAmount) * (selectedOption?.apy || 0) / 100) : 0;

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
          <h1 className="text-2xl font-bold text-gray-900">{t('stakeTokens')}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Staking Overview */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-8 w-8" />
              <div>
                <h2 className="text-xl font-bold">ICP Staking</h2>
                <p className="text-blue-100">Earn rewards by securing the network</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-blue-100 text-sm">Total Staked</p>
                <p className="text-2xl font-bold">245.67 ICP</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm">Rewards Earned</p>
                <p className="text-2xl font-bold">12.34 ICP</p>
              </div>
            </div>
          </div>

          {/* Stake Amount */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Stake Amount</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Amount to Stake</span>
                  <span className="text-sm text-gray-500">Balance: {icpBalance} ICP</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0.0"
                    className="flex-1 bg-transparent text-xl font-semibold text-gray-900 focus:outline-none"
                  />
                  <span className="text-lg font-semibold text-gray-600">ICP</span>
                </div>
                <div className="flex space-x-2 mt-3">
                  {[25, 50, 75, 100].map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => setStakeAmount((icpBalance * percentage / 100).toFixed(2))}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                    >
                      {percentage}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Staking Periods */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Staking Period</h2>
            <div className="space-y-3">
              {stakingOptions.map((option) => (
                <button
                  key={option.period}
                  onClick={() => setSelectedPeriod(option.period)}
                  className={`w-full p-4 rounded-xl border-2 transition-colors ${
                    selectedPeriod === option.period
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-500">Dissolve delay</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{option.apy}% APY</p>
                      <p className="text-sm text-gray-500">{option.multiplier}x voting power</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rewards Calculation */}
          {stakeAmount && selectedOption && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Estimated Rewards</h2>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Annual Rewards</p>
                      <p className="text-2xl font-bold text-green-600">
                        {estimatedRewards.toFixed(2)} ICP
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-600">Monthly</p>
                      <p className="font-semibold text-green-800">
                        {(estimatedRewards / 12).toFixed(4)} ICP
                      </p>
                    </div>
                    <div>
                      <p className="text-green-600">Daily</p>
                      <p className="font-semibold text-green-800">
                        {(estimatedRewards / 365).toFixed(6)} ICP
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-800">Staking Details</p>
                      <p className="text-sm text-blue-600">
                        Lock period: {selectedOption.label} • Voting power: {selectedOption.multiplier}x
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stake Button */}
          <button
            disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
            className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
          >
            Stake {stakeAmount || '0'} ICP for {selectedOption?.label}
          </button>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notes</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Staked ICP cannot be withdrawn during the dissolve delay period</li>
              <li>• Rewards are automatically compounded and added to your stake</li>
              <li>• You can participate in governance voting with staked ICP</li>
              <li>• Longer staking periods provide higher rewards and voting power</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};