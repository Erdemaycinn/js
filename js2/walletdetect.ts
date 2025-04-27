import { getWallets, type Wallet } from '@mysten/wallet-standard';

export async function getConnectedWalletAddress(): Promise<string | null> {
  // Initialize the Wallets API (fires off the registration handshake under the hood)
  const walletsApi = getWallets();

  // Grab whatever wallets have registered so far
  const all: readonly Wallet[] = walletsApi.get();

  // Pick the first one that implements the standard connect feature
  const wallet = all.find((w) => 'standard:connect' in w.features);
  if (!wallet) {
    console.warn('No Sui wallet extension found');
    return null;
  }

  // Ask the user to approve a connection
  const connectMethod = wallet.features['standard:connect'] as {
    connect: () => Promise<void>;
  };
  await connectMethod.connect();

  // Grab the first account (address) exposed by that wallet
  return wallet.accounts[0]?.address ?? null;
}

// Expose on window so plain JS can call it
declare global {
  interface Window {
    getConnectedWalletAddress: () => Promise<string | null>;
  }
}
window.getConnectedWalletAddress = getConnectedWalletAddress;
