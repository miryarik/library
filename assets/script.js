function Book(name, author, pages, read) {
    // book constructor
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = function () {
        return myLibrary.includes(this) ? myLibrary.indexOf(this) : myLibrary.length;
    }

}

let myLibrary = []

// sample books
const book0 = new Book('Welcome To Libby', 'Mir Yarik', 36, false);


// cards container div
const cardsDiv = document.querySelector('.cards');


function addBookToLibrary(book) {

    // add book to myLibrary array
    myLibrary.push(book);

    // add to display
    const card = makeBookCard(book);
    cardsDiv.appendChild(card);
    
}


function removeBookFromLibrary(bookIndex) {

    // remove book from myLibrary array
    myLibrary.splice(bookIndex, 1);
    
    // sync display
    displayBooks();
}


function displayBooks() {

    // remove all cards - Uncomment below Here
    cardsDiv.innerHTML = '';
    
    // display each book on page
    myLibrary.forEach(book => {
        // create a card for each book
        const card = makeBookCard(book);
        
        // append card to cards
        cardsDiv.appendChild(card);
    });

}


function toggleRead(book, readBtn) {

    const svgReadDiv = document.createElement('div');
    svgReadDiv.classList.add('icon');
    let readIconPath = ''

    if (book.read) {
        book.read = false;
        readBtn.innerText = 'Unread';
        readBtn.setAttribute('id', 'unread');
        
        // icon
        readIconPath = "./assets/unread.svg";
    }
    else {
        book.read = true;
        readBtn.innerText = 'Read';
        readBtn.setAttribute('id', 'read');

        // icon
        readIconPath = "./assets/read.svg";
    }

    fetch(readIconPath)
        .then(res => res.text())
        .then(content => {
            svgReadDiv.innerHTML = content;
        });
        
    readBtn.appendChild(svgReadDiv);

}


function makeBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', `${book.index()}`);
    

    // create info div -> title, author, p
    const info = document.createElement('div');
    info.classList.add('info');


    // title
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');

    const titleh2 = document.createElement('h2');
    titleh2.innerText = book.name;

    titleDiv.appendChild(titleh2);

    // author name
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('author');

    const authorh3 = document.createElement('h3');
    authorh3.innerText = book.author;

    authorDiv.appendChild(authorh3);

    // pages
    const pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages');

    const pagesP = document.createElement('p');
    book.pages = book.pages < 99999999 && book.pages > -1 ? book.pages : 0; 
    pagesP.innerText =  book.pages == 1 ? `${book.pages} page` : `${book.pages} pages`;

    pagesDiv.appendChild(pagesP);

    // append to info, into to card
    [titleDiv, authorDiv, pagesDiv].forEach(item => {
        info.appendChild(item);
    });
    card.appendChild(info);


    // options
    const options = document.createElement('div');
    options.classList.add('options');

    // delete
    const deleteDiv = document.createElement('div');
    deleteDiv.classList.add('delete');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('id', 'delete');
    deleteBtn.innerText = "Delete";
    deleteDiv.appendChild(deleteBtn);

    // delete icon
    const svgDelDiv = document.createElement('div');
    svgDelDiv.classList.add('icon')
    const deleteIconPath = "./assets/delete.svg";
    fetch(deleteIconPath)
        .then(res => res.text())
        .then(content => {
            svgDelDiv.innerHTML = content;
        });

    deleteBtn.appendChild(svgDelDiv);


    // read
    const readDiv = document.createElement('div');
    readDiv.classList.add('read');
    
    const readBtn = document.createElement('button');
    readBtn.setAttribute('id', book.read ? 'read' : 'unread');
    readBtn.innerText = book.read ? 'Read' : 'Unread';
    readDiv.appendChild(readBtn);

    // read icon
    const svgReadDiv = document.createElement('div');
    svgReadDiv.classList.add('icon');
    const readIconPath = book.read ? "./assets/read.svg" : "./assets/unread.svg";
    fetch(readIconPath)
        .then(res => res.text())
        .then(content => {
            svgReadDiv.innerHTML = content;
        });

    readBtn.appendChild(svgReadDiv);

    // append to options, options to card
    [deleteDiv, readDiv].forEach(item => {
        options.appendChild(item);
    });
    card.appendChild(options);

    
    // delete button behaviour
    deleteBtn.addEventListener('click', () => {
        const idx = card.getAttribute('id');
        removeBookFromLibrary(idx);
    });
    
    // read / unread toggle behaviour
    readBtn.addEventListener('click', () => {
        toggleRead(book, readBtn);
        readBtn.blur();
    });

    return card;
}



document.addEventListener("DOMContentLoaded", (event) => {

    // library array
    addBookToLibrary(book0);
    
    
    // display books from array
    displayBooks();

    // modal for adding new book
    const addBookModal = document.querySelector('dialog.add-book-modal');


    // add book button
    const addBookBtn = document.querySelector('#add-book-btn');
    addBookBtn.addEventListener('click', () => {
        addBookBtn.blur();
        addBookModal.showModal();
    });

    function handleModalSubmit() {
        // handle new book form submt

        // get entered inputs
        let newBookTitle = addBookModal.querySelector('input#title').value;
        let newBookAuthor = addBookModal.querySelector('input#author').value;
        let newBookPages = addBookModal.querySelector('input#pages').value;
        let newBookRead = addBookModal.querySelector('input#read').checked;

        // valid input must have title
        if (newBookTitle) {

            // handle pages input
            newBookPages = newBookPages == 0 ? 0 : newBookPages;

            // make a new book from the inputs
            const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);
            addBookToLibrary(newBook);
    
            // close modal, reset form
            addBookModal.close();
            addBookModal.querySelector('form').reset();
        }

        submitBtn.blur();
    }

    // adding new book and handling form behaviour on submit
    const submitBtn = document.querySelector('#submit-book-btn');
    submitBtn.addEventListener('click', (event) => {
        
        // prevent default submission behaviour
        event.preventDefault();

        handleModalSubmit();

    });

    // enter submits form
    addBookModal.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && title) {
            event.preventDefault();
            handleModalSubmit();
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
  