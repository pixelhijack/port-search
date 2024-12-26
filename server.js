const startFileWatcher = require('./utils/csvWatcher');

if (process.env.NODE_ENV === 'development') {
  startFileWatcher();
}

module.exports = {};