import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Shield, Bell, Globe, Palette, HelpCircle, Download, Key } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../components/LanguageSelector';

interface SettingsPageProps {
  onBack: () => void;
  user: any;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onBack, user }) => {
  const { t, i18n } = useTranslation();
  const [notifications, setNotifications] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [newsUpdates, setNewsUpdates] = useState(true);
  const [autoLock, setAutoLock] = useState('5min');
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('Light');
  const [showPinModal, setShowPinModal] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleExportPrivateKey = () => {
    // Create a demo private key export
    const demoPrivateKey = 'demo-private-key-for-voicechain-presentation-do-not-use-in-production';
    const blob = new Blob([demoPrivateKey], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voicechain-private-key.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Private key exported successfully! Keep it safe and secure.');
  };

  const handleChangePIN = () => {
    setShowPinModal(true);
  };

  const handlePinSubmit = () => {
    if (currentPin.length === 4 && newPin.length === 4 && confirmPin.length === 4) {
      if (newPin === confirmPin) {
        alert('PIN changed successfully!');
        setShowPinModal(false);
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
      } else {
        alert('New PIN and confirmation do not match!');
      }
    } else {
      alert('Please fill in all PIN fields with 4 digits each.');
    }
  };

  // Apply theme changes with proper dark mode implementation
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    if (theme === 'Dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      body.style.backgroundColor = '#1f2937';
      body.style.color = '#f9fafb';
    } else if (theme === 'Light') {
      root.classList.remove('dark');
      body.classList.remove('dark');
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#111827';
    } else {
      // Auto theme - check system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        root.classList.add('dark');
        body.classList.add('dark');
        body.style.backgroundColor = '#1f2937';
        body.style.color = '#f9fafb';
      } else {
        root.classList.remove('dark');
        body.classList.remove('dark');
        body.style.backgroundColor = '#ffffff';
        body.style.color = '#111827';
      }
    }
  }, [theme]);

  // Auto-lock timer functionality
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const lockTimes = {
      '1min': 60000,
      '5min': 300000,
      '15min': 900000,
      '30min': 1800000,
      '1hour': 3600000
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        alert(`Auto-lock activated after ${autoLock} of inactivity. In a real app, this would lock the wallet.`);
      }, lockTimes[autoLock as keyof typeof lockTimes]);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
    };
  }, [autoLock]);

  const settingSections = [
    {
      title: t('account'),
      icon: <User className="h-5 w-5" />,
      items: [
        { label: t('username'), value: user?.username || 'myusername', type: 'display' },
        { label: t('voiceChainId'), value: `${user?.username || 'myusername'}.voice`, type: 'display' },
        { label: t('aiAssistantName'), value: user?.assistantName || 'Alex', type: 'display' }
      ]
    },
    {
      title: t('security'),
      icon: <Shield className="h-5 w-5" />,
      items: [
        { label: t('changePIN'), value: '', type: 'action', action: handleChangePIN },
        { label: t('autoLockTimer'), value: autoLock, type: 'select', options: ['1min', '5min', '15min', '30min', '1hour'], onChange: setAutoLock },
        { label: t('exportPrivateKey'), value: '', type: 'action', action: handleExportPrivateKey }
      ]
    },
    {
      title: t('notifications'),
      icon: <Bell className="h-5 w-5" />,
      items: [
        { label: t('pushNotifications'), value: notifications, type: 'toggle', onChange: setNotifications },
        { label: t('transactionAlerts'), value: transactionAlerts, type: 'toggle', onChange: setTransactionAlerts },
        { label: t('priceAlerts'), value: priceAlerts, type: 'toggle', onChange: setPriceAlerts },
        { label: t('newsUpdates'), value: newsUpdates, type: 'toggle', onChange: setNewsUpdates }
      ]
    },
    {
      title: t('preferences'),
      icon: <Palette className="h-5 w-5" />,
      items: [
        { label: t('language'), value: '', type: 'language' },
        { label: t('currencyDisplay'), value: currency, type: 'select', options: ['USD', 'EUR', 'GBP', 'JPY', 'GHS', 'KES', 'NGN', 'ZAR', 'EGP'], onChange: setCurrency },
        { label: t('theme'), value: theme, type: 'select', options: ['Light', 'Dark', 'Auto'], onChange: setTheme }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings')}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Profile Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.username || 'Username'}</h2>
                <p className="text-gray-500 dark:text-gray-400">{user?.username || 'myusername'}.voice</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">{t('voiceChainMember')}</p>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          {settingSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
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
                          item.value ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-600'
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
                        className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      >
                        {item.options?.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {item.type === 'language' && (
                      <LanguageSelector className="text-sm" />
                    )}
                    
                    {item.type === 'action' && (
                      <button 
                        onClick={item.action}
                        className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        {item.label.includes('PIN') && <Key className="h-4 w-4" />}
                        {item.label.includes('Export') && <Download className="h-4 w-4" />}
                        <span>{item.label.includes('PIN') ? t('change') : t('export')}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Help & Support */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('helpSupport')}</h2>
            </div>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">{t('faq')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('faqDesc')}</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">{t('contactSupport')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('contactSupportDesc')}</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">{t('termsOfService')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('termsOfServiceDesc')}</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <p className="font-medium text-gray-900 dark:text-white">{t('privacyPolicy')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('privacyPolicyDesc')}</p>
              </button>
            </div>
          </div>

          {/* App Version */}
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>{t('appVersion')}</p>
            <p>{t('builtOnICP')}</p>
          </div>
        </motion.div>

        {/* PIN Change Modal */}
        {showPinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Change PIN</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current PIN</label>
                  <div className="flex justify-center space-x-2">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        type="password"
                        maxLength={1}
                        value={currentPin[index] || ''}
                        onChange={(e) => {
                          const newPin = currentPin.split('');
                          newPin[index] = e.target.value;
                          setCurrentPin(newPin.join(''));
                        }}
                        className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New PIN</label>
                  <div className="flex justify-center space-x-2">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        type="password"
                        maxLength={1}
                        value={newPin[index] || ''}
                        onChange={(e) => {
                          const pin = newPin.split('');
                          pin[index] = e.target.value;
                          setNewPin(pin.join(''));
                        }}
                        className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New PIN</label>
                  <div className="flex justify-center space-x-2">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        type="password"
                        maxLength={1}
                        value={confirmPin[index] || ''}
                        onChange={(e) => {
                          const pin = confirmPin.split('');
                          pin[index] = e.target.value;
                          setConfirmPin(pin.join(''));
                        }}
                        className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePinSubmit}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Change PIN
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};