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
    if (shouldCloseDialog(addBookDialog, e.clientX, e.clientY)) {
        addBookDialog.close();
    }
});


addBookDialog.addEventListener("close", () => {
    const form = addBookDialog.querySelector("form");
    form.reset();
})

dialogAddButton.addEventListener("click", () => {
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
    if (form.reportValidity()) {

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
    }
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
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