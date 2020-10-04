'use strict'

// JS prototype (перевод "Опытный образец")

// Cоздание объекта
// Синтаксис "литерал объекта"
const person = {
    name: 'Andrey',
    age: 34,

    greet: function() {
        console.log('Greet!'); // Перевод "Приветствовать"
    }
};

// Прототипом объекта "person" выступает глобальный объект 

// Если свойства или метода нет в объекте, то оно будет искаться в прототипе(ах)

// Создание объекта
// Синтаксис "конструктор объекта"
// Видно, что объект person2 являтся экземпляром (instance) класса Object
const person2 = new Object({
    name: 'Maxim',
    age: 25,

    greet: function() {
        console.log('Greet any!');
    }
})

// Добавим глобальному Object новую функцию (расширим базовый прототип)
Object.prototype.sayHello = function() {
    console.log('Hello');
}

// Теперь любому экземпляру(instance) доступен метод .sayHello()

// Создадим новый объект методом "create" в качестве прототипа будет person2
// То есть создадим экземпляр (instance) объекта person2
const lena = Object.create(person2);
// У объкета lena пока нет своих свойств и методов
// Зато есть свойства и методы от person2 и глобального Object
// Если написать lena.name то будет выведено 'Maxim' из объекта person2

// Переопределим свойство у lena
lena.name = 'Elena';

// Создание объекта без связей даже с глобальным объектом
// Некая оптимизация. Когда нужны только данные
const bla = Object.create(null);
bla.name = 'Oleg';

// Контекст
// Создадим функцию
function hello() {
    console.log('Hello!', this);
};
// В этом случае после Hello! увидим объект window (use sctrict надо отключить)
// Или написать window.hello()

// Если создать объект
const goPerson = {
    name: 'Andrey',
    age: 34,
    sayHello: hello,
    sayHelloWindow: hello.bind(this),
    // метод bind у функции hello позволяет закрепить в качестве контекста объект window
    // потому что this === window
    // Вместо this можно написать например document, тогда будет DOM дерево

    // Создадим новый метод в контексте данного объекта
    logInfo: function(job, phone) {
        // Сделаем группу console.group()
        console.group(`${this.name} info:`);

        console.log(`Name is ${this.name}`);
        console.log(`Age is ${this.age}`);
        console.log(`Job is ${job}`);
        console.log(`Phone is ${phone}`);

        // Закроем группу console.groupEnd()
        console.groupEnd();
    }
};
// При вызове goPerson.sayHello() после Hello! увидим текущий объект goPerson

// Таким образом this указывает на тот объект в контексте которого была вызвана this
// т.е. то что стоит слева от точки, когда делаем вызов
// window.hello() - this ссылается на объект window
// goPerson.sayHello() - this ссылается на объект goPerson

const goLena = {
    name: 'Lena',
    age: 20
};

const goIvan = {
    name: 'Ivan',
    age: 40
}

const goOleg = {
    name: 'Oleg',
    age: 25
}

goPerson.logInfo();

// С помощью метода bind привяжем данные объекта goLena к методу logInfo в объекте goPerson
// скобки в конце нужны потому что метод bind не вызывает функцию а возвращает новую функцию
// которая привязала к себе новый контекст, поэтому эту функцию надо вызывать
goPerson.logInfo.bind(goLena, 'Frontend', '8-912-123-12-23')();

// В JS есть еще метод .call, в котором также можно как и в bind задать контекст и параметры
// количество параметров не ограничено
// в отличии от bind метод call сразу вызывает эту функцию
goPerson.logInfo.call(goIvan, 'Backend', '8-950-520-20-20');

// Также в JS есть метод .apply, в котором также можно как и в bind задать контекст
// но только два параметра. Второй параметр это массив передаваемых данных
// метод .apply также как и call сразу вызывает функцию
goPerson.logInfo.apply(goOleg, ['SEO', '8-963-547-85-95']);

// Комбинируем контекст и прототипы

// Есть массив
const myArray = [1, 2, 3, 4, 5];

// К этому массиву добавим метод, который будет возвращать массив 
// каждый элемент которого будет умножен на какое-то число

// Array это родительский тип всех массивов (так как тип то с большой буквы пишется)
// Расширим его методы новым методом .multBy
Array.prototype.multBy = function(n) {
    // В this будет падать тот массив к которому применяется метод .multBy
    return this.map(function(i){
        return i * n;
    });
}

