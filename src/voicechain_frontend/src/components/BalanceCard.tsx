import React, { useState } from 'react';
import { Eye, EyeOff, Palette, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface BalanceCardProps {
  balance: number;
  change24h: number;
  hideBalance: boolean;
  onToggleBalance: () => void;
  backgroundImage?: string;
  backgroundColor?: string;
  onBackgroundChange: (type: 'color' | 'image', value: string) => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  change24h,
  hideBalance,
  onToggleBalance,
  backgroundImage,
  backgroundColor = '#3B82F6',
  onBackgroundChange
}) => {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const isPositive = change24h >= 0;

  const predefinedColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onBackgroundChange('image', e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const cardStyle = {
    background: backgroundImage 
      ? `url(${backgroundImage}) center/cover`
      : `linear-gradient(135deg, ${backgroundColor}, ${backgroundColor}dd)`
  };

  return (
    <div className="relative">
      <motion.div
        className="rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
        style={cardStyle}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Total Balance</p>
              <div className="flex items-center space-x-3">
                {hideBalance ? (
                  <div className="flex space-x-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-white/60 rounded-full"></div>
                    ))}
                  </div>
                ) : (
                  <h2 className="text-3xl font-bold text-white">
                    ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </h2>
                )}
                <button
                  onClick={onToggleBalance}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  {hideBalance ? (
                    <EyeOff className="h-5 w-5 text-white/80" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/80" />
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Palette className="h-5 w-5 text-white/80" />
            </button>
          </div>

          {!hideBalance && (
            <div className="flex items-center space-x-2">
              <TrendingUp className={`h-4 w-4 ${isPositive ? 'text-green-300' : 'text-red-300'}`} />
              <span className={`text-sm font-medium ${isPositive ? 'text-green-300' : 'text-red-300'}`}>
                {isPositive ? '+' : ''}{change24h.toFixed(2)}% (24h)
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Background Customizer */}
      {showCustomizer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-20"
        >
          <h3 className="font-semibold text-gray-900 mb-3">Customize Background</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Colors</label>
              <div className="grid grid-cols-4 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onBackgroundChange('color', color)}
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Custom Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};