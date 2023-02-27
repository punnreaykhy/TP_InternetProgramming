var output = document.getElementById("output")
var title = document.getElementById("title")
var assignee = document.getElementById("assignee")
var deadline = document.getElementById("deadline")
var addbtn = document.getElementById("add-btn")
var listEle = document.getElementById("list-wrapper")
var todoList = getAllStorage()


function renderList () {
    let listContent='';
    todoList.forEach(function callback(todo, index)  {
        let d = getDateFormat(todo.deadline);
        listContent += `

            <div id="output" class="output bg-white flex items-center justify-center align-center h-14 mt-5 mb-5 rounded-xl p-5 pl-[8%] pr-[8%] border-light-white border-2">
                <div class="input-title w-1/3 ">
                    <div class="column">${todo.title}</div>
                </div>
                <div class="input-assignee w-1/3 ">
                    <div class="column">${todo.assignee}</div>
                </div>
                <div class="input-deadline w-1/3">
                    <div class="column">${d}</div>
                </div>
                <div class="input-deadline w-fit flex justify-end">
                <div class="w-1/3 h-full flex items-center justify-center">
                    <button type="button" id="${index}" class="h-10 w-16 bg-white-700 rounded-xl text-light-gray-60" value="delete" onclick="remove('${todo.id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
                </div>
            </div>
            `
    });

    listEle.innerHTML = listContent;
}

function add (idValue, titleValue, assigneeValue, deadlineValue) {
    var todo = {id:idValue, title:titleValue, assignee:assigneeValue, deadline:deadlineValue}
    todoList.push(todo)
    localStorage.setItem(idValue+"", JSON.stringify(todo))
    title.value = "";
    assignee.value = "";
    deadline.value = "";
    
    renderList();
}

function remove (id) {
    localStorage.removeItem(id)
    todoList = getAllStorage()
    renderList();
}

function getAllStorage() {
    let keys = [];
    let tmplist = []
    for (let i=0; i<localStorage.length; i++){
        keys.push(localStorage.key(i))
     }

    for ( i=0; i<keys.length; i++ ) {
        let todo = JSON.parse(localStorage.getItem(keys[i]));
        tmplist.push( todo );
    }
    tmplist.sort( (a,b) => a.id - b.id );
    return tmplist;
}

function getDateFormat(dateValue) {

    let d = new Date(dateValue);
  
    // this pattern dd/mm/yyyy
    // you can set pattern you need
    let dstring = `${("0" + d.getDate()).slice(-2)}/${("0" + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;
  
    return dstring;
}



renderList();
addbtn.addEventListener("click", () => {
    const d = new Date();
    let id = d.getTime();
    add(id, title.value, assignee.value, deadline.value);
})

