class Book {
    title;
    author;
    pages;
    haveRead;
    constructor(title, author, pages, haveRead
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateLocalStorage();
}

function displayBooks() {

    const booksContainerDiv = document.querySelector(".books-container");
    booksContainerDiv.innerHTML = "";

    myLibrary.forEach(((book, index) => {
        const bookItemDiv = document.createElement("div");
        bookItemDiv.classList.add("book-item");
        bookItemDiv.dataset.bookIndex = index;

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
        bookReadStatusButton.addEventListener("click", () => {
            const index = bookItemDiv.dataset.bookIndex;
            toggleBookReadStatus(index);
            bookReadStatusButton.classList.toggle("read");
            if (bookReadStatusButton.classList.contains("read")) {
                bookReadStatusButton.innerText = "Read";
            } else {
                bookReadStatusButton.innerText = "Not Read";
            }
        });

        removeBookButton.innerText = "Remove";
        removeBookButton.addEventListener("click", (e) => {
            const index = bookItemDiv.dataset.bookIndex;
            //TODO: Display a confirmation modal first.
            removeConfirmationDialog.returnValue = `n${index}`;
            removeConfirmationDialog.showModal();
        });

        bookItemDiv.appendChild(bookTitlePara);
        bookItemDiv.appendChild(bookAuthorPara);
        bookItemDiv.appendChild(bookPagesPara);
        bookItemDiv.appendChild(bookReadStatusButton);
        bookItemDiv.appendChild(removeBookButton);

        booksContainerDiv.appendChild(bookItemDiv);
    }));
}

function handleDialogAddClick() {
    const form = addBookDialog.querySelector("form");
    validateTitleInput();
    validateAuthorInput();
    validatePagesInput();    
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
        form.reset();
        addBookDialog.close();
    }
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    updateLocalStorage();
    displayBooks();
}

function updateLocalStorage() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function loadDataFromLocalStorage() {
    const libraryJson = localStorage.getItem("library");
    if (libraryJson !== null) {
        const library = JSON.parse(libraryJson);
        myLibrary = library.map(book=>{
            return new Book(book.title,book.author,book.pages,book.haveRead)
        });
    }

}

function toggleBookReadStatus(index) {
    myLibrary[index].haveRead = !myLibrary[index].haveRead;
}


function shouldCloseDialog(dialogEl, clickX, clickY) {

    const rect = dialogEl.getBoundingClientRect();
    const clickedInsideDialog = (
        clickX >= rect.left &&
        clickX <= rect.right &&
        clickY >= rect.top &&
        clickY <= rect.bottom
    );
    //Pressing enter in a form also triggers click of the submit button so here we are.
    const actuallyClicked = !(clickX === 0 && clickY === 0);
    return actuallyClicked && !clickedInsideDialog;
}


function validateTitleInput() {
    const titleInp = document.querySelector("input#book-title-input");
    const titleError = document.querySelector(".title-error");

    titleInp.setCustomValidity("");
    titleError.innerText = ""

    if (titleInp.validity.valueMissing) {
        titleInp.setCustomValidity("You have to specify a name for this book");
        titleError.innerText = "You have to specify a name for this book";
        return;
    }

    if (titleInp.validity.tooShort) {
        titleInp.setCustomValidity("Book's title should be at least 4 characters long");
        titleError.innerText = "Book's title  should be at least 4 characters long";
        return;
    }

    if (titleInp.validity.tooLong) {
        titleInp.setCustomValidity("Book's title  should be at most 30 characters long");
        titleInp.innerText = "Book's title should be at most 30 characters long";
        return;
    }

}

