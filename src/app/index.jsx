"use client";
import React, { useState, useEffect } from "react";
import { ConnectButton } from "@c/ConnectButton";

export default function Home() {
  return (
    <div className="container">
      <ConnectButton />
    </div>
  );
}
