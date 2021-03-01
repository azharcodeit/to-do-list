
'use strict';

const btnAdd = document.querySelector('.btn--add');
const btnCompleted = document.querySelector('.btn--done');
const btnEmpty = document.querySelector('.btn--all');
let table = document.querySelector('.items');
let taskFilter = document.querySelector('.filter');
const modal = document.querySelector('.modal');
const modalDelete = document.querySelector('.modal-delete');
const modalEdit = document.querySelector('.modal-edit');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.close-modal');
const btnCancel = document.querySelectorAll('.modal--cancel');
const btnModalAdd = document.querySelector('.modal--add');
const taskTitle = document.querySelector('.task-title');
const taskContext = document.querySelector('.task-context');
const btnEdit = document.querySelector('.modal--edit');
const btnDelete = document.querySelector('.modal--delete');
const editTitle = document.querySelector('.title--edit');
const editContext = document.querySelector('.context--edit');


btnModalAdd.addEventListener('click', function () {

    if (taskTitle.value.length !== 0) {
        let row = table.insertRow(-1);
        let orderCell = row.insertCell(0);
        let taskCell = row.insertCell(1);
        let contextCell = row.insertCell(2);
        let editCell = row.insertCell(3);
        let deleteCell = row.insertCell(4);

        row.addEventListener("dblclick", clickHandler);
        orderCell.classList.add('nr');
        deleteCell.classList.add('nr');
        editCell.classList.add('nr');

        for (let i = 0; table.rows[i]; i++) { orderCell.innerHTML = i + 1; };
        taskCell.innerHTML = taskTitle.value;
        contextCell.innerHTML = taskContext.value;
        taskTitle.value = '';
        taskContext.value = '';

        let imgEdit = document.createElement('img');
        imgEdit.src = "/icons/edit.png";
        imgEdit.onmouseover = function () { imgEdit.src = "/icons/edit-hover.png"; };
        imgEdit.onmouseout = function () { imgEdit.src = "/icons/edit.png"; };

        editHandler();

        let imgDelete = document.createElement('img');
        imgDelete.src = "/icons/delete.png";
        imgDelete.onmouseover = function () { imgDelete.src = "/icons/delete-hover.png"; };
        imgDelete.onmouseout = function () { imgDelete.src = "/icons/delete.png"; };

        deleteHandler();

        deleteCell.appendChild(imgDelete);
        editCell.appendChild(imgEdit);

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

taskFilter.addEventListener('keyup', function () {
    let filter, i, txtValue;
    filter = taskFilter.value.toUpperCase();
    for (i = 0; i < table.rows.length; i++) {
        txtValue = table.rows[i].textContent || table.rows[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            table.rows[i].style.display = "";
        } else {
            table.rows[i].style.display = "none";
        }
    };
});
function clickHandler() {
    this.classList.toggle('completed-task');

};

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const openModalDelete = function () {
    modalDelete.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modalDelete.classList.add('hidden');
    modalEdit.classList.add('hidden');
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnAdd.addEventListener('click', openModal);
for (let i = 0; i < btnCloseModal.length; i++) {
    btnCloseModal[i].addEventListener('click', closeModal);
};
for (let i = 0; i < btnCancel.length; i++) {
    btnCancel[i].addEventListener('click', closeModal);
};
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) { // e for event/looking up to the object of an event; define function
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

const deleteHandler = function () {
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[4].onclick = function () {
            let index = this.parentElement.rowIndex;
            openModalDelete();
            btnDelete.onclick = function () {
                table.deleteRow(index);
                for (let i = 0; table.rows[i]; i++) {
                    table.rows[i].cells[0].innerHTML = i + 1;
                };
                closeModal();
            };
        };
    };
};

const editHandler = function () {
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[3].onclick = function () {
            let index = this.parentElement.rowIndex;
            openModalEdit();
            editTitle.value = table.rows[index].cells[1].innerHTML;
            editContext.inne
            rHTML = table.rows[index].cells[2].innerHTML;
            btnEdit.onclick = function () {
                if (editTitle.value.length !== 0) {
                    table.rows[index].cells[1].innerHTML = editTitle.value;
                    table.rows[index].cells[2].innerHTML = editContext.value;
                    for (let i = 0; table.rows[i]; i++) {
                        table.rows[i].cells[0].innerHTML = i + 1;
                    };
                }
                else { alert('Title can not be empty!'); };
                closeModal();

            };
        };
    };
};

const openModalEdit = function () {
    modalEdit.classList.remove('hidden');
    overlay.classList.remove('hidden');
};
