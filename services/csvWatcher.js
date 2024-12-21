const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const watchFolder = path.join(__dirname, '../csv');

const processCsvFile = (filePath) => {
  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log('CSV data processed: ', results);
      // Add logic to save results to the database
      fs.unlinkSync(filePath); // Delete the file after processing
    })
    .on('error', (err) => {
      console.error('Error reading CSV:', err);
    });
};

const startFileWatcher = () => {
  console.log(`Watching folder: ${watchFolder}`);
  if (!fs.existsSync(watchFolder)) {
    fs.mkdirSync(watchFolder);
  }

  fs.watch(watchFolder, (eventType, filename) => {
    if (eventType === 'rename' && filename.endsWith('.csv')) {
      const filePath = path.join(watchFolder, filename);
      if (fs.existsSync(filePath)) {
        console.log(`Processing file: ${filename}`);
        processCsvFile(filePath);
      }
    }
  });
};

module.exports = startFileWatcher;