import type { Metadata } from "next";
import Head from "next/head";
import { Providers } from "./providers";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "W",
  description: "W, a watermarked NFT solution",
  /* icon: "/favicon.ico", */
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
