var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on('line', (input) => {
	console.log(`Reversed: ${reverse(input)}`);
});

function reverse(str) {
	let reversedStr = str.split('').reverse();
	return reversedStr.join('');
}
