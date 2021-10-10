"use strict";

var _readline = _interopRequireDefault(require("readline"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rl = _readline["default"].createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (input) {
  console.log("Reversed: ".concat(reverse(input)));
});

function reverse(str) {
  var reversedStr = str.split('').reverse();
  return reversedStr.join('');
}