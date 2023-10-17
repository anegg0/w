import React, { useState, useEffect } from "react";
import { BaseError } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useAccount } from "wagmi";
import { useDebounce } from "@s/hooks/useDebounce";
import { watermarkedConfig } from "@s/generated";
import { stringify } from "@s/utils/stringify";

export function MintNFT({ tokenUri }) {
  const [tokenURI, setTokenURI] = useState<string | null>(null);

  const localTokenURI = (tokenUri) => {
    setTokenURI(tokenUri);
  };

  // React.useEffect(() => {
  //   if (tokenUri) {
  //     setLocalTokenURI(tokenUri);
  //   }
  // }, [tokenUri]);

  // const debouncedTokenUri = useDebounce(tokenUri);
  const { address } = useAccount();
  const debouncedCreatorAddress = useDebounce(address);

  const { config } = usePrepareContractWrite({
    ...watermarkedConfig,
    address: "0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D",
    functionName: "mintItem",
    args: [debouncedCreatorAddress, tokenUri],
    enabled: Boolean(tokenUri),
  });

  const { write, data, error, isLoading, isError } = useContractWrite(config);
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });
  console.log("receipt", receipt);

  if (!localTokenURI) return <div>Loading...</div>;

  return (
    <div>
      {isLoading ? "Minting..." : "Mint"}
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
    </div>
  );
}
export default MintNFT;
