import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

function parseCSV(filePath) {
  const csvString = fs.readFileSync(filePath, 'utf-8');
  return Papa.parse(csvString, {
    header: true,
    skipEmptyLines: true
  }).data;
}

function fetchCSVData(filePaths) {
  return filePaths.map(filePath => parseCSV(filePath));
}

export default fetchCSVData;
