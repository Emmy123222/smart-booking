// src/lib/wallet.ts
import { AppConfig, UserSession, showConnect, openSTXTransfer, openContractCall } from '@stacks/connect';
import { StacksNetwork, STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

const network: StacksNetwork = process.env.NODE_ENV === 'production' ? STACKS_MAINNET : STACKS_TESTNET;

export const connectWallet = () => {
  console.log('🔗 Connecting wallet...');

  try {
    showConnect({
      appDetails: {
        name: 'Encheq Treasury',
        icon: window.location.origin + '/encheq-logo.png',
      },
      redirectTo: window.location.pathname,
      onFinish: () => {
        console.log('✅ Wallet connected successfully');
        window.location.reload();
      },
      onCancel: () => {
        console.log('❌ Wallet connection cancelled');
      },
      userSession,
    });
  } catch (error) {
    console.error('💥 showConnect failed:', error);
    throw error;
  }
};

export const getUserData = () => userSession.loadUserData();
export const isUserSignedIn = () => userSession.isUserSignedIn();

export const signOut = () => {
  userSession.signUserOut();
  window.location.reload();
};
