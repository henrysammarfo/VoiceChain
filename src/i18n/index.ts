import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Landing Page
      'welcome': 'Welcome to VoiceChain',
      'tagline': 'Your Voice, Your Finance',
      'subtitle': 'The pioneering decentralized voice commerce network - transact, shop, and access DeFi services using natural voice commands in ANY language.',
      'connectIdentity': 'Connect or Verify Your Identity',
      'getStarted': 'Get Started',
      
      // Identity Verification
      'verifyIdentity': 'Verify Your Identity',
      'verifyingIdentity': 'Verifying your identity...',
      'identityVerified': 'Identity Verified Successfully!',
      'proceedToAccount': 'Proceed to Account Creation',
      
      // Account Creation
      'createAccount': 'Create Your VoiceChain Account',
      'chooseUsername': 'Choose a Username',
      'usernamePlaceholder': 'Enter your username',
      'usernameAvailable': 'Username available!',
      'nameAssistant': 'Name Your AI Assistant',
      'assistantPlaceholder': 'Enter assistant name',
      'selectLanguage': 'Select Interface & Voice Language',
      'createMyAccount': 'Create My Account',
      
      // Dashboard
      'dashboard': 'Dashboard',
      'totalBalance': 'Total Balance',
      'hideBalance': 'Hide Balance',
      'showBalance': 'Show Balance',
      'portfolio': 'Portfolio',
      'transact': 'Transact',
      'defi': 'DeFi',
      'shop': 'Shop',
      'settings': 'Settings',
      
      // Voice Interface
      'voiceAssistant': 'Voice Assistant',
      'tapToSpeak': 'Tap to speak with your AI assistant',
      'listening': 'Listening...',
      'processing': 'Processing...',
      'speak': 'Speak',
      
      // Transactions
      'send': 'Send',
      'receive': 'Receive',
      'swap': 'Swap',
      'stake': 'Stake',
      'enterAmount': 'Enter Amount',
      'enterRecipient': 'Enter Recipient',
      'confirmTransaction': 'Confirm Transaction',
      'enterPin': 'Enter 4-digit PIN',
      'sendCrypto': 'Send Crypto',
      'receiveCrypto': 'Receive Crypto',
      'swapTokens': 'Swap Tokens',
      'stakeTokens': 'Stake Tokens',
      'transactionHistory': 'Transaction History',
      'quickActions': 'Quick Actions',
      
      // DeFi
      'stakingRewards': 'Staking Rewards',
      'liquidityPools': 'Liquidity Pools',
      'yieldFarming': 'Yield Farming',
      'lending': 'Lending',
      'borrowing': 'Borrowing',
      'governance': 'Governance',
      'currentApy': 'Current APY',
      'stakeNow': 'Stake Now',
      'addLiquidity': 'Add Liquidity',
      'farmRewards': 'Farm Rewards',
      
      // Common
      'back': 'Back',
      'next': 'Next',
      'cancel': 'Cancel',
      'confirm': 'Confirm',
      'close': 'Close',
      'loading': 'Loading...',
      'error': 'Error',
      'success': 'Success',
      'language': 'Language',
      'balance': 'Balance',
      'price': 'Price',
      'change24h': '24h Change',
      'volume': 'Volume',
      'marketCap': 'Market Cap'
    }
  },
  es: {
    translation: {
      'welcome': 'Bienvenido a VoiceChain',
      'tagline': 'Tu Voz, Tus Finanzas',
      'subtitle': 'La red pionera de comercio de voz descentralizada: realiza transacciones, compra y accede a servicios DeFi usando comandos de voz naturales en CUALQUIER idioma.',
      'connectIdentity': 'Conectar o Verificar Tu Identidad',
      'getStarted': 'Comenzar',
      'verifyIdentity': 'Verificar Tu Identidad',
      'verifyingIdentity': 'Verificando tu identidad...',
      'identityVerified': '¡Identidad Verificada Exitosamente!',
      'proceedToAccount': 'Proceder a la Creación de Cuenta',
      'createAccount': 'Crear Tu Cuenta VoiceChain',
      'chooseUsername': 'Elegir un Nombre de Usuario',
      'usernamePlaceholder': 'Ingresa tu nombre de usuario',
      'usernameAvailable': '¡Nombre de usuario disponible!',
      'nameAssistant': 'Nombra Tu Asistente IA',
      'assistantPlaceholder': 'Ingresa el nombre del asistente',
      'selectLanguage': 'Seleccionar Idioma de Interfaz y Voz',
      'createMyAccount': 'Crear Mi Cuenta',
      'dashboard': 'Panel de Control',
      'totalBalance': 'Saldo Total',
      'hideBalance': 'Ocultar Saldo',
      'showBalance': 'Mostrar Saldo',
      'portfolio': 'Portafolio',
      'transact': 'Transaccionar',
      'defi': 'DeFi',
      'shop': 'Comprar',
      'settings': 'Configuración',
      'voiceAssistant': 'Asistente de Voz',
      'tapToSpeak': 'Toca para hablar con tu asistente IA',
      'listening': 'Escuchando...',
      'processing': 'Procesando...',
      'speak': 'Hablar',
      'send': 'Enviar',
      'receive': 'Recibir',
      'swap': 'Intercambiar',
      'stake': 'Apostar',
      'enterAmount': 'Ingresar Cantidad',
      'enterRecipient': 'Ingresar Destinatario',
      'confirmTransaction': 'Confirmar Transacción',
      'enterPin': 'Ingresar PIN de 4 dígitos',
      'sendCrypto': 'Enviar Cripto',
      'receiveCrypto': 'Recibir Cripto',
      'swapTokens': 'Intercambiar Tokens',
      'stakeTokens': 'Apostar Tokens',
      'transactionHistory': 'Historial de Transacciones',
      'quickActions': 'Acciones Rápidas',
      'stakingRewards': 'Recompensas de Staking',
      'liquidityPools': 'Pools de Liquidez',
      'yieldFarming': 'Yield Farming',
      'lending': 'Préstamos',
      'borrowing': 'Préstamos',
      'governance': 'Gobernanza',
      'currentApy': 'APY Actual',
      'stakeNow': 'Apostar Ahora',
      'addLiquidity': 'Agregar Liquidez',
      'farmRewards': 'Cosechar Recompensas',
      'back': 'Atrás',
      'next': 'Siguiente',
      'cancel': 'Cancelar',
      'confirm': 'Confirmar',
      'close': 'Cerrar',
      'loading': 'Cargando...',
      'error': 'Error',
      'success': 'Éxito',
      'language': 'Idioma',
      'balance': 'Saldo',
      'price': 'Precio',
      'change24h': 'Cambio 24h',
      'volume': 'Volumen',
      'marketCap': 'Cap. de Mercado'
    }
  },
  fr: {
    translation: {
      'welcome': 'Bienvenue sur VoiceChain',
      'tagline': 'Votre Voix, Vos Finances',
      'subtitle': 'Le réseau pionnier de commerce vocal décentralisé - effectuez des transactions, achetez et accédez aux services DeFi en utilisant des commandes vocales naturelles dans N\'IMPORTE QUELLE langue.',
      'connectIdentity': 'Connecter ou Vérifier Votre Identité',
      'getStarted': 'Commencer',
      'dashboard': 'Tableau de Bord',
      'language': 'Langue',
      'portfolio': 'Portefeuille',
      'transact': 'Transacter',
      'defi': 'DeFi',
      'shop': 'Acheter',
      'settings': 'Paramètres',
      'send': 'Envoyer',
      'receive': 'Recevoir',
      'swap': 'Échanger',
      'stake': 'Miser'
    }
  },
  de: {
    translation: {
      'welcome': 'Willkommen bei VoiceChain',
      'tagline': 'Ihre Stimme, Ihre Finanzen',
      'subtitle': 'Das bahnbrechende dezentrale Sprachhandelsnetzwerk - führen Sie Transaktionen durch, kaufen Sie ein und greifen Sie auf DeFi-Dienste zu, indem Sie natürliche Sprachbefehle in JEDER Sprache verwenden.',
      'connectIdentity': 'Identität Verbinden oder Verifizieren',
      'getStarted': 'Loslegen',
      'dashboard': 'Dashboard',
      'language': 'Sprache',
      'portfolio': 'Portfolio',
      'transact': 'Transaktionen',
      'defi': 'DeFi',
      'shop': 'Einkaufen',
      'settings': 'Einstellungen',
      'send': 'Senden',
      'receive': 'Empfangen',
      'swap': 'Tauschen',
      'stake': 'Staken'
    }
  },
  tw: {
    translation: {
      'welcome': 'Akwaaba VoiceChain',
      'tagline': 'Wo Nne, Wo Sika',
      'subtitle': 'Nne adwuma a edi kan wɔ wiase nyinaa - yɛ adwuma, tɔ nneɛma, na nya DeFi dwumadi denam wo nne so wɔ kasa biara mu.',
      'connectIdentity': 'Ka Wo Ho Anaasɛ Hwɛ Wo Suban',
      'getStarted': 'Fi Ase',
      'dashboard': 'Dashboard',
      'language': 'Kasa',
      'portfolio': 'Portfolio',
      'transact': 'Yɛ Adwuma',
      'defi': 'DeFi',
      'shop': 'Tɔ',
      'settings': 'Nhyehyɛe',
      'send': 'Soma',
      'receive': 'Gye',
      'swap': 'Sesa',
      'stake': 'De Si Hɔ'
    }
  },
  sw: {
    translation: {
      'welcome': 'Karibu VoiceChain',
      'tagline': 'Sauti Yako, Fedha Yako',
      'subtitle': 'Mtandao wa kwanza wa biashara ya sauti iliyogatuliwa - fanya miamala, nunua na upate huduma za DeFi kwa kutumia amri za sauti za asili katika lugha YOYOTE.',
      'connectIdentity': 'Unganisha au Thibitisha Utambulisho Wako',
      'getStarted': 'Anza',
      'dashboard': 'Dashibodi',
      'language': 'Lugha',
      'portfolio': 'Mkoba',
      'transact': 'Fanya Miamala',
      'defi': 'DeFi',
      'shop': 'Nunua',
      'settings': 'Mipangilio',
      'send': 'Tuma',
      'receive': 'Pokea',
      'swap': 'Badilisha',
      'stake': 'Weka Akiba'
    }
  },
  zh: {
    translation: {
      'welcome': '欢迎来到VoiceChain',
      'tagline': '您的声音，您的财务',
      'subtitle': '开创性的去中心化语音商务网络 - 使用任何语言的自然语音命令进行交易、购物和访问DeFi服务。',
      'connectIdentity': '连接或验证您的身份',
      'getStarted': '开始使用',
      'dashboard': '仪表板',
      'language': '语言',
      'portfolio': '投资组合',
      'transact': '交易',
      'defi': 'DeFi',
      'shop': '购物',
      'settings': '设置',
      'send': '发送',
      'receive': '接收',
      'swap': '交换',
      'stake': '质押'
    }
  },
  ja: {
    translation: {
      'welcome': 'VoiceChainへようこそ',
      'tagline': 'あなたの声、あなたの金融',
      'subtitle': '先駆的な分散型音声商取引ネットワーク - どの言語でも自然な音声コマンドを使用して取引、ショッピング、DeFiサービスにアクセス。',
      'connectIdentity': 'アイデンティティを接続または確認',
      'getStarted': '始める',
      'dashboard': 'ダッシュボード',
      'language': '言語',
      'portfolio': 'ポートフォリオ',
      'transact': '取引',
      'defi': 'DeFi',
      'shop': 'ショップ',
      'settings': '設定',
      'send': '送信',
      'receive': '受信',
      'swap': 'スワップ',
      'stake': 'ステーク'
    }
  },
  ko: {
    translation: {
      'welcome': 'VoiceChain에 오신 것을 환영합니다',
      'tagline': '당신의 목소리, 당신의 금융',
      'subtitle': '선구적인 분산형 음성 상거래 네트워크 - 어떤 언어로든 자연스러운 음성 명령을 사용하여 거래, 쇼핑, DeFi 서비스에 액세스하세요.',
      'connectIdentity': '신원 연결 또는 확인',
      'getStarted': '시작하기',
      'dashboard': '대시보드',
      'language': '언어',
      'portfolio': '포트폴리오',
      'transact': '거래',
      'defi': 'DeFi',
      'shop': '쇼핑',
      'settings': '설정',
      'send': '보내기',
      'receive': '받기',
      'swap': '교환',
      'stake': '스테이킹'
    }
  },
  hi: {
    translation: {
      'welcome': 'VoiceChain में आपका स्वागत है',
      'tagline': 'आपकी आवाज़, आपका वित्त',
      'subtitle': 'अग्रणी विकेंद्रीकृत आवाज़ वाणिज्य नेटवर्क - किसी भी भाषा में प्राकृतिक आवाज़ कमांड का उपयोग करके लेनदेन, खरीदारी और DeFi सेवाओं तक पहुंच।',
      'connectIdentity': 'अपनी पहचान कनेक्ट या सत्यापित करें',
      'getStarted': 'शुरू करें',
      'dashboard': 'डैशबोर्ड',
      'language': 'भाषा',
      'portfolio': 'पोर्टफोलियो',
      'transact': 'लेनदेन',
      'defi': 'DeFi',
      'shop': 'खरीदारी',
      'settings': 'सेटिंग्स',
      'send': 'भेजें',
      'receive': 'प्राप्त करें',
      'swap': 'अदला-बदली',
      'stake': 'स्टेक'
    }
  },
  ar: {
    translation: {
      'welcome': 'مرحباً بك في VoiceChain',
      'tagline': 'صوتك، أموالك',
      'subtitle': 'الشبكة الرائدة للتجارة الصوتية اللامركزية - قم بالمعاملات والتسوق والوصول إلى خدمات DeFi باستخدام أوامر صوتية طبيعية بأي لغة.',
      'connectIdentity': 'ربط أو التحقق من هويتك',
      'getStarted': 'ابدأ',
      'dashboard': 'لوحة التحكم',
      'language': 'اللغة',
      'portfolio': 'المحفظة',
      'transact': 'المعاملات',
      'defi': 'DeFi',
      'shop': 'تسوق',
      'settings': 'الإعدادات',
      'send': 'إرسال',
      'receive': 'استقبال',
      'swap': 'تبديل',
      'stake': 'رهان'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;