 
 // Get data from HTML
let listWrapperEle = document.getElementById("list-wrapper");
let add = document.getElementById("add");

let keY = document.getElementById("Key");
let valuE = document.getElementById("Value");
let datE = document.getElementById("Date");


function renderList() {
    listWrapperEle.innerHTML += `
    <div class="row" id="${keY.value}">
        <div style="width: 25%;">${keY.value}</div>
        <div style="width: 20%; margin-right:6em" >${valuE.value}</div>
        <button class="expiredButton" onclick="deleteRow(this)">
            <div> Set expired  </div>
            <div>
            <img src="./Images/RedTrashButton.png" alt="Delete" style="width:20px; height:30px; ">
            </div>
        </button>
    </div>
     `
}

add.addEventListener("click", () => {
    renderList();
    let pareDate = datE.value.split("-"); //need to parse Date and get each value

    let cookie = keY.value + "=" + valuE.value + "; expires=" + new Date(pareDate[0], pareDate[1], pareDate[2]).toUTCString();
    console.log(cookie);
    document.cookie = cookie;
});


(function restoreData_Cookie() {
    let pareCookie=document.cookie.split("; ");// ex: 'AAA=11111; BBBBB=11111; CCC=11111'
    console.log(pareCookie)
    for(let x of pareCookie){//so x will have Name = Value 
        keY.value=x.split("=")[0];
        valuE.value=x.split("=")[1];
        renderList();
        console.log(x);
    } //expected a lot of error...
})();


function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

function deleteRow(currentNode) {
    let parent = currentNode.parentNode;
    deleteCookie(parent.id);            
    parent.remove();
}