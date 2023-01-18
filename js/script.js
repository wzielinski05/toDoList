let toDoInput;
let errInfo;
let addBtn;
let ulList;
let newTodo;
let popup, popupinfo, todoToEdit, popupInput, popupAddBtn, popupCloseBtn;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};
const prepareDOMElements = () => {
	toDoInput = document.querySelector('.todo-input');
	errInfo = document.querySelector('.error-info');
	addBtn = document.querySelector('.btn-add');
	ulList = document.querySelector('.todolist ul');

	popup = document.querySelector('.popup');
	popupinfo = document.querySelector('.popup-info');

	popupInput = document.querySelector('.popup-input');
	popupAddBtn = document.querySelector('.accept');
	popupCloseBtn = document.querySelector('.cancel');
};
const prepareDOMEvents = () => {
	addBtn.addEventListener('click', addNewTask);
	ulList.addEventListener('click', checkClick);
	popupCloseBtn.addEventListener('click', closePopup);
	popupAddBtn.addEventListener('click', changeToDoText);
	toDoInput.addEventListener('keyup',enterKeyCheck)
};

const addNewTask = () => {
	if (toDoInput.value !== '') {
		newTodo = document.createElement('li');
		newTodo.textContent = toDoInput.value;
		ulList.append(newTodo);

		tools(newTodo);
		toDoInput.value = null;

		errInfo.textContent = null;
	} else {
		errInfo.textContent = 'Wpisz treść zadania';
	}
};

const tools = (newTodo) => {
	const toolsPanel = document.createElement('div');
	toolsPanel.classList.add('tools');
	newTodo.append(toolsPanel);

	const complBtn = document.createElement('button');
	complBtn.classList.add('complete');
	complBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.textContent = 'EDIT';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	toolsPanel.append(complBtn, editBtn, deleteBtn);
};
const checkClick = (e) => {
	if (e.target.matches('.complete')) {
		console.log('complete');
		e.target.closest('li').classList.toggle('completed');
		e.target.classList.toggle('completed');
	} else if (e.target.matches('.edit')) {
		editTodo(e);
		console.log('edit');
		console.log(e.target);
	} else if (e.target.matches('.delete')) {
		console.log('delete');
		console.log(e.target);
		deleteTodo(e)
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest('li');
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.style.display = 'flex';
};
const closePopup = () => {
	popup.style.display = 'none';
	popupInput.textContent = '';
};
const changeToDoText = () => {
	if (popupInput.value !== '') {
		todoToEdit.firstChild.textContent = popupInput.value;
		closePopup();
	} else {
		popupinfo.textContent = 'Musisz coś napisać';
	}
};
const deleteTodo = (e) => {
	todoToDelete = e.target.closest('li')
	todoToDelete.remove()
	const allTodos =document.querySelectorAll('li')
	if (allTodos.length == 0) {
		errInfo.textContent = 'Brak zadań na liście'
		
	}
	
}
const enterKeyCheck = (e) => {
	if (e.key == 'Enter') {
		addNewTask()
	}
}
document.addEventListener('DOMContentLoaded', main);
