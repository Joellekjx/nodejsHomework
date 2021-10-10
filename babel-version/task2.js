import csv from 'csvtojson';
import fs from 'fs';
import { Readable } from 'stream';

class writeLines extends Readable {
	constructor(jsonStr) {
		super({ highWaterMark: 500 });
		this.jsonStr = jsonStr;
		this.currentIterations = 0;
	}

	_read() {
		if (this.currentIterations > 0) {
			this.push(null);
			return;
		}

		this.push(this.jsonStr);

		this.currentIterations++;
	}
}

const csvFilePath = 'csv/nodejs-hw1-ex1.csv';
const writable = fs.createWriteStream('./file.txt', 'utf8');

try {
	csv()
		.fromFile(csvFilePath)
		.on('data', (data) => {
			const jsonStr = data.toString('utf8');
			new writeLines(jsonStr).pipe(writable);
		});
} catch (error) {
	console.log(error);
}
