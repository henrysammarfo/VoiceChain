import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface IdentityVerificationProps {
  onVerified: () => void;
}

export const IdentityVerification: React.FC<IdentityVerificationProps> = ({ onVerified }) => {
  const { t } = useTranslation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 3000);
  };

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        onVerified();
      }, 1500);
    }
  }, [isVerified, onVerified]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <div className="mb-8">
          {isVerified ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-12 w-12 text-green-500" />
            </motion.div>
          ) : (
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-12 w-12 text-blue-500" />
            </div>
          )}
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isVerified ? t('identityVerified') : t('verifyIdentity')}
          </h1>
          
          <p className="text-gray-600">
            {isVerifying 
              ? t('verifyingIdentity')
              : isVerified 
                ? 'Welcome to VoiceChain! Your secure journey begins now.'
                : 'We need to verify your identity to ensure secure access to your VoiceChain account and protect your digital assets.'
            }
          </p>
        </div>

        {!isVerified && !isVerifying && (
          <motion.button
            onClick={handleVerify}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Verify Identity
          </motion.button>
        )}

        {isVerifying && (
          <div className="flex items-center justify-center space-x-2">
            <Loader className="h-5 w-5 text-blue-500 animate-spin" />
            <span className="text-blue-500 font-medium">{t('verifyingIdentity')}</span>
          </div>
        )}

        {isVerified && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('proceedToAccount')}
          </motion.button>
        )}

        <div className="mt-6 text-xs text-gray-500">
          <p>🔒 Your data is encrypted and secure</p>
          <p>✨ Powered by Internet Computer Protocol</p>
        </div>
      </motion.div>
    </div>
  );
};