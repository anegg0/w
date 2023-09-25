"use client";

import React, { useState } from "react";
import "./globals.css";
import Image from "next/image";
import { Account } from "../components/Account";
import { Balance } from "../components/Balance";
import { BlockNumber } from "../components/BlockNumber";
import { ConnectButton } from "../components/ConnectButton";
import { Connected } from "../components/Connected";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { ReadContract } from "../components/ReadContract";
import { ReadContracts } from "../components/ReadContracts";
import { ReadContractsInfinite } from "../components/ReadContractsInfinite";
import { Header } from "../components/Header";
import { SendTransaction } from "../components/SendTransaction";
import { SendTransactionPrepared } from "../components/SendTransactionPrepared";
import { SignMessage } from "../components/SignMessage";
import { SignTypedData } from "../components/SignTypedData";
import { Token } from "../components/Token";
import { WatchContractEvents } from "../components/WatchContractEvents";
import { WatchPendingTransactions } from "../components/WatchPendingTransactions";
import { WriteContract } from "../components/WriteContract";
import { WriteContractPrepared } from "../components/WriteContractPrepared";
import { Welcome } from "../components/Welcome";
import { Sequence } from "../components/Sequence";
import { useAccount } from "wagmi";
import logo from "./logo.png";
export function Page() {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [step, setStep] = useState(1);
  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
        <div className="relative flex place-items-center">
          <Image src={logo} alt="W Logo" />
        </div>
        <div className="relative flex place-items-center">
          <p className="text-lg font-normal text-white lg:text-xl dark:text-gray-400 text-center">
            NFT watermarking solution
          </p>
        </div>
        <ConnectButton> </ConnectButton>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      </main>
    );
  }
  {
    return (
      <>
        <Header />

        <div className="flex justify-center items-center h-screen">
          <div className="w-1/2 p-4 ">
            <div className="mb-4 text-2xl font-bold rounded-lg">
              {"Get started by uploading your file (PNG)"}
            </div>
            <form action="/api/" method="post" encType="multipart/form-data">
              <input type="file" name="file" required />
              <button className="ring-2 px-3 py-2 bg-blue-800 text-white rounded-md">
                upload
              </button>
            </form>
          </div>
        </div>
        {/* <Sequence /> */}
      </>
    );
  }
}

export default Page;
