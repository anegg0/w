"use client";
import React, { useState } from "react";
import Image from "next/image";
import EncodedImage from "@a/encoded/encoded_image.png";
import Link from "next/link";
import Header from "@c/Header";
import Footer from "@c/Footer";
import "@a/globals.css";
import { NextPage } from "next";
const Page: NextPage = () => {
  return (
    <>
      <Header />
      <div className="container my-24 mx-auto md:px-6 xl:px-24">
        <section className="mb-32">
          <h2 className="mb-6 pl-6 text-3xl font-bold">
            How does this thing work?
          </h2>
          <div className="rounded-none border border-t-0 border-l-0 border-r-0 border-neutral-200">
            <h2 className="mb-0" id="flush-headingOne">
              What does this app do?
            </h2>
            <div className="py-4 px-5 text-neutral-500 dark:text-neutral-300">
              W helps verify graphic asset origination formally. In clear terms,
              it embeds a watermark into an image that can be verified on the
              blockchain. So that even if the image is copied and used out of
              this context, it can be verified as the original.
            </div>
          </div>
          <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200">
            <h2 className="mb-0" id="flush-headingTwo">
              Why would you embed a watermark on an NFT, since NFTs are already
              a proof of ownership?
            </h2>
            <div className="py-4 px-5 text-neutral-500 dark:text-neutral-300">
              NFTs are a proof of ownership of the link to the asset. Which is
              great to register a timestamp. The asset itself, though, can be
              copied and used elsewhere. W helps verify the origination of the
              asset itself by embedding the owners signature into the image.
            </div>
          </div>
          <div className="rounded-none border border-l-0 border-r-0 border-b-0 border-t-0 border-neutral-200">
            <h2 className="mb-0" id="flush-headingThree">
              What can I do with W that I cannot do elsewhere?
            </h2>
            <div className="py-4 px-5 text-neutral-500 dark:text-neutral-300">
              With W, you can protect formally proof which content is yours, and
              which is not. This is a protection against AI deep-fakes and
              impersonations. It's likely to stay that way: W uses a combination
              of blockchain and cryptography to protect your content. AI (Large
              Language Models) cannot be used to generate a valid signature, and
              therefore cannot be used to impersonate you.
            </div>
          </div>
          <div className="rounded-none border border-l-0 border-r-0 border-b-0 border-t-0 border-neutral-200">
            <h2 className="mb-0" id="flush-headingThree">
              How do I use it?
            </h2>
            <div className="py-4 px-5 text-neutral-500 dark:text-neutral-300">
              <a href="/" className="text-blue-300 font-normal text-center">
                Just upload an image
              </a>
              , sign it, and mint it as an NFT. The app will guide you through
              the process, all you need is a crypto wallet.
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
