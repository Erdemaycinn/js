import { getWallets } from '@mysten/wallet-standard';

async function getActiveAddress() {
  const wallet = getWallets().get().find(w => w.name.includes('Sui'));
  if (!wallet) throw new Error('No Sui wallet extension found');


  
  await (wallet.features['standard:connect'] as { connect: () => Promise<void> }).connect();   // user approves
return wallet.accounts[0]?.address || null;
}

getActiveAddress()
  .then(addr => console.log('User address:', addr))
  .catch(err  => console.error(err));
