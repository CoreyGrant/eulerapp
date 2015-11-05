import _ from 'lodash';
import helpers from './helpers.js';
import classes from './classes.js';
var Fraction = classes.Fraction;
module.exports = [
	{
		key: 1,
		answer: () => _.range(1, 1000)
			.filter(x => !(x%3) || !(x%5))
			.reduce((prev, cur) => prev + cur)
	},
	{
		key: 2,
		answer: () => {
			var first = 1;
			var second = 2;
			var sum = 2;
			while(true){
				var newSecond = first + second;
				var first = second;
				var second = newSecond;
				if(newSecond > 4000000){
					return sum;
				}
				if(!(newSecond % 2)){
					sum += newSecond;
				}
			}
		}
	},
	{
		key: 3,
		answer: () => {
			var number = 600851475143;
			var factors = helpers.getFactors(number);
			return _.max(Object.keys(factors));
		}
	},
	{
		key: 4,
		answer: () => {
			var palindromes = [];
			for(var i = 999; i>0; i--){
				for(var j = 999; j>=i; j--){
					if(helpers.isPalindrome(i*j)){
						palindromes.push(i*j);
					}
				}
			}
			return _.max(palindromes);
		}
	},
	{
		key: 5,
		answer: () => {
			var uniqueFactors = {};
			_.range(2, 21).forEach(x => {
				var factors = helpers.getFactors(x);
				Object.keys(factors).forEach(x => {
					if(!uniqueFactors[x] || (uniqueFactors[x] && uniqueFactors[x] < factors[x])){
						uniqueFactors[x] = factors[x];
					}
				})
			})
			return Object.keys(uniqueFactors).reduce((prev, cur)=>
				prev 
					? prev *= Math.pow((cur), uniqueFactors[cur])
					: Math.pow((cur), uniqueFactors[cur])
			);
		}
	},
	{
		key: 6,
		answer: () => {
			var tNumber = helpers.getTriangleNumber(100);
			return Math.abs(
				_.range(1, 101)
					.map(x => x*x)
					.reduce((prev, cur) => prev ? prev + cur : cur) 
				- tNumber * tNumber)
		}
	},
	{
		key: 7,
		answer: () => {
			var primes = [];
			var upper = 0;
			while(primes.length < 10001){
				upper += 10000;
				primes = primes.length
					? helpers.getPrimes(upper)
					: helpers.getPrimes(upper, primes);
			}
			return primes[10000];
		}
	},
	{
		key: 8,
		answer: (data) => {
			var totals = [];
			for(var i = 0; i < 987; i++){
				totals.push(
					data.substring(i, i+13).split("")
						.reduce((prev, cur)=> prev ? prev *= cur : cur));
			}
			return _.max(totals);
		}
	},
	{
		key: 9,
		answer: () => {
			var a, b, c;
			var s = 1000;
			var m = 0, k = 0, n = 0, d = 0;
			var found = false;

			var mlimit =  Math.sqrt(s / 2);
			for (m = 2; m <= mlimit; m++) {
				if ((s / 2) % m == 0) {
					if (m % 2 == 0) {
						k = m + 1;
					} else {
						k = m + 2;
					}
					while (k < 2 * m && k <= s / (2 * m)) {
						if (s / (2 * m) % k == 0 && helpers.getGcd(k, m) == 1) {
							d = s / 2 / (k * m);
							n = k - m;
							a = d*(m * m - n * n);
							b = 2 * d * n * m;
							c = d * (m * m + n * n);
							found = true;
							break;
						}
						k += 2;
					}
				}
				if (found) {
					break;
				}
			}
			return a * b * c
		}
	}, 
	{
		key: 10,
		answer: () => helpers.getPrimes(2000000).reduce((prev, cur) => prev ? prev += cur : cur)
	},
	{
		key: 11,
		answer: (data) => {
			var stringBits = data.split(" ").map(x => +x);
			var products = [];
			// Left-right
			for(var i = 0; i < 17; i++){
				for(var j = 0; j < 20; j++){
					var product = 1;
					for(var k = 0; k < 4; k++){
						product *= stringBits[i + 20 * j + k]
					}
					products.push(product);
				}
			}

			// Top-bottom
			for(var i = 0; i < 20; i++){
				for(var j = 0; j < 17; j++){
					var product = 1;
					for(var k = 0; k < 4; k++){
						product *= stringBits[i + 20 * j + 20*k]
					}
					products.push(product);
				}
			}

			// TopLeft-BottomRight
			for(var i = 0; i < 17; i++){
				for(var j = 0; j < 17; j++){
					var product = 1;
					for(var k = 0; k < 4; k++){
						product *= stringBits[i + 20 * j + 21*k]
					}
					products.push(product);
				}
			}

			// BottomLeft-TopRight
			for(var i = 0; i < 17; i++){
				for(var j = 19; j > 3; j--){
					var product = 1;
					for(var k = 0; k < 4; k++){
						product *= stringBits[i + 20 * j - 19*k]
					}
					products.push(product);
				}
			}

			return _.max(products);
		}
	},
	{
		key: 12,
		answer: () => {
			// Pre-calculate some primes to help speed things up
			var primes = helpers.getPrimes(75000);
			for(var i = 50;;i++){
				var tNumber = helpers.getTriangleNumber(i);
				var divisorCount = helpers.getDivisorCount(tNumber, primes);
				if(divisorCount > 500){
					return tNumber;
				}
			}
		}
	},
	{
		key: 13,
		answer: (data) => {
			var sum = "";
			var addDigit = (num, oldRemainder) => {
				var total = oldRemainder;
				data.forEach(x => total += +x[49-num])
				var digitToKeep = total % 10;
				var remainder = (total - digitToKeep)/10;
				sum = digitToKeep.toString() + sum;
				return remainder;
			}
			var lastRemainder = 0;
			for(var i = 0; i < 50; i++){
				lastRemainder = addDigit(i, lastRemainder);
				if(i == 49){
					sum = lastRemainder.toString() + sum;
				}
			}
			return sum.substring(0, 10);
		}
	},
	{
		key: 14,
		answer: () => {
			var previousAnswers = {};
			for(var i = 1; i<1000000; i++){
				var j = i;
				var count = 0;
				while(j > 1){
					if(previousAnswers[j]){
						previousAnswers[i] = previousAnswers[j] + count;
					}
					j = j % 2
						? 3*j + 1
						: j/2;
					count++;
				}
				previousAnswers[i] = count;
			}
			var max = {
				value: 0,
				number: 0
			};
			for(var k in previousAnswers){
				if(previousAnswers[k] > max.value){
					max.number = k;
					max.value = previousAnswers[k];
				}
			}
			return max.number;
		}
	},
	{
		key: 33,
		answer: () => {
			var possibleFractions = [];
			for(var i=10; i< 100; i++){
				if(!(i%10)){
					continue;
				}
				for(var j=10; j< 100 && j<i; j++){
					if(!(j%10)){
						continue;
					}
					possibleFractions.push(new Fraction(j, i));
				}
			}
			// A fraction "cancels" if the denom and numer share a digit, unless both are divisible by 10.
			// There should be 4 of these which equal their actually reduced state.
			var matchingFractions = possibleFractions
				.filter(x => {
					var topDigits = (x.numerator + "").split("");
					var bottomDigits = (x.denominator + "").split("");
					if(topDigits[0] === bottomDigits[1]){
						if(x.equals(new Fraction(+topDigits[1], +bottomDigits[0]))){
							return true;
						}
					}
					if(topDigits[1] === bottomDigits[0]){
						if(x.equals(new Fraction(+topDigits[0], +bottomDigits[1]))){
							returnrue;
						}
					}
					return false;
				}
			)
			var endFraction;
			matchingFractions.forEach(x => endFraction = endFraction 
				? endFraction.multiply(x)
				: x);
			return endFraction.denominator;
		}
	},
	{
		key: 40,
		answer: () => {
			var bigString = "0";
			var i = 1;
			while(bigString.length <= 1000001){
				bigString += i.toString();
				i++;
			}
			return +bigString[1] 
				* +bigString[10] 
				* +bigString[100] 
				* +bigString[1000] 
				* +bigString[10000] 
				* +bigString[100000] 
				* +bigString[1000000];
		}
	},
	{
		key: 45,
		answer: () => {
			// Triangle = pentagon = hexagon
			// Searching strategy:
			// - get chunk of triangles
			// - get all matching pentagons
			// - try to match to hexagons
			// - haven't found the second, get more triangles and redo
			var matching = [];
			var minTriangleIndex = 5;
			var maxTriangleIndex = 0;
			var minPentagonIndex = 5;
			var maxPentagonIndex;
			var minHexagonIndex = 5;
			var maxHexagonIndex;
			while(matching.length < 2){
				maxTriangleIndex += 1000;
				// get set of triangle numbers
				var triangleNumbers = _
					.range(minTriangleIndex, maxTriangleIndex)
					.map(x => helpers.getTriangleNumber(x));
				// get matching pentagonal numbers
				var matchingPentagonals = [];
				var currentPentagonal = 0;
				while(currentPentagonal < _.last(triangleNumbers)){
					currentPentagonal = helpers.getPentagonalNumber(minPentagonIndex);
					if(triangleNumbers.indexOf(currentPentagonal) > -1){
						matchingPentagonals.push(currentPentagonal);
					}
					minPentagonIndex++;
				}// get hexagonals which match the matching pentagonals
				var currentHexagonal = 0;
				while(currentHexagonal < _.last(matchingPentagonals)){
					currentHexagonal = helpers.getHexagonalNumber(minHexagonIndex);
					if(matchingPentagonals.indexOf(currentHexagonal) > -1){
						matching.push(currentHexagonal);
					}
					minHexagonIndex++;
				}
			}
			return matching[1];
		}
	}
]