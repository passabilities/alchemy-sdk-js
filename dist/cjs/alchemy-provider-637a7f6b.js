'use strict';

var index = require('./index-7851be65.js');
var networks = require('@ethersproject/networks');
var providers = require('@ethersproject/providers');
var web = require('@ethersproject/web');
require('./api/utils');
require('@ethersproject/bignumber');
require('axios');
require('@ethersproject/abstract-provider');
require('@ethersproject/wallet');
require('@ethersproject/contracts');

const version$1 = "logger/5.7.0";

let _permanentCensorErrors = false;
let _censorErrors = false;
const LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
let _logLevel = LogLevels["default"];
let _globalLogger = null;
function _checkNormalize() {
    try {
        const missing = [];
        // Make sure all forms of normalization are supported
        ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
            try {
                if ("test".normalize(form) !== "test") {
                    throw new Error("bad normalize");
                }
                ;
            }
            catch (error) {
                missing.push(form);
            }
        });
        if (missing.length) {
            throw new Error("missing " + missing.join(", "));
        }
        if (String.fromCharCode(0xe9).normalize("NFD") !== String.fromCharCode(0x65, 0x0301)) {
            throw new Error("broken implementation");
        }
    }
    catch (error) {
        return error.message;
    }
    return null;
}
const _normalizeError = _checkNormalize();
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["OFF"] = "OFF";
})(LogLevel || (LogLevel = {}));
var ErrorCode;
(function (ErrorCode) {
    ///////////////////
    // Generic Errors
    // Unknown Error
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    // Not Implemented
    ErrorCode["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    // Unsupported Operation
    //   - operation
    ErrorCode["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
    // Network Error (i.e. Ethereum Network, such as an invalid chain ID)
    //   - event ("noNetwork" is not re-thrown in provider.ready; otherwise thrown)
    ErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
    // Some sort of bad response from the server
    ErrorCode["SERVER_ERROR"] = "SERVER_ERROR";
    // Timeout
    ErrorCode["TIMEOUT"] = "TIMEOUT";
    ///////////////////
    // Operational  Errors
    // Buffer Overrun
    ErrorCode["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
    // Numeric Fault
    //   - operation: the operation being executed
    //   - fault: the reason this faulted
    ErrorCode["NUMERIC_FAULT"] = "NUMERIC_FAULT";
    ///////////////////
    // Argument Errors
    // Missing new operator to an object
    //  - name: The name of the class
    ErrorCode["MISSING_NEW"] = "MISSING_NEW";
    // Invalid argument (e.g. value is incompatible with type) to a function:
    //   - argument: The argument name that was invalid
    //   - value: The value of the argument
    ErrorCode["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
    // Missing argument to a function:
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
    // Too many arguments
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
    ///////////////////
    // Blockchain Errors
    // Call exception
    //  - transaction: the transaction
    //  - address?: the contract address
    //  - args?: The arguments passed into the function
    //  - method?: The Solidity method signature
    //  - errorSignature?: The EIP848 error signature
    //  - errorArgs?: The EIP848 error parameters
    //  - reason: The reason (only for EIP848 "Error(string)")
    ErrorCode["CALL_EXCEPTION"] = "CALL_EXCEPTION";
    // Insufficient funds (< value + gasLimit * gasPrice)
    //   - transaction: the transaction attempted
    ErrorCode["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
    // Nonce has already been used
    //   - transaction: the transaction attempted
    ErrorCode["NONCE_EXPIRED"] = "NONCE_EXPIRED";
    // The replacement fee for the transaction is too low
    //   - transaction: the transaction attempted
    ErrorCode["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
    // The gas limit could not be estimated
    //   - transaction: the transaction passed to estimateGas
    ErrorCode["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
    // The transaction was replaced by one with a higher gas price
    //   - reason: "cancelled", "replaced" or "repriced"
    //   - cancelled: true if reason == "cancelled" or reason == "replaced")
    //   - hash: original transaction hash
    //   - replacement: the full TransactionsResponse for the replacement
    //   - receipt: the receipt of the replacement
    ErrorCode["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
    ///////////////////
    // Interaction Errors
    // The user rejected the action, such as signing a message or sending
    // a transaction
    ErrorCode["ACTION_REJECTED"] = "ACTION_REJECTED";
})(ErrorCode || (ErrorCode = {}));
const HEX = "0123456789abcdef";
class Logger {
    constructor(version) {
        Object.defineProperty(this, "version", {
            enumerable: true,
            value: version,
            writable: false
        });
    }
    _log(logLevel, args) {
        const level = logLevel.toLowerCase();
        if (LogLevels[level] == null) {
            this.throwArgumentError("invalid log level name", "logLevel", logLevel);
        }
        if (_logLevel > LogLevels[level]) {
            return;
        }
        console.log.apply(console, args);
    }
    debug(...args) {
        this._log(Logger.levels.DEBUG, args);
    }
    info(...args) {
        this._log(Logger.levels.INFO, args);
    }
    warn(...args) {
        this._log(Logger.levels.WARNING, args);
    }
    makeError(message, code, params) {
        // Errors are being censored
        if (_censorErrors) {
            return this.makeError("censored error", code, {});
        }
        if (!code) {
            code = Logger.errors.UNKNOWN_ERROR;
        }
        if (!params) {
            params = {};
        }
        const messageDetails = [];
        Object.keys(params).forEach((key) => {
            const value = params[key];
            try {
                if (value instanceof Uint8Array) {
                    let hex = "";
                    for (let i = 0; i < value.length; i++) {
                        hex += HEX[value[i] >> 4];
                        hex += HEX[value[i] & 0x0f];
                    }
                    messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
                }
                else {
                    messageDetails.push(key + "=" + JSON.stringify(value));
                }
            }
            catch (error) {
                messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
            }
        });
        messageDetails.push(`code=${code}`);
        messageDetails.push(`version=${this.version}`);
        const reason = message;
        let url = "";
        switch (code) {
            case ErrorCode.NUMERIC_FAULT: {
                url = "NUMERIC_FAULT";
                const fault = message;
                switch (fault) {
                    case "overflow":
                    case "underflow":
                    case "division-by-zero":
                        url += "-" + fault;
                        break;
                    case "negative-power":
                    case "negative-width":
                        url += "-unsupported";
                        break;
                    case "unbound-bitwise-result":
                        url += "-unbound-result";
                        break;
                }
                break;
            }
            case ErrorCode.CALL_EXCEPTION:
            case ErrorCode.INSUFFICIENT_FUNDS:
            case ErrorCode.MISSING_NEW:
            case ErrorCode.NONCE_EXPIRED:
            case ErrorCode.REPLACEMENT_UNDERPRICED:
            case ErrorCode.TRANSACTION_REPLACED:
            case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
                url = code;
                break;
        }
        if (url) {
            message += " [ See: https:/\/links.ethers.org/v5-errors-" + url + " ]";
        }
        if (messageDetails.length) {
            message += " (" + messageDetails.join(", ") + ")";
        }
        // @TODO: Any??
        const error = new Error(message);
        error.reason = reason;
        error.code = code;
        Object.keys(params).forEach(function (key) {
            error[key] = params[key];
        });
        return error;
    }
    throwError(message, code, params) {
        throw this.makeError(message, code, params);
    }
    throwArgumentError(message, name, value) {
        return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
            argument: name,
            value: value
        });
    }
    assert(condition, message, code, params) {
        if (!!condition) {
            return;
        }
        this.throwError(message, code, params);
    }
    assertArgument(condition, message, name, value) {
        if (!!condition) {
            return;
        }
        this.throwArgumentError(message, name, value);
    }
    checkNormalize(message) {
        if (_normalizeError) {
            this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "String.prototype.normalize", form: _normalizeError
            });
        }
    }
    checkSafeUint53(value, message) {
        if (typeof (value) !== "number") {
            return;
        }
        if (message == null) {
            message = "value not safe";
        }
        if (value < 0 || value >= 0x1fffffffffffff) {
            this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "out-of-safe-range",
                value: value
            });
        }
        if (value % 1) {
            this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "non-integer",
                value: value
            });
        }
    }
    checkArgumentCount(count, expectedCount, message) {
        if (message) {
            message = ": " + message;
        }
        else {
            message = "";
        }
        if (count < expectedCount) {
            this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
        if (count > expectedCount) {
            this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
    }
    checkNew(target, kind) {
        if (target === Object || target == null) {
            this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
        }
    }
    checkAbstract(target, kind) {
        if (target === kind) {
            this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
        }
        else if (target === Object || target == null) {
            this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
        }
    }
    static globalLogger() {
        if (!_globalLogger) {
            _globalLogger = new Logger(version$1);
        }
        return _globalLogger;
    }
    static setCensorship(censorship, permanent) {
        if (!censorship && permanent) {
            this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        if (_permanentCensorErrors) {
            if (!censorship) {
                return;
            }
            this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        _censorErrors = !!censorship;
        _permanentCensorErrors = !!permanent;
    }
    static setLogLevel(logLevel) {
        const level = LogLevels[logLevel.toLowerCase()];
        if (level == null) {
            Logger.globalLogger().warn("invalid log level - " + logLevel);
            return;
        }
        _logLevel = level;
    }
    static from(version) {
        return new Logger(version);
    }
}
Logger.errors = ErrorCode;
Logger.levels = LogLevel;

const version = "properties/5.7.0";

(undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger = new Logger(version);
function defineReadOnly(object, name, value) {
    Object.defineProperty(object, name, {
        enumerable: true,
        value: value,
        writable: false,
    });
}
const opaque = { bigint: true, boolean: true, "function": true, number: true, string: true };
function _isFrozen(object) {
    // Opaque objects are not mutable, so safe to copy by assignment
    if (object === undefined || object === null || opaque[typeof (object)]) {
        return true;
    }
    if (Array.isArray(object) || typeof (object) === "object") {
        if (!Object.isFrozen(object)) {
            return false;
        }
        const keys = Object.keys(object);
        for (let i = 0; i < keys.length; i++) {
            let value = null;
            try {
                value = object[keys[i]];
            }
            catch (error) {
                // If accessing a value triggers an error, it is a getter
                // designed to do so (e.g. Result) and is therefore "frozen"
                continue;
            }
            if (!_isFrozen(value)) {
                return false;
            }
        }
        return true;
    }
    return logger.throwArgumentError(`Cannot deepCopy ${typeof (object)}`, "object", object);
}
// Returns a new copy of object, such that no properties may be replaced.
// New properties may be added only to objects.
function _deepCopy(object) {
    if (_isFrozen(object)) {
        return object;
    }
    // Arrays are mutable, so we need to create a copy
    if (Array.isArray(object)) {
        return Object.freeze(object.map((item) => deepCopy(item)));
    }
    if (typeof (object) === "object") {
        const result = {};
        for (const key in object) {
            const value = object[key];
            if (value === undefined) {
                continue;
            }
            defineReadOnly(result, key, deepCopy(value));
        }
        return result;
    }
    return logger.throwArgumentError(`Cannot deepCopy ${typeof (object)}`, "object", object);
}
function deepCopy(object) {
    return _deepCopy(object);
}

/**
 * SDK's custom implementation of ethers.js's 'AlchemyProvider'.
 *
 * Do not call this constructor directly. Instead, instantiate an instance of
 * {@link Alchemy} and call {@link Alchemy.config.getProvider()}.
 *
 * @public
 */
class AlchemyProvider extends providers.JsonRpcProvider {
    /** @internal */
    constructor(config) {
        // Normalize the API Key to a string.
        const apiKey = AlchemyProvider.getApiKey(config.apiKey);
        // Generate our own connection info with the correct endpoint URLs.
        const alchemyNetwork = AlchemyProvider.getAlchemyNetwork(config.network);
        const connection = AlchemyProvider.getAlchemyConnectionInfo(alchemyNetwork, apiKey, 'http');
        // If a hardcoded url was specified in the config, use that instead of the
        // provided apiKey or network.
        if (config.url !== undefined) {
            connection.url = config.url;
        }
        connection.throttleLimit = config.maxRetries;
        // Normalize the Alchemy named network input to the network names used by
        // ethers. This allows the parent super constructor in JsonRpcProvider to
        // correctly set the network.
        const ethersNetwork = index.EthersNetwork[alchemyNetwork];
        super(connection, ethersNetwork);
        this.apiKey = config.apiKey;
        this.maxRetries = config.maxRetries;
    }
    /**
     * Overrides the `UrlJsonRpcProvider.getApiKey` method as implemented by
     * ethers.js. Returns the API key for an Alchemy provider.
     *
     * @internal
     * @override
     */
    static getApiKey(apiKey) {
        if (apiKey == null) {
            return index.DEFAULT_ALCHEMY_API_KEY;
        }
        if (apiKey && typeof apiKey !== 'string') {
            throw new Error(`Invalid apiKey '${apiKey}' provided. apiKey must be a string.`);
        }
        return apiKey;
    }
    /**
     * Overrides the `BaseProvider.getNetwork` method as implemented by ethers.js.
     *
     * This override allows the SDK to set the provider's network to values not
     * yet supported by ethers.js.
     *
     * @internal
     * @override
     */
    static getNetwork(network) {
        if (typeof network === 'string' && network in index.CustomNetworks) {
            return index.CustomNetworks[network];
        }
        // Call the standard ethers.js getNetwork method for other networks.
        return networks.getNetwork(network);
    }
    /**
     * Converts the `Networkish` input to the network enum used by Alchemy.
     *
     * @internal
     */
    static getAlchemyNetwork(network) {
        if (network === undefined) {
            return index.DEFAULT_NETWORK;
        }
        if (typeof network === 'number') {
            throw new Error(`Invalid network '${network}' provided. Network must be a string.`);
        }
        // Guaranteed that `typeof network === 'string`.
        const isValidNetwork = Object.values(index.Network).includes(network);
        if (!isValidNetwork) {
            throw new Error(`Invalid network '${network}' provided. Network must be one of: ` +
                `${Object.values(index.Network).join(', ')}.`);
        }
        return network;
    }
    /**
     * Returns a {@link ConnectionInfo} object compatible with ethers that contains
     * the correct URLs for Alchemy.
     *
     * @internal
     */
    static getAlchemyConnectionInfo(network, apiKey, type) {
        const url = type === 'http'
            ? index.getAlchemyHttpUrl(network, apiKey)
            : index.getAlchemyWsUrl(network, apiKey);
        return {
            headers: index.IS_BROWSER
                ? {
                    'Alchemy-Ethers-Sdk-Version': index.VERSION
                }
                : {
                    'Alchemy-Ethers-Sdk-Version': index.VERSION,
                    'Accept-Encoding': 'gzip'
                },
            allowGzip: true,
            url
        };
    }
    /**
     * Overrides the method in ethers.js's `StaticJsonRpcProvider` class. This
     * method is called when calling methods on the parent class `BaseProvider`.
     *
     * @override
     */
    detectNetwork() {
        const _super = Object.create(null, {
            detectNetwork: { get: () => super.detectNetwork }
        });
        return index.__awaiter(this, void 0, void 0, function* () {
            let network = this.network;
            if (network == null) {
                network = yield _super.detectNetwork.call(this);
                if (!network) {
                    throw new Error('No network detected');
                }
            }
            return network;
        });
    }
    _startPending() {
        index.logWarn('WARNING: Alchemy Provider does not support pending filters');
    }
    /**
     * Overrides the ether's `isCommunityResource()` method. Returns true if the
     * current api key is the default key.
     *
     * @override
     */
    isCommunityResource() {
        return this.apiKey === index.DEFAULT_ALCHEMY_API_KEY;
    }
    /**
     * Overrides the base {@link JsonRpcProvider.send} method to implement custom
     * logic for sending requests to Alchemy.
     *
     * @param method The method name to use for the request.
     * @param params The parameters to use for the request.
     * @override
     * @public
     */
    // TODO: Add headers for `perform()` override.
    send(method, params) {
        return this._send(method, params, 'send');
    }
    /**
     * DO NOT MODIFY.
     *
     * Original code copied over from ether.js's `JsonRpcProvider.send()`.
     *
     * This method is copied over directly in order to implement custom headers
     *
     * @internal
     */
    _send(method, params, methodName) {
        const request = {
            method,
            params,
            id: this._nextId++,
            jsonrpc: '2.0'
        };
        this.emit('debug', {
            action: 'request',
            request: deepCopy(request),
            provider: this
        });
        // We can expand this in the future to any call, but for now these
        // are the biggest wins and do not require any serializing parameters.
        const cache = ['eth_chainId', 'eth_blockNumber'].indexOf(method) >= 0;
        if (cache && this._cache[method]) {
            return this._cache[method];
        }
        // START MODIFIED CODE
        const connection = Object.assign({}, this.connection);
        connection.headers['Alchemy-Ethers-Sdk-Method'] = methodName;
        // END MODIFIED CODE
        const result = web.fetchJson(this.connection, JSON.stringify(request), getResult).then(result => {
            this.emit('debug', {
                action: 'response',
                request,
                response: result,
                provider: this
            });
            return result;
        }, error => {
            this.emit('debug', {
                action: 'response',
                error,
                request,
                provider: this
            });
            throw error;
        });
        // Cache the fetch, but clear it on the next event loop
        if (cache) {
            this._cache[method] = result;
            setTimeout(() => {
                // @ts-ignore - This is done by ethers.
                this._cache[method] = null;
            }, 0);
        }
        return result;
    }
}
/**
 * DO NOT MODIFY.
 *
 * Original code copied over from ether.js's
 * `@ethersproject/web/src.ts/index.ts`. Used to support
 * {@link AlchemyProvider._send}, which is also copied over.
 */
function getResult(payload) {
    if (payload.error) {
        const error = new Error(payload.error.message);
        error.code = payload.error.code;
        error.data = payload.error.data;
        throw error;
    }
    return payload.result;
}

exports.AlchemyProvider = AlchemyProvider;
//# sourceMappingURL=alchemy-provider-637a7f6b.js.map
