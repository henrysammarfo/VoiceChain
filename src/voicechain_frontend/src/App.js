import { html, render } from 'lit-html';
import { voicechain_backend } from 'declarations/voicechain_backend';
import logo from './logo2.svg';

class App {
  constructor() {
    this.isRecording = false;
    this.selectedLanguage = 'en';
    this.currentCommand = '';
    this.audioWaveform = [];
    this.isProcessing = false;
    this.lastTransaction = null;
    this.balance = 0;
    this.greeting = '';
    
    // Initialize audio context for voice recording
    this.initializeAudio();
    this.#render();
  }

  // 16 Global Languages Support
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', region: 'Global' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭', region: 'Ghana' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬', region: 'Nigeria' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', region: 'West Africa' },
    { code: 'ar', name: 'العربية', flag: '🇪🇬', region: 'North Africa' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬', region: 'Nigeria/Niger' },
    { code: 'zu', name: 'Zulu', flag: '🇿🇦', region: 'South Africa' },
    { code: 'es', name: 'Español', flag: '🇪🇸', region: '500M+ Speakers' },
    { code: 'zh', name: '中文', flag: '🇨🇳', region: '1B+ Speakers' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', region: '600M+ Speakers' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', region: 'Brazil Market' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', region: '250M+ Speakers' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', region: 'Tech Market' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', region: 'EU Market' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', region: 'Crypto Heavy' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪', region: 'East Africa' }
  ];

  // Sample voice commands for demo
  sampleCommands = {
    en: ["Send $50 to John", "Buy Bitcoin with mobile money", "Check my balance"],
    tw: ["Mema John dɔla 50", "Tɔ Bitcoin fi mobile money", "Hwɛ me sika"],
    es: ["Envía $50 a María", "Compra Bitcoin con dinero móvil", "Verifica mi saldo"],
    zh: ["给约翰发送50美元", "用手机支付买比特币", "查看我的余额"],
    fr: ["Envoie 50$ à Marie", "Achète Bitcoin avec mobile money", "Vérifie mon solde"]
  };

  async initializeAudio() {
    try {
      this.mediaRecorder = null;
      this.audioChunks = [];
    } catch (error) {
      console.log('Audio initialization pending user interaction');
    }
  }

  #handleLanguageChange = (e) => {
    this.selectedLanguage = e.target.value;
    this.#render();
  };

  #startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.#processVoiceCommand();
      };

      this.mediaRecorder.start();
      this.isRecording = true;
      this.#startWaveformAnimation();
      this.#render();
    } catch (error) {
      console.error('Voice recording error:', error);
      alert('Voice recording not available. Please check microphone permissions.');
    }
  };

  #stopVoiceRecording = () => {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.isProcessing = true;
      this.#render();
    }
  };

  #startWaveformAnimation = () => {
    const animateWave = () => {
      if (this.isRecording) {
        this.audioWaveform = Array.from({length: 20}, () => Math.random() * 100);
        this.#render();
        requestAnimationFrame(animateWave);
      }
    };
    animateWave();
  };

  #processVoiceCommand = async () => {
    // Simulate voice processing (replace with real speech-to-text)
    const selectedLang = this.languages.find(l => l.code === this.selectedLanguage);
    const commands = this.sampleCommands[this.selectedLanguage] || this.sampleCommands.en;
    
    setTimeout(async () => {
      this.currentCommand = commands[Math.floor(Math.random() * commands.length)];
      this.isProcessing = false;
      
      // Simulate transaction processing
      if (this.currentCommand.includes('Send') || this.currentCommand.includes('Envía') || this.currentCommand.includes('Mema')) {
        this.lastTransaction = {
          type: 'send',
          amount: '$50',
          recipient: 'Contact',
          status: 'completed',
          language: selectedLang.name
        };
      } else if (this.currentCommand.includes('Buy') || this.currentCommand.includes('Compra') || this.currentCommand.includes('Tɔ')) {
        this.lastTransaction = {
          type: 'buy',
          asset: 'Bitcoin',
          amount: '$50',
          status: 'completed',
          language: selectedLang.name
        };
        this.balance += 50;
      } else {
        this.balance = Math.floor(Math.random() * 1000) + 100;
      }
      
      this.#render();
    }, 2000);
  };

  #handleSampleCommand = (command) => {
    this.currentCommand = command;
    this.isProcessing = true;
    this.#render();
    
    setTimeout(() => {
      this.isProcessing = false;
      this.lastTransaction = {
        type: 'demo',
        command: command,
        status: 'completed',
        language: this.languages.find(l => l.code === this.selectedLanguage).name
      };
      this.#render();
    }, 1500);
  };

  #render() {
    const selectedLang = this.languages.find(l => l.code === this.selectedLanguage);
    const commands = this.sampleCommands[this.selectedLanguage] || this.sampleCommands.en;

    let body = html`
      <div class="voice-commerce-app">
        <!-- Header -->
        <header class="app-header">
          <div class="logo-container">
            <img src="${logo}" alt="VoiceChain Logo" class="app-logo" />
            <h1 class="app-title">VoiceChain</h1>
            <p class="app-subtitle">Global Decentralized Voice Commerce</p>
          </div>
        </header>

        <!-- Language Selector -->
        <section class="language-selector-section">
          <h2 class="section-title">🌍 Choose Your Language</h2>
          <div class="language-grid">
            ${this.languages.map(lang => html`
              <button 
                class="language-card ${this.selectedLanguage === lang.code ? 'active' : ''}"
                @click=${() => { this.selectedLanguage = lang.code; this.#render(); }}
              >
                <span class="flag">${lang.flag}</span>
                <span class="lang-name">${lang.name}</span>
                <span class="region">${lang.region}</span>
              </button>
            `)}
          </div>
          <div class="selected-language">
            <span class="selected-flag">${selectedLang.flag}</span>
            <span class="selected-text">Speaking in ${selectedLang.name}</span>
          </div>
        </section>

        <!-- Voice Recording Section -->
        <section class="voice-recording-section">
          <div class="recording-container">
            <button 
              class="voice-record-btn ${this.isRecording ? 'recording' : ''} ${this.isProcessing ? 'processing' : ''}"
              @click=${this.isRecording ? this.#stopVoiceRecording : this.#startVoiceRecording}
              ?disabled=${this.isProcessing}
            >
              <div class="record-icon">
                ${this.isRecording ? '⏹️' : this.isProcessing ? '⚡' : '🎙️'}
              </div>
              <span class="record-text">
                ${this.isProcessing ? 'Processing...' : this.isRecording ? 'Stop Recording' : 'Start Voice Command'}
              </span>
            </button>

            <!-- Voice Waveform Animation -->
            ${this.isRecording ? html`
              <div class="waveform-container">
                ${this.audioWaveform.map(height => html`
                  <div class="wave-bar" style="height: ${height}%"></div>
                `)}
              </div>
            ` : ''}
          </div>
        </section>

        <!-- Sample Commands -->
        <section class="sample-commands-section">
          <h3 class="section-title">💬 Try These Commands</h3>
          <div class="commands-grid">
            ${commands.map(command => html`
              <button 
                class="command-card"
                @click=${() => this.#handleSampleCommand(command)}
              >
                ${command}
              </button>
            `)}
          </div>
        </section>

        <!-- Current Command Display -->
        ${this.currentCommand ? html`
          <section class="current-command-section">
            <div class="command-display">
              <h4>🎯 Voice Command Detected:</h4>
              <p class="detected-command">"${this.currentCommand}"</p>
              <p class="command-language">Language: ${selectedLang.name} ${selectedLang.flag}</p>
            </div>
          </section>
        ` : ''}

        <!-- Transaction Status -->
        ${this.lastTransaction ? html`
          <section class="transaction-section">
            <div class="transaction-card">
              <h4>✅ Transaction Status</h4>
              <div class="transaction-details">
                <p><strong>Type:</strong> ${this.lastTransaction.type}</p>
                <p><strong>Status:</strong> <span class="status-success">${this.lastTransaction.status}</span></p>
                <p><strong>Language:</strong> ${this.lastTransaction.language}</p>
                ${this.lastTransaction.amount ? html`<p><strong>Amount:</strong> ${this.lastTransaction.amount}</p>` : ''}
              </div>
            </div>
          </section>
        ` : ''}

        <!-- Balance Display -->
        <section class="balance-section">
          <div class="balance-card">
            <h4>💰 Current Balance</h4>
            <p class="balance-amount">$${this.balance.toLocaleString()}</p>
            <p class="balance-currency">USD Equivalent</p>
          </div>
        </section>

        <!-- Footer -->
        <footer class="app-footer">
          <p>🚀 Powered by Internet Computer & Chain Fusion</p>
          <p>Supporting 4+ Billion People Globally</p>
        </footer>
      </div>
    `;

    render(body, document.getElementById('root'));
  }
}

export default App;
