// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  coinbase: {
    REDIRECT_URI: 'http://localhost:4200/callback',
    COINBASE_CLIENT_ID: '4882df2a4555003756280af28b1a6a2ae51c10f08329a9c5325cf83b63ecc94f',
    COINBASE_OAUTH_URL: 'https://api.coinbase.com/oauth',
    COINBASE_SECRET: 'cd65c3197d4e112881b56a058180eeb40b93326280ced3736fb8c43f1f2116ea'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
