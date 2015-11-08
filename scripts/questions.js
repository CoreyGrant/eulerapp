import _ from 'lodash';
import helpers from './helpers.js';
import classes from './classes.js';
var Fraction = classes.Fraction;
module.exports = [
	{
		key: 1,
		run: () => _.range(1, 1000)
			.filter(x => !(x%3) || !(x%5))
			.reduce((prev, cur) => prev + cur)
	},
	{
		key: 2,
		run: () => {
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
		run: () => {
			var number = 600851475143;
			var factors = helpers.getFactors(number);
			return _.max(Object.keys(factors));
		}
	},
	{
		key: 4,
		run: () => {
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
		run: () => {
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
		run: () => {
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
		run: () => {
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
		run: (data) => {
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
		run: () => {
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
		run: () => helpers.getPrimes(2000000).reduce((prev, cur) => prev ? prev += cur : cur)
	},
	{
		key: 11,
		run: (data) => {
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
		run: () => {
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
		run: (data) => {
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
		run: () => {
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
		key: 15,
		run: () => helpers.factorial(40) / Math.pow(helpers.factorial(20), 2)
	},
	{
		key: 16,
		run: () => helpers.raise(2, 1000)
			.split("").map(x => +x)
			.reduce(
				(prev, cur) => prev + cur,
				0)
	},
	{
		key: 20,
		run: () => _.range(1, 101)
			.reduce(
				(prev, cur) => helpers.multiply(prev, cur),
				1)
			.split("").map(x => +x)
			.reduce(
				(prev, cur) => prev + cur,
				0)
	},
	{
		key: 22,
		run: (data) => {
			var letters = helpers.letterScores;
			return _.sortBy(data, x => x)
				.map((x, i) => helpers.wordScore(x) * (i+1))
				.reduce((prev, cur) => prev + cur, 0);
		}
	},
	{
		key: 29,
		run: () =>{
			var nums = _.range(2, 101);
			var values = {};
			nums.forEach(x => {
				nums.forEach(y => {
					var value = helpers.raise(x, y);
					values[value] = x + ":" + y
				});
			});
			console.log(values)
			return Object.keys(values).length;
		}
	},
	{
		key: 30,
		run: () => {
			var upperBound = 350000;
			var total = 0;
			for(var i = 2; i< upperBound; i++){
				var powerSum = (i+"")
					.split("")
					.reduce((prev, cur) => prev + Math.pow(cur, 5), 0);
				if(powerSum === i){
					total += i;
				}
			}
			return total;
		}
	},
	{
		key: 33,
		run: () => {
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
							return true;
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
		key: 34,
		run: () =>{
			var upperBound = 2540161;
			var factorials = {
				0:1,
				1:1,
				2:2,
				3:6,
				4:24,
				5:120,
				6:720,
				7:720*7,
				8:720*7*8,
				9:720*7*8*9
			};
			var total = 0;
			for(var i = 3; i< upperBound; i++){
				var sum = (i + "")
					.split("")
					.reduce((prev, cur) => prev + factorials[+cur], 0)
				if(sum === i){
					total += sum;
				}
			}
			return total;
		}
	},
	{
		key:35,
		run: () => {
			function getRotations(number){
				var ns = number + "";
				return _.range(0, ns.length)
					.map(x => ns.substring(ns.length-x) + ns.substring(0, ns.length-x))
					.map(x => +x);
			}
			var primeSet = {};
			var primes = helpers.getPrimes(1000000);
			primes.forEach(x =>{
				primeSet[x] = true;
			});
			var total = 0;
			for(var i = 0; i<primes.length; i++){
				var prime = primes[i];
				if(!primeSet[prime]){
					continue;
				}
				var rotations = getRotations(prime);
				if(!rotations.every(x => primeSet[x])){
					rotations.forEach(x => primeSet[x] = false);
					continue;
				}
				total++;
			}
			return total;
		}
	},
	{
		key: 36,
		run: () => _.range(1,1000000)
			.filter(x => helpers.isPalindrome(x) && helpers.isPalindrome(x.toString(2)))
			.reduce((prev, cur) => prev + cur, 0)
		
	},
	// {
	// 	key: 37,
	// 	run: () =>{
	// 		var matching = [];
	// 		var primes;
	// 		var upperLimit = 10000;
	// 		while(matching.length < 11){
	// 			primes = getPrimes(10000, primes);

	// 		}
	// 	}
	// },
	{
		key: 40,
		run: () => {
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
		key: 42,
		run: (data) =>{
			var maxTriangle = _.max(data, x => x.length).length*26;
			var newest = 1;
			var triangles = [];
			for(var i = 1; newest < maxTriangle; i++){
				newest = helpers.getTriangleNumber(i);
				triangles.push(newest);
			}
			var total = 0;
			data.forEach(x => {
				if(triangles.indexOf(helpers.wordScore(x)) > -1){
					total++;
				}
			})
			return total;
		}
	},
	// {
	// 	key: 44,
	// 	run: () =>{
			
	// 	}
	// },
	{
		key: 45,
		run: () => {
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