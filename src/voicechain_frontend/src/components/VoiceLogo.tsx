import React from 'react';
import { Mic, Zap } from 'lucide-react';

interface VoiceLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const VoiceLogo: React.FC<VoiceLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative overflow-hidden shadow-lg`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center">
          <Mic className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : size === 'lg' ? 'h-8 w-8' : 'h-12 w-12'} text-white`} />
          <Zap className={`${size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : size === 'lg' ? 'h-5 w-5' : 'h-7 w-7'} text-yellow-300 absolute -top-1 -right-1`} />
        </div>
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${textSizes[size]}`}>
          VoiceChain
        </span>
      )}
    </div>
  );
};