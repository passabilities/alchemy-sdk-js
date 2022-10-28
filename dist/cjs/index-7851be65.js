'use strict';

require('./api/utils');
var bignumber = require('@ethersproject/bignumber');
var axios = require('axios');
var abstractProvider = require('@ethersproject/abstract-provider');
var wallet = require('@ethersproject/wallet');
var contracts = require('@ethersproject/contracts');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

/**
 * The supported networks by Alchemy. Note that some functions are not available
 * on all networks. Please refer to the Alchemy documentation for which APIs are
 * available on which networks
 * {@link https://docs.alchemy.com/alchemy/apis/feature-support-by-chain}
 *
 * @public
 */
exports.Network = void 0;
(function (Network) {
    Network["ETH_MAINNET"] = "eth-mainnet";
    /** @deprecated - Will be removed in subsequent versions */
    Network["ETH_ROPSTEN"] = "eth-ropsten";
    Network["ETH_GOERLI"] = "eth-goerli";
    /** @deprecated - Will be removed in subsequent versions */
    Network["ETH_KOVAN"] = "eth-kovan";
    /** @deprecated - Will be removed in subsequent versions */
    Network["ETH_RINKEBY"] = "eth-rinkeby";
    Network["OPT_MAINNET"] = "opt-mainnet";
    /** @deprecated - Will be removed in subsequent versions */
    Network["OPT_KOVAN"] = "opt-kovan";
    Network["OPT_GOERLI"] = "opt-goerli";
    Network["ARB_MAINNET"] = "arb-mainnet";
    /** @deprecated - Will be removed in subsequent versions */
    Network["ARB_RINKEBY"] = "arb-rinkeby";
    Network["ARB_GOERLI"] = "arb-goerli";
    Network["MATIC_MAINNET"] = "polygon-mainnet";
    Network["MATIC_MUMBAI"] = "polygon-mumbai";
    Network["ASTAR_MAINNET"] = "astar-mainnet";
})(exports.Network || (exports.Network = {}));
/** Token Types for the `getTokenBalances()` endpoint. */
exports.TokenBalanceType = void 0;
(function (TokenBalanceType) {
    /**
     * Option to fetch the top 100 tokens by 24-hour volume. This option is only
     * available on Mainnet in Ethereum, Polygon, and Arbitrum.
     */
    TokenBalanceType["DEFAULT_TOKENS"] = "DEFAULT_TOKENS";
    /**
     * Option to fetch the set of ERC-20 tokens that the address as ever held. his
     * list is produced by an address's historical transfer activity and includes
     * all tokens that the address has ever received.
     */
    TokenBalanceType["ERC20"] = "erc20";
})(exports.TokenBalanceType || (exports.TokenBalanceType = {}));
/**
 * Categories of transfers to use with the {@link AssetTransfersParams} request
 * object when using {@link CoreNamespace.getAssetTransfers}.
 *
 * @public
 */
exports.AssetTransfersCategory = void 0;
(function (AssetTransfersCategory) {
    /**
     * Top level ETH transactions that occur where the `fromAddress` is an
     * external user-created address. External addresses have private keys and are
     * accessed by users.
     */
    AssetTransfersCategory["EXTERNAL"] = "external";
    /**
     * Top level ETH transactions that occur where the `fromAddress` is an
     * internal, smart contract address. For example, a smart contract calling
     * another smart contract or sending
     */
    AssetTransfersCategory["INTERNAL"] = "internal";
    /** ERC20 transfers. */
    AssetTransfersCategory["ERC20"] = "erc20";
    /** ERC721 transfers. */
    AssetTransfersCategory["ERC721"] = "erc721";
    /** ERC1155 transfers. */
    AssetTransfersCategory["ERC1155"] = "erc1155";
    /** Special contracts that don't follow ERC 721/1155, (ex: CryptoKitties). */
    AssetTransfersCategory["SPECIALNFT"] = "specialnft";
})(exports.AssetTransfersCategory || (exports.AssetTransfersCategory = {}));
/**
 * Enum for the order of the {@link AssetTransfersParams} request object when
 * using {@link CoreNamespace.getAssetTransfers}.
 *
 * @public
 */
exports.AssetTransfersOrder = void 0;
(function (AssetTransfersOrder) {
    AssetTransfersOrder["ASCENDING"] = "asc";
    AssetTransfersOrder["DESCENDING"] = "desc";
})(exports.AssetTransfersOrder || (exports.AssetTransfersOrder = {}));
/**
 * An enum for specifying the token type on NFTs.
 *
 * @public
 */
exports.NftTokenType = void 0;
(function (NftTokenType) {
    NftTokenType["ERC721"] = "ERC721";
    NftTokenType["ERC1155"] = "ERC1155";
    NftTokenType["UNKNOWN"] = "UNKNOWN";
})(exports.NftTokenType || (exports.NftTokenType = {}));
/** Potential reasons why an NFT contract was classified as spam. */
exports.NftSpamClassification = void 0;
(function (NftSpamClassification) {
    NftSpamClassification["Erc721TooManyOwners"] = "Erc721TooManyOwners";
    NftSpamClassification["Erc721TooManyTokens"] = "Erc721TooManyTokens";
    NftSpamClassification["Erc721DishonestTotalSupply"] = "Erc721DishonestTotalSupply";
    NftSpamClassification["MostlyHoneyPotOwners"] = "MostlyHoneyPotOwners";
    NftSpamClassification["OwnedByMostHoneyPots"] = "OwnedByMostHoneyPots";
})(exports.NftSpamClassification || (exports.NftSpamClassification = {}));
/**
 * Enum of NFT filters that can be applied to a {@link getNftsForOwner} request.
 * NFTs that match one or more of these filters are excluded from the response.
 *
 * @beta
 */
exports.NftExcludeFilters = void 0;
(function (NftExcludeFilters) {
    /** Exclude NFTs that have been classified as spam. */
    NftExcludeFilters["SPAM"] = "SPAM";
    /** Exclude NFTs that have been airdropped to a user. */
    NftExcludeFilters["AIRDROPS"] = "AIRDROPS";
})(exports.NftExcludeFilters || (exports.NftExcludeFilters = {}));
/** The current state of the NFT contract refresh process. */
exports.RefreshState = void 0;
(function (RefreshState) {
    /** The provided contract is not an NFT or does not contain metadata. */
    RefreshState["DOES_NOT_EXIST"] = "does_not_exist";
    /** The contract has already been queued for refresh. */
    RefreshState["ALREADY_QUEUED"] = "already_queued";
    /** The contract is currently being refreshed. */
    RefreshState["IN_PROGRESS"] = "in_progress";
    /** The contract refresh is complete. */
    RefreshState["FINISHED"] = "finished";
    /** The contract refresh has been queued and await execution. */
    RefreshState["QUEUED"] = "queued";
    /** The contract was unable to be queued due to an internal error. */
    RefreshState["QUEUE_FAILED"] = "queue_failed";
})(exports.RefreshState || (exports.RefreshState = {}));
/**
 * Method names for Alchemy's custom Subscription API endpoints.
 *
 * This value is provided in the `method` field when creating an event filter on
 * the Websocket Namespace.
 */
exports.AlchemySubscription = void 0;
(function (AlchemySubscription) {
    AlchemySubscription["PENDING_TRANSACTIONS"] = "alchemy_pendingTransactions";
    AlchemySubscription["MINED_TRANSACTIONS"] = "alchemy_minedTransactions";
})(exports.AlchemySubscription || (exports.AlchemySubscription = {}));
/**
 * Potential transaction job statuses for a {@link GasOptimizedTransactionResponse}
 *
 * @internal
 */
