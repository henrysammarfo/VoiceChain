import React from 'react';

interface TokenLogoProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TokenLogo: React.FC<TokenLogoProps> = ({ symbol, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl'
  };

  const getTokenLogo = (symbol: string) => {
    switch (symbol.toUpperCase()) {
      case 'ICP':
        return (
          <div className={`${sizeClasses[size]} bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold ${className}`}>
            <span>∞</span>
          </div>
        );
      case 'CKBTC':
        return (
          <div className={`${sizeClasses[size]} bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold ${className}`}>
            <span>₿</span>
          </div>
        );
      case 'CKETH':
        return (
          <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold ${className}`}>
            <span>Ξ</span>
          </div>
        );
      case 'USDT':
        return (
          <div className={`${sizeClasses[size]} bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold ${className}`}>
            <span>₮</span>
          </div>
        );
      case 'USDC':
        return (
          <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold ${className}`}>
            <span>$</span>
          </div>
        );
      default:
        return (
          <div className={`${sizeClasses[size]} bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold ${className}`}>
            <span>{symbol.charAt(0)}</span>
          </div>
        );
    }
  };

  return getTokenLogo(symbol);
};