import "../styles/reset.css";
import "../styles/styles.css";
import deleteSvg from "../assets/icons/delete.svg";
import readSvg from "../assets/icons/read.svg";
import unreadSvg from "../assets/icons/unread.svg";

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    index = () => {
        return myLibrary.includes(this)
            ? myLibrary.indexOf(this)
            : myLibrary.length;
    };
}

let myLibrary = [];

// sample books
const book0 = new Book("Welcome To Libby", "Mir Yarik", 36, false);

// cards container div
const cardsDiv = document.querySelector(".cards");

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
    cardsDiv.innerHTML = "";

    // display each book on page
    myLibrary.forEach((book) => {
        // create a card for each book
        const card = makeBookCard(book);

        // append card to cards
        cardsDiv.appendChild(card);
    });
}

function toggleRead(book, readBtn) {
    const svgReadDiv = document.createElement("img");
    svgReadDiv.classList.add("icon");

    if (book.read) {
        book.read = false;
        readBtn.innerText = "Unread";
        readBtn.setAttribute("id", "unread");

        // icon
        svgReadDiv.src = unreadSvg;
    } else {
        book.read = true;
        readBtn.innerText = "Read";
        readBtn.setAttribute("id", "read");

        // icon
        svgReadDiv.src = readSvg;
    }

    readBtn.appendChild(svgReadDiv);
}

function makeBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `${book.index()}`);

    // create info div -> title, author, p
    const info = document.createElement("div");
    info.classList.add("info");

    // title
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");

    const titleh2 = document.createElement("h2");
    titleh2.innerText = book.name;

    titleDiv.appendChild(titleh2);

    // author name
    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");

    const authorh3 = document.createElement("h3");
    authorh3.innerText = book.author;

    authorDiv.appendChild(authorh3);

    // pages
    const pagesDiv = document.createElement("div");
    pagesDiv.classList.add("pages");

    const pagesP = document.createElement("p");
    book.pages = book.pages < 99999999 && book.pages > -1 ? book.pages : 0;
    pagesP.innerText =
        book.pages == 1 ? `${book.pages} page` : `${book.pages} pages`;

    pagesDiv.appendChild(pagesP);

    // append to info, into to card
    [titleDiv, authorDiv, pagesDiv].forEach((item) => {
        info.appendChild(item);
    });
    card.appendChild(info);

    // options
    const options = document.createElement("div");
    options.classList.add("options");

    // delete
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete");

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("id", "delete");
    deleteBtn.innerText = "Delete";
    deleteDiv.appendChild(deleteBtn);

    // delete icon
    const svgDelDiv = document.createElement("img");
    svgDelDiv.classList.add("icon");
    svgDelDiv.src = deleteSvg;
    deleteBtn.appendChild(svgDelDiv);

    // read
    const readDiv = document.createElement("div");
    readDiv.classList.add("read");

    const readBtn = document.createElement("button");
    readBtn.setAttribute("id", book.read ? "read" : "unread");
    readBtn.innerText = book.read ? "Read" : "Unread";
    readDiv.appendChild(readBtn);

    // read icon
    const svgReadDiv = document.createElement("img");
    svgReadDiv.classList.add("icon");
    svgReadDiv.src = book.read ? readSvg : unreadSvg;

    readBtn.appendChild(svgReadDiv);

    // append to options, options to card
    [deleteDiv, readDiv].forEach((item) => {
        options.appendChild(item);
    });
    card.appendChild(options);

    // delete button behaviour
    deleteBtn.addEventListener("click", () => {
        const idx = card.getAttribute("id");
        removeBookFromLibrary(idx);
    });

    // read / unread toggle behaviour
    readBtn.addEventListener("click", () => {
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
    const addBookModal = document.querySelector("dialog.add-book-modal");

    // add book button
    const addBookBtn = document.querySelector("#add-book-btn");
    addBookBtn.addEventListener("click", () => {
        addBookBtn.blur();
        addBookModal.showModal();
    });

    function handleModalSubmit() {
        // handle new book form submt

        // get entered inputs
        let newBookTitle = addBookModal.querySelector("input#title").value;
        let newBookAuthor = addBookModal.querySelector("input#author").value;
        let newBookPages = addBookModal.querySelector("input#pages").value;
        let newBookRead = addBookModal.querySelector("input#read").checked;

        // valid input must have title
        if (newBookTitle) {
            // handle pages input
            newBookPages = newBookPages == 0 ? 0 : newBookPages;

            // make a new book from the inputs
            const newBook = new Book(
                newBookTitle,
                newBookAuthor,
                newBookPages,
                newBookRead
            );
            addBookToLibrary(newBook);

            // close modal, reset form
            addBookModal.close();
            addBookModal.querySelector("form").reset();
        }

        submitBtn.blur();
    }

    // adding new book and handling form behaviour on submit
    // and set validity on input change
    const title = addBookModal.querySelector("input#title");
    const author = addBookModal.querySelector("input#author");
    const pages = addBookModal.querySelector("input#pages");
    const read = addBookModal.querySelector("input#read");

    const submitBtn = document.querySelector("#submit-book-btn");
    submitBtn.addEventListener("click", (event) => {
        // prevent default submission behaviour
        event.preventDefault();


        if (validateForm()) {
            handleModalSubmit();
        }

        function validateForm() {
            if (!title.value.trim()) {
                title.setCustomValidity("Title is required");
                title.reportValidity();
                return false;

            }
            else if (!author.value.trim()) {
                author.setCustomValidity("Author is required");
                author.reportValidity();
                return false;
            }
            else if (!pages.value || isNaN(pages.value || (parseInt(pages.value) < 0))) {
                pages.setCustomValidity("Enter a valid number of pages");
                pages.reportValidity();
            }
            else {
                title.setCustomValidity("");
                author.setCustomValidity("");
                pages.setCustomValidity("");
                return true;
            }
        }

    });

    // input change should set validity
    title.addEventListener("input", () => {
        title.setCustomValidity("");
    });

    author.addEventListener("input", () => {
        author.setCustomValidity("");
    });

    pages.addEventListener("input", () => {
        pages.setCustomValidity("");
    });
    

    // enter submits form
    addBookModal.addEventListener("keypress", (event) => {
        if (event.key === "Enter" && title) {
            event.preventDefault();
            handleModalSubmit();
        }
    });

    // handling form behaviour on cancelation
    const cancelBtn = addBookModal.querySelector("button#cancel");
    cancelBtn.addEventListener("click", () => {
        // close modal, reset form
        addBookModal.close();
        addBookModal.querySelector("form").reset();
    });
});