// TODO(txjob): Remove internal tag once this feature is released.
exports.GasOptimizedTransactionStatus = void 0;
(function (GasOptimizedTransactionStatus) {
    GasOptimizedTransactionStatus["UNSPECIFIED"] = "TRANSACTION_JOB_STATUS_UNSPECIFIED";
    GasOptimizedTransactionStatus["IN_PROGRESS"] = "IN_PROGRESS";
    GasOptimizedTransactionStatus["COMPLETE"] = "COMPLETE";
    GasOptimizedTransactionStatus["ABANDONED"] = "ABANDONED";
})(exports.GasOptimizedTransactionStatus || (exports.GasOptimizedTransactionStatus = {}));
/** The version of the webhook. All newly created webhooks default to V2. */
exports.WebhookVersion = void 0;
(function (WebhookVersion) {
    WebhookVersion["V1"] = "V1";
    WebhookVersion["V2"] = "V2";
})(exports.WebhookVersion || (exports.WebhookVersion = {}));
/** The type of {@link Webhook}. */
exports.WebhookType = void 0;
(function (WebhookType) {
    WebhookType["MINED_TRANSACTION"] = "MINED_TRANSACTION";
    WebhookType["DROPPED_TRANSACTION"] = "DROPPED_TRANSACTION";
    WebhookType["ADDRESS_ACTIVITY"] = "ADDRESS_ACTIVITY";
    WebhookType["NFT_ACTIVITY"] = "NFT_ACTIVITY";
})(exports.WebhookType || (exports.WebhookType = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

const DEFAULT_ALCHEMY_API_KEY = 'demo';
const DEFAULT_NETWORK = exports.Network.ETH_MAINNET;
const DEFAULT_MAX_RETRIES = 5;
/**
 * Returns the base URL for making Alchemy API requests. The `alchemy.com`
 * endpoints only work with non eth json-rpc requests.
 *
 * @internal
 */
function getAlchemyHttpUrl(network, apiKey) {
    return `https://${network}.g.alchemy.com/v2/${apiKey}`;
}
function getAlchemyNftHttpUrl(network, apiKey) {
    return `https://${network}.g.alchemy.com/nft/v2/${apiKey}`;
}
function getAlchemyWsUrl(network, apiKey) {
    return `wss://${network}.g.alchemy.com/v2/${apiKey}`;
}
function getAlchemyWebhookHttpUrl() {
    return 'https://dashboard.alchemy.com/api';
}
var AlchemyApiType;
(function (AlchemyApiType) {
    AlchemyApiType[AlchemyApiType["BASE"] = 0] = "BASE";
    AlchemyApiType[AlchemyApiType["NFT"] = 1] = "NFT";
    AlchemyApiType[AlchemyApiType["WEBHOOK"] = 2] = "WEBHOOK";
})(AlchemyApiType || (AlchemyApiType = {}));
/**
 * Mapping of network names to their corresponding Network strings used to
 * create an Ethers.js Provider instance.
 */
const EthersNetwork = {
    [exports.Network.ETH_MAINNET]: 'mainnet',
    [exports.Network.ETH_ROPSTEN]: 'ropsten',
    [exports.Network.ETH_GOERLI]: 'goerli',
    [exports.Network.ETH_KOVAN]: 'kovan',
    [exports.Network.ETH_RINKEBY]: 'rinkeby',
    [exports.Network.OPT_MAINNET]: 'optimism',
    [exports.Network.OPT_KOVAN]: 'optimism-kovan',
    [exports.Network.OPT_GOERLI]: 'optimism-goerli',
    [exports.Network.ARB_MAINNET]: 'arbitrum',
    [exports.Network.ARB_RINKEBY]: 'arbitrum-rinkeby',
    [exports.Network.ARB_GOERLI]: 'arbitrum-goerli',
    [exports.Network.MATIC_MAINNET]: 'matic',
    [exports.Network.MATIC_MUMBAI]: 'maticmum',
    [exports.Network.ASTAR_MAINNET]: 'astar-mainnet'
};
/**
 * Mapping of network names to their corresponding Ethers Network objects. These
 * networks are not yet supported by Ethers and are listed here to be overriden
 * in the provider.
 */
const CustomNetworks = {
    'arbitrum-goerli': {
        chainId: 421613,
        name: 'arbitrum-goerli'
    },
    'astar-mainnet': {
        chainId: 592,
        name: 'astar-mainnet'
    }
};
function noop() {
    // It's a no-op
}
const ETH_NULL_VALUE = '0x';

/**
 * This class holds the config information for the SDK client instance and
 * exposes the underlying providers for more advanced use cases.
 *
 * @public
 */
class AlchemyConfig {
    constructor(config) {
        this.apiKey = (config === null || config === void 0 ? void 0 : config.apiKey) || DEFAULT_ALCHEMY_API_KEY;
        this.network = (config === null || config === void 0 ? void 0 : config.network) || DEFAULT_NETWORK;
        this.maxRetries = (config === null || config === void 0 ? void 0 : config.maxRetries) || DEFAULT_MAX_RETRIES;
        this.url = config === null || config === void 0 ? void 0 : config.url;
        this.authToken = config === null || config === void 0 ? void 0 : config.authToken;
    }
    /**
     * Returns the URL endpoint to send the HTTP request to. If a custom URL was
     * provided in the config, that URL is returned. Otherwise, the default URL is
     * from the network and API key.
     *
     * @param apiType - The type of API to get the URL for.
     * @internal
     */
    _getRequestUrl(apiType) {
        if (this.url !== undefined) {
            return this.url;
        }
        else if (apiType === AlchemyApiType.NFT) {
            return getAlchemyNftHttpUrl(this.network, this.apiKey);
        }
        else if (apiType === AlchemyApiType.WEBHOOK) {
            return getAlchemyWebhookHttpUrl();
        }
        else {
            return getAlchemyHttpUrl(this.network, this.apiKey);
        }
    }
    /**
     * Returns an AlchemyProvider instance. Only one provider is created per
     * Alchemy instance.
     *
     * The AlchemyProvider is a wrapper around ether's `AlchemyProvider` class and
     * has been expanded to support Alchemy's Enhanced APIs.
     *
     * Most common methods on the provider are available as top-level methods on
     * the {@link Alchemy} instance, but the provider is exposed here to access
     * other less-common methods.
     *
     * @public
     */
    getProvider() {
        if (!this._baseAlchemyProvider) {
            this._baseAlchemyProvider = (() => __awaiter(this, void 0, void 0, function* () {
                const { AlchemyProvider } = yield Promise.resolve().then(function () { return require('./alchemy-provider-637a7f6b.js'); });
                return new AlchemyProvider(this);
            }))();
        }
        return this._baseAlchemyProvider;
    }
    /**
     * Returns an AlchemyWebsocketProvider instance. Only one provider is created
     * per Alchemy instance.
     *
     * The AlchemyWebSocketProvider is a wrapper around ether's
     * `AlchemyWebSocketProvider` class and has been expanded to support Alchemy's
     * Subscription APIs, automatic backfilling, and other performance improvements.
     *
     * Most common methods on the provider are available as top-level methods on
     * the {@link Alchemy} instance, but the provider is exposed here to access
     * other less-common methods.
     */
    getWebSocketProvider() {
        if (!this._baseAlchemyWssProvider) {
            this._baseAlchemyWssProvider = (() => __awaiter(this, void 0, void 0, function* () {
                const { AlchemyWebSocketProvider } = yield Promise.resolve().then(function () { return require('./alchemy-websocket-provider-1b9042e1.js'); });
                return new AlchemyWebSocketProvider(this);
            }))();
        }
        return this._baseAlchemyWssProvider;
    }
}

/**
 * Converts a hex string to a decimal number.
 *
 * @param hexString - The hex string to convert.
 * @public
 */
function fromHex(hexString) {
    return bignumber.BigNumber.from(hexString).toNumber();
}
/**
 * Converts a number to a hex string.
 *
 * @param num - The number to convert to hex.
 * @public
 */
function toHex(num) {
    return bignumber.BigNumber.from(num).toHexString();
}
/**
 * Checks if a value is a hex string.
 *
 * @param possibleHexString - The value to check.
 * @public
 */
function isHex(possibleHexString) {
    return /^0x[0-9a-fA-F]+$/.test(possibleHexString);
}

function formatBlock(block) {
    if (typeof block === 'string') {
        return block;
    }
    else if (Number.isInteger(block)) {
        return toHex(block);
    }
    return block.toString();
}
function getNftContractFromRaw(rawNftContract) {
    const contract = {
        address: rawNftContract.address,
        name: rawNftContract.contractMetadata.name,
        symbol: rawNftContract.contractMetadata.symbol,
        totalSupply: rawNftContract.contractMetadata.totalSupply,
        tokenType: parseNftTokenType(rawNftContract.contractMetadata.tokenType)
    };
    if (rawNftContract.contractMetadata.openSea) {
        contract.openSea = {
            floorPrice: rawNftContract.contractMetadata.openSea.floorPrice,
            collectionName: rawNftContract.contractMetadata.openSea.collectionName,
            safelistRequestStatus: rawNftContract.contractMetadata.openSea.safelistRequestStatus,
            imageUrl: rawNftContract.contractMetadata.openSea.imageUrl,
            description: rawNftContract.contractMetadata.openSea.description,
            externalUrl: rawNftContract.contractMetadata.openSea.externalUrl,
            twitterUsername: rawNftContract.contractMetadata.openSea.twitterUsername,
            discordUrl: rawNftContract.contractMetadata.openSea.discordUrl,
            lastIngestedAt: rawNftContract.contractMetadata.openSea.lastIngestedAt
        };
    }
    return contract;
}
function getBaseNftFromRaw(rawBaseNft, contractAddress) {
    var _a;
    return {
        contract: { address: contractAddress },
        tokenId: bignumber.BigNumber.from(rawBaseNft.id.tokenId).toString(),
        tokenType: parseNftTokenType((_a = rawBaseNft.id.tokenMetadata) === null || _a === void 0 ? void 0 : _a.tokenType)
    };
}
function getNftFromRaw(rawNft, contractAddress) {
    var _a, _b, _c, _d;
    const tokenType = parseNftTokenType((_a = rawNft.id.tokenMetadata) === null || _a === void 0 ? void 0 : _a.tokenType);
    const spamInfo = parseSpamInfo(rawNft.spamInfo);
    return {
        contract: {
            address: contractAddress,
            name: (_b = rawNft.contractMetadata) === null || _b === void 0 ? void 0 : _b.name,
            symbol: (_c = rawNft.contractMetadata) === null || _c === void 0 ? void 0 : _c.symbol,
            totalSupply: (_d = rawNft.contractMetadata) === null || _d === void 0 ? void 0 : _d.totalSupply,
            tokenType
        },
        tokenId: parseNftTokenId(rawNft.id.tokenId),
        tokenType,
        title: rawNft.title,
        description: parseNftDescription(rawNft.description),
        timeLastUpdated: rawNft.timeLastUpdated,
        metadataError: rawNft.error,
        rawMetadata: rawNft.metadata,
        tokenUri: parseNftTokenUri(rawNft.tokenUri),
        media: parseNftTokenUriArray(rawNft.media),
        spamInfo
    };
}
function getNftRarityFromRaw(rawNftRarity) {
    return rawNftRarity.map(({ prevalence, trait_type, value }) => ({
        prevalence,
        traitType: trait_type,
        value
    }));
}
function parseNftTokenId(tokenId) {
    // We have to normalize the token id here since the backend sometimes
    // returns the token ID as a hex string and sometimes as an integer.
    return bignumber.BigNumber.from(tokenId).toString();
}
function parseNftTokenType(tokenType) {
    switch (tokenType) {
        case 'erc721':
        case 'ERC721':
            return exports.NftTokenType.ERC721;
        case 'erc1155':
        case 'ERC1155':
            return exports.NftTokenType.ERC1155;
        default:
            return exports.NftTokenType.UNKNOWN;
    }
}
function parseSpamInfo(spamInfo) {
    if (!spamInfo) {
        return undefined;
    }
    const { isSpam, classifications } = spamInfo;
    return {
        isSpam: isSpam === 'true',
        classifications
    };
}
function parseNftDescription(description) {
    if (description === undefined) {
        return '';
    }
    // TODO: Remove after backend adds JSON stringification.
    if (!Array.isArray(description) && typeof description === 'object') {
        return JSON.stringify(description);
    }
    return typeof description === 'string' ? description : description.join(' ');
}
function parseNftTokenUri(uri) {
    if (uri && uri.raw.length === 0 && uri.gateway.length == 0) {
        return undefined;
    }
    return uri;
}
function parseNftTokenUriArray(arr) {
    if (arr === undefined) {
        return [];
    }
    return arr.filter(uri => parseNftTokenUri(uri) !== undefined);
}
const IS_BROWSER = typeof window !== 'undefined' && window !== null;

/**
 * The core namespace contains all commonly-used [Ethers.js
 * Provider](https://docs.ethers.io/v5/api/providers/api-providers/#AlchemyProvider)
 * methods. If you are already using Ethers.js, you should be simply able to
 * replace the Ethers.js Provider object with `alchemy.core` when accessing
 * provider methods and it should just work.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the core namespace
 * via `alchemy.core`.
 */
class CoreNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Returns the balance of a given address as of the provided block.
     *
     * @param addressOrName The address or name of the account to get the balance for.
     * @param blockTag The optional block number or hash to get the balance for.
     *   Defaults to 'latest' if unspecified.
     * @public
     */
    getBalance(addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getBalance(addressOrName, blockTag);
        });
    }
    /**
     * Returns the contract code of the provided address at the block. If there is
     * no contract deployed, the result is `0x`.
     *
     * @param addressOrName The address or name of the account to get the code for.
     * @param blockTag The optional block number or hash to get the code for.
     *   Defaults to 'latest' if unspecified.
     * @public
     */
    getCode(addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getCode(addressOrName, blockTag);
        });
    }
    /**
     * Return the value of the provided position at the provided address, at the
     * provided block in `Bytes32` format.
     *
     * @param addressOrName The address or name of the account to get the code for.
     * @param position The position of the storage slot to get.
     * @param blockTag The optional block number or hash to get the code for.
     *   Defaults to 'latest' if unspecified.
     * @public
     */
    getStorageAt(addressOrName, position, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getStorageAt(addressOrName, position, blockTag);
        });
    }
    /**
     * Returns the number of transactions ever sent from the provided address, as
     * of the provided block tag. This value is used as the nonce for the next
     * transaction from the address sent to the network.
     *
     * @param addressOrName The address or name of the account to get the nonce for.
     * @param blockTag The optional block number or hash to get the nonce for.
     * @public
     */
    getTransactionCount(addressOrName, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getTransactionCount(addressOrName, blockTag);
        });
    }
    /**
     * Returns the block from the network based on the provided block number or
     * hash. Transactions on the block are represented as an array of transaction
     * hashes. To get the full transaction details on the block, use
     * {@link getBlockWithTransactions} instead.
     *
     * @param blockHashOrBlockTag The block number or hash to get the block for.
     * @public
     */
    getBlock(blockHashOrBlockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getBlock(blockHashOrBlockTag);
        });
    }
    /**
     * Returns the block from the network based on the provided block number or
     * hash. Transactions on the block are represented as an array of
     * {@link TransactionResponse} objects.
     *
     * @param blockHashOrBlockTag The block number or hash to get the block for.
     * @public
     */
    getBlockWithTransactions(blockHashOrBlockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getBlockWithTransactions(blockHashOrBlockTag);
        });
    }
    /**
     * Returns the {@link EthersNetworkAlias} Alchemy is connected to.
     *
     * @public
     */
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getNetwork();
        });
    }
    /**
     * Returns the block number of the most recently mined block.
     *
     * @public
     */
    getBlockNumber() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getBlockNumber();
        });
    }
    /**
     * Returns the best guess of the current gas price to use in a transaction.
     *
     * @public
     */
    getGasPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getGasPrice();
        });
    }
    /**
     * Returns the recommended fee data to use in a transaction.
     *
     * For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
     * should be used.
     *
     * For legacy transactions and networks which do not support EIP-1559, the
     * gasPrice should be used.
     *
     * @public
     */
    getFeeData() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getFeeData();
        });
    }
    /**
     * Returns a Promise which will stall until the network has heen established,
     * ignoring errors due to the target node not being active yet.
     *
     * This can be used for testing or attaching scripts to wait until the node is
     * up and running smoothly.
     *
     * @public
     */
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.ready;
        });
    }
    /**
     * Returns the result of executing the transaction, using call. A call does
     * not require any ether, but cannot change any state. This is useful for
     * calling getters on Contracts.
     *
     * @param transaction The transaction to execute.
     * @param blockTag The optional block number or hash to get the call for.
     * @public
     */
    call(transaction, blockTag) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.call(transaction, blockTag);
        });
    }
    /**
     * Returns an estimate of the amount of gas that would be required to submit
     * transaction to the network.
     *
     * An estimate may not be accurate since there could be another transaction on
     * the network that was not accounted for, but after being mined affects the
     * relevant state.
     *
     * This is an alias for {@link TransactNamespace.estimateGas}.
     *
     * @param transaction The transaction to estimate gas for.
     * @public
     */
    estimateGas(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.estimateGas(transaction);
        });
    }
    /**
     * Returns the transaction with hash or null if the transaction is unknown.
     *
     * If a transaction has not been mined, this method will search the
     * transaction pool. Various backends may have more restrictive transaction
     * pool access (e.g. if the gas price is too low or the transaction was only
     * recently sent and not yet indexed) in which case this method may also return null.
     *
     * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
     *
     * @param transactionHash The hash of the transaction to get.
     * @public
     */
    getTransaction(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getTransaction(transactionHash);
        });
    }
    /**
     * Returns the transaction receipt for hash or null if the transaction has not
     * been mined.
     *
     * To stall until the transaction has been mined, consider the
     * waitForTransaction method below.
     *
     * @param transactionHash The hash of the transaction to get.
     * @public
     */
    getTransactionReceipt(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getTransactionReceipt(transactionHash);
        });
    }
    /**
     * Submits transaction to the network to be mined. The transaction must be
     * signed, and be valid (i.e. the nonce is correct and the account has
     * sufficient balance to pay for the transaction).
     *
     * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
     *
     * @param signedTransaction The signed transaction to send.
     * @public
     */
    sendTransaction(signedTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.sendTransaction(signedTransaction);
        });
    }
    /**
     * Returns a promise which will not resolve until specified transaction hash is mined.
     *
     * If {@link confirmations} is 0, this method is non-blocking and if the
     * transaction has not been mined returns null. Otherwise, this method will
     * block until the transaction has confirmed blocks mined on top of the block
     * in which it was mined.
     *
     * NOTE: This is an alias for {@link TransactNamespace.getTransaction}.
     *
     * @param transactionHash The hash of the transaction to wait for.
     * @param confirmations The number of blocks to wait for.
     * @param timeout The maximum time to wait for the transaction to confirm.
     * @public
     */
    waitForTransaction(transactionHash, confirmations, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.waitForTransaction(transactionHash, confirmations, timeout);
        });
    }
    /**
     * Returns an array of logs that match the provided filter.
     *
     * @param filter The filter object to use.
     * @public
     */
    getLogs(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getLogs(filter);
        });
    }
    /**
     * Allows sending a raw message to the Alchemy backend.
     *
     * @param method The method to call.
     * @param params The parameters to pass to the method.
     * @public
     */
    send(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.send(method, params);
        });
    }
    /**
     * Finds the address that deployed the provided contract and block number it
     * was deployed in.
     *
     * NOTE: This method performs a binary search across all blocks since genesis
     * and can take a long time to complete. This method is a convenience method
     * that will eventually be replaced by a single call to an Alchemy endpoint
     * with this information cached.
     *
     * @param contractAddress - The contract address to find the deployer for.
     * @beta
     */
    findContractDeployer(contractAddress) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const currentBlockNum = yield provider.getBlockNumber();
            if ((yield provider.getCode(contractAddress, currentBlockNum)) ===
                ETH_NULL_VALUE) {
                throw new Error(`Contract '${contractAddress}' does not exist`);
            }
            // Binary search for the block number that the contract was deployed in.
            const firstBlock = yield binarySearchFirstBlock(0, currentBlockNum + 1, contractAddress, this.config);
            // Find the first transaction in the block that matches the provided address.
            const txReceipts = yield this.getTransactionReceipts({
                blockNumber: toHex(firstBlock)
            });
            const matchingReceipt = (_a = txReceipts.receipts) === null || _a === void 0 ? void 0 : _a.find(receipt => receipt.contractAddress === contractAddress.toLowerCase());
            return {
                deployerAddress: matchingReceipt === null || matchingReceipt === void 0 ? void 0 : matchingReceipt.from,
                blockNumber: firstBlock
            };
        });
    }
    getTokenBalances(address, contractAddressesOrOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            if (Array.isArray(contractAddressesOrOptions)) {
                if (contractAddressesOrOptions.length > 1500) {
                    throw new Error('You cannot pass in more than 1500 contract addresses to getTokenBalances()');
                }
                if (contractAddressesOrOptions.length === 0) {
                    throw new Error('getTokenBalances() requires at least one contractAddress when using an array');
                }
                return provider._send('alchemy_getTokenBalances', [address, contractAddressesOrOptions], 'getTokenBalances');
            }
            else {
                const tokenType = contractAddressesOrOptions === undefined
                    ? exports.TokenBalanceType.ERC20
                    : contractAddressesOrOptions.type;
                const params = [address, tokenType];
                if ((contractAddressesOrOptions === null || contractAddressesOrOptions === void 0 ? void 0 : contractAddressesOrOptions.type) === exports.TokenBalanceType.ERC20 &&
                    contractAddressesOrOptions.pageKey) {
                    params.push({ pageKey: contractAddressesOrOptions.pageKey });
                }
                return provider._send('alchemy_getTokenBalances', params, 'getTokenBalances');
            }
        });
    }
    /**
     * Returns metadata for a given token contract address.
     *
     * @param address The contract address to get metadata for.
     * @public
     */
    getTokenMetadata(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('alchemy_getTokenMetadata', [address], 'getTokenMetadata');
        });
    }
    getAssetTransfers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('alchemy_getAssetTransfers', [
                Object.assign(Object.assign({}, params), { fromBlock: params.fromBlock != null
                        ? formatBlock(params.fromBlock)
                        : undefined, toBlock: params.toBlock != null ? formatBlock(params.toBlock) : undefined, maxCount: params.maxCount != null ? toHex(params.maxCount) : undefined })
            ], 'getAssetTransfers');
        });
    }
    /**
     * Gets all transaction receipts for a given block by number or block hash.
     *
     * @param params An object containing fields for the transaction receipt query.
     * @public
     */
    getTransactionReceipts(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('alchemy_getTransactionReceipts', [params], 'getTransactionReceipts');
        });
    }
}
/**
 * Perform a binary search between an integer range of block numbers to find the
 * block number where the contract was deployed.
 *
 * @internal
 */
