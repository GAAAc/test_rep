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
console.log( exists2, RegExp.$1 );

let expression3 = new RegExp( '(\\d{2}).*(\\d{4})' );
// где точка - любой символ
// * - любое количество символов между d{2} и d{4}
let exists3 = expression3.test( text );
console.log( exists3, RegExp.$1, RegExp.$2 );

// Замена символов с помощью регулярных выражений и их флагов
// У строки есть метод replace, но он заменит только первое вхождение
let text2 = 'Исполнительный; Обязательный; Задорный';
// В RegExp есть флаги
// 'g' - глобалный поиск (имеется ввиду несколько вхождений)
// без этого флага будет отрабатываться также только первое вхождение
// флаг 'i' - поиск без учета регистра
// флаг 'm' - многострочный поиск (если есть переносы \n)
// совмещение флагов 'gm' или даже 'gim'
let expression4 = new RegExp( ';', 'g' );
let newText = text2.replace( expression4, '.');
console.log(newText);

// Замена символов с помощью литералов
let text3 = 'Исполнительный; Обязательный; Задорный';
let expression5 = /;/g; // флаги теже
// В литерале надо писать один слеш в конструкции \d{2}
// Поиск слеша экранируется знаком \ и получается \/
// Поиск точки также экранируется \.
let newText2 = text3.replace( expression5, '_');
console.log(newText2);

// Метод exec - получим информацию о всех вхождениях
let mailAdd = 'test@example.com';
let expression6 = /\w+@\w+\.\w+/; // Пробелы нельзя иначе они туже будут искаться
let results = expression6.exec( mailAdd );
console.log( results );