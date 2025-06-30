import { useState, useEffect } from 'react';
import { CryptoPrice } from '../types';

export const useCryptoData = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        // Simulated API call - in production, this would call CoinGecko API
        const mockPrices: CryptoPrice[] = [
          {
            symbol: 'ICP',
            price: 12.45,
            change24h: 5.67,
            volume24h: 45000000,
            marketCap: 5700000000
          },
          {
            symbol: 'BTC',
            price: 43250.30,
            change24h: -2.34,
            volume24h: 15000000000,
            marketCap: 850000000000
          },
          {
            symbol: 'ETH',
            price: 2650.75,
            change24h: 3.21,
            volume24h: 8000000000,
            marketCap: 320000000000
          },
          {
            symbol: 'USDT',
            price: 1.00,
            change24h: 0.01,
            volume24h: 25000000000,
            marketCap: 95000000000
          },
          {
            symbol: 'USDC',
            price: 1.00,
            change24h: -0.01,
            volume24h: 3500000000,
            marketCap: 25000000000
          }
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPrices(mockPrices);
        setError(null);
      } catch (err) {
        setError('Failed to fetch crypto prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    
    // Update prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { prices, loading, error };
};