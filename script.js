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

addBookDialog.addEventListener("click", (e) => {
    const elRect = addBookDialog.getBoundingClientRect();

    const clickedInsideDialog = (
        e.clientX >= elRect.left &&
        e.clientX <= elRect.right &&
        e.clientY >= elRect.top &&
        e.clientY <= elRect.bottom
    );

    if (!clickedInsideDialog) {
        addBookDialog.close();
    }

});

dialogAddButton.addEventListener("click", () => {

    const form = addBookDialog.querySelector("form");
    if (form.checkValidity()) {

        const titleInp = document.querySelector("#book-title-input")
        const authorInp = document.querySelector("#book-author-input")
        const pagesInp = document.querySelector("#book-pages-input")
        const haveReadCheckbox = document.querySelector("#book-read-status-checkbox")

        const title = titleInp.value;
        const author = authorInp.value;
        const pages = +pagesInp.value;
        const haveRead = haveReadCheckbox.checked;

        const book = new Book(title, author, pages, haveRead)
        addBookToLibrary(book);
        displayBooks();
        addBookDialog.close();
        form.reset();
    }
});


const textInputs = document.querySelectorAll(`input:is([type="text"],[type="number"])`);
textInputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
        }
    });
});

const checkbox = document.querySelector("label > input");
checkbox.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
        checkbox.checked = !checkbox.checked;
        e.preventDefault();
    }
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
    booksContainerDiv.innerHTML = "";

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