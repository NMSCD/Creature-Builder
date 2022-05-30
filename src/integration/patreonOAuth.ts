import { apiPatronOAuthClientId, apiPatronOAuthResponseUrl } from "../constants/assistantApps";
import { patreonApiOAuthUrl } from "../constants/externalUrl";


export const patronOAuthUrl = (uniqueIdentifier: string) => `${patreonApiOAuthUrl}?response_type=code` +
    `&client_id=${apiPatronOAuthClientId}` +
    `&redirect_uri=${apiPatronOAuthResponseUrl}` +
    `&scope=identity%20identity%5Bemail%5D` +
    `&state=${encodeURIComponent(JSON.stringify({ uniqueIdentifier: uniqueIdentifier }))}`;