import { NftSpamClassification } from '../types/types';
export interface RawSpamInfo {
    isSpam: string;
    /** A list of reasons why an NFT contract was marked as spam. */
    classifications: NftSpamClassification[];
}
/**
 * OpenSea's metadata for an NFT collection.
 */
export interface RawOpenSeaCollectionMetadata {
    floorPrice: number;
    collectionName: string;
    safelistRequestStatus?: 'verified';
    imageUrl: string;
    description: string;
    externalUrl: string;
    twitterUsername: string;
    discordUrl: string;
    lastIngestedAt: string;
}
export interface RawGetOwnersForContractWithTokenBalancesResponse {
    ownerAddresses: RawOwnerAddress[];
    pageKey?: string;
}
export interface RawOwnerAddress {
    ownerAddress: string;
    tokenBalances: RawTokenBalances[];
}
export interface RawTokenBalances {
    tokenId: string;
    balance: number;
}
export interface RawReingestContractResponse {
    contractAddress: string;
    reingestionState: string;
    progress: string | null;
}
export interface RawWebhook {
    id: string;
    network: string;
    webhook_type: string;
    webhook_url: string;
    is_active: boolean;
    time_created: number;
    signing_key: string;
    version: string;
    app_id?: string;
}
export interface RawWebhookPagination {
    cursors: {
        after?: string;
    };
    total_count: number;
}
export interface RawGetAllWebhooksResponse {
    data: RawWebhook[];
}
export interface RawAddressActivityResponse {
    data: string[];
    pagination: RawWebhookPagination;
}
export interface RawNftFilter {
    contract_address: string;
    token_id: string;
}
export interface RawNftFiltersResponse {
    data: RawNftFilter[];
    pagination: RawWebhookPagination;
}
export interface RawCreateWebhookResponse {
    data: RawWebhook;
}
export interface RawNftFilterParam {
    contract_address: string;
    token_id: string;
}
export interface RawNftAttributeRarity {
    value: string;
    trait_type: string;
    prevalence: number;
}
