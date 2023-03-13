let loadingTextEle = document.getElementById("loading");
function getData() {
    loadingTextEle.hidden = false;

    fetch(`https://jsonplaceholder.typicode.com/photos`)
        .then(async (res) => {
            let data = await res.json();
            let dataToInner = "";
            data.forEach(element => {
                dataToInner += `
                    <div class="boxContainer">
                        <img src="${element.thumbnailUrl}" alt="bookIMG" class="m-auto">
                        <div class="detail">
                            <div class="font-bold">${element.title}</div>
                            <p>Album ID: ${element.albumId} riel</p>
                            <p>Category: ${element.id}</p>
                        </div>
                        <a href="/detail/${element.id}" class="text-blue-500">See</a>
                    </div>
                    `
            });

            document.getElementById("listBox").innerHTML = dataToInner;
            loadingTextEle.hidden = true;
        });
}
getData();