// acts as private variable inside my module
var canadianDollar = 0.91;

function roundTwoDecimals(amount) {
	return amount.toFixed(2);
}

exports.canadianToUS = function(canadian) {
	return roundTwoDecimals(canadian * canadianDollar);
};

exports.USToCanadian = function(us) {
	return roundTwoDecimals(us / canadianDollar);
};