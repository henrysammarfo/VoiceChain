import React, { useEffect, useState } from 'react';
import { X, Send, AlertCircle, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceButton } from './VoiceButton';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';
import { useTranslation } from 'react-i18next';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  assistantName: string;
  language: string;
  onNavigate?: (page: string) => void;
  onTransaction?: (type: string, data: any) => void;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  assistantName,
  language,
  onNavigate,
  onTransaction
}) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceRecognition(language);

  // Handle transcript when it's received
  useEffect(() => {
    if (transcript && transcript.trim()) {
      console.log('Processing transcript:', transcript);
      handleSendMessage(transcript);
      resetTranscript();
    }
  }, [transcript]);

  // Show error messages to user
  useEffect(() => {
    if (error) {
      console.error('Voice recognition error:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `Voice recognition error: ${error}. Please try typing your message or check your microphone permissions.`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [error]);

  const generateAIResponse = async (message: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    const responses = {
      en: {
        greeting: [
          `Hi there! I'm ${assistantName}, your personal VoiceChain AI assistant. I'm doing great and ready to help you with all your crypto and DeFi needs! How are you doing today?`,
          `Hello! Great to meet you! I'm ${assistantName} and I'm here to make your Web3 journey smooth and profitable. How can I assist you today?`,
          `Hey! I'm ${assistantName}, your AI financial advisor. I'm excited to help you navigate the world of crypto and DeFi. What would you like to explore?`
        ],
        howAreYou: [
          "I'm doing fantastic! Thanks for asking. I'm always energized when I get to help people with their crypto investments. How has your day been?",
          "I'm great! I've been analyzing the latest market trends and I'm ready to share some insights with you. How are you feeling about your portfolio today?",
          "I'm doing wonderful! I love helping people discover new opportunities in DeFi. What's on your mind today?"
        ],
        portfolio: [
          "Based on your current portfolio, I recommend diversifying with 30% ICP, 25% BTC, 20% ETH, 15% stablecoins, and 10% emerging tokens. This provides excellent risk-adjusted returns in the current market.",
          "Your portfolio looks good! For optimization, consider increasing your ICP holdings - it's showing strong fundamentals. Would you like me to help you rebalance?",
          "I see great potential in your current setup. Have you considered staking your ICP for those sweet 10% APY rewards? I can guide you through the process!"
        ],
        balance: [
          "Your current portfolio balance is $10,992.34. You have 245.67 ICP worth $3,056.84, 0.0847 ckBTC worth $3,663.45, 1.234 ckETH worth $3,272.03, and 1,500 USDT. Your portfolio is up 4.12% in the last 24 hours!",
          "Looking great! Your total balance is $10,992.34 with a nice 4.12% gain today. Your ICP holdings are performing particularly well with a 5.67% increase. Want me to break down your asset allocation?",
          "Your portfolio is valued at $10,992.34 right now. The breakdown: ICP (27.8%), ckBTC (33.4%), ckETH (29.8%), and USDT (13.7%). You're well-diversified across the Internet Computer ecosystem!"
        ],
        trading: [
          "For ICP trading, I'm seeing bullish momentum building. The best entry point would be during the next 2-4% dip, with a target of 15-20% profit. Want me to set up alerts for you?",
          "The market is looking favorable for ICP right now. Based on technical analysis, we might see a breakout soon. Should I help you place a strategic buy order?",
          "Great timing to ask about trading! ICP is consolidating nicely. I recommend dollar-cost averaging over the next week. Shall I walk you through the strategy?"
        ],
        defi: [
          "DeFi on Internet Computer is amazing! You get reverse gas fees and web-speed transactions. I highly recommend starting with ICP staking for 8-year rewards at 15% APY. Want me to show you how?",
          "The DeFi opportunities on ICP are incredible! You can stake, provide liquidity, and even participate in governance. Which area interests you most?",
          "ICP's DeFi ecosystem is growing rapidly! From staking to yield farming, there are so many ways to grow your wealth. Let me guide you to the best opportunities!"
        ],
        navigation: [
          "I can help you navigate anywhere! Just tell me where you want to go - portfolio, swap, staking, or any other section.",
          "Navigation is easy with me! I can take you to any page or help you complete any transaction. Where would you like to go?",
          "I'm your personal guide through VoiceChain! Just say where you want to go and I'll take you there instantly."
        ],
        sendMoney: [
          "I can help you send money! Just tell me the amount and recipient. For example, say 'Send 50 ICP to alice.voice' and I'll guide you through it.",
          "Sending crypto is super easy with voice commands! Tell me how much and to whom, and I'll handle the rest securely.",
          "I'll help you send money safely! Just specify the amount, token, and recipient address or .voice ID."
        ],
        buyCrypto: [
          "I can help you buy crypto! Tell me what you want to buy and how much. For example, 'Buy $100 worth of Bitcoin' and I'll guide you through the purchase.",
          "Buying crypto with voice is the future! Just tell me the amount and which token you want, and I'll make it happen.",
          "Ready to buy some crypto? Just say the amount and token, like 'Buy 10 ICP' and I'll handle everything!"
        ],
        prices: [
          "Current market prices: ICP is at $12.45 (+5.67%), Bitcoin is $43,250 (-2.34%), Ethereum is $2,651 (+3.21%), USDT is stable at $1.00. The crypto market is showing mixed signals today.",
          "Here are today's prices: ICP $12.45 (up 5.67% - looking strong!), BTC $43,250 (down 2.34%), ETH $2,651 (up 3.21%), USDT $1.00. ICP is outperforming the market today!",
          "Live prices right now: ICP $12.45, BTC $43,250, ETH $2,651, USDT $1.00. ICP is having a great day with 5.67% gains while BTC is cooling off slightly."
        ],
        staking: [
          "ICP staking is one of the best opportunities in crypto right now! You can earn up to 15% APY with 8-year staking. Your 245.67 ICP could earn you about 36.85 ICP annually. Should I take you to the staking page?",
          "Staking your ICP is a smart move! With current rates, you could earn significant rewards. The longer you stake, the higher the APY - up to 15% for 8 years. Want to start staking?",
          "Perfect timing to ask about staking! ICP offers some of the best staking rewards in crypto. You can start with any amount and choose your lock period. Shall I guide you through it?"
        ],
        voiceHelp: [
          "Having trouble with voice recognition? Make sure to speak clearly and allow microphone permissions. You can also type your messages if voice isn't working.",
          "Voice recognition works best in a quiet environment. Try speaking slowly and clearly. If issues persist, you can always type your questions!",
          "For better voice recognition: 1) Allow microphone access, 2) Speak clearly, 3) Reduce background noise. You can also use the text input below!"
        ],
        default: [
          "I understand you're asking about crypto and DeFi. I'm here to help with trading strategies, portfolio management, market analysis, navigation, transactions, and much more! What specific area interests you?",
          "I'm your all-knowing crypto companion! I can help with everything from basic explanations to advanced trading strategies. What would you like to explore?",
          "As your AI financial advisor, I'm equipped to handle any crypto-related question or task. Just tell me what you need help with!"
        ]
      },
      es: {
        greeting: [
          `¡Hola! Soy ${assistantName}, tu asistente personal de IA de VoiceChain. ¡Estoy genial y listo para ayudarte con todas tus necesidades de cripto y DeFi! ¿Cómo estás hoy?`
        ],
        balance: [
          "Tu saldo actual del portafolio es $10,992.34. Tienes 245.67 ICP valorados en $3,056.84, 0.0847 ckBTC valorados en $3,663.45, 1.234 ckETH valorados en $3,272.03, y 1,500 USDT. ¡Tu portafolio subió 4.12% en las últimas 24 horas!"
        ],
        default: [
          "Entiendo que preguntas sobre cripto y DeFi. ¡Estoy aquí para ayudar con estrategias de trading, gestión de portafolio, análisis de mercado, navegación, transacciones y mucho más! ¿Qué área específica te interesa?"
        ]
      },
      fr: {
        greeting: [
          `Salut! Je suis ${assistantName}, votre assistant IA personnel VoiceChain. Je vais très bien et je suis prêt à vous aider avec tous vos besoins crypto et DeFi! Comment allez-vous aujourd'hui?`
        ],
        balance: [
          "Votre solde de portefeuille actuel est de 10 992,34 $. Vous avez 245,67 ICP d'une valeur de 3 056,84 $, 0,0847 ckBTC d'une valeur de 3 663,45 $, 1,234 ckETH d'une valeur de 3 272,03 $ et 1 500 USDT. Votre portefeuille a augmenté de 4,12 % au cours des dernières 24 heures!"
        ],
        default: [
          "Je comprends que vous posez des questions sur la crypto et DeFi. Je suis là pour aider avec les stratégies de trading, la gestion de portefeuille, l'analyse de marché, la navigation, les transactions et bien plus! Quel domaine vous intéresse?"
        ]
      }
    };

    const langResponses = responses[language as keyof typeof responses] || responses.en;
    const lowerMessage = message.toLowerCase();
    
    // Voice/microphone help
    if (lowerMessage.includes('voice') || lowerMessage.includes('microphone') || lowerMessage.includes('mic') || 
        lowerMessage.includes('not working') || lowerMessage.includes('can\'t hear')) {
      const voiceHelpResponses = langResponses.voiceHelp || responses.en.voiceHelp;
      return voiceHelpResponses[Math.floor(Math.random() * voiceHelpResponses.length)];
    }
    
    // Greeting detection
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || 
        lowerMessage.includes('hola') || lowerMessage.includes('salut')) {
      const greetings = langResponses.greeting || responses.en.greeting;
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // How are you
    if (lowerMessage.includes('how are you') || lowerMessage.includes('how\'s it going') || 
        lowerMessage.includes('como estas') || lowerMessage.includes('comment allez')) {
      const howAreYouResponses = langResponses.howAreYou || responses.en.howAreYou;
      return howAreYouResponses[Math.floor(Math.random() * howAreYouResponses.length)];
    }

    // Balance/Portfolio queries
    if (lowerMessage.includes('balance') || lowerMessage.includes('portfolio') || lowerMessage.includes('worth') ||
        lowerMessage.includes('saldo') || lowerMessage.includes('portafolio') || lowerMessage.includes('portefeuille')) {
      const balanceResponses = langResponses.balance || responses.en.balance;
      return balanceResponses[Math.floor(Math.random() * balanceResponses.length)];
    }

    // Price queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('value') ||
        lowerMessage.includes('precio') || lowerMessage.includes('prix')) {
      const priceResponses = langResponses.prices || responses.en.prices;
      return priceResponses[Math.floor(Math.random() * priceResponses.length)];
    }

    // Staking queries
    if (lowerMessage.includes('stake') || lowerMessage.includes('staking') || lowerMessage.includes('earn') ||
        lowerMessage.includes('reward') || lowerMessage.includes('apy')) {
      const stakingResponses = langResponses.staking || responses.en.staking;
      return stakingResponses[Math.floor(Math.random() * stakingResponses.length)];
    }
    
    // Navigation commands
    if (lowerMessage.includes('go to') || lowerMessage.includes('open') || lowerMessage.includes('navigate') ||
        lowerMessage.includes('show me') || lowerMessage.includes('take me to')) {
      if (lowerMessage.includes('portfolio') || lowerMessage.includes('portafolio')) {
        onNavigate?.('portfolio');
        return "Taking you to your portfolio now! You can see all your assets and their performance there.";
      }
      if (lowerMessage.includes('swap') || lowerMessage.includes('exchange') || lowerMessage.includes('trade')) {
        onNavigate?.('swap');
        return "Opening the swap interface for you! You can exchange tokens there.";
      }
      if (lowerMessage.includes('stake') || lowerMessage.includes('staking')) {
        onNavigate?.('stake');
        return "Taking you to the staking page! You can earn rewards by staking your tokens.";
      }
      if (lowerMessage.includes('defi')) {
        onNavigate?.('defi');
        return "Opening DeFi services for you! Explore staking, lending, and yield farming opportunities.";
      }
      if (lowerMessage.includes('send')) {
        onNavigate?.('send');
        return "Opening the send page! You can transfer crypto to any address or VoiceChain ID.";
      }
      if (lowerMessage.includes('receive')) {
        onNavigate?.('receive');
        return "Opening the receive page! You can get your wallet address and QR code there.";
      }
      const navigationResponses = langResponses.navigation || responses.en.navigation;
      return navigationResponses[Math.floor(Math.random() * navigationResponses.length)];
    }

    // Send money commands
    if (lowerMessage.includes('send') || lowerMessage.includes('transfer') || lowerMessage.includes('pay')) {
      const sendResponses = langResponses.sendMoney || responses.en.sendMoney;
      return sendResponses[Math.floor(Math.random() * sendResponses.length)];
    }

    // Buy crypto commands
    if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('get')) {
      const buyResponses = langResponses.buyCrypto || responses.en.buyCrypto;
      return buyResponses[Math.floor(Math.random() * buyResponses.length)];
    }

    // DeFi queries
    if (lowerMessage.includes('defi') || lowerMessage.includes('yield') || lowerMessage.includes('liquidity') ||
        lowerMessage.includes('farm') || lowerMessage.includes('lending')) {
      const defiResponses = langResponses.defi || responses.en.defi;
      return defiResponses[Math.floor(Math.random() * defiResponses.length)];
    }

    // Trading queries
    if (lowerMessage.includes('trade') || lowerMessage.includes('trading') || lowerMessage.includes('market')) {
      const tradingResponses = langResponses.trading || responses.en.trading;
      return tradingResponses[Math.floor(Math.random() * tradingResponses.length)];
    }
    
    // Default response
    const defaultResponses = langResponses.default || responses.en.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      const response = await generateAIResponse(text);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputText);
    }
  };

  // Add welcome message when modal opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        text: `Hello! I'm ${assistantName}, your VoiceChain AI assistant. I'm here to help you with everything crypto and DeFi related. You can speak to me or type - I understand multiple languages! ${!isSupported ? 'Note: Voice recognition is not supported in your browser, but you can still type to me!' : 'Try saying "What\'s my balance?" or "Show me current prices" to get started!'}`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, assistantName, isSupported]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{assistantName}</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-gray-500">{t('voiceAssistant')}</p>
                  {!isSupported && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Voice not supported
                    </span>
                  )}
                  {isListening && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full animate-pulse">
                      Listening...
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-start">
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-2xl max-w-xs lg:max-w-md">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4" />
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <VoiceButton
                isListening={isListening}
                isSupported={isSupported}
                onStartListening={startListening}
                onStopListening={stopListening}
                size="sm"
              />
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isListening 
                      ? t('listening') 
                      : isSupported 
                        ? "Type your message or speak..." 
                        : "Type your message..."
                  }
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim() || isProcessing}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                {isListening && (
                  <span className="flex items-center space-x-1 text-blue-500 animate-pulse">
                    <Mic className="h-3 w-3" />
                    <span>{t('listening')}</span>
                  </span>
                )}
                {!isSupported && (
                  <span className="flex items-center space-x-1 text-yellow-600">
                    <MicOff className="h-3 w-3" />
                    <span>Voice not supported - use text input</span>
                  </span>
                )}
              </div>
              <span>Press Enter to send</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
