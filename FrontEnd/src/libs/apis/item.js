const allowedOrigins = "http://localhost:3000, http://192.168.100.63:3000";
var item = {
  async create({ name, desc, category }) {
    const res = await fetch("http://localhost:3001/item/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, desc, category }),
    });

    const result = await res.json();
    return result;
  },
  async all() {
    const res = await fetch("http://localhost:3001/item/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Origin: "http://localhost:3000",
      },
    });

    const result = await res.json();
    if (!result?.length) return [];

    return result;
  },
  async edit(item) {
    const res = await fetch(`http://localhost:3001/item/update/${item.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: item.name, desc: item.desc, category: item.category }),
    });

    const result = await res.json();
    return result;
  },
  async remove(id) {
    const res = await fetch(`http://localhost:3001/item/delete/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  },
  async findById(id) {
    const res = await fetch(`http://localhost:3001/item/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Origin: allowedOrigins,
      },
    });

    const result = await res.json();
    if (!result) return "Check Your Req again";

    return result;
  },
}

export default item
