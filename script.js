let myLibrary = [];
const libWrapper = document.getElementById("library-wrapper");
const cardTitle = document.getElementById("card-title");

//constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
}

//render books details on card
function renderCardView(book) {

    if(book == null) {
        //clear all text if book is null
        const cardViewText = document.querySelectorAll(".card-view-text");

        for(let i = 0; i < cardViewText.length; i++){
            cardViewText[i].textContent = "";
        }

    } else {
        const cardTitle = document.getElementById("card-title");
        const cardAuthor = document.getElementById("card-author");
        const cardPages = document.getElementById("card-pages");
    
        cardTitle.textContent = book.title;
        cardAuthor.textContent = book.author;
        cardPages.textContent = book.pages + " pages";
       
        
        if(book.read == true) {
            document.getElementById("card-read").checked = true;
        } else {
            document.getElementById("card-read").checked = false;
        }
    }
}

//render library
function renderLibrary() {
    //first remove previous render
    while(libWrapper.firstChild) {
        libWrapper.removeChild(libWrapper.lastChild);
    }

    myLibrary.forEach((book) => {
        const newBook = document.createElement("div");
        newBook.className = "book";
        const newBookTitle = document.createElement("div");
        newBookTitle.className = "book-title";
        
        newBookTitle.textContent = book.title;
        newBook.appendChild(newBookTitle);
        libWrapper.appendChild(newBook);

        //add mouseover event to call render card on each book in lib
        newBook.addEventListener("mouseover", () => {
            renderCardView(book);
        })

    })
}

//update data if user changes read checkbox
cardRead = document.getElementById("card-read");

cardRead.addEventListener("change", () => {
    const bookTitle = cardTitle.textContent;
    const libBook = myLibrary.find(book => book.title === bookTitle);

    if(cardRead.checked) {
        libBook.read = true;
    } else {
        libBook.read = false;
    }

    localStorage.setItem("library", JSON.stringify(myLibrary));
})

//add functionality to remove button, update data and render
const remove = document.getElementById("remove");

remove.addEventListener("click", () => {
    const bookTitle = cardTitle.textContent;
    const index = myLibrary.findIndex(book => book.title == bookTitle);

    if(index > -1) {
        myLibrary.splice(index, 1);
    }

    localStorage.setItem("library", JSON.stringify(myLibrary));

    renderCardView();
    renderLibrary();
})

//add functionality to new book button, update data and render
const formNew = document.getElementById("form-new");

formNew.addEventListener("submit", () => {
    
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    let read = false;
    
    if(document.getElementById("read").checked == true) {
        read = true;
    }
    
    const newBook = addBook(title, author, pages, read);

    localStorage.setItem("library", JSON.stringify(myLibrary));

    renderLibrary();
}) 

//on startup if local storage is empty, initialise with book otherwise look local storage into global library
if(localStorage.getItem('library')) {
    myLibrary = JSON.parse(localStorage.getItem('library'));

    renderLibrary();
} else {
    const initBook = addBook("The lord of the rings", "J.R. Tolkien", "1523", true);

    renderCardView(initBook);

    renderLibrary();
}

