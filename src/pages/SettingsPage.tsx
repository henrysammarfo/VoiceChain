import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Shield, Bell, Globe, Palette, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';

interface SettingsPageProps {
  onBack: () => void;
  user: any;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack, user }) => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [autoLock, setAutoLock] = useState('5min');

  const settingSections = [
    {
      title: 'Account',
      icon: <User className="h-5 w-5" />,
      items: [
        { label: 'Username', value: user?.username || 'myusername', type: 'display' },
        { label: 'VoiceChain ID', value: `${user?.username || 'myusername'}.voice`, type: 'display' },
        { label: 'AI Assistant Name', value: user?.assistantName || 'Alex', type: 'display' }
      ]
    },
    {
      title: 'Security',
      icon: <Shield className="h-5 w-5" />,
      items: [
        { label: 'Change PIN', value: '', type: 'action' },
        { label: 'Biometric Authentication', value: biometrics, type: 'toggle', onChange: setBiometrics },
        { label: 'Auto-lock Timer', value: autoLock, type: 'select', options: ['1min', '5min', '15min', '30min', '1hour'], onChange: setAutoLock },
        { label: 'Export Private Key', value: '', type: 'action' }
      ]
    },
    {
      title: 'Notifications',
      icon: <Bell className="h-5 w-5" />,
      items: [
        { label: 'Push Notifications', value: notifications, type: 'toggle', onChange: setNotifications },
        { label: 'Transaction Alerts', value: true, type: 'toggle' },
        { label: 'Price Alerts', value: false, type: 'toggle' },
        { label: 'News & Updates', value: true, type: 'toggle' }
      ]
    },
    {
      title: 'Preferences',
      icon: <Palette className="h-5 w-5" />,
      items: [
        { label: 'Language', value: '', type: 'language' },
        { label: 'Theme', value: '', type: 'theme' },
        { label: 'Currency Display', value: 'USD', type: 'select', options: ['USD', 'EUR', 'GBP', 'JPY', 'GHS', 'KES'] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings')}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.username || 'Username'}</h2>
                <p className="text-gray-500 dark:text-gray-400">{user?.username || 'myusername'}.voice</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">VoiceChain Member</p>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          {settingSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-blue-600 dark:text-blue-400">{section.icon}</div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                    
                    {item.type === 'display' && (
                      <span className="text-gray-500 dark:text-gray-400 font-medium">{item.value}</span>
                    )}
                    
                    {item.type === 'toggle' && (
                      <button
                        onClick={() => item.onChange?.(!(item.value as boolean))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.value ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                    
                    {item.type === 'select' && (
                      <select
                        value={item.value as string}
                        onChange={(e) => item.onChange?.(e.target.value)}
                        className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                      >
                        {item.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {item.type === 'language' && (
                      <LanguageSelector className="text-sm" />
                    )}

                    {item.type === 'theme' && (
                      <ThemeToggle />
                    )}
                    
                    {item.type === 'action' && (
                      <button className="text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        {item.label.includes('PIN') ? 'Change' : 'Export'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Help & Support */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Help & Support</h2>
            </div>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">FAQ</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Frequently asked questions</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">Contact Support</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get help from our team</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">Terms of Service</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Read our terms and conditions</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">Privacy Policy</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">How we protect your data</p>
              </button>
            </div>
          </div>

          {/* App Version */}
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>VoiceChain v1.0.0</p>
            <p>Built on Internet Computer Protocol</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