function binarySearchFirstBlock(start, end, address, config) {
    return __awaiter(this, void 0, void 0, function* () {
        if (start >= end) {
            return end;
        }
        const mid = Math.floor((start + end) / 2);
        const provider = yield config.getProvider();
        const code = yield provider.getCode(address, mid);
        if (code === ETH_NULL_VALUE) {
            return binarySearchFirstBlock(mid + 1, end, address, config);
        }
        return binarySearchFirstBlock(start, mid, address, config);
    });
}

/**
 * The SDK has 4 log levels and a 5th option for disabling all logging. By
 * default, the log level is set to INFO.
 *
 * The order is a follows: DEBUG < INFO < WARN < ERROR
 *
 * All log types above the current log level will be outputted.
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["SILENT"] = 4] = "SILENT";
})(LogLevel || (LogLevel = {}));
const logLevelStringToEnum = {
    debug: LogLevel.DEBUG,
    info: LogLevel.INFO,
    warn: LogLevel.WARN,
    error: LogLevel.ERROR,
    silent: LogLevel.SILENT
};
// HACKY: Use the console method as a string rather than the function itself
// in order to allow for mocking in tests.
const logLevelToConsoleFn = {
    [LogLevel.DEBUG]: 'log',
    [LogLevel.INFO]: 'info',
    [LogLevel.WARN]: 'warn',
    [LogLevel.ERROR]: 'error'
};
const DEFAULT_LOG_LEVEL = LogLevel.INFO;
/**
 * Configures the verbosity of logging. The default log level is `info`.
 *
 * @param logLevel - The verbosity of logging. Can be any of the following values:
 *
 *   - `debug`: The most verbose logging level.
 *   - `info`: The default logging level.
 *   - `warn`: A logging level for non-critical issues.
 *   - `error`: A logging level for critical issues.
 *   - `silent`: Turn off all logging.
 *
 * @public
 */
