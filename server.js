const startFileWatcher = require('./services/csvWatcher');

if (process.env.NODE_ENV === 'development') {
  startFileWatcher();
}

module.exports = {};