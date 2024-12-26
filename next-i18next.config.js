const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'hu'],
    defaultLocale: 'en',
    localePath: path.resolve('./public/locales'),
  },
};