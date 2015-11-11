require('phantomjs')

describe("isPrime", () =>{
	it("works without a prime list", () =>{
		expect(isPrime(70657)).toBe(true);
		expect(isPrime(70659)).toBe(false);
		expect(isPrime(70661)).toBe(false);
		expect(isPrime(70663)).toBe(true);
	})
})