var productsApi = {
    async getAllProduct(cateforyId, itemId) {
        if(cateforyId == ""){
            const res = await fetch('http://localhost:3001/product/all',{
                method: 'GET',
            })
            const result = res.json();
            return result
        }else{
            const res = await fetch(`http://localhost:3001/product/all/${cateforyId}/${itemId}`,{
                method: 'GET',
            })
            const result = res.json();
            return result
        }
    }
}

export default productsApi;