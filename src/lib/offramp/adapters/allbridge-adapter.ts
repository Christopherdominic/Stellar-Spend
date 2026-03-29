import { AllbridgeCoreSdk, nodeRpcUrlsDefault } from '@allbridge/bridge-core-sdk';

/**
 * Initialize the Allbridge Core SDK with proper RPC URLs
 * Maps environment variables to the correct chain keys
 */
export function initializeAllbridgeSdk(): AllbridgeCoreSdk {
  const rpcUrls = { ...nodeRpcUrlsDefault };

  // Map Soroban RPC URL to SRB (Soroban chain key)
  const sorobanRpcUrl = process.env.STELLAR_SOROBAN_RPC_URL;
  if (sorobanRpcUrl) {
    rpcUrls.SRB = sorobanRpcUrl;
    console.log(`[Allbridge SDK] Using Soroban RPC: ${sorobanRpcUrl}`);
  }

  // Map Horizon URL to STLR (Stellar chain key)
  const horizonUrl = process.env.STELLAR_HORIZON_URL;
  if (horizonUrl) {
    rpcUrls.STLR = horizonUrl;
    console.log(`[Allbridge SDK] Using Horizon URL: ${horizonUrl}`);
  }

  // Legacy fallback for STELLAR_RPC_URL
  const legacyRpcUrl = process.env.STELLAR_RPC_URL;
  if (legacyRpcUrl && !sorobanRpcUrl && !horizonUrl) {
    // Detect if it's a Horizon URL (contains 'horizon') or Soroban RPC
    if (legacyRpcUrl.includes('horizon')) {
      rpcUrls.STLR = legacyRpcUrl;
      console.log(`[Allbridge SDK] Using legacy RPC as Horizon: ${legacyRpcUrl}`);
    } else {
      rpcUrls.SRB = legacyRpcUrl;
      console.log(`[Allbridge SDK] Using legacy RPC as Soroban: ${legacyRpcUrl}`);
    }
  }

  return new AllbridgeCoreSdk(rpcUrls);
}
