

const bookTitle = document.querySelector('#title-field > input');
const bookAuthor = document.querySelector('#author-field > input');
const bookPage = document.querySelector('#page-field > input');
const bookRead = document.querySelectorAll('#read-field > input');

let booksContainer = document.querySelector('.books-container');

const submitButton = document.querySelector('form .modal-btn .submit-btn');
const closeButton = document.querySelector('form .modal-btn .close-btn');

const addButton = document.querySelector(".button-container .add-btn");
const modal = document.querySelector(".modal");

let book_counter = 0;

// Book array as defined by the user;
let bookArray = []


// All books to be stored as objects.
function Book(title, author, pages, read, counter){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.counter = counter;
}



// This function needs to be called when the user hits "OK" after entering the details into the form.
function addBookToLibrary(title, author, pages, read){  
  bookArray.push(new Book(title, author, pages, read, book_counter));
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

    createBookCard(title, author, pages, read);
    
    addBookToLibrary(title, author, pages, read);

    clearFromFields();

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

function createBookCard(title, author, pages, read){

  book_counter += 1;

  // Initialize book card
  let newCard = createEle('div', 'book-card');
  let deleteButton = createEle('i', "fas fa-trash-alt");
  deleteButton.setAttribute('data-counter', `${book_counter}`);
  newCard.append(deleteButton);
  booksContainer.appendChild(newCard);

  // Delete button
  deleteButton.addEventListener('click', (e) => deleteCard(e));

  // Fill info
  
  let titleValue = createEle('h2', 'title');
  titleValue.textContent = `Title: ${title}`;
  newCard.append(titleValue);
  
  let authorValue = createEle('h2', 'author');
  authorValue.textContent = `Author: ${author}`;
  newCard.append(authorValue);
  
  let pageValue = createEle('h2', 'pages');
  pageValue.textContent = `Pages: ${pages}`;
  newCard.append(pageValue);
  

  // Toggle Switch
  let readValue = createEle('h2', 'read');
  
  const toggleOn = createEle('i', 'fas fa-check-circle');
  const toggleOff = createEle('i', "far fa-check-circle");

  // Data tracking logic
  toggleOn.addEventListener('click', (e)=> clickToggleButton(e));
  toggleOff.addEventListener('click', (e)=> clickToggleButton(e));
 
  if (read==='yes'){
    toggleOn.setAttribute('data-counter', `${book_counter}`);
    readValue.append(toggleOn);
  }
  else if (read ==='no'){
    toggleOff.setAttribute('data-counter', `${book_counter}`);
    readValue.append(toggleOff)
  }
  // readValue.textContent = `Read?`;
  newCard.append(readValue);
}

// Create element
function createEle(ele, cls){
  let newElement = document.createElement(ele);

  clsArray = cls.split(" ");
  
  clsArray.forEach((cls) => newElement.classList.add(cls));

  return newElement;
}

// Toggle Button Click Logic
function clickToggleButton (e){
  let data = e.target.dataset.counter;
  
  if (e.target.classList.contains('fas')){
    // Change state of the green and red check mark
    e.target.classList.remove('fas');
    e.target.classList.add('far');

    // Change read state in book array
    bookArray[data-1].read = 'no';
  }
  
  else if (e.target.classList.contains('far')){
    e.target.classList.remove('far');
    e.target.classList.add('fas');

    // Change read state in book array
    bookArray[data-1].read = 'yes';
  }
}


// Delete Functionality
function deleteCard(e){
  
  bookArray = bookArray.filter(item => item.counter !== parseInt(e.target.dataset.counter));
  e.target.parentElement.remove();
}

// Show Modal

addButton.addEventListener("click", () => modal.style.display = 'block');

// Close Modal

closeButton.addEventListener('click', () => modal.style.display = 'none');

window.addEventListener('click', (e) => {
  if (e.target.classList[0] === "modal"){
    modal.style.display = 'none';
  }
});





// Button to see the Bookarray for troubleshooting
// const seeButton = document.querySelector('.see-btn');

// seeButton.addEventListener("click", ()=> console.log(bookArray));