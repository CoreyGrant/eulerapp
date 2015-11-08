import _ from 'lodash';

module.exports = {
	isPrime: function(number, existingPrimes){
		if(number == 2){return true;}
		var possibles = existingPrimes
			? _.takeWhile(existingPrimes, x => x <= Math.sqrt(number))
			: [2].concat(_.range(3, Math.ceil(Math.sqrt(number))+2, 2))
		// if not enough possible primes were supplied, we need to make up
		// the difference
		if(possibles[possibles.length - 1] < Math.sqrt(number)){
			var next = possibles[possibles.length - 1] + 2;
			possibles = possibles.concat(
				_.range(next, Math.ceil(Math.sqrt(number))+2,2));
		}
		return !possibles.some(x => {
			return !(number % x);
		});
	},
	getPrimes: function(upper, existingPrimes){
		var primes = [2,3];
		var startingNumber = 5;
		if(existingPrimes){
			primes = existingPrimes;
			startingNumber = primes[primes.length - 1]+2;
		}
		_.range(startingNumber, upper+2, 2).forEach(x => {
			if(this.isPrime(x)){
				primes.push(x);
			}
		});
		return primes;
	},
	getFactors: function(number, existingPrimes){
		// Basic factor searching strategy:
		// - Get primes up to 1000
		// - Try to divide by all of them
		// - If any divide, go back to the start of the prime list and continue
		// - If we run out of primes, get more and keep trying
		// - Each time do a prime check to see if we are done
		var factors = [];
		var upperPrime = existingPrimes
			? existingPrimes[existingPrimes.length - 1]
			: 1000
		var primes = existingPrimes || this.getPrimes(upperPrime);
		while(true){
			var found = false;
			for(var i = 0; i < primes.length; i++){
				var prime = primes[i];
				if(!(number%prime)){
					factors.push(prime);
					number = number / prime;
					found = true;
					break;
				}
			}
			if(this.isPrime(number)){
				factors.push(number);
				return _.countBy(factors, x => x);
			}
			if(!found){
				upperPrime = upperPrime += 1000;
				primes = this.getPrimes(upperPrime, primes);
			}
		}
	},
	isPalindrome: function(x){
		var string = x + "";
		return string == string.split("").reverse().join("");
	},
	getTriangleNumber: function(x){
		return (x * (x+1))/ 2;
	},
	getPentagonalNumber: function(x){
		return (x *(3*x - 1)) / 2;
	},
	getHexagonalNumber: function(x){
		return x * (2 * x - 1);
	},
	getGcd: function(a, b){
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
	getDivisorCount: function(x, existingPrimes){
		var divisors = this.getFactors(x, existingPrimes);
		var total = 1;
		Object.keys(divisors).forEach(x => total = total * (divisors[x] + 1));
		return total;
	},
	factorial: function(x){
		return _.range(1, x+1).reduce((prev, cur) => prev * cur, 1);
	},
	multiply: function(value, multiplier){
		if(typeof(value) === "number"){
			value = value + "";
		}
		var remainder = 0, total = "";
		value.split("").reverse().forEach((x, i) => {
			var multiplied = (+x)*multiplier + remainder;
			remainder = (multiplied - multiplied % 10)/10;
			var prependRemainer = remainder && ((i+1) ===  value.length);
			total = (prependRemainer ? remainder.toString() : "") + (multiplied % 10).toString() + total;
		});
		return total;
	},
	raise: function(num, power){
		return _.range(1, power+1)
			.reduce(
				(prev, cur) => this.multiply(prev, num),
				1)
	},
	letterScores : {"A":1,"B":2,"C":3,"D":4,"E":5,"F":6,"G":7,"H":8,"I":9,"J":10,"K":11,"L":12,"M":13,"N":14,"O":15,"P":16,"Q":17,"R":18,"S":19,"T":20,"U":21,"V":22,"W":23,"X":24,"Y":25,"Z":26},
	wordScore: function(name){
		return name.split("").reduce((prev, cur) => prev + this.letterScores[cur], 0);
	}
}