function validateAuthorInput() {
    const authorInp = document.querySelector("input#book-author-input");
    const authorError = document.querySelector(".author-error");

    authorInp.setCustomValidity("");
    authorError.innerText = ""

    if (authorInp.validity.valueMissing) {
        authorInp.setCustomValidity("You have to specify an author for this book");
        authorError.innerText = "You have to specify an author for this book";
        return;
    }

    if (authorInp.validity.tooShort) {
        authorInp.setCustomValidity("Author's name should be at least 4 characters long");
        authorError.innerText = "Author's name should be at least 4 characters long";
        return;
    }

    if (authorInp.validity.tooLong) {
        authorInp.setCustomValidity("Author's name should be at most 30 characters long");
        authorInp.innerText = "Author's name should be at most 30 characters long";
        return;
    }

    const regex = /\d/;
    if (regex.test(authorInp.value.toString())) {
        authorInp.setCustomValidity("Author's name can not contain any digits");
        authorError.innerText = "Author's name can not contain any digits";
        return;
    }

}

function validatePagesInput() {
    const pagesInp = document.querySelector("input#book-pages-input");
    const pagesError = document.querySelector(".pages-error");

    pagesInp.setCustomValidity("");
    pagesError.innerText = ""

    if (pagesInp.validity.valueMissing) {
        pagesInp.setCustomValidity("You have to specify a value for pages");
        pagesError.innerText = "You have to specify a value for pages";
        return;
    }

    if (pagesInp.validity.rangeUnderflow) {
        const min = +pagesInp.min;
        pagesInp.setCustomValidity(`The number of pages can not be less than ${min}`);
        pagesError.innerText = `The number of pages can not be less than ${min}`;
        return;
    }

    if (pagesInp.validity.rangeOverflow) {
        const max = +pagesInp.max;
        pagesInp.setCustomValidity(`The number of pages can not be less than ${max}`);
        pagesError.innerText = `The number of pages can not be less than ${max}`;
        return;
    }
}

let myLibrary = [];
loadDataFromLocalStorage();
displayBooks();

const addBookDialog = document.querySelector("dialog.add-book-dialog")
const addBookButton = document.querySelector("button.add-book");
addBookButton.addEventListener("click", () => {
    addBookDialog.showModal()
});

const titleInp = addBookDialog.querySelector("input#book-title-input");
titleInp.addEventListener("input", ()=>{
    validateTitleInput();
});

const authorInp = addBookDialog.querySelector("input#book-author-input");
authorInp.addEventListener("input", ()=>{
    validateAuthorInput();
});

const pagesInp = addBookDialog.querySelector("input#book-pages-input");
pagesInp.addEventListener("input", ()=>{
    validatePagesInput();
});


const dialogAddButton = document.querySelector(".dialog-add-book");
const dialogDiscardButton = document.querySelector(".dialog-discard");
dialogDiscardButton.addEventListener("click", () => {
    addBookDialog.querySelector("form").reset();
    titleInp.setCustomValidity("");
    authorInp.setCustomValidity("");
    pagesInp.setCustomValidity("");
    addBookDialog.close();
});

addBookDialog.addEventListener("click", (e) => {
    if (shouldCloseDialog(addBookDialog, e.clientX, e.clientY)) {
        addBookDialog.close();
    }
});


addBookDialog.addEventListener("close", () => {
    const form = addBookDialog.querySelector("form");
    form.reset();
})

dialogAddButton.addEventListener("click", (e) => {
    e.preventDefault();
    handleDialogAddClick();
});


const removeConfirmationDialog = document.querySelector("dialog.remove-book-confirmation");
const removeConfirmButton = removeConfirmationDialog.querySelector(".remove-confirm");
const removeCancelButton = removeConfirmationDialog.querySelector(".remove-cancel");

removeConfirmationDialog.addEventListener("click", (e) => {

    if (shouldCloseDialog(removeConfirmationDialog, e.clientX, e.clientY)) {
        removeConfirmationDialog.close();
    }

});


removeConfirmationDialog.addEventListener("close", () => {
    const index = +removeConfirmationDialog.returnValue;
    if (index > -1) {
        removeBookFromLibrary(index)
    }
});
removeConfirmButton.addEventListener("click", () => {
    const confirmedReturnValue = removeConfirmationDialog.returnValue.substring(1);
    removeConfirmationDialog.returnValue = confirmedReturnValue;
    removeConfirmationDialog.close();
});
removeCancelButton.addEventListener("click", () => {
    removeConfirmationDialog.returnValue = "-1";
    removeConfirmationDialog.close();
});

