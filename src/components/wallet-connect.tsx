import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { showConnect, UserSession, AppConfig } from '@stacks/connect';
import { Wallet, LogOut, ExternalLink, AlertCircle } from 'lucide-react';

// Configure Stacks connection
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default function WalletConnect() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (userSession.isSignInPending()) {
          const userData = await userSession.handlePendingSignIn();
          setUserData(userData);
          setIsSignedIn(true);
        } else if (userSession.isUserSignedIn()) {
          setUserData(userSession.loadUserData());
          setIsSignedIn(true);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setError('Failed to check authentication status');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      showConnect({
        appDetails: {
          name: 'StacksEvents',
          icon: window.location.origin + '/vite.svg',
        },
        redirectTo: '/',
        onFinish: () => {
          setIsLoading(false);
          window.location.reload();
        },
        onCancel: () => {
          setIsLoading(false);
          setError('Connection cancelled');
        },
        userSession,
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Failed to connect wallet. Please make sure you have a Stacks wallet installed.');
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    userSession.signUserOut();
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

  if (isSignedIn && userData) {
    const address = userData.profile?.stxAddress?.testnet || userData.profile?.stxAddress?.mainnet;
    
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