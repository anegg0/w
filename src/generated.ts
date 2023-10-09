import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WagmiMintExample
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export const wagmiMintExampleABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'contractURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'player', internalType: 'address', type: 'address' },
      { name: 'tokenURI', internalType: 'string', type: 'string' },
    ],
    name: 'mintItem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export const wagmiMintExampleAddress = {
  11155111: '0xFe04316F6608dD7021ca384d23b24A5399b6bfA8',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export const wagmiMintExampleConfig = {
  address: wagmiMintExampleAddress,
  abi: wagmiMintExampleABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"contractURI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleContractUri<
  TFunctionName extends 'contractURI',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'contractURI',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"getApproved"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"tokenURI"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof wagmiMintExampleABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof wagmiMintExampleABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractRead({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof wagmiMintExampleABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof wagmiMintExampleABI, TFunctionName, TMode>({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof wagmiMintExampleABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof wagmiMintExampleABI, 'approve', TMode>({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"mintItem"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleMintItem<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'mintItem'
        >['request']['abi'],
        'mintItem',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mintItem' }
    : UseContractWriteConfig<typeof wagmiMintExampleABI, 'mintItem', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mintItem'
      } = {} as any,
) {
  return useContractWrite<typeof wagmiMintExampleABI, 'mintItem', TMode>({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'mintItem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof wagmiMintExampleABI,
    'renounceOwnership',
    TMode
  >({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof wagmiMintExampleABI,
    'safeTransferFrom',
    TMode
  >({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof wagmiMintExampleABI,
    'setApprovalForAll',
    TMode
  >({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof wagmiMintExampleABI, 'transferFrom', TMode>({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof wagmiMintExampleAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof wagmiMintExampleABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<
        typeof wagmiMintExampleABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<
    typeof wagmiMintExampleABI,
    'transferOwnership',
    TMode
  >({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function usePrepareWagmiMintExampleWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    ...config,
  } as UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function usePrepareWagmiMintExampleApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"mintItem"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function usePrepareWagmiMintExampleMintItem(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'mintItem'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'mintItem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'mintItem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function usePrepareWagmiMintExampleRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wagmiMintExampleABI,
      'renounceOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wagmiMintExampleABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function usePrepareWagmiMintExampleSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wagmiMintExampleABI,
      'safeTransferFrom'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wagmiMintExampleABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function usePrepareWagmiMintExampleSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wagmiMintExampleABI,
      'setApprovalForAll'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wagmiMintExampleABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function usePrepareWagmiMintExampleTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof wagmiMintExampleABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wagmiMintExampleABI,
    'transferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function usePrepareWagmiMintExampleTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof wagmiMintExampleABI,
      'transferOwnership'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof wagmiMintExampleABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"BatchMetadataUpdate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleBatchMetadataUpdateEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'BatchMetadataUpdate'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    eventName: 'BatchMetadataUpdate',
    ...config,
  } as UseContractEventConfig<
    typeof wagmiMintExampleABI,
    'BatchMetadataUpdate'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"MetadataUpdate"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleMetadataUpdateEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'MetadataUpdate'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    eventName: 'MetadataUpdate',
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, 'MetadataUpdate'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<
    typeof wagmiMintExampleABI,
    'OwnershipTransferred'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link wagmiMintExampleABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xFe04316F6608dD7021ca384d23b24A5399b6bfA8)
 */
export function useWagmiMintExampleTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof wagmiMintExampleABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof wagmiMintExampleAddress } = {} as any,
) {
  return useContractEvent({
    abi: wagmiMintExampleABI,
    address: wagmiMintExampleAddress[11155111],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof wagmiMintExampleABI, 'Transfer'>)
}
