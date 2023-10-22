"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Link from "next/link";
import Image from "next/image";

interface ConnectWalletProps {
  show?: "always" | "connected" | "disconnected";
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ show = "always" }) => {
  const { isConnected } = useAccount();
  if (
    (show === "connected" && !isConnected) ||
    (show === "disconnected" && isConnected)
  )
    return null;
  return <ConnectButton />;
}

export const Header: React.FC = () => {
  return (  return (
    <header aria-label="Site Header">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center md:m-8 justify-between">
          <div className="md:flex max-w-sm md:items-center md:gap-12">
            <Link href="/">
              <div className="block text-teal-600">
                <span className="sr-only">Home</span>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                  <Image src={logo} width={52} height={52} alt="W Logo" />
                </div>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex justify-between gap-6 text-md">
                <li>
                  <Link
                    className="text-gray-300 transition hover:text-gray-300/75"
                    href="/#about"
                  >
                    How Does this Thing Work?
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <ConnectButton></ConnectButton>
            </div>
          </div>
          <div className="block md:hidden">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}