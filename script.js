const myLibrary = [];

const addBookDialog = document.querySelector("dialog.add-book-dialog")
const addBookButton = document.querySelector("button.add-book");
addBookButton.addEventListener("click", () => {
    addBookDialog.showModal()
});

const dialogAddButton = document.querySelector(".dialog-add-book");
const dialogDiscardButton = document.querySelector(".dialog-discard");
dialogDiscardButton.addEventListener("click", () => {
    addBookDialog.close();
});

function Book(
    title, author, pages, haveRead
) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {

    const booksContainerDiv = document.querySelector(".books-container");

    myLibrary.forEach((book => {
        const bookItemDiv = document.createElement("div");
        bookItemDiv.classList.add("book-item");

        const bookTitlePara = document.createElement("p");
        bookTitlePara.classList.add("book-title");

        const bookAuthorPara = document.createElement("p");
        bookAuthorPara.classList.add("book-author");

        const bookPagesPara = document.createElement("p");
        bookPagesPara.classList.add("book-pages");

        const bookReadStatusButton = document.createElement("button");
        bookReadStatusButton.type = "button";
        bookReadStatusButton.classList.add("book-read-status");

        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-book");


        bookTitlePara.innerText = book.title;
        bookAuthorPara.innerText = book.author;
        bookPagesPara.innerText = book.pages;
        if (book.haveRead) {
            bookReadStatusButton.innerText = "Read"
            bookReadStatusButton.classList.add("read");
        } else {
            bookReadStatusButton.innerText = "Not Read"
        }
        removeBookButton.innerText = "Remove";

        bookItemDiv.appendChild(bookTitlePara);
        bookItemDiv.appendChild(bookAuthorPara);
        bookItemDiv.appendChild(bookPagesPara);
        bookItemDiv.appendChild(bookReadStatusButton);
        bookItemDiv.appendChild(removeBookButton);

        booksContainerDiv.appendChild(bookItemDiv);
    }));
}