function setLogLevel(logLevel) {
    loggerClient.logLevel = logLevelStringToEnum[logLevel];
}
function logDebug(message, ...args) {
    loggerClient.debug(message, args);
}
function logInfo(message, ...args) {
    loggerClient.info(message, args);
}
function logWarn(message, ...args) {
    loggerClient.warn(message, args);
}
class Logger {
    constructor() {
        /** The log level of the given Logger instance. */
        this._logLevel = DEFAULT_LOG_LEVEL;
    }
    get logLevel() {
        return this._logLevel;
    }
    set logLevel(val) {
        if (!(val in LogLevel)) {
            throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
        }
        this._logLevel = val;
    }
    debug(...args) {
        this._log(LogLevel.DEBUG, ...args);
    }
    info(...args) {
        this._log(LogLevel.INFO, ...args);
    }
    warn(...args) {
        this._log(LogLevel.WARN, ...args);
    }
    error(...args) {
        this._log(LogLevel.ERROR, ...args);
    }
    /**
     * Forwards log messages to their corresponding console counterparts if the
     * log level allows it.
     */
    _log(logLevel, ...args) {
        if (logLevel < this._logLevel) {
            return;
        }
        const now = new Date().toISOString();
        const method = logLevelToConsoleFn[logLevel];
        if (method) {
            console[method](`[${now}] Alchemy:`, ...args.map(stringify));
        }
        else {
            throw new Error(`Logger received an invalid logLevel (value: ${logLevel})`);
        }
    }
}
function stringify(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    else {
        try {
            return JSON.stringify(obj);
        }
        catch (e) {
            // Failed to convert to JSON, log the object directly.
            return obj;
        }
    }
}
// Instantiate default logger for the SDK.
const loggerClient = new Logger();

// This file is autogenerated by injectVersion.js. Any changes will be
// overwritten on commit!
const VERSION = '2.2.0';

/**
 * Given a REST endpoint, method, and params, sends the request with axios and
 * returns the response.
 */
/**
 * Helper function to send http requests using Axis.
 *
 * @private
 */
function sendAxiosRequest(baseUrl, restApiName, methodName, params, overrides) {
    var _a;
    const requestUrl = baseUrl + '/' + restApiName;
    const config = Object.assign(Object.assign({}, overrides), { headers: Object.assign(Object.assign(Object.assign({}, overrides === null || overrides === void 0 ? void 0 : overrides.headers), (IS_BROWSER && { 'Accept-Encoding': 'gzip' })), { 'Alchemy-Ethers-Sdk-Version': VERSION, 'Alchemy-Ethers-Sdk-Method': methodName }), method: (_a = overrides === null || overrides === void 0 ? void 0 : overrides.method) !== null && _a !== void 0 ? _a : 'GET', url: requestUrl, params });
    return axios__default["default"](config);
}

const DEFAULT_BACKOFF_INITIAL_DELAY_MS = 1000;
const DEFAULT_BACKOFF_MULTIPLIER = 1.5;
const DEFAULT_BACKOFF_MAX_DELAY_MS = 30 * 1000;
const DEFAULT_BACKOFF_MAX_ATTEMPTS = 5;
/**
 * Helper class for implementing exponential backoff and max retry attempts.
 *
 * @private
 * @internal
 */
class ExponentialBackoff {
    constructor(maxAttempts = DEFAULT_BACKOFF_MAX_ATTEMPTS) {
        this.maxAttempts = maxAttempts;
        this.initialDelayMs = DEFAULT_BACKOFF_INITIAL_DELAY_MS;
        this.backoffMultiplier = DEFAULT_BACKOFF_MULTIPLIER;
        this.maxDelayMs = DEFAULT_BACKOFF_MAX_DELAY_MS;
        this.numAttempts = 0;
        this.currentDelayMs = 0;
        this.isInBackoff = false;
    }
    /**
     * Returns a promise that resolves after the the backoff delay. The delay is
     * increased for each attempt. The promise is rejected if the maximum number
     * of attempts is exceeded.
     */
    // TODO: beautify this into an async iterator.
    backoff() {
        if (this.numAttempts >= this.maxAttempts) {
            return Promise.reject(new Error(`Exceeded maximum number of attempts: ${this.maxAttempts}`));
        }
        if (this.isInBackoff) {
            return Promise.reject(new Error('A backoff operation is already in progress'));
        }
        const backoffDelayWithJitterMs = this.withJitterMs(this.currentDelayMs);
        if (backoffDelayWithJitterMs > 0) {
            logDebug('ExponentialBackoff.backoff', `Backing off for ${backoffDelayWithJitterMs}ms`);
        }
        // Calculate the next delay.
        this.currentDelayMs *= this.backoffMultiplier;
        this.currentDelayMs = Math.max(this.currentDelayMs, this.initialDelayMs);
        this.currentDelayMs = Math.min(this.currentDelayMs, this.maxDelayMs);
        this.numAttempts += 1;
        return new Promise(resolve => {
            this.isInBackoff = true;
            setTimeout(() => {
                this.isInBackoff = false;
                resolve();
            }, backoffDelayWithJitterMs);
        });
    }
    /**
     * Applies +/- 50% jitter to the backoff delay, up to the max delay cap.
     *
     * @private
     * @param delayMs
     */
    withJitterMs(delayMs) {
        return Math.min(delayMs + (Math.random() - 0.5) * delayMs, this.maxDelayMs);
    }
}

/**
 * A wrapper function to make http requests and retry if the request fails.
 *
 * @internal
 */
// TODO: Wrap Axios error in AlchemyError.
function requestHttpWithBackoff(config, apiType, restApiName, methodName, params, overrides) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastError = undefined;
        const backoff = new ExponentialBackoff(config.maxRetries);
        for (let attempt = 0; attempt < config.maxRetries + 1; attempt++) {
            try {
                if (lastError !== undefined) {
                    logInfo('requestHttp', `Retrying after error: ${lastError.message}`);
                }
                try {
                    yield backoff.backoff();
                }
                catch (err) {
                    // Backoff errors when the maximum number of attempts is reached. Break
                    // out of the loop to preserve the last error.
                    break;
                }
                const response = yield sendAxiosRequest(config._getRequestUrl(apiType), restApiName, methodName, params, overrides);
                if (response.status === 200) {
                    logDebug(restApiName, `Successful request: ${restApiName}`);
                    return response.data;
                }
                else {
                    logInfo(restApiName, `Request failed: ${restApiName}, ${response.status}, ${response.data}`);
                    lastError = new Error(response.status + ': ' + response.data);
                }
            }
            catch (err) {
                if (!axios__default["default"].isAxiosError(err) || err.response === undefined) {
                    throw err;
                }
                // TODO: Standardize all errors into AlchemyError
                lastError = new Error(err.response.status + ': ' + err.response.data);
                if (!isRetryableHttpError(err, apiType)) {
                    break;
                }
            }
        }
        return Promise.reject(lastError);
    });
}
function isRetryableHttpError(err, apiType) {
    // TODO: remove 500s after webhooks are more stable.
    const retryableCodes = apiType === AlchemyApiType.WEBHOOK ? [429, 500] : [429];
    return (err.response !== undefined && retryableCodes.includes(err.response.status));
}
/**
 * Fetches all pages in a paginated endpoint, given a `pageKey` field that
 * represents the property name containing the next page token.
 *
 * @internal
 */
function paginateEndpoint(config, apiType, restApiName, methodName, reqPageKey, resPageKey, params) {
    return __asyncGenerator(this, arguments, function* paginateEndpoint_1() {
        let hasNext = true;
        const requestParams = Object.assign({}, params);
        while (hasNext) {
            const response = yield __await(requestHttpWithBackoff(config, apiType, restApiName, methodName, requestParams));
            yield yield __await(response);
            if (response[resPageKey] !== undefined) {
                requestParams[reqPageKey] = response[resPageKey];
            }
            else {
                hasNext = false;
            }
        }
    });
}