console.log(myArray.multBy(2));

// Замыкания

// По сути это функция внутри другой функции

function createCalcFunction(n) {
    // Функция будет возвращать другую функцию
    return function() {
        console.log(1000*n);
    };
};

// Если вызвать createCalcFunction(42), то ничего не будет
// так как функция возвращает в качестве результата другую функцию
// поэтому запишем возвращаемую функцию в переменную
const myCalc = createCalcFunction(42);
// Так как в myCalc передали функцию то и myCalc тоже функция
// вызовем myCalc() с пустым параметром потому что статически задано 42
// и это значение как бы замкнуто
myCalc();

function createIncrementor(n) {
    return function(num) {
        return n + num;
    };
};

const addOne = createIncrementor(1); // в качестве n замкнем значение 1
// В addOne передается внутренняя функция у которой есть формальный параметр
// Вызовем ее с указанием значения для этого формального праметра
console.log(addOne(100));

const addTen = createIncrementor(10);
console.log(addTen(100));

function urlGenerator(domain) {
    return function(url) {
        return `http://${url}.${domain}`;
    };
};

const comUrl = urlGenerator('com');
console.log(comUrl('google'));

console.log(urlGenerator('ru')('ya')); // Даже так можно для прикола

// Пример своей функции bind
function myBind(contex, fn){
    // Используем спред оператор
    return function(...args){
        // К функции применим метод apply
        // т.к. второй аргумент у нее массив
        // в который можно поместить любое количество аргументов
        // если они будут переданы функции ...args
        fn.apply(contex, args);
        // теперь функция работает в контексте объекта
    };
};

function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
};

const personOleg = {
    name: 'Oleg',
    age: 20,
    job: 'Frontend'
};

const personElena = {
    name: 'Elena',
    age: 21,
    job: 'Backend'
}

// Итог к одной и тойже функции logPerson привязываем разный контекст
myBind(personOleg, logPerson)();
myBind(personElena, logPerson)();


// Асинхронность

// У браузерного API !!! есть функция setTimeout()
// В действительности она вызывается у глобального обекта window
// window.setTimeout
window.setTimeout( function() {
    console.log('Inside timeout, after 2 seconds');
}, 2000);

// Все события (клики, скролы и т.д.) также относятся к асинхронному механизму

// Из другого источника
function Shape() {
    this.x = 0;
    this.y = 0;
};

Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    console.info('Фигура переместилась');
}

