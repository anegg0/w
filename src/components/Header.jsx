"use client";
import React from "react";
import { ConnectButton } from "./ConnectButton";
import { useAccount } from "wagmi";
import { Navbar, Text, Avatar } from "@nextui-org/react";
import Link from "next/link";
function ConnectWallet({ show = "always" }) {
  const { isConnected } = useAccount();
  if (
    (show === "connected" && !isConnected) ||
    (show === "disconnected" && isConnected)
  )
    return null;
  return <ConnectButton />;
}

export function Header() {
  return (
    <header aria-label="Site Header">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href="/">
              <div className="block text-teal-600">
                <span className="sr-only">Home</span>
                <img
                  src="../public/logo.png"
                  alt="Sigvant"
                  width={50}
                  height={50}
                ></img>
              </div>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav aria-label="Site Nav">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/#about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-500 transition hover:text-gray-500/75"
                    href="/#collection"
                  >
                    Collection
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
            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
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
