'use strict';

const btnAdd = document.querySelector('.btn--add');
const btnCompleted = document.querySelector('.btn--done');
const btnEmpty = document.querySelector('.btn--all');
let table = document.querySelector('.items');
let task = document.querySelector('.item');


btnAdd.addEventListener('click', function () {
    if (task.value.length !== 0) {
        let row = table.insertRow(-1);
        let orderCell = row.insertCell(0);
        let taskCell = row.insertCell(1);
        row.addEventListener("dblclick", clickHandler);
        orderCell.classList.add('nr');
        for (let i = 0; table.rows[i]; i++) { orderCell.innerHTML = i + 1; };
        taskCell.innerHTML = task.value;
        task.value = '';

    } else { alert('Task is empty') };

});

btnCompleted.addEventListener('click', function () {
    for (let i = table.rows.length - 1; i >= 0; i--) {
        if (table.rows[i].classList.contains('completed-task')) {
            table.deleteRow(i);
        };
    };
    for (let i = 0; table.rows[i]; i++) {
        table.rows[i].cells[0].innerHTML = i + 1;
    };

});

btnEmpty.addEventListener('click', function () {
    for (let i = table.rows.length - 1; i >= 0; i--) {
        table.deleteRow(i);
    }
});


function clickHandler() {
    this.classList.toggle('completed-task');

};