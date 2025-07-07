import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bot, Globe, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';

interface AccountCreationProps {
  onAccountCreated: (userData: {
    username: string;
    voiceId: string;
    assistantName: string;
    language: string;
  }) => void;
}

export const AccountCreation: React.FC<AccountCreationProps> = ({ onAccountCreated }) => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState('');
  const [assistantName, setAssistantName] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setCheckingUsername(true);
    
    // Simulate username availability check
    setTimeout(() => {
      setIsUsernameAvailable(value.length >= 3);
      setCheckingUsername(false);
    }, 500);
  };

  const handleCreateAccount = () => {
    if (username && assistantName && isUsernameAvailable) {
      onAccountCreated({
        username,
        voiceId: `${username}.voice`,
        assistantName,
        language: i18n.language
      });
    }
  };

  const isFormValid = username && assistantName && isUsernameAvailable;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('createAccount')}
          </h1>
          <p className="text-gray-600">
            Personalize your VoiceChain experience with a unique identity and AI assistant
          </p>
        </div>

        <div className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('chooseUsername')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                placeholder={t('usernamePlaceholder')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {checkingUsername ? (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : isUsernameAvailable && username ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : null}
              </div>
            </div>
            {username && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-gray-600">Your VoiceChain ID:</span>
                <span className="text-sm font-medium text-blue-600">
                  {username}.voice
                </span>
              </div>
            )}
            {isUsernameAvailable && username && (
              <p className="text-sm text-green-600 mt-1">{t('usernameAvailable')}</p>
            )}
          </div>

          {/* Assistant Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('nameAssistant')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                placeholder={t('assistantPlaceholder')}
                className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Bot className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('selectLanguage')}
            </label>
            <LanguageSelector showLabel={false} className="w-full" />
            <p className="text-sm text-gray-500 mt-1">
              This will set your interface language and voice recognition language
            </p>
          </div>

          {/* Create Account Button */}
          <motion.button
            onClick={handleCreateAccount}
            disabled={!isFormValid}
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center space-x-2 ${
              isFormValid
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
          >
            <span>{t('createMyAccount')}</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>🔒 Your account will be secured with enterprise-grade encryption</p>
          <p>🌍 Full multilingual support across 16+ languages</p>
        </div>
      </motion.div>
    </div>
  );
};