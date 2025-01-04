
// sample books
const book0 = {
    name: 'Sample Book',
    author: 'Sample Author',
    pages: 999,
    read: true
}

const book1 = {
    name: 'Sample Book',
    author: 'Sample Author',
    pages: 999,
    read: true
}

const book2 = {
    name: 'Sample Book',
    author: 'Sample Author',
    pages: 999,
    read: true
}

const book3 = {
    name: 'Sample Book',
    author: 'Sample Author',
    pages: 999,
    read: true
}

// library array
const myLibrary = [book0, book1, book2, book3];

function Book(name, author, pages, read) {
    // book constructor
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

}


function addBookToLibrary(book) {
    // add book to myLibrary array
    myLibrary.push(book);
}



function displayBooks() {
    
    // display each book on page
    cardsDiv = document.querySelector('.cards');

    myLibrary.forEach(book => {
        // create a card for each book
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
        pages.innerText = book.pages.toString();

        // create red and assign it read status
        const read = document.createElement('p');
        read.innerText = book.read ? 'read' : 'not read';

        // append them all to card
        [title, author, pages, read].forEach(item => {
            card.appendChild(item);
        })

        // append card to cards
        cardsDiv.appendChild(card)
    });

}

document.addEventListener("DOMContentLoaded", (event) => {
    displayBooks();
});
  