# Offscript Crowdseed

[etherscan-nft]: https://etherscan.io/address/0xe943A95D7aEB81aa7431d49e2Df048989C10FB70
[etherscan-sale]: https://etherscan.io/address/0xC56923CFaB78C785fA49B182dF4a9eeB54663113
[crowdseed]: https://nft.web3creatives.com
[offscript]: https://web3creatives.com
[webflow]: https://webflow.com
[appfairy]: https://github.com/DAB0mB/Appfairy
[@web3-react]: https://github.com/NoahZinsmeister/web3-react
[ethersjs]: https://docs.ethers.io/
[subvisual]: https://subvisual.com
[onda]: https://www.ondastudio.co


Monorepo for [Offscript's NFT crowdseed][crowdseed]

## Development

1. Clone the project and install dependencies

```
git clone git@github.com/subvisual/universe-nft
cd universe-nft
yarn install
```

2. `yarn contracts:dev` boots the local development chain (`hardhat node`), with a test contract
3. `yarn web:dev` runs the development CRA server

## Contracts

A [hardhat][hardhat] project containing the ERC721 contract and the ticket sale
contract

| Contract         | Mainnet Address                                              |
| ---              | ---                                                          |
| OffscriptNFT     | [0xe943A95D7aEB81aa7431d49e2Df048989C10FB70][etherscan-nft]  |
| OffscriptPayment | [0xC56923CFaB78C785fA49B182dF4a9eeB54663113][etherscan-sale] |

### Web

A [create-react-app][cra] project.
The bulk of the project was imported from [Webflow][webflow], using the awesome
[AppFairy][appfairy] tool.
The rest is fairly simple React code with [@web3-react][web3-react] and
[ethers.js][ethersjs].

### About

Proudly build by [Subvisual][subvisual] and [Onda Studio][onda] in partnership with Offscript, and released under the [MIT License](./LICENSE.md).
