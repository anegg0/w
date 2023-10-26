# **W** - Crypto-Assets Watermarking Using Steganography

This repo helps you embed a crypto-signature (using Steganography/Data-hiding) to graphical assets and mint them as NFTs on EVM chains.

The graphical asset itself can be verified on-chain using the watermark .

This repository is based on:

- [`ERC721`](https://goerli.etherscan.io/address/0x6cc2c4e0ecfcb06e6ac4fe7d760444588f74470d)
- [`Next.js 13/App Router`](https://nextjs.org/docs)
- [`wagmi`](https://wagmi.sh/)
- [`OpenStego`](https://www.openstego.com/)

## Prerequisites

1. **Ubuntu 16+**
2. **[Node.js 16 LTS](https://nodejs.org/en/download/)**
3. **[Yarn](https://yarnpkg.com/getting-started/install)**~~
4. **[Java OpenJDK JRE](https://ubuntu.com/tutorials/install-jre#2-installing-openjdk-jre)**
5. An **[Alchemy account](https://www.alchemy.com/)** (optional)
   This repo has been pre-configured to use Alchemy as a convenience but you can choose any provider you wish.
6. **[OpenStego](https://github.com/syvaidya/openstego/releases/download/openstego-0.8.6/openstego_0.8.6-1_all.deb)**
7. **A Crypt-wallet** provisioned with some Goerli.

## Features

1. **Requires minimal configuration**

   Just set up your `.env` file. You can use `.example-env` as a template.

2. **Example ERC721**

The included contract is bare bone (for clarity) but functional.

 The contract is intended for demo, its minting functionality is not protected, use at your own risk.

## Installation (Ubuntu 16+ for now)

1. Install Java: OpenJDK JRE

        ```bash
        sudo apt update
        sudo apt install default-jre
        ```

2. Install OpenStego

        ```bash
        sudo apt update
        sudo apt install openstego_0.8.6-1_all.deb
        ```

3. [Install yarn](https://yarnpkg.com/getting-started/install)

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
        yarn install
        ```

## Usage

#### Launch Webapp

        ```bash
        yarn run dev
        ```

#### Follow the UI

Your instance should run on `http://localhost:3000`

##### Deep Sign

You can [watermark a PNG image](http://localhost:3000/verify) of `1mb` and `1000px/1000px` in size or more (untested on `JPG`, yet) 

##### Verifv signature formally

You can formally verify any asset watermarked using **W** on the [verify](http://localhost:3000/verify) page, **W** will return the address used in the embedded signature.

_Credits to [Ronan Sandford](https://github.com/wighawag) for creating Hardhat-deploy._
_Credits to [Samir Vaidya](https://github.com/syvaidya) for creating OpenStego._
