var currency = require('./currency');

console.log('50 Canadian dollars equals this amount of US dollars: ' + currency.canadianToUS(50));
console.log('30 US dollars equals this amount of Canadian dollars: ' + currency.USToCanadian(30));

//OO implementation
var a = require('./currencyObject');
var c = 0.91;
var c2 = new a(c);

console.log('50 Canadian dollars equals this amount of US dollars: $' + c2.canadianToUS(50));
console.log('30 US dollars equals this amount of Canadian dollars: $' + c2.USToCanadian(30));