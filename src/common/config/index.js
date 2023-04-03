// eslint-disable-next-line import/no-anonymous-default-export
export default {
    appUrl: process.env.APP_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:3500',
    tinyMceKey: process.env.TINY_MCE_KEY || 't8bzg0s7rwpxzp91ytu54b9rrhpy1uvs5a1dkd4npls3uxxa',
    environment: process.env.NODE_ENV || "development"
}