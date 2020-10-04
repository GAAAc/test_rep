'use strict'
// Цель. Перетаскивание.
// Нажать на элементе левой кнопкой мыши. Пока удерживаем перетаскиваем
// После отпускания левой кнопки мыши элемент фиксируется на странице

const Draggable = function( element ) {
    this.element = element;
    this.dragstart = this.dragstart.bind( this ); // сохраняем контекст
    this.drag = this.drag.bind( this ); // сохраняем контекст
    this.dragend = this.dragend.bind( this ); // сохраняем контекст

    this.bindEvents();
};

Draggable.prototype = {
    // Отслеживаем нажатие
    bindEvents: function() {
        // В этом случае передаст элемент
        // this.element.addEventListener( 'mousedown', this.dragstart);

        // Нам нужен контекст
        this.element.addEventListener( 'mousedown', this.dragstart );
    },

    getStartX: function() {
        // Встроенное в JS getComputedStyle()
        // позволяет получить все css свойства элемента
        // Так как получим число с пикселями, то используем perseInt
        // чтобы отрезать символы правее от числа
        return parseInt( getComputedStyle( this.element ).left );
    },

    getStartY: function() {
        return parseInt( getComputedStyle( this.element ).top );
    },
    
    // Отслеживаем движение
    // Отслеживаем отпускание
    dragstart: function( e ) {
        // Фиксируем начальную точку окна
        this.startX = this.getStartX();
        // Фиксируем точку где произошло событие (нажатие на наш элемент)
        this.startClientX = e.clientX;

        this.startY = this.getStartY();
        this.startClientY = e.clientY;

        // Обработчик движения привяжем к window
        // так как если слишком резко дернуть мышку
        // то указатель пропадет с блока и блок не будет следовать за указателем
        // Поэтому учитываем все пространство экрана (а не размеры элемента)
        window.addEventListener( 'mousemove', this.drag );
        // Обработчик на отжчатие кнопки
        this.element.addEventListener( 'mouseup', this.dragend );
    },
    drag: function( e ) {
        const dX = this.startX + e.clientX - this.startClientX;
        this.element.style.left = dX + 'px';
        const dY = this.startY + e.clientY - this.startClientY;
        this.element.style.top = dY + 'px';
    },
    dragend: function() {
        // После отпускания кнопки мыши надо удалить обработчики
        this.element.removeEventListener( 'mouseup', this.dragend);
        window.removeEventListener( 'mousemove', this.drag );
    }

}

new Draggable( drag );