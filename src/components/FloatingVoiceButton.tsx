import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingVoiceButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  className?: string;
}

export const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  isListening,
  isSupported,
  onStartListening,
  onStopListening,
  className = ''
}) => {
  const handleClick = () => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  if (!isSupported) {
    return (
      <div className={`fixed bottom-8 right-8 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shadow-lg z-50 ${className}`}>
        <MicOff className="h-6 w-6 text-gray-400" />
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.button
        onClick={handleClick}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-2xl z-50 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isListening ? { 
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 0 0 rgba(239, 68, 68, 0.7)',
            '0 0 0 10px rgba(239, 68, 68, 0)',
            '0 0 0 0 rgba(239, 68, 68, 0)'
          ]
        } : {}}
        transition={{ 
          duration: isListening ? 1.5 : 0.2, 
          repeat: isListening ? Infinity : 0 
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
      >
        {isListening ? (
          <Volume2 className="h-6 w-6 text-white" />
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
        
        {/* Pulse animation for listening state */}
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>
    </AnimatePresence>
  );
};