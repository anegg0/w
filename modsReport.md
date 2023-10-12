
### Modification 1
**File:** src/components/MetadataBuilder.tsx

**Original Content:**
```
"use client";
import React, { useState } from "react";
import { MintNFT } from "@c/MintNFT";

interface FormData {
  name: string;
  description: string;
}

export function MetadataBuilder({ onSuccessfulMetadataCreation }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });

  const [tokenURI, setTokenURI] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData && responseData.url) {
          setTokenURI(responseData.url);
          console.log(`tokenURI on Metadata is: ${responseData.url}`);
          onSuccessfulMetadataCreation(4);
        } else {
          console.error("Unexpected response structure from /api/mint");
        }
      } else {
        console.error("Error response from /api/mint:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating metadata:", error);
    }
  };

  return (
    <div className="min-h-screen p-10">
      <h2 className="text-2xl font-bold mb-6">Create JSON Object</h2>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow-md bg-gradient-to-b from-transparent to-[rgba(var(--background-end-rgb),1)]"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Name:
            <input
              placeholder="Short description of your image"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-500"
            />
          </label>
          <label className="block text-sm font-medium mb-2">
            Description:
            <input
              type="text"
              placeholder="Longer description of your image"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-500"
            />
          </label>
        </div>
        <br />
        <label className="block text-md font-medium mb-2">
          You can now mint your watermarked image as an NFT.
          <br />
          After clicking the "Mint image as NFT" button, your wallet will ask
          you to confirm the transaction.
          <br />
          <br />
          Once confirmed, your will have verifiable proof that you registered
          your image on the blockchain:
          <br />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mint image as NFT
        </button>
      </form>
      {tokenURI && <MintNFT tokenURI={tokenURI} />}
    </div>
  );
}

export default MetadataBuilder;

```

**Modified Content:**
```
To pass the `tokenURI` from component #68 to component #69, you can update the `onSuccessfulMetadataCreation` callback to include the `tokenURI` as an argument:

```javascript
interface MetadataBuilderProps {
  onSuccessfulMetadataCreation: (tokenURI: string) => void;
}

export function MetadataBuilder({ onSuccessfulMetadataCreation }: MetadataBuilderProps) {
  // ...

  const handleSubmit = async (e: React.FormEvent) => {
    // ...

    if (response.ok) {
      const responseData = await response.json();
      if (responseData && responseData.url) {
        setTokenURI(responseData.url);
        console.log(`tokenURI on Metadata is: ${responseData.url}`);
        onSuccessfulMetadataCreation(responseData.url); // Pass tokenURI as argument
      } else {
        console.error("Unexpected response structure from /api/mint");
      }
    } else {
      console.error("Error response from /api/mint:", response.statusText);
    }
  };

  // ...
}
```

And then in component #69, you can receive the `tokenURI` value by updating the `MintNFT` component invocation:

```javascript
import React from "react";
import { MintNFT } from "@c/MintNFT";

interface MintNFTProps {
  tokenURI: string;
}

export function Component69({ tokenURI }: MintNFTProps) {
  return (
    <div>
      {/* Other content */}
      {tokenURI && <MintNFT tokenURI={tokenURI} />}
    </div>
  );
}
```

Note: Make sure to import and use the `Component69` component in the appropriate place in your application.
```


### Modification 2
**File:** src/components/MintNFT.tsx

**Original Content:**
```
"use client";
import React, { useState, useEffect } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export function MintNFT({ tokenURI }) {
  const [localTokenURI, setLocalTokenURI] = useState("");

  // Update localTokenURI if tokenURI changes
  useEffect(() => {
    if (tokenURI) {
      setLocalTokenURI(tokenURI);
    }
  }, [localTokenURI]);

  console.log(`localTokenURI ${localTokenURI}}`);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xAce963F9139ADD78730468bCc57fAA1812B2b5E2",
    abi: [
      {
        name: "mintItem",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
        ],
        outputs: [],
      },
    ],
    functionName: "mintItem",
    args: [localTokenURI], // Use localTokenURI here
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

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
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </div>
  );
}

export default MintNFT;

```

**Modified Content:**
```
To pass the `tokenURI` from `#68` to `#69`, you can update the `args` property in the `usePrepareContractWrite` hook to receive the `tokenURI` from the parent component.

Here's the updated code:

```javascript
// #68
import MintNFT from "./MintNFT";

function ParentComponent() {
  const tokenURI = "your_token_uri_here";

  return <MintNFT tokenURI={tokenURI} />;
}

export default ParentComponent;
```

```javascript
// #69
// ...

export function MintNFT({ tokenURI }) {
  const [localTokenURI, setLocalTokenURI] = useState("");

  // Update localTokenURI if tokenURI changes
  useEffect(() => {
    if (tokenURI) {
      setLocalTokenURI(tokenURI);
    }
  }, [tokenURI]);

  // ...

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xAce963F9139ADD78730468bCc57fAA1812B2b5E2",
    abi: [
      {
        name: "mintItem",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
          {
            internalType: "string",
            name: "tokenURI",
            type: "string",
          },
        ],
        outputs: [],
      },
    ],
    functionName: "mintItem",
    args: [tokenURI], // Use tokenURI here
  });

  // ...
}
```

Now, the `tokenURI` passed from the parent component will be used in the `usePrepareContractWrite` hook arguments, and subsequently in the `useContractWrite` hook.
```
