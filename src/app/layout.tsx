import Head from "next/head";
import { Providers } from "@a/providers";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata: Metadata = {
  title: "w",
  description: "Steganography + Crypto + NFTs",
  /* manifest: "@p/manifest.json", */
  manifest: "./public/manifest.json",
  themeColor: "#000000",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-250 h-screen mx-200 my-800">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
