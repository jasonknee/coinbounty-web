import { environment } from '../../environments/environment';
export const config = {
    REDIRECT_URI: environment.coinbase.REDIRECT_URI,
    COINBASE_CLIENT_ID: environment.coinbase.COINBASE_CLIENT_ID,
    COINBASE_TOKEN_URL: environment.coinbase.COINBASE_TOKEN_URL,
    COINBASE_SECRET: environment.coinbase.COINBASE_SECRET
}