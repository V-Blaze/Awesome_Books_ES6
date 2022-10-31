import Methods from './modules/utils.js';

const addTitle = document.querySelector('#addTitle');
const addAuthor = document.querySelector('#addAuthor');
const addForm = document.querySelector('#addBook');

addForm.addEventListener('submit', (event) => {
	event.preventDefault();
	Methods.addBook(addTitle.value, addAuthor.value);

	addAuthor.value = '';
	addTitle.value = '';

	Methods.showBooks();
});

console.log(Methods.getBookFromStorage());
