
'use strict';

const mainContainer = document.getElementById('main');
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
const TodoTableCellIndex = {
    OrderCell: 0,
    TaskCell: 1,
    ContextCell: 2,
    EditCell: 3,
    DeleteCell: 4,
};


mainContainer.addEventListener('dblclick', completeTask);
mainContainer.addEventListener('click', deleteCompleted);
mainContainer.addEventListener('click', deleteAll);
mainContainer.addEventListener('click', addTaskModal);
modal.addEventListener('click', addTask);
mainContainer.addEventListener('click', deleteTaskModal);
mainContainer.addEventListener('click', editTaskModal);


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

function completeTask(event) {
    let tr = event.target.closest('tr');
    if (!tr) return;
    if (!table.contains(tr)) return;
    tr.classList.toggle('completed-task');
};

function deleteCompleted(event) {
    if (event.target.getAttribute("data-action") === "deleteCompleted") {
        for (let i = table.rows.length - 1; i >= 0; i--) {
            if (table.rows[i].classList.contains('completed-task')) {
                table.deleteRow(i);
            };
        };
        for (let i = 0; table.rows[i]; i++) {
            table.rows[i].cells[TodoTableCellIndex.OrderCell].innerHTML = i + 1;
        };
    }
};

function deleteAll(event) {
    if (event.target.getAttribute("data-action") === "deleteAll") {
        for (let i = table.rows.length - 1; i >= 0; i--) {
            table.deleteRow(i);
        }
    };
};

function addTaskModal(event) {
    if (event.target.getAttribute("data-action") !== "addTask") return;
    openModal();
};

function addTask(event) {
    if (event.target.getAttribute("data-action") !== "add") return;
    if (taskTitle.value.length === 0) return;
    let row = table.insertRow(-1);
    let orderCell = row.insertCell(TodoTableCellIndex.OrderCell);
    let taskCell = row.insertCell(TodoTableCellIndex.TaskCell);
    let contextCell = row.insertCell(TodoTableCellIndex.ContextCell);
    let editCell = row.insertCell(TodoTableCellIndex.EditCell);
    let deleteCell = row.insertCell(TodoTableCellIndex.DeleteCell);

    orderCell.classList.add('nr');
    deleteCell.classList.add('nr');
    editCell.classList.add('nr');

    orderCell.innerHTML = table.rows.length;
    taskCell.innerHTML = taskTitle.value;
    contextCell.innerHTML = taskContext.value;
    taskTitle.value = taskContext.value = '';

    let imgEdit = document.createElement('img');
    imgEdit.src = "./icons/edit.png";
    imgEdit.setAttribute("data-action", "editRow");

    imgEdit.onmouseover = function () {
        imgEdit.src = "./icons/edit-hover.png";
    };

    imgEdit.onmouseout = function () {
        imgEdit.src = "./icons/edit.png";
    };

    let imgDelete = document.createElement('img');
    imgDelete.src = "./icons/delete.png";
    imgDelete.setAttribute("data-action", "deleteRow");

    imgDelete.onmouseover = function () {
        imgDelete.src = "./icons/delete-hover.png";
    };

    imgDelete.onmouseout = function () {
        imgDelete.src = "./icons/delete.png";
    };

    deleteCell.appendChild(imgDelete);
    editCell.appendChild(imgEdit);
    editCell.setAttribute("data-action", "editRow");
    deleteCell.setAttribute("data-action", "deleteRow");

};

function deleteTaskModal(event) {
    if (event.target.getAttribute("data-action") === "deleteRow") {
        let tr = event.target.closest('tr');
        openModalDelete();
        deleteTask(tr);
    };
};

function deleteTask(index) {
    btnDelete.addEventListener('click', function () {
        index.remove();
        for (let i = 0; table.rows[i]; i++) {
            table.rows[i].cells[0].innerHTML = i + 1;
        };
        closeModal();
    });
};

function editTaskModal(event) {
    if (event.target.getAttribute("data-action") !== "editRow") return;
    let tr = event.target.closest('tr');
    openModalEdit();
    editTask(tr);
};

function editTask(index) {
    editTitle.value = index.cells[TodoTableCellIndex.TaskCell].innerHTML;
    editContext.innerHTML = index.cells[TodoTableCellIndex.ContextCell].innerHTML;
    btnEdit.onclick = function () {
        if (editTitle.value.length === 0) return;
        index.cells[TodoTableCellIndex.TaskCell].innerHTML = editTitle.value;
        index.cells[TodoTableCellIndex.ContextCell].innerHTML = editContext.value;
        for (let i = 0; table.rows[i]; i++) {
            table.rows[i].cells[TodoTableCellIndex.OrderCell].innerHTML = i + 1;
        };
        closeModal();
    };
};

function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

function openModalDelete() {
    modalDelete.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const openModalEdit = function () {
    modalEdit.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

function closeModal() {
    modalDelete.classList.add('hidden');
    modalEdit.classList.add('hidden');
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

overlay.addEventListener('click', closeModal);

for (let i = 0; i < btnCloseModal.length; i++) {
    btnCloseModal[i].addEventListener('click', closeModal);
};
for (let i = 0; i < btnCancel.length; i++) {
    btnCancel[i].addEventListener('click', closeModal);
};

document.addEventListener('keydown', escClose);
function escClose(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
};


