const fs = require('fs');
const generate = require('./generateCSV.js').generateDescriptionCSV;

generate(10000000, fs.createWriteStream(path.join(__dirname, './generateTest.csv')), 'utf8', () => {
    console.log('CSV File Generated');
});