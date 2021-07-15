
const submitButton = document.querySelector('.submit-btn');

// Event listner for submit button
submitButton.addEventListener(onclick, addBookToLibrary);


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
function addBookToLibrary(){  
  let bookName = document.querySelector('form-container > .book-title').value;  
  let bookAuthor = document.querySelector('.form-container > .author').value;  
  let bookPages = document.querySelector('.form-container > .pages').value;  
  let read = document.querySelector('.form-container > .read').value;

  console.log(bookName);

  bookArray.push(new Book(bookName, bookAuthor, bookPages, read));
}


// Validate form
function validateForm(name, author, pages, read){
  if ( (name !== "") && (author !== "") && ( (pages !== "") && (parseInt(pages) !== Nan) ) && (read == "yes" || read == "no") ){
    return true;
  }

  else{
    return false;
  }
}