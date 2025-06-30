import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isListening,
  isSupported,
  onStartListening,
  onStopListening,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const handleClick = () => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  if (!isSupported) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gray-100 rounded-full flex items-center justify-center`}>
        <MicOff className={`${iconSizes[size]} text-gray-400`} />
      </div>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      className={`${sizeClasses[size]} ${className} rounded-full flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 shadow-lg'
          : 'bg-blue-500 hover:bg-blue-600 shadow-lg'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={isListening ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
    >
      {isListening ? (
        <Volume2 className={`${iconSizes[size]} text-white`} />
      ) : (
        <Mic className={`${iconSizes[size]} text-white`} />
      )}
    </motion.button>
  );
};