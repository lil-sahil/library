const bookTitle = document.querySelector('#title-field > input');
const bookAuthor = document.querySelector('#author-field > input');
const bookPage = document.querySelector('#page-field > input');
const bookRead = document.querySelectorAll('#read-field > input');

const submitButton = document.querySelector('form > .submit-btn');

console.log(bookPage.value);

// Book array as defined by the user;
let bookArray = []


// All books to be stored as objects.
function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}


// This function needs to be called when the user hits "OK" after entering the details into the form.
function addBookToLibrary(title, author, pages, read){  
  bookArray.push(new Book(title, author, pages, read));
}



// Form data aquisition---------


submitButton.addEventListener("click",myFunc);

function myFunc(e){
  e.preventDefault();
  let title = bookTitle.value;
  let author = bookAuthor.value;
  let pages = bookPage.value;
  let read = '';
  
  bookRead.forEach(option => {
    if (option.checked){
      read = option.value;
    };
  });

  // Validate the data

  if (dataValidation(title, author, pages, read)){

    addBookToLibrary(title, author, pages, read);

    clearFromFields();
  }

  else {
    return false;
  }
}


// Form data validation

function dataValidation(title, author, pages, read){

  let focusFields = [];
  // title
  if (title.length < 1){
    focusFields.push(bookTitle);
  }

  // author
  if (author.length < 1){
    focusFields.push(bookAuthor);
  }

  // read
  if (read.length < 1){
    focusFields.push(bookRead[0]);
  }

  // pages
  if (pages <= 0){
    focusFields.push(bookPage);
  }

  if (focusFields.length === 0){
    return true;
  }

  else {
    focus(focusFields);
  }

}

// Focus Field with missing data
function focus(arr){
  arr.forEach(field => field.focus());
}

// Clear form field
function clearFromFields(){
  bookTitle.value = "";
  bookAuthor.value = "";
  bookPage.value = "";
  bookRead.forEach(option => option.checked = false);
}

// --------------------------------



// Display items in bookarray as flex items


const seeButton = document.querySelector('.see-btn');

seeButton.addEventListener("click", ()=> console.log(bookArray));