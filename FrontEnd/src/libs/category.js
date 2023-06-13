var categoryApi = {
    async getCategoryItem() {
        const res = await fetch('http://localhost:3001/category/categorized-items',{
            method: 'GET',
            credentials: 'include',
        })
        const result = await res.json();
        return result
    }
}

export default categoryApi