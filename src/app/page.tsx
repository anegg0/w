"use client";

import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "./globals.css";
import Image from "next/image";
import { Account } from "@c/Account";
import { Balance } from "@c/Balance";
import { BlockNumber } from "@c/BlockNumber";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Connected } from "@c/Connected";
import { NetworkSwitcher } from "@c/NetworkSwitcher";
import { ReadContract } from "@c/ReadContract";
import { ReadContracts } from "@c/ReadContracts";
import { ReadContractsInfinite } from "@c/ReadContractsInfinite";
import { Header } from "@c/Header";
import { Footer } from "@c/Footer";
import { SendTransaction } from "@c/SendTransaction";
import { SendTransactionPrepared } from "@c/SendTransactionPrepared";
import { SignTypedData } from "@c/SignTypedData";
import { Token } from "@c/Token";
import { WatchContractEvents } from "@c/WatchContractEvents";
import { WatchPendingTransactions } from "@c/WatchPendingTransactions";
import { WriteContractPrepared } from "@c/WriteContractPrepared";
import { Welcome } from "@c/Welcome";
import { useAccount } from "wagmi";
import { ToEncodeFileUploader } from "@c/ToEncodeFileUploader";
import { SignMessage } from "@c/SignMessage";
import { SignMessage2api } from "@c/SignMessage2api";
import { MetadataBuilder } from "@c/MetadataBuilder";
import logo from "@a/logo.png";

export function Page({ newStep }) {
  let [step, setStep] = useState(1);
  let { address, isConnecting, isDisconnected } = useAccount();
  let [loadingInProgress, setLoading] = useState(false);

  const updateStep = (newStep) => {
    setStep(newStep);
  };

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
        <div className="relative flex place-items-center">
          <Image src={logo} alt="W Logo" width={72} height={72} />
        </div>
        <div className="relative flex place-items-center">
          <p className="text-lg font-normal text-white lg:text-xl dark:text-gray-400 text-center">
            W is an AI-Resistant Watermarking System
          </p>
        </div>
        <ConnectButton> </ConnectButton>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      </main>
    );
  } else if ({ Connected } && step === 1) {
    return (
      <>
        <Header />
        <ToEncodeFileUploader onSuccessfulUpload={updateStep} />;
        <Footer />
      </>
    );
  } else if ({ Connected } && step === 2) {
    return (
      <>
        <Header />
        <SignMessage2api onSuccessfulEncoding={updateStep} />;
        <Footer />
      </>
    );
  } else if ({ Connected } && step === 3) {
    return (
      <>
        <Header />
        <MetadataBuilder />;
        <Footer />
      </>
    );
  }
}

export default Page;
