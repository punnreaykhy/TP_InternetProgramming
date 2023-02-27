if(!localStorage.getItem('bookss')){localStorage.setItem('bookss', '[]');} 
var app = new function () {
            
    this.books = getAllBooks();

    this.el = document.getElementById('listBox');

    this.FetchAll = function () {
        var data = '';

        if (this.books.length > 0) {
            for (i = 0; i < this.books.length; i++) {
                data += `
                    <div class="boxContainer">
                        <div class="flex justify-end space-x-1">
                            <button class="btn1" onclick="app.Delete(${i})">Delete</button>
                            <button class="btn1" onclick="app.Edit(${i})">Change name</button>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[6rem] m-auto mt-4 mb-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>

                        <div class="detail">
                            <p>Name: ${this.books[i].name}</p>
                            <p>Price: ${this.books[i].price} riel</p>
                            <p>Category: ${this.books[i].category}</p>
                        </div>
                    </div>
                `;
            }
        }

        return this.el.innerHTML = data;
    };

    this.Add = function () {
        const d = new Date();
        let idB = d.getTime();
        let index = 0;
        
        inputName = document.getElementById('add-name');
        inputCategory = document.getElementById('add-category');
        inputPrice = document.getElementById('add-price');
        // Get the value
        var book = { id: idB, name: inputName.value, price: inputPrice.value, category: inputCategory.value };

        if (book) {
            // Add the new value
            this.books.push(book);
            // Reset input value
            inputName.value = '';
            inputCategory.value = '';
            inputPrice.value = '';
            localStorage.setItem('bookss', JSON.stringify(this.books));
            // Dislay the new list
            this.FetchAll();
        }
    };

    this.Edit = function (item) {
        var editName = prompt("Enter new name: ");
        if(editName){
            this.books[item].name = editName;
            localStorage.setItem('bookss', JSON.stringify(this.books));
            this.FetchAll();
        }
    };

    this.Delete = function (item) {
        // Delete the current book
        this.books.splice(item, 1);
        localStorage.setItem('bookss', JSON.stringify(this.books));
        // Display the new list
        this.FetchAll();
    };

}
function getAllBooks () {
    const getbooks = localStorage.getItem('bookss');
    let databooks = JSON.parse(getbooks);
    return databooks;
}

app.FetchAll();