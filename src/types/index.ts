export interface User {
  id: string;
  username: string;
  voiceId: string;
  assistantName: string;
  language: string;
  wallets: Wallet[];
  createdAt: Date;
}

export interface Wallet {
  id: string;
  address: string;
  balance: number;
  tokens: Token[];
  backgroundImage?: string;
  backgroundColor?: string;
}

export interface Token {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'stake';
  amount: number;
  token: string;
  recipient?: string;
  sender?: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  hash: string;
}

export interface VoiceCommand {
  text: string;
  language: string;
  timestamp: Date;
  response?: string;
}

export interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}