"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Navbar, Text, Avatar } from "@nextui-org/react";
import Link from "next/link";
import logo from "@a/logo-sm.png";
import Image from "next/image";

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
    <div className="header">
      <Link href="/" className="block text-teal-600">
        <span className="sr-only">Home</span>
        <Image src={logo} width={52} height={52} alt="W Logo" />
      </Link>
      <nav aria-label="Site Nav">
        <ul className="flex justify-between gap-16 text-md">
          <li>
            <Link
              href="/#about"
              className="text-gray-300 transition hover:text-gray-300/75"
            >
              How Does this Thing Work?
            </Link>
          </li>
          <li>
            <Link
              href="/verify"
              className="text-gray-300 transition hover:text-gray-300/75"
            >
              Verify a Picture
            </Link>
          </li>
        </ul>
      </nav>
      <ConnectButton></ConnectButton>
    </div>
  );
}
export default Header;
