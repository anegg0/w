"use client";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
export function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal();

  return (
    <>
      <button onClick={() => open()}>Connect Wallet</button>
      {/* <button onClick={() => open({ view: "Networks" })}> */}
      {/*   Open Network Modal */}
      {/* </button> */}
    </>
  );
}
