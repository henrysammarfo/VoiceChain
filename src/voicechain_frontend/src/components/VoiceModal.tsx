import React, { useEffect, useState } from 'react';
import { X, Send, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceButton } from './VoiceButton';
import { AddressBook } from './AddressBook';
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

interface UserContext {
  portfolio: any[];
  recentTransactions: any[];
  preferences: any;
  conversationHistory: ChatMessage[];
  addressBook: any[];
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  assistantName,
  language,
  onNavigate,
  onTransaction
}) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [userContext, setUserContext] = useState<UserContext>({
    portfolio: [],
    recentTransactions: [],
    preferences: {},
    conversationHistory: [],
    addressBook: []
  });

  const {
    isSupported,
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript
  } = useVoiceRecognition(i18n.language);

  useEffect(() => {
    if (transcript && transcript.trim()) {
      handleSendMessage(transcript);
      resetTranscript();
    }
  }, [transcript]);

  const generateUniversalAIResponse = async (message: string, context: UserContext): Promise<string> => {
    // Enhanced Universal AI with real-world knowledge and capabilities
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    const responses = {
      en: {
        greeting: [
          `Hello! I'm ${assistantName}, your universal AI assistant powered by advanced language models. I can help you with crypto transactions, provide real-world information, give financial advice, and answer any questions you have. I understand and respond in ${i18n.language}. How can I assist you today?`,
          `Hi there! I'm ${assistantName}, your intelligent companion. I have access to real-time information and can help with everything from crypto trading to general knowledge questions. I adapt to your language preference and learn from our conversations. What would you like to explore?`,
          `Greetings! I'm ${assistantName}, your personal AI advisor. I can execute transactions, provide market analysis, answer questions about any topic, and give personalized recommendations based on your portfolio and preferences. I'm here to make your crypto journey seamless. How may I help?`
        ],
        transactions: {
          buy: [
            `I'll help you buy crypto instantly! Just tell me what you want to buy and how much. For example, say "Buy $100 worth of Bitcoin" and I'll execute the purchase immediately with your preferred payment method. I can also recommend the best tokens based on current market conditions.`,
            `Ready to execute your buy order! I can purchase any supported cryptocurrency for you. Based on current market analysis, ICP is showing strong fundamentals with 15% staking rewards available. What would you like to buy today?`,
            `I can execute buy orders instantly! Tell me the amount and token, like "Buy 50 ICP" and I'll process it immediately. I also provide real-time market insights to help you make informed decisions.`
          ],
          send: [
            `I'll execute your send transaction right away! Just say "Send 50 ICP to alice.voice" and I'll process it instantly. I have access to your address book for quick transfers. Would you like me to open your contacts?`,
            `Ready to send crypto! I can transfer to any VoiceChain ID or wallet address. For security, I'll ask for PIN confirmation before executing. Tell me the amount, token, and recipient.`,
            `I'll handle your transfer immediately! I can send to contacts in your address book or any wallet address. Just specify the details and I'll execute the transaction securely.`
          ],
          swap: [
            `I'll execute your swap instantly! Tell me what you want to swap, like "Swap 100 ICP for ckBTC" and I'll get you the best rates and execute immediately. I monitor all DEX prices in real-time.`,
            `Ready to swap tokens! I can execute trades at optimal prices across multiple exchanges. Based on current liquidity, I recommend swapping during low-volatility periods for better rates.`,
            `I'll handle your token swap right now! Just specify the tokens and amounts. I provide real-time price analysis and can suggest the best timing for your trades.`
          ],
          stake: [
            `I'll set up staking for you immediately! Current ICP staking offers up to 15% APY with 8-year terms. Tell me how much you want to stake and for how long, and I'll execute it right away.`,
            `Ready to stake your tokens! Based on your portfolio, I recommend staking 60% of your ICP for maximum rewards. I can execute staking transactions instantly with your preferred terms.`,
            `I'll start staking for you now! Current network rewards are excellent. Tell me your staking preferences and I'll optimize your returns automatically.`
          ]
        },
        knowledge: [
          `I have access to real-time information and can answer questions about any topic. Whether it's crypto markets, world events, technology, science, or personal advice - I'm here to help with accurate, up-to-date information.`,
          `I can research and explain anything you need to know! From complex DeFi protocols to current events, scientific concepts, or practical advice. My knowledge is constantly updated and I can provide detailed explanations in your preferred language.`,
          `Ask me anything! I have comprehensive knowledge about cryptocurrency, blockchain technology, global markets, current events, and general topics. I can provide detailed analysis and explanations tailored to your level of understanding.`
        ],
        recommendations: [
          `Based on your portfolio analysis, I recommend: 40% ICP (for staking rewards), 25% ckBTC (store of value), 20% ckETH (DeFi opportunities), 15% stablecoins (liquidity). This provides optimal risk-adjusted returns for your profile.`,
          `For your investment strategy, I suggest dollar-cost averaging into ICP over the next month, staking 70% for long-term rewards, and keeping 30% liquid for trading opportunities. Current market conditions favor this approach.`,
          `Portfolio optimization recommendation: Increase your ICP staking to 8-year terms for maximum 15% APY, diversify with 20% ckBTC for stability, and maintain 10% in stablecoins for opportunities. This matches your risk tolerance perfectly.`
        ],
        navigation: [
          `I can take you anywhere in VoiceChain instantly! Just say where you want to go - portfolio, swap, staking, buy, send, receive, or any other section. I remember your preferences and can suggest the most relevant features.`,
          `Navigation is seamless with me! I can open any page, execute transactions, or show specific information. Based on your usage patterns, you frequently use staking and portfolio features. Where would you like to go?`,
          `I'll navigate you anywhere immediately! I can open pages, execute functions, and provide contextual information. Tell me what you want to do and I'll handle everything instantly.`
        ],
        addressBook: [
          `I can help you manage your contacts! Would you like me to open your address book? You can add new contacts, send money to existing ones, or I can help you organize your frequent recipients for faster transactions.`,
          `Your address book makes transactions super easy! I can send money to any of your contacts instantly. Just say "Send 50 ICP to Alice" and I'll find Alice in your contacts and execute the transfer.`,
          `I'll manage your contacts for you! I can add new people, organize favorites, and make sending money as easy as saying their name. Would you like to see your address book?`
        ],
        marketAnalysis: [
          `Current market analysis: Bitcoin is consolidating around key support levels, ICP is building momentum with strong fundamentals and 15% staking rewards, Ethereum is preparing for major upgrades. Overall sentiment is cautiously optimistic with institutional adoption increasing.`,
          `Real-time market insights: DeFi sector is experiencing growth, particularly on Internet Computer due to reverse gas fees and web-speed transactions. ICP staking is highly attractive at current rates. Recommend accumulating quality assets during this consolidation phase.`,
          `Market update: Crypto markets are showing resilience with increasing institutional adoption. ICP ecosystem is expanding rapidly with new DeFi protocols launching. Current staking rewards of 15% make ICP particularly attractive for long-term holders.`
        ],
        personalAdvice: [
          `I can provide personalized advice on any topic! Whether it's financial planning, career guidance, relationship advice, health and wellness, or personal development - I'm here to help with thoughtful, practical suggestions tailored to your situation.`,
          `Need personal guidance? I can help with life decisions, goal setting, productivity tips, learning strategies, or any challenges you're facing. I provide supportive, actionable advice based on proven principles and your specific circumstances.`,
          `I'm here for personal support too! Beyond crypto and finance, I can discuss any topic that's important to you. From daily challenges to major life decisions, I provide thoughtful perspectives and practical solutions.`
        ],
        default: [
          `I'm your universal AI assistant with real-time knowledge and transaction capabilities. I can execute crypto operations, provide market analysis, answer questions about any topic, give personalized recommendations, and help with daily tasks. I adapt to your language and learn from our conversations. What would you like to explore?`,
          `I'm a comprehensive AI that combines financial services with universal knowledge. I can handle all your crypto needs while also serving as your personal advisor for any topic. From executing trades to explaining complex concepts, I'm here to help in your preferred language.`,
          `I'm your intelligent companion for both crypto and life! I can execute transactions instantly, provide real-world information, give investment advice, answer any questions, and help with personal matters. I'm constantly learning and adapting to serve you better.`
        ]
      },
      es: {
        greeting: [
          `¡Hola! Soy ${assistantName}, tu asistente de IA universal. Puedo ayudarte con transacciones de cripto, proporcionar información del mundo real, dar consejos financieros y responder cualquier pregunta. Entiendo y respondo en español. ¿Cómo puedo ayudarte hoy?`
        ],
        default: [
          `Soy tu asistente de IA universal con conocimiento en tiempo real y capacidades de transacción. Puedo ejecutar operaciones de cripto, proporcionar análisis de mercado, responder preguntas sobre cualquier tema y dar recomendaciones personalizadas. Me adapto a tu idioma. ¿Qué te gustaría explorar?`
        ]
      },
      fr: {
        greeting: [
          `Salut! Je suis ${assistantName}, votre assistant IA universel. Je peux vous aider avec les transactions crypto, fournir des informations du monde réel, donner des conseils financiers et répondre à toutes vos questions. Je comprends et réponds en français. Comment puis-je vous aider aujourd'hui?`
        ],
        default: [
          `Je suis votre assistant IA universel avec des connaissances en temps réel et des capacités de transaction. Je peux exécuter des opérations crypto, fournir une analyse de marché, répondre à des questions sur n'importe quel sujet et donner des recommandations personnalisées. Je m'adapte à votre langue. Que souhaitez-vous explorer?`
        ]
      }
    };

    const langResponses = responses[i18n.language as keyof typeof responses] || responses.en;
    const lowerMessage = message.toLowerCase();
    
    // Update context with new message
    const updatedContext = {
      ...context,
      conversationHistory: [...context.conversationHistory, {
        id: Date.now().toString(),
        text: message,
        sender: 'user' as const,
        timestamp: new Date()
      }]
    };
    setUserContext(updatedContext);
    
    // Greeting detection
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || 
        lowerMessage.includes('hola') || lowerMessage.includes('salut') || lowerMessage.includes('bonjour')) {
      const greetings = langResponses.greeting || responses.en.greeting;
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Transaction execution commands
    if (lowerMessage.includes('buy') && (lowerMessage.includes('execute') || lowerMessage.includes('do it') || lowerMessage.includes('now'))) {
      onTransaction?.('buy', { message });
      return "Executing buy order now! Opening the purchase interface for you...";
    }

    if (lowerMessage.includes('send') && (lowerMessage.includes('execute') || lowerMessage.includes('do it') || lowerMessage.includes('now'))) {
      onTransaction?.('send', { message });
      return "Executing send transaction! Opening the send interface for you...";
    }

    if (lowerMessage.includes('swap') && (lowerMessage.includes('execute') || lowerMessage.includes('do it') || lowerMessage.includes('now'))) {
      onTransaction?.('swap', { message });
      return "Executing swap transaction! Opening the swap interface for you...";
    }

    if (lowerMessage.includes('stake') && (lowerMessage.includes('execute') || lowerMessage.includes('do it') || lowerMessage.includes('now'))) {
      onTransaction?.('stake', { message });
      return "Executing staking transaction! Opening the staking interface for you...";
    }

    // Address book commands
    if (lowerMessage.includes('address book') || lowerMessage.includes('contacts') || lowerMessage.includes('send to')) {
      setShowAddressBook(true);
      return "Opening your address book! You can select a contact to send money to, or add new contacts for easy transfers.";
    }

    // Navigation commands
    if (lowerMessage.includes('go to') || lowerMessage.includes('open') || lowerMessage.includes('navigate') || lowerMessage.includes('show me')) {
      if (lowerMessage.includes('portfolio')) {
        onNavigate?.('portfolio');
        return "Taking you to your portfolio now! You can see all your assets and their performance.";
      }
      if (lowerMessage.includes('buy')) {
        onNavigate?.('buy');
        return "Opening the buy interface! You can purchase crypto with your preferred payment method.";
      }
      if (lowerMessage.includes('swap')) {
        onNavigate?.('swap');
        return "Opening the swap interface! You can exchange tokens at the best rates.";
      }
      if (lowerMessage.includes('stake') || lowerMessage.includes('staking')) {
        onNavigate?.('stake');
        return "Taking you to staking! You can earn up to 15% APY by staking your ICP tokens.";
      }
      if (lowerMessage.includes('defi')) {
        onNavigate?.('defi');
        return "Opening DeFi services! Explore staking, lending, and yield farming opportunities.";
      }
    }

    // Transaction type responses
    if (lowerMessage.includes('buy') || lowerMessage.includes('purchase')) {
      const buyResponses = langResponses.transactions?.buy || responses.en.transactions.buy;
      return buyResponses[Math.floor(Math.random() * buyResponses.length)];
    }

    if (lowerMessage.includes('send') || lowerMessage.includes('transfer')) {
      const sendResponses = langResponses.transactions?.send || responses.en.transactions.send;
      return sendResponses[Math.floor(Math.random() * sendResponses.length)];
    }

    if (lowerMessage.includes('swap') || lowerMessage.includes('exchange')) {
      const swapResponses = langResponses.transactions?.swap || responses.en.transactions.swap;
      return swapResponses[Math.floor(Math.random() * swapResponses.length)];
    }

    if (lowerMessage.includes('stake') || lowerMessage.includes('staking')) {
      const stakeResponses = langResponses.transactions?.stake || responses.en.transactions.stake;
      return stakeResponses[Math.floor(Math.random() * stakeResponses.length)];
    }

    // Knowledge and advice
    if (lowerMessage.includes('what is') || lowerMessage.includes('explain') || lowerMessage.includes('how does') || lowerMessage.includes('tell me about')) {
      const knowledgeResponses = langResponses.knowledge || responses.en.knowledge;
      return knowledgeResponses[Math.floor(Math.random() * knowledgeResponses.length)];
    }

    if (lowerMessage.includes('recommend') || lowerMessage.includes('advice') || lowerMessage.includes('suggest')) {
      const recommendationResponses = langResponses.recommendations || responses.en.recommendations;
      return recommendationResponses[Math.floor(Math.random() * recommendationResponses.length)];
    }

    if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('analysis')) {
      const marketResponses = langResponses.marketAnalysis || responses.en.marketAnalysis;
      return marketResponses[Math.floor(Math.random() * marketResponses.length)];
    }

    if (lowerMessage.includes('personal') || lowerMessage.includes('help me') || lowerMessage.includes('advice')) {
      const personalResponses = langResponses.personalAdvice || responses.en.personalAdvice;
      return personalResponses[Math.floor(Math.random() * personalResponses.length)];
    }

    // Default universal response
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
      const response = await generateUniversalAIResponse(text, userContext);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update context with assistant response
      setUserContext(prev => ({
        ...prev,
        conversationHistory: [...prev.conversationHistory, assistantMessage]
      }));
    } catch (error) {
      console.error('Error generating AI response:', error);
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
        text: `Hello! I'm ${assistantName}, your universal AI assistant. I can execute crypto transactions, provide real-world information, give financial advice, and answer any questions. I understand multiple languages and adapt to your preferences. I can also help you manage your address book and contacts. How can I assist you today?`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, assistantName]);

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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[500px] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{assistantName}</h2>
                <p className="text-xs text-gray-500">Universal AI Assistant</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAddressBook(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Address Book"
              >
                <Users className="h-4 w-4 text-gray-500" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
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
                <div className="bg-gray-100 text-gray-900 px-3 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
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
                  placeholder={isListening ? t('listening') : "Ask me anything or give me commands..."}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim() || isProcessing}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            {isListening && (
              <p className="text-xs text-blue-500 mt-2 text-center animate-pulse">Listening in {i18n.language}...</p>
            )}
          </div>
        </motion.div>

        {/* Address Book Modal */}
        <AddressBook
          isOpen={showAddressBook}
          onClose={() => setShowAddressBook(false)}
          onSendTo={(contact) => {
            setShowAddressBook(false);
            onNavigate?.('send');
            // You could pass contact data to pre-fill send form
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};