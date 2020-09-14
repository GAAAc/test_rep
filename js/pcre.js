'use strict'

let text = 'Мите исполнилось 24 года, он родился в 1949 году';
// RegExp - функция конструктор регулярного выражения
// она конструирует регулярные выражения
// d - decimal
let expression = new RegExp( '\\d{4}' );
// .test - это метод внутри регулярного выражения созданного с помощью конструктора
let exists = expression.test( text );

console.log( exists ); // вернет true или false

// возьмем в скобочки
let expression2 = new RegExp( '( \\d{4} )' );
let exists2 = expression2.test( text );
// .$1 первое вхождение
console.log( exists2, RegExp.$1 ); // вернет true или false