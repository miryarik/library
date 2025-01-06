function Book(name, author, pages, read) {
    // book constructor
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

}

// sample books
const book0 = new Book('Water', 'Katara', 199, false);
const book1 = new Book('Air - The Element of Breath', 'Aang', 199, false);
const book2 = new Book('Earth', 'Toph', 199, false);
const book3 = new Book('Fire', 'Zuko', 199, false);

// library array
const myLibrary = [book0, book1, book2, book3];

// cards container div
const cardsDiv = document.querySelector('.cards');


function addBookToLibrary(book) {
    // add book to myLibrary array
    myLibrary.push(book);

    // sync display
    displayBooks();
}


function removeBookFromLibrary(book) {
    // add book to myLibrary array
    myLibrary.pop(book);
    
    // sync display
    displayBooks();
}


function displayBooks() {

    // remove all cards
    cardsDiv.innerHTML = '';
    
    // display each book on page
    myLibrary.forEach(book => {
        // create a card for each book
        const card = makeBookCard(book);
        
        // append card to cards
        cardsDiv.appendChild(card);
    });

}


function makeBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');

    // create h3 and assign it title
    const title = document.createElement('h2');
    title.innerText = book.name;

    // create h2 and assign it author name
    const author = document.createElement('h3');
    author.innerText = book.author;

    // create a p and assign it pages as string
    const pages = document.createElement('p');
    pages.classList.add('pages');
    pages.innerText = `${book.pages} pages`;

    // create red and assign it read status
    const read = document.createElement('p');
    pages.classList.add('read');
    read.innerText = book.read ? 'read' : 'not read';

    // append them all to card
    [title, author, pages, read].forEach(item => {
        card.appendChild(item);
    });

    return card;
}


document.addEventListener("DOMContentLoaded", (event) => {
    
    // modal for adding new book
    const addBookModal = document.querySelector('dialog.add-book-modal');

    // display books from array
    displayBooks();
    

    // add book button
    const addBookBtn = document.querySelector('#add-book-btn');
    addBookBtn.addEventListener('click', () => {
        addBookModal.showModal();
    });


    // adding new book and handling form behaviour on submit
    const submitBtn = document.querySelector('#submit-book-btn');
    submitBtn.addEventListener('click', () => {
        // get entered inputs
        let newBookTitle = addBookModal.querySelector('input#title').value;
        let newBookAuthor = addBookModal.querySelector('input#author').value;
        let newBookPages = addBookModal.querySelector('input#pages').value;
        let newBookRead = addBookModal.querySelector('input#read').checked;
        

        // valid input must have title
        if (newBookTitle !== '') {

            // handle pages input
            newBookPages = newBookPages == 0 ? 0 : newBookPages;

            // make a new book from the inputs
            const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
            addBookToLibrary(newBook);
    
            // close modal, reset form
            addBookModal.close();
            addBookModal.querySelector('form').reset();
        }

    });


    // handling form behaviour on cancelation
    const cancelBtn = addBookModal.querySelector('button#cancel');
    cancelBtn.addEventListener('click', () => {
        // close modal, reset form
        addBookModal.close();
        addBookModal.querySelector('form').reset();
    });


});
  