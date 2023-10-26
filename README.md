# **W**, Crypto-Assets Watermarking Using Steganography

This repo helps you add an invsible watermark (using Steganography/Data-hiding) to graphical assets and mint them as NFTs on EVM chains.

The graphical asset itself can be verified on-chain using the watermark.

This repository is based on:

- [`ERC721`](https://goerli.etherscan.io/address/0x6cc2c4e0ecfcb06e6ac4fe7d760444588f74470d)
- [`Next.js 13/App Router`](https://nextjs.org/docs)
- [`wagmi`](https://wagmi.sh/)
- [`OpenStego`](https://www.openstego.com/)

## Prerequisites

1. **Ubuntu 16+**
2. **[Node.js 16 LTS](https://nodejs.org/en/download/)**
~~3. **[Yarn](https://yarnpkg.com/getting-started/install)**~~
4. **[Java OpenJDK JRE](https://ubuntu.com/tutorials/install-jre#2-installing-openjdk-jre)**
5. An **[Alchemy account](https://www.alchemy.com/)** (optional)
   This repo has been pre-configured to use Alchemy as a convenience but you can choose any provider you wish.
6. **[OpenStego](https://github.com/syvaidya/openstego/releases/download/openstego-0.8.6/openstego_0.8.6-1_all.deb)**
7. **A Crypt-wallet**provisioned with some Goerli.

## Features

1. **Requires minimal configuration**

   Just set up your `.env` file. You can use `.example-env` as a template.

2. **Example ERC721**

The included contract is bare bone (for clarity) but functional.

 :information_source: the contract is intended for training purpose, it hasn't been vetted for production, use at your own risk.

3. **Example scripts for minting and testing**

4. **Extra-functionalities thanks to [`Hardhat-deploy`](https://github.com/wighawag/hardhat-deploy)**
   - `npx hardhat deploy` deploys only if your contract has changed
   - `npx hardhat test` enable test fixtures for faster tests
   - `npx hardhat sourcify` simplifies the process of contract verification with Sourcify.dev

## Installation

### [Install yarn](https://yarnpkg.com/getting-started/install)

### Clone and install this repo

        ```bash
        ```bash
        yarn install
        ```
### Install Java: OpenJDK JRE

        ```bash
        sudo apt update
        sudo apt install default-jre
        ```
### [Install Metamask](https://metamask.io/download/)

### Install OpenStego

        ```bash
        sudo apt update
        sudo apt install openstego_0.8.6-1_all.deb
        ```
## Configuration

Fill out your env values in `.example-env` then rename the file `.env`:

# network specific node uri : `"ETH_NODE_URI_" + networkName.toUpperCase()`

ETH_NODE_URI_MAINNET=https://eth-mainnet.alchemyapi.io/v2/<apiKey>

# generic node uri (if no specific found) :

ETH_NODE_URI=https://{{networkName}}.infura.io/v3/<apiKey>

# network specific mnemonic : `"MNEMONIC_ " + networkName.toUpperCase()`

MNEMONIC_MAINNET=<mnemonic for mainnet>

# generic mnemonic (if no specific found):

MNEMONIC=<mnemonic>

## Usage

#### Compile contract:

        ```bash
        npx hardhat compile
        ```

#### Deploy contract to Hardhat's dev network:

Start Hardhat's localhost network:

        ```bash
        npx hardhat node
        ```

Deploy on localhost network:

> :information_source: You can choose the network you want to interact with by using the `--network` suffix.

        ```bash
        npx hardhat deploy --network localhost
        ```

#### Deploy contract to mainnet:

        ```bash
        npx hardhat deploy --network production
        ```

#### Mint an NFT on Ethereum mainnet:

        ```bash
        npx hardhat mint-nft --token-uri "the-URI-of-your-NFT" --network production
        ```

#### Run test(s):

        ```bash
        npx hardhat test
        ```

#### Verify a contract with sourcify.dev:

        ```bash
        npx  hardhat --network mainnet sourcify
        ```

_Credits to [Ronan Sandford](https://github.com/wighawag) for creating Hardhat-deploy._
_Credits to [Samir Vaidya](https://github.com/syvaidya) for creating OpenStego._