function getNftMetadata(config, contractAddress, tokenId, tokenType, tokenUriTimeoutInMs, srcMethod = 'getNftMetadata') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTMetadata', srcMethod, {
            contractAddress,
            tokenId: bignumber.BigNumber.from(tokenId).toString(),
            tokenType: tokenType !== exports.NftTokenType.UNKNOWN ? tokenType : undefined,
            tokenUriTimeoutInMs
        });
        return getNftFromRaw(response, contractAddress);
    });
}
function getContractMetadata(config, contractAddress, srcMethod = 'getContractMetadata') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getContractMetadata', srcMethod, {
            contractAddress
        });
        return getNftContractFromRaw(response);
    });
}
function getNftsForOwnerIterator(config, owner, options, srcMethod = 'getNftsForOwnerIterator') {
    return __asyncGenerator(this, arguments, function* getNftsForOwnerIterator_1() {
        var e_1, _a;
        const withMetadata = omitMetadataToWithMetadata(options === null || options === void 0 ? void 0 : options.omitMetadata);
        try {
            for (var _b = __asyncValues(paginateEndpoint(config, AlchemyApiType.NFT, 'getNFTs', srcMethod, 'pageKey', 'pageKey', {
                contractAddresses: options === null || options === void 0 ? void 0 : options.contractAddresses,
                pageKey: options === null || options === void 0 ? void 0 : options.pageKey,
                filters: options === null || options === void 0 ? void 0 : options.excludeFilters,
                owner,
                withMetadata
            })), _c; _c = yield __await(_b.next()), !_c.done;) {
                const response = _c.value;
                for (const ownedNft of response.ownedNfts) {
                    yield yield __await(Object.assign(Object.assign({}, nftFromGetNftResponse(ownedNft)), { balance: parseInt(ownedNft.balance) }));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function getNftsForOwner(config, owner, options, srcMethod = 'getNftsForOwner') {
    return __awaiter(this, void 0, void 0, function* () {
        const withMetadata = omitMetadataToWithMetadata(options === null || options === void 0 ? void 0 : options.omitMetadata);
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTs', srcMethod, {
            contractAddresses: options === null || options === void 0 ? void 0 : options.contractAddresses,
            pageKey: options === null || options === void 0 ? void 0 : options.pageKey,
            filters: options === null || options === void 0 ? void 0 : options.excludeFilters,
            owner,
            pageSize: options === null || options === void 0 ? void 0 : options.pageSize,
            withMetadata,
            tokenUriTimeoutInMs: options === null || options === void 0 ? void 0 : options.tokenUriTimeoutInMs
        });
        return {
            ownedNfts: response.ownedNfts.map(res => (Object.assign(Object.assign({}, nftFromGetNftResponse(res)), { balance: parseInt(res.balance) }))),
            pageKey: response.pageKey,
            totalCount: response.totalCount
        };
    });
}
function getNftsForContract(config, contractAddress, options, srcMethod = 'getNftsForContract') {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const withMetadata = omitMetadataToWithMetadata(options === null || options === void 0 ? void 0 : options.omitMetadata);
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTsForCollection', srcMethod, {
            contractAddress,
            startToken: options === null || options === void 0 ? void 0 : options.pageKey,
            withMetadata,
            limit: (_a = options === null || options === void 0 ? void 0 : options.pageSize) !== null && _a !== void 0 ? _a : undefined,
            tokenUriTimeoutInMs: 50
        });
        return {
            nfts: response.nfts.map(res => nftFromGetNftNftContractResponse(res, contractAddress)),
            pageKey: response.nextToken
        };
    });
}
function getNftsForContractIterator(config, contractAddress, options, srcMethod = 'getNftsForContractIterator') {
    return __asyncGenerator(this, arguments, function* getNftsForContractIterator_1() {
        var e_2, _a;
        const withMetadata = omitMetadataToWithMetadata(options === null || options === void 0 ? void 0 : options.omitMetadata);
        try {
            for (var _b = __asyncValues(paginateEndpoint(config, AlchemyApiType.NFT, 'getNFTsForCollection', srcMethod, 'startToken', 'nextToken', {
                contractAddress,
                startToken: options === null || options === void 0 ? void 0 : options.pageKey,
                withMetadata
            })), _c; _c = yield __await(_b.next()), !_c.done;) {
                const response = _c.value;
                for (const nft of response.nfts) {
                    yield yield __await(nftFromGetNftNftContractResponse(nft, contractAddress));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield __await(_a.call(_b));
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
}
function getOwnersForContract(config, contractAddress, options, srcMethod = 'getOwnersForContract') {
    return __awaiter(this, void 0, void 0, function* () {
        // Cast to `any` to avoid more type wrangling.
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getOwnersForCollection', srcMethod, Object.assign(Object.assign({}, options), { contractAddress }));
        return Object.assign({ owners: response.ownerAddresses }, (response.pageKey !== undefined && { pageKey: response.pageKey }));
    });
}
function getOwnersForNft(config, contractAddress, tokenId, srcMethod = 'getOwnersForNft') {
    return __awaiter(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getOwnersForToken', srcMethod, {
            contractAddress,
            tokenId: bignumber.BigNumber.from(tokenId).toString()
        });
    });
}
function checkNftOwnership(config, owner, contractAddresses, srcMethod = 'checkNftOwnership') {
    return __awaiter(this, void 0, void 0, function* () {
        if (contractAddresses.length === 0) {
            throw new Error('Must provide at least one contract address');
        }
        const response = yield getNftsForOwner(config, owner, {
            contractAddresses,
            omitMetadata: true
        }, srcMethod);
        return response.ownedNfts.length > 0;
    });
}
function verifyNftOwnership(config, owner, contractAddresses, srcMethod = 'verifyNftOwnership') {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof contractAddresses === 'string') {
            const response = yield getNftsForOwner(config, owner, {
                contractAddresses: [contractAddresses],
                omitMetadata: true
            }, srcMethod);
            return response.ownedNfts.length > 0;
        }
        else {
            if (contractAddresses.length === 0) {
                throw new Error('Must provide at least one contract address');
            }
            const response = yield getNftsForOwner(config, owner, {
                contractAddresses,
                omitMetadata: true
            }, srcMethod);
            // Create map where all input contract addresses are set to false, then flip
            // owned nfts to true.
            const result = contractAddresses.reduce((acc, curr) => {
                acc[curr] = false;
                return acc;
            }, {});
            for (const nft of response.ownedNfts) {
                result[nft.contract.address] = true;
            }
            return result;
        }
    });
}
function isSpamContract(config, contractAddress, srcMethod = 'isSpamContract') {
    return __awaiter(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'isSpamContract', srcMethod, {
            contractAddress
        });
    });
}
function getSpamContracts(config, srcMethod = 'getSpamContracts') {
    return __awaiter(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getSpamContracts', srcMethod, undefined);
    });
}
function getFloorPrice(config, contractAddress, srcMethod = 'getFloorPrice') {
    return __awaiter(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getFloorPrice', srcMethod, {
            contractAddress
        });
    });
}
function computeRarity(config, contractAddress, tokenId, srcMethod = 'computeRarity') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'computeRarity', srcMethod, {
            contractAddress,
            tokenId: bignumber.BigNumber.from(tokenId).toString()
        });
        return getNftRarityFromRaw(response);
    });
}
function summarizeNftAttributes(config, contractAddress, srcMethod = 'summarizeNftAttributes') {
    return __awaiter(this, void 0, void 0, function* () {
        return requestHttpWithBackoff(config, AlchemyApiType.NFT, 'summarizeNftAttributes', srcMethod, {
            contractAddress
        });
    });
}
function refreshNftMetadata(config, contractAddress, tokenId, srcMethod = 'refreshNftMetadata') {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenIdString = bignumber.BigNumber.from(tokenId).toString();
        const first = yield getNftMetadata(config, contractAddress, tokenIdString, undefined, undefined, srcMethod);
        const second = yield refresh(config, contractAddress, tokenIdString, srcMethod);
        return first.timeLastUpdated !== second.timeLastUpdated;
    });
}
function refreshContract(config, contractAddress, srcMethod = 'refreshContract') {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'reingestContract', srcMethod, {
            contractAddress
        });
        return {
            contractAddress: response.contractAddress,
            refreshState: parseReingestionState(response.reingestionState),
            progress: response.progress
        };
    });
}
function refresh(config, contractAddress, tokenId, srcMethod) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield requestHttpWithBackoff(config, AlchemyApiType.NFT, 'getNFTMetadata', srcMethod, {
            contractAddress,
            tokenId: bignumber.BigNumber.from(tokenId).toString(),
            refreshCache: true
        });
        return getNftFromRaw(response, contractAddress);
    });
}
/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftResponse(ownedNft) {
    if (isNftWithMetadata(ownedNft)) {
        return getNftFromRaw(ownedNft, ownedNft.contract.address);
    }
    else {
        return getBaseNftFromRaw(ownedNft, ownedNft.contract.address);
    }
}
/**
 * Helper method to convert a NFT response received from Alchemy backend to an
 * SDK NFT type.
 *
 * @internal
 */
function nftFromGetNftNftContractResponse(ownedNft, contractAddress) {
    if (isNftWithMetadata(ownedNft)) {
        return getNftFromRaw(ownedNft, contractAddress);
    }
    else {
        return getBaseNftFromRaw(ownedNft, contractAddress);
    }
}
/** @internal */
// TODO: more comprehensive type check
function isNftWithMetadata(response) {
    return response.title !== undefined;
}
/**
 * Flips the `omitMetadata` SDK parameter type to the `withMetadata` parameter
 * required by the Alchemy API. If `omitMetadata` is undefined, the SDK defaults
 * to including metadata.
 *
 * @internal
 */
