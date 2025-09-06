import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { showConnect } from '@stacks/connect';
import { Wallet, LogOut, ExternalLink, AlertCircle } from 'lucide-react';

export default function WalletConnect() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already signed in by looking for stored data
    const checkAuthStatus = () => {
      try {
        const storedUserData = localStorage.getItem('stacks-user-data');
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUserData(userData);
          setIsSignedIn(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Debug to see what showConnect expects
      console.log('showConnect function:', showConnect);
      
      // Try different parameter patterns based on common versions
      if (typeof showConnect === 'function') {
        // Option 1: Try with appDetails (older versions)
        try {
          showConnect({
            appDetails: {
              name: 'StacksEvents',
              icon: window.location.origin + '/vite.svg',
            },
            redirectTo: '/',
            onFinish: (payload: any) => {
              console.log('Connection finished:', payload);
              // Store user data in localStorage
              if (payload.userSession && payload.userSession.loadUserData) {
                const userData = payload.userSession.loadUserData();
                localStorage.setItem('stacks-user-data', JSON.stringify(userData));
                setUserData(userData);
                setIsSignedIn(true);
              }
              setIsLoading(false);
            },
            onCancel: () => {
              setIsLoading(false);
              setError('Connection cancelled');
            },
          } as any); // Use type assertion to bypass type checking
        } catch (e) {
          console.log('Trying alternative parameter format...');
          
          // Option 2: Try with different parameter names (newer versions)
          showConnect({
            name: 'StacksEvents',
            icon: window.location.origin + '/vite.svg',
            redirectTo: '/',
            onFinish: (payload: any) => {
              console.log('Connection finished:', payload);
              if (payload.authResponse && payload.authResponse.length > 0) {
                // Store basic connection info
                localStorage.setItem('stacks-wallet-connected', 'true');
                setUserData({ connected: true });
                setIsSignedIn(true);
              }
              setIsLoading(false);
            },
            onCancel: () => {
              setIsLoading(false);
              setError('Connection cancelled');
            },
          } as any);
        }
      } else {
        throw new Error('showConnect is not available');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet. Please ensure a Stacks wallet (e.g., Hiro Wallet) is installed.');
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    // Clear all stored data
    localStorage.removeItem('stacks-user-data');
    localStorage.removeItem('stacks-wallet-connected');
    setIsSignedIn(false);
    setUserData(null);
    setError(null);
    window.location.reload();
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <Button disabled className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <Wallet className="w-4 h-4 mr-2" />
        Loading...
      </Button>
    );
  }

  if (isSignedIn) {
    const address = userData?.profile?.stxAddress?.testnet || 
                    userData?.profile?.stxAddress?.mainnet ||
                    (userData.connected ? 'Connected' : '');

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 hidden sm:block">
          {formatAddress(address)}
        </span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleConnect}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
        disabled={isLoading}
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>

      {error && (
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <div className="mt-2 space-y-1">
              <p className="text-sm font-medium">Install a compatible Stacks wallet:</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://wallet.hiro.so/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                >
                  Hiro Wallet <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <a
                  href="https://www.xverse.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                >
                  Xverse <ExternalLink className="w-3 h-3 ml-1" />
                </a>
                <a
                  href="https://leather.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800"
                >
                  Leather <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export { WalletConnect };