"use client";

import React from "react";
import "./globals.css";

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

export function Page() {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) {
    return <Welcome />;
  }
  {
    return (
      <>
        <Header />
        <Sequence />
      </>
    );
  }
}

export default Page;