function omitMetadataToWithMetadata(omitMetadata) {
    return omitMetadata === undefined ? true : !omitMetadata;
}
function parseReingestionState(reingestionState) {
    switch (reingestionState) {
        case 'does_not_exist':
            return exports.RefreshState.DOES_NOT_EXIST;
        case 'already_queued':
            return exports.RefreshState.ALREADY_QUEUED;
        case 'in_progress':
            return exports.RefreshState.IN_PROGRESS;
        case 'finished':
            return exports.RefreshState.FINISHED;
        case 'queued':
            return exports.RefreshState.QUEUED;
        case 'queue_failed':
            return exports.RefreshState.QUEUE_FAILED;
        default:
            throw new Error('Unknown reingestion state: ' + reingestionState);
    }
}

/**
 * The NFT namespace contains all the functionality related to NFTs.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the core namespace
 * via `alchemy.nft`.
 */
class NftNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Get the NFT metadata associated with the provided parameters.
     *
     * @param contractAddress - The contract address of the NFT.
     * @param tokenId - Token id of the NFT.
     * @param tokenType - Optionally specify the type of token to speed up the query.
     * @param tokenUriTimeoutInMs - No set timeout by default - When metadata is
     *   requested, this parameter is the timeout (in milliseconds) for the
     *   website hosting the metadata to respond. If you want to only access the
     *   cache and not live fetch any metadata for cache misses then set this value to 0.
     * @public
     */
    getNftMetadata(contractAddress, tokenId, tokenType, tokenUriTimeoutInMs) {
        return getNftMetadata(this.config, contractAddress, tokenId, tokenType, tokenUriTimeoutInMs);
    }
    /**
     * Get the NFT collection metadata associated with the provided parameters.
     *
     * @param contractAddress - The contract address of the NFT.
     * @public
     */
    getContractMetadata(contractAddress) {
        return getContractMetadata(this.config, contractAddress);
    }
    getNftsForOwnerIterator(owner, options) {
        return getNftsForOwnerIterator(this.config, owner, options);
    }
    getNftsForOwner(owner, options) {
        return getNftsForOwner(this.config, owner, options);
    }
    getNftsForContract(contractAddress, options) {
        return getNftsForContract(this.config, contractAddress, options);
    }
    getNftsForContractIterator(contractAddress, options) {
        return getNftsForContractIterator(this.config, contractAddress, options);
    }
    getOwnersForContract(contractAddress, options) {
        return getOwnersForContract(this.config, contractAddress, options);
    }
    /**
     * Gets all the owners for a given NFT contract address and token ID.
     *
     * @param contractAddress - The NFT contract address.
     * @param tokenId - Token id of the NFT.
     * @beta
     */
    getOwnersForNft(contractAddress, tokenId) {
        return getOwnersForNft(this.config, contractAddress, tokenId);
    }
    /**
     * DEPRECATED - Checks that the provided owner address owns one of more of the
     * provided NFTs.
     *
     * @deprecated - Use {@link verifyNftOwnership} instead. This method will be
     *   removed in a future release.
     * @param owner - The owner address to check.
     * @param contractAddresses - An array of NFT contract addresses to check ownership for.
     */
    checkNftOwnership(owner, contractAddresses) {
        return checkNftOwnership(this.config, owner, contractAddresses);
    }
    verifyNftOwnership(owner, contractAddress) {
        return verifyNftOwnership(this.config, owner, contractAddress);
    }
    /**
     * Returns whether a contract is marked as spam or not by Alchemy. For more
     * information on how we classify spam, go to our NFT API FAQ at
     * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
     *
     * @param contractAddress - The contract address to check.
     * @beta
     */
    isSpamContract(contractAddress) {
        return isSpamContract(this.config, contractAddress);
    }
    /**
     * Returns a list of all spam contracts marked by Alchemy. For details on how
     * Alchemy marks spam contracts, go to
     * https://docs.alchemy.com/alchemy/enhanced-apis/nft-api/nft-api-faq#nft-spam-classification.
     *
     * @beta
     */
    getSpamContracts() {
        return getSpamContracts(this.config);
    }
    /**
     * Returns the floor prices of a NFT contract by marketplace.
     *
     * @param contractAddress - The contract address for the NFT collection.
     * @beta
     */
    getFloorPrice(contractAddress) {
        return getFloorPrice(this.config, contractAddress);
    }
    /**
     * Get the rarity of each attribute of an NFT.
     *
     * @param contractAddress - Contract address for the NFT collection.
     * @param tokenId - Token id of the NFT.
     */
    computeRarity(contractAddress, tokenId) {
        return computeRarity(this.config, contractAddress, tokenId);
    }
    /**
     * Get a summary of attribute prevalence for an NFT collection.
     *
     * @param contractAddress - Contract address for the NFT collection.
     */
    summarizeNftAttributes(contractAddress) {
        return summarizeNftAttributes(this.config, contractAddress);
    }
    /**
     * Refreshes the cached metadata for a provided NFT contract address and token
     * id. Returns a boolean value indicating whether the metadata was refreshed.
     *
     * This method is useful when you want to refresh the metadata for a NFT that
     * has been updated since the last time it was fetched. Note that the backend
     * only allows one refresh per token every 15 minutes, globally for all users.
     * The last refresh time for an NFT can be accessed on the
     * {@link Nft.timeLastUpdated} field.
     *
     * To trigger a refresh for all NFTs in a contract, use {@link refreshContract} instead.
     *
     * @param contractAddress - The contract address of the NFT.
     * @param tokenId - The token id of the NFT.
     */
    refreshNftMetadata(contractAddress, tokenId) {
        return refreshNftMetadata(this.config, contractAddress, tokenId);
    }
    /**
     * Triggers a metadata refresh all NFTs in the provided contract address. This
     * method is useful after an NFT collection is revealed.
     *
     * Refreshes are queued on the Alchemy backend and may take time to fully
     * process. To refresh the metadata for a specific token, use the
     * {@link refreshNftMetadata} method instead.
     *
     * @param contractAddress - The contract address of the NFT collection.
     * @beta
     */
    refreshContract(contractAddress) {
        return refreshContract(this.config, contractAddress);
    }
}

/**
 * The Notify namespace contains methods used for creating, reading, updating,
 * and deleting webhooks in the Notify API.
 *
 * To use the methods in the API, you must provide your team's auth token in the
 * {@link AlchemySettings.authToken} field when configuring
 * {@link AlchemySettings}. The auth token can be found in the Alchemy Dashboard
 * on the Notify tab.
 *
 * Note that not all networks are supported in the Notify API. Please consult
 * the documentation for which networks are supported.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the notify
 * namespace via `alchemy.notify`.
 */
class NotifyNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Get all webhooks on your team.
     *
     * The team is determined by the `authToken` provided into the {@link AlchemySettings}
     * object when creating a new {@link Alchemy} instance.
     *
     * This method returns a response object containing all the webhooks
     */
    getAllWebhooks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyConfig();
            const response = yield this.sendWebhookRequest('team-webhooks', 'getAllWebhooks', {});
            return {
                webhooks: parseRawWebhookResponse(response),
                totalCount: response.data.length
            };
        });
    }
    getAddresses(webhookOrId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyConfig();
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            const response = yield this.sendWebhookRequest('webhook-addresses', 'getAddresses', {
                webhook_id: webhookId,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                after: options === null || options === void 0 ? void 0 : options.pageKey
            });
            return parseRawAddressActivityResponse(response);
        });
    }
    getNftFilters(webhookOrId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyConfig();
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            const response = yield this.sendWebhookRequest('webhook-nft-filters', 'getNftFilters', {
                webhook_id: webhookId,
                limit: options === null || options === void 0 ? void 0 : options.limit,
                after: options === null || options === void 0 ? void 0 : options.pageKey
            });
            return parseRawNftFiltersResponse(response);
        });
    }
    updateWebhook(webhookOrId, update) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            let restApiName;
            let methodName;
            let method;
            let data;
            if ('isActive' in update) {
                restApiName = 'update-webhook';
                methodName = 'updateWebhook';
                method = 'PUT';
                data = {
                    webhook_id: webhookId,
                    is_active: update.isActive
                };
            }
            else if ('addFilters' in update || 'removeFilters' in update) {
                restApiName = 'update-webhook-nft-filters';
                methodName = 'updateWebhookNftFilters';
                method = 'PATCH';
                data = {
                    webhook_id: webhookId,
                    nft_filters_to_add: update.addFilters
                        ? update.addFilters.map(nftFilterToParam)
                        : [],
                    nft_filters_to_remove: update.removeFilters
                        ? update.removeFilters.map(nftFilterToParam)
                        : []
                };
            }
            else if ('addAddresses' in update || 'removeAddresses' in update) {
                restApiName = 'update-webhook-addresses';
                methodName = 'webhook:updateWebhookAddresses';
                method = 'PATCH';
                data = {
                    webhook_id: webhookId,
                    addresses_to_add: (_a = update.addAddresses) !== null && _a !== void 0 ? _a : [],
                    addresses_to_remove: (_b = update.removeAddresses) !== null && _b !== void 0 ? _b : []
                };
            }
            else if ('newAddresses' in update) {
                restApiName = 'update-webhook-addresses';
                methodName = 'webhook:updateWebhookAddress';
                method = 'PUT';
                data = {
                    webhook_id: webhookId,
                    addresses: update.newAddresses
                };
            }
            else {
                throw new Error('Invalid `update` param passed into `updateWebhook`');
            }
            yield this.sendWebhookRequest(restApiName, methodName, {}, {
                method,
                data
            });
        });
    }
    createWebhook(url, type, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let appId;
            if (type === exports.WebhookType.MINED_TRANSACTION ||
                type === exports.WebhookType.DROPPED_TRANSACTION) {
                if (!('appId' in params)) {
                    throw new Error('Transaction Webhooks require an app id.');
                }
                appId = params.appId;
            }
            let network = NETWORK_TO_WEBHOOK_NETWORK.get(this.config.network);
            let filters;
            let addresses;
            if (type === exports.WebhookType.NFT_ACTIVITY) {
                if (!('filters' in params) || params.filters.length === 0) {
                    throw new Error('Nft Activity Webhooks require a non-empty array input.');
                }
                network = params.network
                    ? NETWORK_TO_WEBHOOK_NETWORK.get(params.network)
                    : network;
                filters = params.filters.map(filter => ({
                    contract_address: filter.contractAddress,
                    token_id: bignumber.BigNumber.from(filter.tokenId).toString()
                }));
            }
            else if (type === exports.WebhookType.ADDRESS_ACTIVITY) {
                if (params === undefined ||
                    !('addresses' in params) ||
                    params.addresses.length === 0) {
                    throw new Error('Address Activity Webhooks require a non-empty array input.');
                }
                network = params.network
                    ? NETWORK_TO_WEBHOOK_NETWORK.get(params.network)
                    : network;
                addresses = params.addresses;
            }
            const data = Object.assign(Object.assign(Object.assign({ network, webhook_type: type, webhook_url: url }, (appId && { app_id: appId })), (filters && { nft_filters: filters })), (addresses && { addresses }));
            const response = yield this.sendWebhookRequest('create-webhook', 'createWebhook', {}, {
                method: 'POST',
                data
            });
            return parseRawWebhook(response.data);
        });
    }
    deleteWebhook(webhookOrId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verifyConfig();
            const webhookId = typeof webhookOrId === 'string' ? webhookOrId : webhookOrId.id;
            const response = yield this.sendWebhookRequest('delete-webhook', 'deleteWebhook', {
                webhook_id: webhookId
            }, {
                method: 'DELETE'
            });
            if ('message' in response) {
                throw new Error(`Webhook not found. Failed to delete webhook: ${webhookId}`);
            }
        });
    }
    verifyConfig() {
        if (this.config.authToken === undefined) {
            throw new Error('Using the Notify API requires setting the Alchemy Auth Token in ' +
                'the settings object when initializing Alchemy.');
        }
    }
    sendWebhookRequest(restApiName, methodName, params, overrides) {
        return requestHttpWithBackoff(this.config, AlchemyApiType.WEBHOOK, restApiName, methodName, params, Object.assign(Object.assign({}, overrides), { headers: Object.assign({ 'X-Alchemy-Token': this.config.authToken }, overrides === null || overrides === void 0 ? void 0 : overrides.headers) }));
    }
}
/**
 * Mapping of webhook network representations to the SDK's network representation.
 *
 * @internal
 */
