const allowedOrigins = "http://localhost:3000, http://192.168.100.63:3000";
var price = {
  async add({ price, source, product }) {
    const res = await fetch("http://localhost:3001/price/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ price, source, product }),
    });

    const result = await res.json();
    return result;
  },
  async findByPid(id) {
    const res = await fetch(`http://localhost:3001/price/product/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Origin: allowedOrigins,
      },
    });

    const result = await res.json();
    if (!result?.length) return [];

    return result;
  },
  async removeByPid(id) {
    const res = await fetch(`http://localhost:3001/price/deleteAll`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ pID:id }),
    });

    const result = await res.json();
    return result;
  },
  async remove(id) {
    const res = await fetch(`http://localhost:3001/price/delete/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  },
  async edit(price) {
    const res = await fetch(`http://localhost:3001/price/update/${price.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ price: price.price, source: price.source }),
    });

    const result = await res.json();
    return result;
  },
}

export default price
