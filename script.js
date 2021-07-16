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




const bookTitle = document.querySelector('#title-field > input');

const button = document.querySelector('form > .submit-btn');


button.addEventListener("click",myFunc);

function myFunc(e){
  e.preventDefault();
  let title = bookTitle.value;
  let author = "jane doe";
  let pages = 23;
  let read = true;

  addBookToLibrary(title, author, pages, read);

}



const seeButton = document.querySelector('.see-btn');

seeButton.addEventListener("click", ()=> console.log(bookArray));