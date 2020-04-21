// ******************** Library Array ******************** //
let myLibrary = [];
// ******************** Book Constructor ******************** //
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}
// ******************** Create Books Function ******************** //
function createBook(title, author, pages, status) {
  console.log("Creating new book..");
  const newBook = new Book(title, author, pages, status);
  console.table(newBook);
  console.log("Created new book.");
  console.log("Adding new book to library..");
  myLibrary.push(newBook);
  console.table(myLibrary);
  console.log("Added new book to library.");
}
// ******************** Create Books ******************** //
createBook("The Hobbit", "J.R.R. Tolkien", 295, "Read");
createBook("The Lord of the Rings", "J.R.R. Tolkien", 1178, "Read");
createBook("The Alchemist", "Paulo Coelho", 208, "Unread");
createBook("The Little Prince", "Antoine de Saint-Exupéry", 96, "Unread");
createBook(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  223,
  "Unread"
);
createBook("Delete This Book", "Delete Me", 100, "Unread");
createBook("The Hobbit", "J.R.R. Tolkien", 295, "Read");
createBook("The Lord of the Rings", "J.R.R. Tolkien", 1178, "Read");
createBook("The Alchemist", "Paulo Coelho", 208, "Unread");
createBook("The Little Prince", "Antoine de Saint-Exupéry", 96, "Unread");
createBook(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  223,
  "Unread"
);
createBook("Delete This Book", "Delete Me", 100, "Unread");
// ******************** Delete Books Function ******************** //
function deleteBook(index) {
  console.log("Deleting book..");
  console.table(myLibrary[index]);
  myLibrary.splice(index, 1);
  console.table(myLibrary);
  console.log("Deleted book.");
}
// ******************** Delete Books ******************** //
myLibrary.forEach((bookInLibrary) => {
  if (bookInLibrary.title == "Delete This Book") {
    deleteBook(myLibrary.indexOf(bookInLibrary));
  }
});
// ******************** Toggle Status Function ******************** //
function toggleStatus(index) {
  console.log("Changing status..");
  console.table(myLibrary[index]);
  let currentStatus = myLibrary[index].status;
  let newStatus = null;
  if (currentStatus == "Read") {
    newStatus = "Unread";
  } else {
    newStatus = "Read";
  }
  myLibrary[index].status = newStatus;
  console.table(myLibrary[index]);
  console.log(`Changed status from ${currentStatus} to ${newStatus}.`);
}
// ******************** Toggle Status ******************** //
toggleStatus(2);
// ******************** Render HTML Function ******************** //
function render() {
  const bookShelf = document.querySelector(".books-container-js");
  bookShelf.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.setAttribute("class", "book");

    const bookInfo = document.createElement("div");
    bookInfo.setAttribute("class", "info");
    let title = book.title;
    let author = book.author;
    let pages = book.pages;
    let status = book.status;
    bookInfo.innerHTML = `#${
      myLibrary.indexOf(book) + 1
    }<br>Title: ${title}<br>Author: ${author}<br>Pages: ${pages}<br>Status: ${status}`;

    bookElement.appendChild(bookInfo);

    let bookIndex = myLibrary.indexOf(book);

    const buttons = document.createElement("div");
    buttons.setAttribute("class", "buttons");

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete");
    deleteButton.setAttribute("data-index", bookIndex);
    deleteButton.textContent = "Delete";
    buttons.appendChild(deleteButton);

    const toggleButton = document.createElement("button");
    toggleButton.setAttribute("class", "toggle");
    toggleButton.setAttribute("data-index", bookIndex);
    if (status == "Read") {
      toggleButton.textContent = "Unread";
    } else {
      toggleButton.textContent = "Read";
    }
    buttons.appendChild(toggleButton);

    bookElement.appendChild(buttons);
    bookShelf.appendChild(bookElement);
  });
}
// ******************** Render HTML ******************** //
render();
// ******************** Add Event Listeners Function ******************** //
function addEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let targetIndex = e.target.dataset.index;
      deleteBook(targetIndex);
      render();
      addEventListeners();
    });
  });
  const toggleButtons = document.querySelectorAll(".toggle");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      let targetIndex = e.target.dataset.index;
      toggleStatus(targetIndex);
      render();
      addEventListeners();
    });
  });
}
// ******************** Add Event Listeners ******************** //
addEventListeners();
// ******************** Form Behavior ******************** //
const showForm = document.querySelector(".add-book-js");
const formDiv = document.querySelector(".form-js");
showForm.addEventListener("click", () => {
  formDiv.classList.add("form-reveal");
  showForm.classList.add("button-hide");
  showForm.classList.remove("button-show");
});
const cancel = document.querySelector("#cancel");
cancel.addEventListener("click", () => {
  formDiv.classList.remove("form-reveal");
  showForm.classList.remove("button-hide");
  showForm.classList.add("button-show");
});
// ******************** Add Book ******************** //
const addBook = document.querySelector("#add");
addBook.addEventListener("click", () => {
  const titleForm = document.querySelector("#title");
  const authorForm = document.querySelector("#author");
  const pagesForm = document.querySelector("#pages");
  const statusForm = document.querySelector("#status");
  let title = titleForm.value;
  let author = authorForm.value;
  let pages = parseInt(pagesForm.value);
  let status = null;
  if (statusForm.checked) {
    status = "Read";
  } else {
    status = "Unread";
  }
  if (
    titleForm.checkValidity() &&
    authorForm.checkValidity() &&
    pagesForm.checkValidity() &&
    statusForm.checkValidity()
  ) {
    createBook(title, author, pages, status);
    render();
    addEventListeners();
  }
});
