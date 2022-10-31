import Book from './book.js';

export default class Methods {
	constructor() {
		this.bookCollection = [];
	}

	static getBookFromStorage = () => {
		let bookCollection;

		if (JSON.parse(localStorage.getItem('storedBookData')) === null) {
			bookCollection = [];
		} else {
			bookCollection = JSON.parse(localStorage.getItem('storedBookData'));
		}

		return bookCollection;
	};

	static addBookToStorage = (bookCollection) => {
		const str = JSON.stringify(bookCollection);
		localStorage.setItem('storedBookData', str);
	};

	static deleteBook = (id) => {
		let bookCollection = this.getBookFromStorage();
		const itemToDelete = bookCollection[id];

		bookCollection = bookCollection.filter((item) => item !== itemToDelete);
		this.addBookToStorage(bookCollection);
	};

	static addBtnRemoveEvent = () => {
		document.querySelectorAll('.delete_btn').forEach((button) =>
			button.addEventListener('click', (event) => {
				event.preventDefault();
				const { id } = button;
				this.deleteBook(id);
				this.showBooks();
			})
		);
	};

	static showBooks = () => {
		let bookCollectionHtml;
		let bookCollection = this.getBookFromStorage();
		document.querySelector('.books').innerHTML = '';
		bookCollection.forEach((book, index) => {
			bookCollectionHtml = document.createElement('div');
			bookCollectionHtml.className = 'book-item';
			bookCollectionHtml.innerHTML = `
            <h3 class="book-title"><span>"${book.title}" by ${book.author}</span></h3>
            <button class="delete_btn" id="${index}">Remove</button>
          `;
			document.querySelector('.books').appendChild(bookCollectionHtml);
		});

		this.addBtnRemoveEvent();
	};

	static addBook = (title, author) => {
		let bookCollection = this.getBookFromStorage();
		let newbook = new Book(title, author);

		bookCollection.push(newbook);
		this.addBookToStorage(bookCollection);
	};
}
