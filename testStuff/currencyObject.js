var Currency = function(canadianDollar) {
	this.canadianDollar =  canadianDollar;
}

Currency.prototype.roundTwoDecimals = function(amount) {
	return amount.toFixed(2);
}

Currency.prototype.canadianToUS = function(amount) {
	return this.roundTwoDecimals(amount * this.canadianDollar);
}

Currency.prototype.USToCanadian = function(amount) {
	return this.roundTwoDecimals(amount / this.canadianDollar);
}

module.exports = exports = Currency;