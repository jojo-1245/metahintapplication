const API_BASE_URL = process.env.API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables');
}

export const shortenAddress = (address: string, front: number = 6, back: number = 4): string => {
  if (!address || address.length <= front + back) return address;
  return `${address.slice(0, front)}...${address.slice(-back)}`;
};

export const jsonRpcRequest = async (
  method: string,
  params: any[],
  id: number = 1
): Promise<any> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params,
        id,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      error: {
        message: 'Network request failed',
        data: error,
      },
    };
  }
};

// Format number custom
export const formatCustom = (num: number): string => {
  if (num >= 1000) {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(Math.floor(num)); // e.g. 14999.9999 → 14,999
  } else {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(num); // e.g. 4.998 → 4.998
  }
};

export const getBalance = async (
  symbol: string,
  publicAddress: string,
  contractAddress: string,
  currency: string
): Promise<number> => {
  if (symbol === 'POL') {
    const maticRes = await jsonRpcRequest('eth_getBalance', [publicAddress, 'latest', currency], 7);

    if (!maticRes?.result) {
      throw new Error('Failed to get Polygon balance');
    }

    return parseFloat((Number(maticRes.result) / 1e18).toFixed(4));
  } else {
    const tokenRes = await jsonRpcRequest(
      'getWalletBalances',
      [publicAddress, contractAddress, currency],
      13
    );

    if (!tokenRes?.result) {
      throw new Error(`Failed to get ${symbol} balance`);
    }

    return parseFloat(tokenRes.result.tokenFormattedBalance || '0');
  }
};
