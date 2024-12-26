const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const connectToDatabase = require('./db');
const Port = require('../models/port');

const watchFolder = path.join(__dirname, '../csv');

const processCsvFile = async (filePath) => {
  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      console.log('CSV data processed:', results);

      try {
        console.log('Mongo URI:', process.env.MONGO_URI);
        await connectToDatabase();

        // Normalize and save to the database
        for (const item of results) {
          const normalizedPort = {
            name: item.original.trim(),
            raw_names: [item.original], // Store original name as raw
          };

          // Upsert the port to avoid duplicates
          await Port.updateOne(
            { name: normalizedPort.name },
            { $set: normalizedPort },
            { upsert: true }
          );
        }

        console.log('Data successfully saved to MongoDB');
        fs.unlinkSync(filePath); // Delete the file after processing
      } catch (err) {
        console.error('Error saving data to MongoDB:', err);
      }
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