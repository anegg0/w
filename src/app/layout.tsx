import type { Metadata } from "next";
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
