import { useState, useEffect, useCallback, useRef } from 'react';

interface VoiceRecognitionHook {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
}

export const useVoiceRecognition = (language: string = 'en-US'): VoiceRecognitionHook => {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Language mapping for better compatibility
  const getLanguageCode = (lang: string): string => {
    const languageMap: { [key: string]: string } = {
      'en': 'en-US',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'it': 'it-IT',
      'pt': 'pt-PT',
      'ru': 'ru-RU',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'zh': 'zh-CN',
      'hi': 'hi-IN',
      'ar': 'ar-SA',
      'nl': 'nl-NL',
      'pl': 'pl-PL',
      'tw': 'en-US', // Fallback for Twi
      'sw': 'en-US'  // Fallback for Swahili
    };
    return languageMap[lang] || languageMap[lang.split('-')[0]] || 'en-US';
  };

  useEffect(() => {
    // Check for browser support
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        
        const recognition = new SpeechRecognition();
        
        // Configure recognition
        recognition.continuous = false;
        recognition.interimResults = false; // Changed to false for cleaner final results
        recognition.maxAlternatives = 1;
        recognition.lang = getLanguageCode(language);

        // Event handlers
        recognition.onstart = () => {
          console.log('Voice recognition started');
          setIsListening(true);
          setError(null);
          setTranscript(''); // Clear previous transcript
          
          // Set a timeout to automatically stop after 10 seconds
          timeoutRef.current = setTimeout(() => {
            if (recognitionRef.current) {
              console.log('Auto-stopping recognition after timeout');
              recognitionRef.current.stop();
            }
          }, 10000);
        };

        recognition.onresult = (event) => {
          console.log('Voice recognition result event:', event);
          
          // Get the final transcript
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }

          if (finalTranscript.trim()) {
            console.log('Final transcript received:', finalTranscript);
            setTranscript(finalTranscript.trim());
          }
        };

        recognition.onerror = (event) => {
          console.error('Voice recognition error:', event.error);
          setIsListening(false);
          
          // Clear timeout on error
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }

          // Provide user-friendly error messages
          switch (event.error) {
            case 'no-speech':
              setError('No speech detected. Please try speaking clearly.');
              break;
            case 'audio-capture':
              setError('Microphone not accessible. Please check permissions.');
              break;
            case 'not-allowed':
              setError('Microphone permission denied. Please allow microphone access.');
              break;
            case 'network':
              setError('Network error. Please check your connection.');
              break;
            case 'aborted':
              // Don't show error for manual abort
              setError(null);
              break;
            default:
              setError('Voice recognition failed. Please try again.');
          }
        };

        recognition.onend = () => {
          console.log('Voice recognition ended');
          setIsListening(false);
          
          // Clear timeout when recognition ends
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('Speech recognition not supported in this browser');
        setIsSupported(false);
      }
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser');
      return;
    }

    if (isListening) {
      console.log('Already listening, ignoring start request');
      return;
    }

    if (recognitionRef.current) {
      try {
        setTranscript('');
        setError(null);
        console.log('Starting voice recognition...');
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setError('Failed to start voice recognition');
      }
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log('Stopping voice recognition...');
      recognitionRef.current.stop();
      
      // Clear timeout when manually stopping
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
};

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
