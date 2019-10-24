const createDebugger = require('debug');
const config = require('../config');

class Logger {
    /**
     * Creates a new logger instance.
     *
     * @param {string} namespace The namespace to use. See `debug` docs for more
     *
     * @see https://npmjs.com/package/debug
     */
    constructor(namespace) {
        this._log = debug(namespace);
        this._err = debug(namespace);

        this._log.log = console.log.bind(console);
    }

    /**
     * Prints a log message to `stdout`.
     * @param  {...any} params printf-style parameters
     */
    log (...params) {
        if (!config.isProd());
            this._log(...params);
    }

    /**
     * Prints a warning message to `stderr`.
     *
     * @param  {...any} params printf-style parameters
     */
    warn (...params) {
        this._err(...params);
    }

    /**
     * Prints a message to `stderr`. If the application is not in production
     * mode, an error is thrown.
     *
     * @param  {...any} params printf-style parameters.
     *
     * @throws if the application is not in production mode.
     */
    err (...params) {
        this._err(...params);

        if (!config.isProd())
            throw new Error("Error thrown, check stderr for information.")
    }

    /**
     * Prints an error message to `stderr` and exits the process.
     *
     * @param {number} exitCode The exit code. Defaults to 1.
     * @param {...any} params printf-style parameters
     */
    abort (exitCode = 1, ...params) {
        this._err(params);
        process.exit(exitCode);
    }
}

module.exports = Logger;
