// make book detail lists (ID, Title, Author, Pages)
const myLibrary = [];

// book function
function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

//toggle read status (boolean function)
Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
}

// add book
function adddBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

// remove book by id
function removeBookById(id) {
    const index = myLibrary.findIndex((book) => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
}

// display the library
function displayLibrary() {
    const libraryContainer = document.getElementById("libraryGrid");
    libraryContainer.innerHTML = "";
    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement("div");
        status.classList.add("status");
        if (!book.isRead) {
            status.classList.add("status--unread");
        }
        status.textContent = book.isRead ? "Read" : "Not Read";

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
        toggleBtn.classList.add("btn", "ghost");

        toggleBtn.addEventListener("click", () => {
            book.toggleReadStatus();
            displayLibrary();
        })

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("btn", "danger");

        deleteBtn.dataset.id = book.id;

        deleteBtn.addEventListener("click", () => {
            const id = deleteBtn.dataset.id;
            removeBookById(id);
            displayLibrary();
        });

        const actions = document.createElement("div");
        actions.classList.add("actions");
        actions.appendChild(toggleBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(status);
        card.appendChild(actions);

        libraryContainer.appendChild(card);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("addButton");
    const bookForm = document.getElementById("bookForm");
    
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const pagesInput = document.getElementById('pagesInput');
    const isReadInput = document.getElementById('isReadInput');

    addButton.addEventListener("click", () => {
        bookForm.style.display =
            bookForm.style.display === "flex" ? "none" : "flex";
        
        // e.preventDefault();
        // if (bookForm.style.display == "flex") {
        //     bookForm.style.display == "none";
        // } else {
        //     bookForm.style.display == "flex";
        // }
    });

    bookForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = titleInput.value;
        const pages = pagesInput.value;
        const author = authorInput.value;
        const isRead = isReadInput.checked;

        adddBookToLibrary(title, author, pages, isRead);

        displayLibrary();

        bookForm.reset();
        bookForm.style.display = "none";
    });
});

adddBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 200, false);
adddBookToLibrary("1984", "George Orwell", 328, true);

displayLibrary();

