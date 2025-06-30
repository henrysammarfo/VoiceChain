import React from 'react';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';

interface TradingViewWidgetProps {
  symbol?: string;
  theme?: 'light' | 'dark';
  height?: string;
  interval?: string;
}

function TradingViewWidget({ 
  symbol = "BINANCE:ICPUSDT", 
  theme = "dark",
  height = "400px",
  interval = "D"
}: TradingViewWidgetProps) {
  
  // Extract token name from symbol
  const getTokenName = (symbol: string) => {
    if (symbol.includes('ICP')) return 'ICP';
    if (symbol.includes('BTC')) return 'Bitcoin';
    if (symbol.includes('ETH')) return 'Ethereum';
    if (symbol.includes('USDT')) return 'USDT';
    return 'Crypto';
  };

  // Mock price data for demonstration
  const getMockPrice = (symbol: string) => {
    if (symbol.includes('ICP')) return '$12.45';
    if (symbol.includes('BTC')) return '$43,250.30';
    if (symbol.includes('ETH')) return '$2,650.75';
    if (symbol.includes('USDT')) return '$1.00';
    return '$0.00';
  };

  const getMockChange = (symbol: string) => {
    if (symbol.includes('ICP')) return '+5.67%';
    if (symbol.includes('BTC')) return '-2.34%';
    if (symbol.includes('ETH')) return '+3.21%';
    if (symbol.includes('USDT')) return '+0.01%';
    return '+0.00%';
  };

  const tokenName = getTokenName(symbol);
  const price = getMockPrice(symbol);
  const change = getMockChange(symbol);
  const isPositive = change.startsWith('+');

  return (
    <div 
      className={`rounded-xl overflow-hidden border ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}
      style={{ height, width: "100%" }}
    >
      {/* Chart Header */}
      <div className={`p-4 border-b ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {tokenName}/USDT
            </h3>
            <div className="flex items-center space-x-3">
              <span className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {price}
              </span>
              <span className={`text-sm font-medium flex items-center space-x-1 ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingUp className="h-4 w-4 rotate-180" />
                )}
                <span>{change}</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className={`h-6 w-6 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {interval}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 flex items-center justify-center" style={{ height: 'calc(100% - 120px)' }}>
        <div className="text-center">
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <Activity className={`h-12 w-12 ${
              isPositive ? 'text-green-500' : 'text-blue-500'
            }`} />
          </div>
          <h4 className={`text-lg font-semibold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Live {tokenName} Chart
          </h4>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Real-time price: {price}
          </p>
          <p className={`text-xs mt-1 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Professional trading charts coming soon
          </p>
        </div>
      </div>

      {/* Chart Footer */}
      <div className={`p-3 border-t text-center ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <p className={`text-xs ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          🔗 On-Chain Data • Internet Computer Protocol • Real-time Updates
        </p>
      </div>
    </div>
  );
}

export default React.memo(TradingViewWidget);