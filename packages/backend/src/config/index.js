// Load in environment variables from .env file
require('dotenv').config();

const config = module.exports = {};

// Global configurations
config.env = process.env.NODE_ENV || 'development';
/**
 * @returns `true` if the application is running in production mode, `false` otherwise.
 */
config.isProd = () => this.env === 'production';


// Server configurations
config.server = {
    port: process.env.SERVER_PORT
}


// Database configurations
config.db = {
    uri: process.env.DB_URI
}