const WEBHOOK_NETWORK_TO_NETWORK = {
    ETH_MAINNET: exports.Network.ETH_MAINNET,
    ETH_GOERLI: exports.Network.ETH_GOERLI,
    ETH_ROPSTEN: exports.Network.ETH_ROPSTEN,
    ETH_RINKEBY: exports.Network.ETH_RINKEBY,
    ETH_KOVAN: exports.Network.ETH_KOVAN,
    MATIC_MAINNET: exports.Network.MATIC_MAINNET,
    MATIC_MUMBAI: exports.Network.MATIC_MUMBAI,
    ARB_MAINNET: exports.Network.ARB_MAINNET,
    ARB_RINKEBY: exports.Network.ARB_RINKEBY,
    OPT_MAINNET: exports.Network.OPT_MAINNET,
    OPT_KOVAN: exports.Network.OPT_KOVAN
};
/** Mapping of the SDK's network representation the webhook API's network representation. */
const NETWORK_TO_WEBHOOK_NETWORK = Object.keys(exports.Network).reduce((map, key) => {
    if (key in WEBHOOK_NETWORK_TO_NETWORK) {
        map.set(WEBHOOK_NETWORK_TO_NETWORK[key], key);
    }
    return map;
}, new Map());
function parseRawWebhookResponse(response) {
    return response.data.map(parseRawWebhook);
}
function parseRawWebhook(rawWebhook) {
    return Object.assign({ id: rawWebhook.id, network: WEBHOOK_NETWORK_TO_NETWORK[rawWebhook.network], type: rawWebhook.webhook_type, url: rawWebhook.webhook_url, isActive: rawWebhook.is_active, timeCreated: new Date(rawWebhook.time_created).toISOString(), signingKey: rawWebhook.signing_key, version: rawWebhook.version }, (rawWebhook.app_id !== undefined && { appId: rawWebhook.app_id }));
}
function parseRawAddressActivityResponse(response) {
    return {
        addresses: response.data,
        totalCount: response.pagination.total_count,
        pageKey: response.pagination.cursors.after
    };
}
function parseRawNftFiltersResponse(response) {
    return {
        filters: response.data.map(f => ({
            contractAddress: f.contract_address,
            tokenId: bignumber.BigNumber.from(f.token_id).toString()
        })),
        totalCount: response.pagination.total_count,
        pageKey: response.pagination.cursors.after
    };
}
function nftFilterToParam(filter) {
    return {
        contract_address: filter.contractAddress,
        token_id: bignumber.BigNumber.from(filter.tokenId).toString()
    };
}

/**
 * Multiples to increment fee per gas when using
 * {@link TransactNamespace.sendGasOptimizedTransaction}.
 *
 * @internal
 */
const GAS_OPTIMIZED_TX_FEE_MULTIPLES = [0.9, 1, 1.1, 1.2, 1.3];
/**
 * The Transact namespace contains methods used for sending transactions and
 * checking on the state of submitted transactions.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the transact
 * namespace via `alchemy.transact`.
 */
class TransactNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Used to send a single transaction to Flashbots. Flashbots will attempt to
     * send the transaction to miners for the next 25 blocks.
     *
     * Returns the transaction hash of the submitted transaction.
     *
     * @param signedTransaction The raw, signed transaction as a hash.
     * @param maxBlockNumber Optional highest block number in which the
     *   transaction should be included.
     * @param options Options to configure the request.
     */
    sendPrivateTransaction(signedTransaction, maxBlockNumber, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const hexBlockNumber = maxBlockNumber ? toHex(maxBlockNumber) : undefined;
            return provider._send('eth_sendPrivateTransaction', [
                {
                    tx: signedTransaction,
                    maxBlockNumber: hexBlockNumber,
                    preferences: options
                }
            ], 'sendPrivateTransaction');
        });
    }
    /**
     * Stops the provided private transaction from being submitted for future
     * blocks. A transaction can only be cancelled if the request is signed by the
     * same key as the {@link sendPrivateTransaction} call submitting the
     * transaction in first place.
     *
     * Please note that fast mode transactions cannot be cancelled using this method.
     *
     * Returns a boolean indicating whether the cancellation was successful.
     *
     * @param transactionHash Transaction hash of private tx to be cancelled
     */
    cancelPrivateTransaction(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('eth_cancelPrivateTransaction', [
                {
                    txHash: transactionHash
                }
            ], 'cancelPrivateTransaction');
        });
    }
    /**
     * Returns the transaction with hash or null if the transaction is unknown.
     *
     * If a transaction has not been mined, this method will search the
     * transaction pool. Various backends may have more restrictive transaction
     * pool access (e.g. if the gas price is too low or the transaction was only
     * recently sent and not yet indexed) in which case this method may also return null.
     *
     * NOTE: This is an alias for {@link CoreNamespace.getTransaction}.
     *
     * @param transactionHash The hash of the transaction to get.
     * @public
     */
    getTransaction(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.getTransaction(transactionHash);
        });
    }
    /**
     * Submits transaction to the network to be mined. The transaction must be
     * signed, and be valid (i.e. the nonce is correct and the account has
     * sufficient balance to pay for the transaction).
     *
     * NOTE: This is an alias for {@link CoreNamespace.sendTransaction}.
     *
     * @param signedTransaction The signed transaction to send.
     * @public
     */
    sendTransaction(signedTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.sendTransaction(signedTransaction);
        });
    }
    /**
     * Returns an estimate of the amount of gas that would be required to submit
     * transaction to the network.
     *
     * An estimate may not be accurate since there could be another transaction on
     * the network that was not accounted for, but after being mined affects the
     * relevant state.
     *
     * This is an alias for {@link CoreNamespace.estimateGas}.
     *
     * @param transaction The transaction to estimate gas for.
     * @public
     */
    estimateGas(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.estimateGas(transaction);
        });
    }
    /**
     * Returns a fee per gas (in wei) that is an estimate of how much you can pay
     * as a priority fee, or "tip", to get a transaction included in the current block.
     *
     * This number is generally used to set the `maxPriorityFeePerGas` field in a
     * transaction request.
     *
     * @public
     */
    getMaxPriorityFeePerGas() {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            const feeHex = yield provider._send('eth_maxPriorityFeePerGas', [], 'getMaxPriorityFeePerGas');
            return fromHex(feeHex);
        });
    }
    /**
     * Returns a promise which will not resolve until specified transaction hash is mined.
     *
     * If {@link confirmations} is 0, this method is non-blocking and if the
     * transaction has not been mined returns null. Otherwise, this method will
     * block until the transaction has confirmed blocks mined on top of the block
     * in which it was mined.
     *
     * NOTE: This is an alias for {@link CoreNamespace.waitForTransaction}.
     *
     * @param transactionHash The hash of the transaction to wait for.
     * @param confirmations The number of blocks to wait for.
     * @param timeout The maximum time to wait for the transaction to confirm.
     * @public
     */
    waitForTransaction(transactionHash, confirmations, timeout) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider.waitForTransaction(transactionHash, confirmations, timeout);
        });
    }
    sendGasOptimizedTransaction(transactionOrSignedTxs, wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(transactionOrSignedTxs)) {
                return this._sendGasOptimizedTransaction(transactionOrSignedTxs, 'sendGasOptimizedTransactionPreSigned');
            }
            let gasLimit;
            let priorityFee;
            let baseFee;
            const provider = yield this.config.getProvider();
            try {
                gasLimit = yield this.estimateGas(transactionOrSignedTxs);
                priorityFee = yield this.getMaxPriorityFeePerGas();
                const currentBlock = yield provider.getBlock('latest');
                baseFee = currentBlock.baseFeePerGas.toNumber();
            }
            catch (e) {
                throw new Error(`Failed to estimate gas for transaction: ${e}`);
            }
            const gasSpreadTransactions = generateGasSpreadTransactions(transactionOrSignedTxs, gasLimit.toNumber(), baseFee, priorityFee);
            const signedTransactions = yield Promise.all(gasSpreadTransactions.map(tx => wallet.signTransaction(tx)));
            return this._sendGasOptimizedTransaction(signedTransactions, 'sendGasOptimizedTransactionGenerated');
        });
    }
    /**
     * Returns the state of the transaction job returned by the
     * {@link sendGasOptimizedTransaction}.
     *
     * @param trackingId The tracking id from the response of the sent gas optimized transaction.
     * @internal
     */
    // TODO(txjob): Remove internal tag once this feature is released.
    getGasOptimizedTransactionStatus(trackingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('alchemy_getGasOptimizedTransactionStatus', [trackingId], 'getGasOptimizedTransactionStatus');
        });
    }
    /** @internal */
    _sendGasOptimizedTransaction(signedTransactions, methodName) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getProvider();
            return provider._send('alchemy_sendGasOptimizedTransaction', [
                {
                    rawTransactions: signedTransactions
                }
            ], methodName);
        });
    }
}
/**
 * Helper method to generate the raw transaction with the given gas limit and
 * priority fee across a spread of different gas prices.
 *
 * @internal
 */
