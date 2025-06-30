import React from 'react';
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { TokenLogo } from './TokenLogo';
import { Token } from '../types';

interface TokenCardProps {
  token: Token;
  onClick?: () => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, onClick }) => {
  const isPositive = token.change24h >= 0;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <TokenLogo symbol={token.symbol} size="md" />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{token.symbol}</h3>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">ICP</span>
            </div>
            <p className="text-sm text-gray-500">{token.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="font-semibold text-gray-900">
              {token.balance.toFixed(4)} {token.symbol}
            </p>
            <div className="flex items-center space-x-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-50">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Value</span>
          <span className="text-sm font-medium text-gray-900">
            ${token.value.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};