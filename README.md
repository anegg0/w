# **W** - Crypto-Assets Watermarking Using Steganography

❗***NOTE**: This is a WIP being actively developed and not functional at this time, come back soon for more :)

This repo helps you embed a crypto-signature (using Steganography/Data-hiding) to graphical assets and mint them as NFTs on EVM chains.

The graphical asset itself can be verified on-chain using the watermark .

This repository is based on:

- [`ERC721`](https://goerli.etherscan.io/address/0x6cc2c4e0ecfcb06e6ac4fe7d760444588f74470d)
- [`Next.js 13/App Router`](https://nextjs.org/docs)
- [`wagmi`](https://wagmi.sh/)

## Prerequisites

1. **Ubuntu 16+**
2. **[Node.js 16 LTS](https://nodejs.org/en/download/)**
3. **[pnpm](https://pnpm.io/)**
4. An **[Alchemy account](https://www.alchemy.com/)** (optional)
   This repo has been pre-configured to use Alchemy as a convenience but you can choose any provider you wish.
5. **A Crypt-wallet** provisioned with some Goerli ETH.

## Features

1. **Requires minimal configuration**

   Just set up your `.env` file. You can use `.example-env` as a template.

2. **Example ERC721**

The included contract is bare bone (for clarity) but functional.

 The contract is intended for demo, its minting functionality is not protected, use at your own risk.

## Installation (Ubuntu 16+ for now)


3. [Install pnpm](https://pnpm.io/installation)

4. [Install Metamask](https://metamask.io/download/), Coinbase Wallet, or any WalletConnect compatible Wallet 

5. Clone and install this repo

        ```bash
        git clone git@github.com:anegg0/w.git
        ```
6. Fill out your .env file

Fill out your env values in `.example-env` then rename the file `.env`:

        ```bash
        mv .env.example .env
        ```
6. Install

        ```bash
        pnpm install
        ```

## Usage

#### Launch Webapp

        ```bash
        pnpm run dev
        ```

#### Follow the UI

Your instance should run on `http://localhost:3000`

##### Deep Sign

You can [watermark a PNG image](http://localhost:3000/verify) of `1mb` and `1000px/1000px` in size or more (untested on `JPG`, yet) 

##### Verifv signature formally

You can formally verify any asset watermarked using **W** on the [verify](http://localhost:3000/verify) page, **W** will return the address used in the embedded signature.

