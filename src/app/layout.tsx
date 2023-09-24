import type { Metadata } from "next";

import Head from "next/head";
import { Providers } from "./providers";
import "@rainbow-me/rainbowkit/styles.css";
export const metadata: Metadata = {
  title: "W",
  description: "W, a watermarked NFT solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>w</title>
        <meta name="description" content="W LANDING PAGE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
