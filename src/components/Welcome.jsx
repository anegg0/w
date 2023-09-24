import { React } from "react";
import { ConnectButton } from "./ConnectButton";
import { Text, Button, useInput } from "@nextui-org/react";
import { useAccount } from "wagmi";
function ConnectWallet({ show = "always" }) {
  const { isConnected } = useAccount();
  if (
    (show === "connected" && !isConnected) ||
    (show === "disconnected" && isConnected)
  )
    return null;
  return <ConnectButton />;
}
export function Welcome() {
  return (
    <div>
      <section
        id="about"
        className="my-8 dark:bg-gray-800 dark:text-gray-100 items-center"
      >
        <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
          <img src="../logo.png" alt="w" width={200} height={100}></img>
          <p className="text-lg font-normal text-white lg:text-xl dark:text-gray-400 text-center">
            NFT watermarking solution
          </p>{" "}
        </div>
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            <ConnectButton></ConnectButton>
          </div>
        </div>
      </section>
    </div>
  );
}
