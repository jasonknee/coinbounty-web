import { environment } from '../../environments/environment';
export const config = {
    REDIRECT_URI: environment.coinbase.REDIRECT_URI,
    COINBASE_CLIENT_ID: environment.coinbase.COINBASE_CLIENT_ID,
    COINBASE_OAUTH_URL: environment.coinbase.COINBASE_OAUTH_URL,
    COINBASE_SECRET: environment.coinbase.COINBASE_SECRET,
    COINBASE_BASE_URL: 'https://api.coinbase.com/v2'
}