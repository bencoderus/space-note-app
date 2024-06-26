// eslint-disable-next-line import/no-anonymous-default-export
export default {
    appUrl: process.env.REACT_APP_URL || 'http://localhost:3000',
    apiUrl: process.env.REACT_APP_API_URL || 'https://localhost:3500',
    tinyMceKey: process.env.REACT_APP_TINY_MCE_KEY || 't8bzg0s7rwpxzp91ytu54b9rrhpy1uvs5a1dkd4npls3uxxa',
    environment: process.env.NODE_ENV || "local",
    maintenanceActivated: process.env.REACT_APP_MAINTENANCE_ACTIVATED === "true" || false
}