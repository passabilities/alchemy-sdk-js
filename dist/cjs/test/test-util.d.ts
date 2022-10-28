/// <reference types="jest" />
import { BaseNft, BaseNftContract, Nft, NftTokenType, OwnedBaseNft, OwnedNft, TokenUri } from '../src';
import { RawBaseNft, RawBaseNftContract, RawContractBaseNft, RawNft, RawNftContract, RawNftContractMetadata, RawOpenSeaCollectionMetadata, RawOwnedBaseNft, RawOwnedNft } from '../src/internal/raw-interfaces';
import { BlockHead, LogsEvent } from '../src/internal/websocket-backfiller';
export declare const TEST_WALLET_PRIVATE_KEY = "dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9";
export declare const TEST_WALLET_PUBLIC_ADDRESS = "0x4b9007B0BcE78cfB634032ec31Ed56adB464287b";
/** Creates a dummy response for the `getContractMetadata` endpoint. */
export declare function createRawNftContract(address: string, tokenType: NftTokenType, name?: string, symbol?: string, totalSupply?: string, openSea?: RawOpenSeaCollectionMetadata): RawNftContract;
export declare function createRawBaseNftContract(address: string): RawBaseNftContract;
export declare function createBaseNftContract(address: string): BaseNftContract;
export declare function createRawOwnedBaseNft(address: string, tokenId: string, balance: string, tokenType?: NftTokenType): RawOwnedBaseNft;
export declare function createOwnedBaseNft(address: string, tokenId: string, balance: number, tokenType?: NftTokenType): OwnedBaseNft;
export declare function createRawBaseNft(tokenId: string | number, tokenType?: NftTokenType): RawBaseNft;
export declare function createBaseNft(address: string, tokenId: string | number, tokenType?: NftTokenType): BaseNft;
export declare function createNft(title: string, address: string, tokenId: string, tokenType?: NftTokenType, tokenUri?: TokenUri, media?: TokenUri[] | undefined): Nft;
interface RawNftOptions {
    tokenUri?: TokenUri;
    media?: TokenUri[] | undefined;
    timeLastUpdated?: string;
    description?: string | Array<string>;
    contractMetadata?: RawNftContractMetadata;
}
export declare function createRawNft(title: string, tokenId: string, tokenType?: NftTokenType, options?: RawNftOptions): RawNft;
export declare function createRawOwnedNft(title: string, address: string, tokenId: string, balance: string, tokenType?: NftTokenType, contractMetadata?: RawNftContractMetadata): RawOwnedNft;
export declare function createOwnedNft(title: string, address: string, tokenId: string, balance: number, tokenType?: NftTokenType): OwnedNft;
export declare function createRawNftContractBaseNft(tokenId: string): RawContractBaseNft;
export declare type Mocked<T> = T & {
    [K in keyof T]: T[K] extends Function ? T[K] & jest.Mock : T[K];
};
/** A Promise implementation for deferred resolution. */
export declare class Deferred<R> {
    promise: Promise<R>;
    constructor();
    resolve: (value: R | Promise<R>) => void;
    reject: (reason: Error) => void;
}
export declare function makeNewHeadsEvent(blockNumber: number, hash: string): BlockHead;
export declare function makeLogsEvent(blockNumber: number, blockHash: string, isRemoved?: boolean, logIndex?: number): LogsEvent;
export declare const TESTING_PRIVATE_KEY = "dd5bdf09397b1fdf98e4f72c66047d5104b1511fa7dc1b8fdddd61a150f732c9";
export declare const TESTING_PUBLIC_ADDRESS = "0x4b9007B0BcE78cfB634032ec31Ed56adB464287b";
export declare function loadAlchemyEnv(): Promise<void>;
export {};
