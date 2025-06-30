import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { VoiceLogo } from '../components/VoiceLogo';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('voiceFirstFinance'),
      description: t('voiceFirstFinanceDesc')
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: t('universalLanguageSupport'),
      description: t('universalLanguageSupportDesc')
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('secureDecentralized'),
      description: t('secureDecentralizedDesc')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <VoiceLogo size="md" showText={true} />
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <VoiceLogo size="xl" showText={false} className="justify-center mb-8" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('welcome')}
            </h1>
            <p className="text-2xl md:text-3xl font-medium mb-4 text-blue-200">
              {t('tagline')}
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
            
            <motion.button
              onClick={onGetStarted}
              className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('connectIdentity')}</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black bg-opacity-30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">{t('revolutionizingWeb3')}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('revolutionizingWeb3Desc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">{t('readyToTransform')}</h2>
            <p className="text-xl text-gray-300 mb-12">
              {t('readyToTransformDesc')}
            </p>
            
            <motion.button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-6 rounded-full font-semibold text-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-2xl flex items-center space-x-3 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('getStarted')}</span>
              <ArrowRight className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};