// Visible for testing
function generateGasSpreadTransactions(transaction, gasLimit, baseFee, priorityFee) {
    return GAS_OPTIMIZED_TX_FEE_MULTIPLES.map(feeMultiplier => {
        return Object.assign(Object.assign({}, transaction), { gasLimit, maxFeePerGas: Math.round(baseFee * feeMultiplier + priorityFee * feeMultiplier), maxPriorityFeePerGas: Math.round(feeMultiplier * priorityFee) });
    });
}

/**
 * The Websocket namespace contains all subscription related functions that
 * allow you to subscribe to events and receive updates as they occur. The
 * underlying WebSocket provider has additional logic to handle reconnections
 * and automatically backfills missed events.
 *
 * Do not call this constructor directly. Instead, instantiate an Alchemy object
 * with `const alchemy = new Alchemy(config)` and then access the core namespace
 * via `alchemy.ws`.
 */
class WebSocketNamespace {
    /** @internal */
    constructor(config) {
        this.config = config;
    }
    /**
     * Adds a listener to be triggered for each {@link eventName} event. Also
     * includes Alchemy's Subscription API events. See {@link AlchemyEventType} for
     * how to use them.
     *
     * @param eventName The event to listen for.
     * @param listener The listener to call when the event is triggered.
     * @public
     */
    on(eventName, listener) {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            provider.on(eventName, listener);
        }))();
        return this;
    }
    /**
     * Adds a listener to be triggered for only the next {@link eventName} event,
     * after which it will be removed. Also includes Alchemy's Subscription API
     * events. See {@link AlchemyEventType} for how to use them.
     *
     * @param eventName The event to listen for.
     * @param listener The listener to call when the event is triggered.
     * @public
     */
    once(eventName, listener) {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            provider.once(eventName, listener);
        }))();
        return this;
    }
    /**
     * Removes the provided {@link listener} for the {@link eventName} event. If no
     * listener is provided, all listeners for the event will be removed.
     *
     * @param eventName The event to unlisten to.
     * @param listener The listener to remove.
     * @public
     */
    off(eventName, listener) {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            return provider.off(eventName, listener);
        }))();
        return this;
    }
    /**
     * Remove all listeners for the provided {@link eventName} event. If no event
     * is provided, all events and their listeners are removed.
     *
     * @param eventName The event to remove all listeners for.
     * @public
     */
    removeAllListeners(eventName) {
        void (() => __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            provider.removeAllListeners(eventName);
        }))();
        return this;
    }
    /**
     * Returns the number of listeners for the provided {@link eventName} event. If
     * no event is provided, the total number of listeners for all events is returned.
     *
     * @param eventName The event to get the number of listeners for.
     * @public
     */
    listenerCount(eventName) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            return provider.listenerCount(eventName);
        });
    }
    /**
     * Returns an array of listeners for the provided {@link eventName} event. If
     * no event is provided, all listeners will be included.
     *
     * @param eventName The event to get the listeners for.
     */
    listeners(eventName) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield this.config.getWebSocketProvider();
            return provider.listeners(eventName);
        });
    }
}

/**
 * The Alchemy SDK client. This class is the main entry point into Alchemy's
 * APIs and separates functionality into different namespaces.
 *
 * Each SDK instance is associated with a specific network and API key. To use a
 * different network or API key, create a new instance of {@link Alchemy}.
 *
 * @public
 */
class Alchemy {
    /**
     * @param {string} [settings.apiKey] - The API key to use for Alchemy
     * @param {Network} [settings.network] - The network to use for Alchemy
     * @param {number} [settings.maxRetries] - The maximum number of retries to attempt
     * @public
     */
    constructor(settings) {
        this.config = new AlchemyConfig(settings);
        this.core = new CoreNamespace(this.config);
        this.nft = new NftNamespace(this.config);
        this.ws = new WebSocketNamespace(this.config);
        this.transact = new TransactNamespace(this.config);
        this.notify = new NotifyNamespace(this.config);
    }
}

/**
 * The Wallet class inherits Signer and can sign transactions and messages using
 * a private key as a standard Externally Owned Account (EOA).
 *
 * SDK's custom implementation of Ethers.js's 'Wallet'.
 *
 * Primary difference from Ethers.js 'Wallet' is that you can pass in either a
 * Provider or an Alchemy object. This implementation will intelligently detect
 * the format and set the provider accordingly.
 *
 * @public
 * @override
 */
class Wallet extends wallet.Wallet {
    /**
     * Overload permits users to pass in either a standard Provider or an Alchemy
     * object. The constructor will detect the object type and handle appropriately.
     *
     * @override
     */
    constructor(privateKey, alchemyOrProvider) {
        // If object passed in is a provider, send to super
        let superProvider;
        if (alchemyOrProvider && abstractProvider.Provider.isProvider(alchemyOrProvider)) {
            superProvider = alchemyOrProvider;
        }
        super(privateKey, superProvider);
        // If object passed in is an Alchemy object, just set Alchemy
        if (alchemyOrProvider && !abstractProvider.Provider.isProvider(alchemyOrProvider)) {
            this.alchemyProviderPromise = alchemyOrProvider.config.getProvider();
        }
    }
    //////////////////////////////////////////////////////////////////
    // Set of overrides from Signer to handle async provider retrieval.
    //////////////////////////////////////////////////////////////////
    /**
     * Returns the balance of this wallet at blockTag.
     *
     * @param blockTag The block to check the balance of
     * @override
     */
    getBalance(blockTag) {
        return this.getWallet().then(wallet => wallet.getBalance(blockTag));
    }
    /**
     * Returns the number of transactions this account has ever sent. This is the
     * value required to be included in transactions as the nonce.
     *
     * @param blockTag The block to check the transaction count on
     * @override
     */
    getTransactionCount(blockTag) {
        return this.getWallet().then(wallet => wallet.getTransactionCount(blockTag));
    }
    /**
     * Returns the result of estimating the cost to send the transactionRequest,
     * with this account address being used as the from field.
     *
     * @param transaction Transaction to estimate the gas on
     * @override
     */
    estimateGas(transaction) {
        return this.getWallet().then(wallet => wallet.estimateGas(transaction));
    }
    /**
     * Returns the result of calling using the transactionRequest, with this
     * account address being used as the from field.
     *
     * @param transaction To make a call on
     * @param blockTag The block to make the call on
     * @override
     */
    call(transaction, blockTag) {
        return this.getWallet().then(wallet => wallet.call(transaction, blockTag));
    }
    /**
     * Populates all fields in a transaction, signs it and sends it to the network
     *
     * @override
     */
    sendTransaction(transaction) {
        return this.getWallet().then(wallet => wallet.sendTransaction(transaction));
    }
    /**
     * Returns the chain ID this wallet is connected to.
     *
     * @override
     */
    getChainId() {
        return this.getWallet().then(wallet => wallet.getChainId());
    }
    /**
     * Returns the current gas price.
     *
     * @override
     */
    getGasPrice() {
        return this.getWallet().then(wallet => wallet.getGasPrice());
    }
    /**
     * Returns the current recommended FeeData to use in a transaction.
     *
     * For an EIP-1559 transaction, the maxFeePerGas and maxPriorityFeePerGas
     * should be used.
     *
     * For legacy transactions and networks which do not support EIP-1559, the
     * gasPrice should be used.
     *
     * @override
     */
    getFeeData() {
        return this.getWallet().then(wallet => wallet.getFeeData());
    }
    /**
     * Looks up the address of name. If the name is not owned, or does not have a
     * Resolver configured, or the Resolver does not have an address configured,
     * null is returned.
     *
     * @param name Name of the ENS address
     * @override
     */
    resolveName(name) {
        return this.getWallet().then(wallet => wallet.resolveName(name));
    }
    getWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.alchemyProviderPromise) {
                return this.connect(this.provider);
            }
            return this.connect(yield this.alchemyProviderPromise);
        });
    }
}

/**
 * The Contract class is a wrapper around the Contract class from ethers.js and
 * is exported here for convenience.
 *
 * @public
 */
// TODO: support passing in Alchemy instance into the contract.
class Contract extends contracts.Contract {
}
/**
 * The ContractFactory class is a wrapper around the ContractFactory class from
 * ethers.js and is exported here for convenience.
 *
 * @public
 */
class ContractFactory extends contracts.ContractFactory {
}

exports.Alchemy = Alchemy;
exports.Contract = Contract;
exports.ContractFactory = ContractFactory;
exports.CustomNetworks = CustomNetworks;
exports.DEFAULT_ALCHEMY_API_KEY = DEFAULT_ALCHEMY_API_KEY;
exports.DEFAULT_NETWORK = DEFAULT_NETWORK;
exports.EthersNetwork = EthersNetwork;
exports.IS_BROWSER = IS_BROWSER;
exports.VERSION = VERSION;
exports.Wallet = Wallet;
exports.__awaiter = __awaiter;
exports.fromHex = fromHex;
exports.getAlchemyHttpUrl = getAlchemyHttpUrl;
exports.getAlchemyWsUrl = getAlchemyWsUrl;
exports.isHex = isHex;
exports.logWarn = logWarn;
exports.noop = noop;
exports.setLogLevel = setLogLevel;
exports.toHex = toHex;
//# sourceMappingURL=index-7851be65.js.map
