'use strict'

const loadSchedule = function() {
    // todo Создадим экземплря XMLHttpRequest объекта
    const xhr = new XMLHttpRequest;
    
    xhr.open('GET', "json/doctor.json");
    xhr.responseType = 'json';
    xhr.onreadystatechange = function() {
        if(xhr.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        const data = xhr.response;
        for(let i = 0, len = data.length; i < len; i++) {
            const scheduleItem = data[i],
                item = document.createElement('li');
            item.textContent = scheduleItem['name'] + '(' + scheduleItem['speciality'] + ')';
            scheduleListContent.appendChild(item);
        }
    }
    xhr.send();
}

// todo Когда объект имеет идентификатор, то он доступен в глобальной области видимости
// todo Поэтому его объявлять не нужно.
loadScheduleButton.addEventListener('click', loadSchedule);