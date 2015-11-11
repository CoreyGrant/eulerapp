"use strict";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	isPrime: function isPrime(number, existingPrimes) {
		if (number == 2) {
			return true;
		}
		var possibles = existingPrimes ? _lodash2.default.takeWhile(existingPrimes, function (x) {
			return x <= Math.sqrt(number);
		}) : [2].concat(_lodash2.default.range(3, Math.ceil(Math.sqrt(number)) + 2, 2));
		// if not enough possible primes were supplied, we need to make up
		// the difference
		if (possibles[possibles.length - 1] < Math.sqrt(number)) {
			var next = possibles[possibles.length - 1] + 2;
			possibles = possibles.concat(_lodash2.default.range(next, Math.ceil(Math.sqrt(number)) + 2, 2));
		}
		return !possibles.some(function (x) {
			return !(number % x);
		});
	},
	getPrimes: function getPrimes(upper, existingPrimes) {
		var _this = this;

		var primes = [2, 3];
		var startingNumber = 5;
		if (existingPrimes) {
			primes = existingPrimes;
			startingNumber = primes[primes.length - 1] + 2;
		}
		_lodash2.default.range(startingNumber, upper + 2, 2).forEach(function (x) {
			if (_this.isPrime(x)) {
				primes.push(x);
			}
		});
		return primes;
	},
	getFactors: function getFactors(number, existingPrimes) {
		// Basic factor searching strategy:
		// - Get primes up to 1000
		// - Try to divide by all of them
		// - If any divide, go back to the start of the prime list and continue
		// - If we run out of primes, get more and keep trying
		// - Each time do a prime check to see if we are done
		var factors = [];
		var upperPrime = existingPrimes ? existingPrimes[existingPrimes.length - 1] : 1000;
		var primes = existingPrimes || this.getPrimes(upperPrime);
		while (true) {
			var found = false;
			for (var i = 0; i < primes.length; i++) {
				var prime = primes[i];
				if (!(number % prime)) {
					factors.push(prime);
					number = number / prime;
					found = true;
					break;
				}
			}
			if (this.isPrime(number)) {
				factors.push(number);
				return _lodash2.default.countBy(factors, function (x) {
					return x;
				});
			}
			if (!found) {
				upperPrime = upperPrime += 1000;
				primes = this.getPrimes(upperPrime, primes);
			}
		}
	},
	isPalindrome: function isPalindrome(x) {
		var string = x + "";
		return string == string.split("").reverse().join("");
	},
	getTriangleNumber: function getTriangleNumber(x) {
		return x * (x + 1) / 2;
	},
	getPentagonalNumber: function getPentagonalNumber(x) {
		return x * (3 * x - 1) / 2;
	},
	getHexagonalNumber: function getHexagonalNumber(x) {
		return x * (2 * x - 1);
	},
	getGcd: function getGcd(a, b) {
		var y;
		var x;

		if (a > b) {
			x = a;
			y = b;
		} else {
			x = b;
			y = a;
		}

		while (x % y != 0) {
			var temp = x;
			x = y;
			y = temp % x;
		}
		return y;
	},
	getDivisorCount: function getDivisorCount(x, existingPrimes) {
		var divisors = this.getFactors(x, existingPrimes);
		var total = 1;
		Object.keys(divisors).forEach(function (x) {
			return total = total * (divisors[x] + 1);
		});
		return total;
	}
};
