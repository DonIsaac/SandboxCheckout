const app = require('./app');
const Logger = require('./util/logger');

const logger = new Logger('app:server');

let port = app.get('port');

/*
 * If the process is being run in production mode, abort the process. Otherwise,
 * set the port to the default value of 3000.
 */
if (!port) {
    if (config.isProd()) {
       logger.abort('No port provided, aborting.')
    } else {
        port = 3000;
    }
}

app.listen(port, () => logger.log('Server started at port %d', port));
