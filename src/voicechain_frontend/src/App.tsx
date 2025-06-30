import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { IdentityVerification } from './pages/IdentityVerification';
import { AccountCreation } from './pages/AccountCreation';
import { WalletGeneration } from './pages/WalletGeneration';
import { Dashboard } from './pages/Dashboard';
import { SendPage } from './pages/SendPage';
import { ReceivePage } from './pages/ReceivePage';
import { SwapPage } from './pages/SwapPage';
import { StakePage } from './pages/StakePage';
import { SettingsPage } from './pages/SettingsPage';
import { DeFiPage } from './pages/DeFiPage';
import { BuyPage } from './pages/BuyPage';
import { TokenDetailPage } from './pages/TokenDetailPage';
import { FloatingVoiceButton } from './components/FloatingVoiceButton';
import { VoiceModal } from './components/VoiceModal';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { useTranslation } from 'react-i18next';
import { User, Token } from './types';

type AppState = 'landing' | 'identity' | 'account' | 'wallet' | 'dashboard' | 'send' | 'receive' | 'swap' | 'stake' | 'settings' | 'defi' | 'buy' | 'token-detail';

function App() {
  const { i18n } = useTranslation();
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  const {
    isSupported,
    isListening,
    startListening,
    stopListening
  } = useVoiceRecognition(i18n.language);

  const handleGetStarted = () => {
    setCurrentState('identity');
  };

  const handleIdentityVerified = () => {
    setCurrentState('account');
  };

  const handleAccountCreated = (userData: {
    username: string;
    voiceId: string;
    assistantName: string;
    language: string;
  }) => {
    setCurrentState('wallet');
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      voiceId: userData.voiceId,
      assistantName: userData.assistantName,
      language: userData.language,
      wallets: [],
      createdAt: new Date()
    };
    setUser(newUser);
    
    // Update i18n language to match user preference
    i18n.changeLanguage(userData.language);
  };

  const handleWalletGenerated = (walletData: {
    address: string;
    privateKey: string;
  }) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        wallets: [{
          id: Date.now().toString(),
          address: walletData.address,
          balance: 10992.34,
          tokens: []
        }]
      };
      setUser(updatedUser);
      setCurrentState('dashboard');
    }
  };

  const handleNavigation = (page: string) => {
    switch (page) {
      case 'portfolio':
      case 'dashboard':
        setCurrentState('dashboard');
        break;
      case 'buy':
        setCurrentState('buy');
        break;
      case 'send':
        setCurrentState('send');
        break;
      case 'receive':
        setCurrentState('receive');
        break;
      case 'swap':
        setCurrentState('swap');
        break;
      case 'stake':
      case 'staking':
        setCurrentState('stake');
        break;
      case 'settings':
        setCurrentState('settings');
        break;
      case 'defi':
        setCurrentState('defi');
        break;
      default:
        setCurrentState('dashboard');
    }
    setShowVoiceModal(false);
  };

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    setCurrentState('token-detail');
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
    setSelectedToken(null);
  };

  const handleFloatingVoiceClick = () => {
    if (currentState === 'landing' || currentState === 'identity' || currentState === 'account' || currentState === 'wallet') {
      return; // Don't show voice modal on onboarding pages
    }
    setShowVoiceModal(true);
  };

  const showFloatingButton = currentState !== 'landing' && currentState !== 'identity' && currentState !== 'account' && currentState !== 'wallet';

  switch (currentState) {
    case 'landing':
      return <LandingPage onGetStarted={handleGetStarted} />;
    case 'identity':
      return <IdentityVerification onVerified={handleIdentityVerified} />;
    case 'account':
      return <AccountCreation onAccountCreated={handleAccountCreated} />;
    case 'wallet':
      return <WalletGeneration onWalletGenerated={handleWalletGenerated} />;
    case 'dashboard':
      return (
        <>
          {user && <Dashboard user={user} onNavigate={handleNavigation} onTokenClick={handleTokenClick} />}
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    case 'token-detail':
      return (
        <>
          {selectedToken && (
            <TokenDetailPage
              token={{
                ...selectedToken,
                price: selectedToken.symbol === 'ICP' ? 12.45 :
                       selectedToken.symbol === 'ckBTC' ? 43250.30 :
                       selectedToken.symbol === 'ckETH' ? 2650.75 :
                       selectedToken.symbol === 'USDT' ? 1.00 : 1.00
              }}
              onBack={handleBackToDashboard}
              onNavigate={handleNavigation}
            />
          )}
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    case 'buy':
      return (
        <>
          <BuyPage onBack={handleBackToDashboard} />
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    case 'send':
      return (
        <>
          <SendPage onBack={handleBackToDashboard} />
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    case 'receive':
      return (
        <>
          
          <ReceivePage onBack={handleBackToDashboard} />
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    case 'swap':
      return (
        <>
          <SwapPage onBack={handleBackToDashboard} />
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    case 'stake':
      return (
        <>
          <StakePage onBack={handleBackToDashboard} />
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    case 'settings':
      return (
        <>
          {user && <SettingsPage onBack={handleBackToDashboard} user={user} />}
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    case 'defi':
      return (
        <>
          <DeFiPage onBack={handleBackToDashboard} onNavigate={handleNavigation} />
          {showFloatingButton && (
            <FloatingVoiceButton
              isListening={isListening}
              isSupported={isSupported}
              onStartListening={handleFloatingVoiceClick}
              onStopListening={stopListening}
            />
          )}
          {showVoiceModal && user && (
            <VoiceModal
              isOpen={showVoiceModal}
              onClose={() => setShowVoiceModal(false)}
              assistantName={user.assistantName}
              language={i18n.language}
              onNavigate={handleNavigation}
            />
          )}
        </>
      );
    default:
      return <LandingPage onGetStarted={handleGetStarted} />;
  }
}

export default App;