import helpers from "./helpers.js"

var Fraction = class Fraction{
	constructor(numerator, denominator){
		this.numerator = numerator;
		this.denominator = denominator;
	}
	add(otherFraction){
		var newNumerator = (otherFraction.numerator * this.denominator) + (otherFraction.denominator * this.numerator);
		var newDenominator = this.denominator * otherFraction.denominator;
		return new Fraction(newNumerator, newDenominator).reduce();
	}
	multiply(otherFraction){
		var newNumerator = this.numerator * otherFraction.numerator;
		var newDenominator = this.denominator * otherFraction.denominator;
		return new Fraction(newNumerator, newDenominator).reduce();
	}
	reduce(){
		var gcd = helpers.getGcd(this.numerator, this.denominator);
		return new Fraction(this.numerator / gcd, this.denominator / gcd);
	}
	equals(otherFraction){
		var reduced = this.reduce();
		var otherReduced = otherFraction.reduce();
		return reduced.numerator === otherReduced.numerator 
			&& reduced.denominator === otherReduced.denominator;
	}
	// Object overrides
	toString(){
		return this.numerator + "/" + this.denominator;
	}
}

module.exports = {
	Fraction: Fraction
}