function Rectangle() {
    Shape.call(this);
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

rect.move(1,1)


// Promise

console.log('request data...');
// В JS есть глобальный класс Promise
// Создадим instance от класса Promise
// в который вложим функцию callback, которая принимает два параметра (resolve, reject)
// эти два параметрами являются также функциями
// функция resolve вызывается, когда закончена асинхронная операция причем успешно!
const p = new Promise(function(resolve, reject) {
    // тут пишем асинхронный код
    setTimeout(() => {
        console.log('Preparine data...');
        const backendData = {
            server: 'aws',
            port: 3000,
            status: 'working'
        };
        resolve(backendData);
        // Этим самым говорим промису что он завершил свое выполнение
        // в resolve передаем backendData, что она была доступна в методе then()
    }, 5000);
});

// У промиса есть метод then(), означает "когда выполнится"
// В этот метод указывается следующий callback
p.then(data => {
    // когда первый промис выполнится мы сделаем следующую асинхронную операцию
    return new Promise((resolve, reject) => {
        // следующая асинхронная операция
        setTimeout(() => {
            data.modified = true; // это просто для примера
            resolve(data);
        }, 5000);
    });
}).then(clientData => {
    console.log('Data received', clientData);
    // в then() можем возвращать не только промисы но и данные
    clientData.fromPromise = true;
    return clientData;
}).then(data => {
    console.log('Modified', data);
});


// Гибкая настройка объектов в JS

// Метод .create имеет два параметра, каждый из которых объект
// Первый это объект который будет прототипом для создаваемого объекта
// Второй это объект в который указываем данные для данного объекта
const objPerson = Object.create( {}, {
    // Запись данных отличается в качестве значений будут объекты с ключом value
    name: {
        value: 'Andrey',
        // Дискриптор enumerable сделает параметр name будет доступен (см. ниже цикл for)
        enumerable: true,
        // Дискриптор writable позволяет переназначать значение name (objPerson.name = 'Oleg')
        writable: true,
        // Дискриптор configurable разрешает удалять ключ из объекта (delete objPerson.name)
        configurable: true
    },
    birthYear: {
        value: 1986
    },

    age: {
        get() {
            // get используется для того чтобы вернуть какое-то новое значение
            return new Date().getFullYear() - this.birthYear;
        },

        set(value) {
            document.body.style.background = 'red'
            // Если в консоле написать objPerson.age = 'что нибудь', 
            // то изменится фон окна
        }
    }
})

// Если запустить цилк по созданному так объекту и будем выводить ключи этого объекта
// то ничего не получим
// Важно. В этом случае цикл for бежит и по прототипу данного объекта
// (в данном случае глобальный Object)
for(let key in objPerson) {
    // А чтобы for не учитывал ключи прототипа
    // Надо сделать проверку используя метод .hasOwnProoerty(key)
    if(objPerson.hasOwnProperty(key)) {
        console.log('Key', key, objPerson[key]);
    }    
}


// ES6 классы в JS

class Animal {
    // Описываем класс

    // Можем реализовывать статические методы или переменные
    static type = 'ANIMAL';
    // статическая переменная доступна только у самого класса Animal.type

    // Чтобы проинициализировать начальные значения объекта данного класса
    // реализуем специальный метод, который называется constructor
    constructor(options) {
        // Инициализация полей для instance класса Animal, через ключевое слово this
        this.name = options.name;
        this.age = options.age;
        this.hasTail = options.hasTail;
    }

    // Метод
    voice() {
        console.log('I am Animal');
    }
}

// Теперь создадим объект от класса Animal
// В круглые скобочки передадим объект данных
const animal = new Animal({
    name: 'Animal',
    age: 5,
    hasTail: true
});

// Реализуем наследование
// Создадим частный случай класса Animal, а именно класс Cat
// используя ключевое слово extends
class Cat extends Animal {
    // Также можем заводить статические поля
    static type = 'CAT'

    // Создадим дополнительное поле (которого нет у прототипа т.е. у класса Animal)
    constructor(options) {
        // Для начала вызвать родительский конструктор
        // для этого есть ключевое слово super, который вызываем
        // и в который передается конструктор прототипа (там был options)
        super(options);
        this.color = options.color;
    }
    
    // Можем переписать родительский метод
    voice() {
        // Но если нам также нужен и родительский метод
        // То используем снова ключевое слово super
        // Обращаемся к нему как к объекту
        // и вызываем метод родителя
        super.voice();
        // А тут уже данные этого класса
        console.log('I am cat');
    }

    // В классах есть getter и setter
    // Getter вызывается cat.ageInfo
    // то есть не как функция. Потому что это поле
    get ageInfo() {
        return this.age * 10;
    }

    // Setter вызывается cat.ageInfo = 8 (например)
    set ageInfo(newAge) {
        this.age = newAge;
    }
}

const cat = new Cat({
    name: 'Cat',
    age: 4,
    hasTail: true,
    // Дополнительное поле (которого нет у прототипа т.е. у класса Animal)
    color: 'black'
})

// Более реальный пример
class Component {
    // метод constructor, который принимает параметр selector
    constructor(selector) {
        // Обычно через $ называют те переменные, которые в себе содержат
        // какую нибуь DOM node (узел DOM)
        this.$el = document.querySelector(selector);
    }

    hide() {
        this.$el.style.display = 'none';
    }

    show() {
        this.$el.style.display = 'block';
    }
}

class Box extends Component {
    constructor(options) {
        super(options.selector)

        this.$el.style.width = this.$el.style.height = options.size + 'px';
        this.$el.style.backgroundColor = options.backgroundColor;
    }
}

const box = new Box({
    selector: '#box',
    size: 100,
    backgroundColor: 'green'
})

class Circle extends Box {
    constructor(options) {
        super(options)

        this.$el.style.borderRadius = '50%';
    }
}

const circle = new Circle({
    selector: '#circle',
    size: 100,
    backgroundColor: 'pink'
})
