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
// Watermarked
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export const watermarkedABI = [
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
      { name: 'creator', internalType: 'address', type: 'address' },
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
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export const watermarkedAddress = {
  5: '0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export const watermarkedConfig = {
  address: watermarkedAddress,
  abi: watermarkedABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"contractURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedContractUri<
  TFunctionName extends 'contractURI',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'contractURI',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"getApproved"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"tokenURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof watermarkedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractRead({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof watermarkedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link watermarkedABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof watermarkedAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof watermarkedABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof watermarkedABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof watermarkedABI, TFunctionName, TMode>({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof watermarkedAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof watermarkedABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof watermarkedABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof watermarkedABI, 'approve', TMode>({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"mintItem"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedMintItem<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof watermarkedAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof watermarkedABI,
          'mintItem'
        >['request']['abi'],
        'mintItem',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mintItem' }
    : UseContractWriteConfig<typeof watermarkedABI, 'mintItem', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mintItem'
      } = {} as any,
) {
  return useContractWrite<typeof watermarkedABI, 'mintItem', TMode>({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'mintItem',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof watermarkedAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof watermarkedABI,
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
        typeof watermarkedABI,
        'renounceOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof watermarkedABI, 'renounceOwnership', TMode>({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof watermarkedAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof watermarkedABI,
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
        typeof watermarkedABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof watermarkedABI, 'safeTransferFrom', TMode>({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof watermarkedAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof watermarkedABI,
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
        typeof watermarkedABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof watermarkedABI, 'setApprovalForAll', TMode>({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof watermarkedAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof watermarkedABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof watermarkedABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof watermarkedABI, 'transferFrom', TMode>({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof watermarkedAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof watermarkedABI,
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
        typeof watermarkedABI,
        'transferOwnership',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof watermarkedABI, 'transferOwnership', TMode>({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link watermarkedABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function usePrepareWatermarkedWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof watermarkedABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    ...config,
  } as UsePrepareContractWriteConfig<typeof watermarkedABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function usePrepareWatermarkedApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof watermarkedABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof watermarkedABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"mintItem"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function usePrepareWatermarkedMintItem(
  config: Omit<
    UsePrepareContractWriteConfig<typeof watermarkedABI, 'mintItem'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'mintItem',
    ...config,
  } as UsePrepareContractWriteConfig<typeof watermarkedABI, 'mintItem'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function usePrepareWatermarkedRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof watermarkedABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof watermarkedABI,
    'renounceOwnership'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function usePrepareWatermarkedSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof watermarkedABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof watermarkedABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function usePrepareWatermarkedSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof watermarkedABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof watermarkedABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function usePrepareWatermarkedTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof watermarkedABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof watermarkedABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link watermarkedABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function usePrepareWatermarkedTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof watermarkedABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof watermarkedABI,
    'transferOwnership'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link watermarkedABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof watermarkedABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractEvent({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    ...config,
  } as UseContractEventConfig<typeof watermarkedABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link watermarkedABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof watermarkedABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractEvent({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof watermarkedABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link watermarkedABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof watermarkedABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractEvent({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof watermarkedABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link watermarkedABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof watermarkedABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractEvent({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof watermarkedABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link watermarkedABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D)
 */
export function useWatermarkedTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof watermarkedABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof watermarkedAddress } = {} as any,
) {
  return useContractEvent({
    abi: watermarkedABI,
    address: watermarkedAddress[5],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof watermarkedABI, 'Transfer'>)
}
