const myLibrary = [
    { 
      id: "1677423840521xkf29p3jl",
      author: "J.K. Rowling", 
      title: "Harry Potter and the Sorcerer's Stone", 
      numberOfPages: 309, 
      isRead: true, 
      image: "images/jk.jpeg" 
    },
    { 
      id: "1677423840522lmt76q9dn",
      author: "George Orwell", 
      title: "1984", 
      numberOfPages: 328, 
      isRead: false, 
      image: "images/1984.jpg"
    },
    { 
      id: "1677423840523pqr83z5ac",
      author: "Harper Lee", 
      title: "To Kill a Mockingbird", 
      numberOfPages: 281, 
      isRead: true, 
      image: "images/mocking.jpg" 
    },
    { 
      id: "1677423840524sty47b2vw",
      author: "F. Scott Fitzgerald", 
      title: "The Great Gatsby", 
      numberOfPages: 180, 
      isRead: false, 
      image: "images/gatsby.jpg" 
    },
    { 
      id: "1677423840525hji16c8no",
      author: "J.R.R. Tolkien", 
      title: "The Hobbit", 
      numberOfPages: 310, 
      isRead: true, 
      image: "images/hobbit.jpeg"
    },
    { 
      id: "1677423840526eku92d7fx",
      author: "Jane Austen", 
      title: "Pride and Prejudice", 
      numberOfPages: 432, 
      isRead: false, 
      image: "images/Prideandprejudice.png"
    },
    { 
      id: "1677423840527gzv38e1yh",
      author: "George R.R. Martin", 
      title: "A Game of Thrones", 
      numberOfPages: 694, 
      isRead: true, 
      image: "https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg" 
    },
];

  
  //book cons
  function Book(author, title, numberOfPages, isRead, image) {
    this.author = author; 
    this.title = title; 
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
    this.image = image;
    this.id = Date.now() + Math.random().toString(36).substring(2, 11);
}

function addBookToLibrary(author, title, numberOfPages, isRead,image) {
    let book = new Book(author, title, numberOfPages, isRead,image);
    myLibrary.push(book);
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

function removeBookFromLibrary(bookId) {
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }
}

function displayBooks(){


    const container = document.getElementById('booksContainer');

    container.innerHTML = '';


    myLibrary.forEach( (book, index) => {


        const card = document.createElement("div");
        card.className = 'card';
        card.setAttribute('data-book-id', book.id);

    
        const authorE = document.createElement("h4");
        authorE.className = 'author';
        authorE.textContent= book.author;
    
        const titleE = document.createElement("h4");
        titleE.className = 'title';
        titleE.textContent= book.title;
    
    
        const numberOfPagesE = document.createElement("p");
        numberOfPagesE.textContent= book.numberOfPages;
    
    
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", book.isRead ? "fa-book-open" : "fa-book", "icon");
        if (book.isRead) icon.classList.add("read");

        // Toggle read status on click
        icon.addEventListener("click", () => {
            book.toggleReadStatus();
            displayBooks(); // Re-render to reflect changes
        });


          // Remove button
          const removeBtn = document.createElement("button");
          removeBtn.className = 'remove-btn';
          removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Remove';
          
          // Remove book on click
          removeBtn.addEventListener("click", () => {
              removeBookFromLibrary(book.id);
          });

    
    
        const pic = document.createElement("img");
        pic.src = book.image
    
        card.appendChild(pic);
        card.appendChild(titleE);
        card.appendChild(authorE);
        card.appendChild(numberOfPagesE);
        card.appendChild(icon);
        card.appendChild(removeBtn);
        container.appendChild(card);
    
    
    
        
    });



}

displayBooks();


const dialog = document.createElement("dialog");
dialog.id = "dialog";
dialog.innerHTML = `
    <form id="bookForm">
        <h3>Add a New Book</h3>

        <div>
            <label for="title">Title:</label>
            <input id="title" type="text" name="title" required>
        </div>

        <div>
            <label for="author">Author:</label>
            <input id="author" type="text" name="author" required>
        </div>

        <div>
            <label for="pages">Number of Pages:</label>
            <input id="pages" type="number" name="pages" required>
        </div>

        <div>
            <label for="read">Have you read it?</label>
            <select id="read" name="read">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>

        <div>
            <label for="image">Upload Book Cover:</label>
            <input type="file" id="image" name="image" accept="image/*">
        </div>

        <div class="dialogButtons">
            <button type="button" id="closeDialog">Close</button>
            <button type="submit" id="saveBook">Save</button>
        </div>
    </form>
`;


document.body.appendChild(dialog);


const closeBtn = document.querySelector("#closeDialog");
const bookForm = document.querySelector("#bookForm");
const addBookBtn = document.querySelector("#addBook");

addBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.addEventListener("click", () => {
    dialog.close();
});

bookForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value; 
    const pages = document.querySelector("#pages").value;   
    const read = document.querySelector("#read").value; 
 
    const imageFile = document.querySelector("#image").files[0];
    
    console.log("Adding book with image:", imageFile);
    
    // Use a default image or placeholder if none is provided
    const imagePath = imageFile ? URL.createObjectURL(imageFile) : "images/default-book.png";

    

    addBookToLibrary(author, title, pages, read === "yes", imagePath);

    displayBooks();
    dialog.close();


});



