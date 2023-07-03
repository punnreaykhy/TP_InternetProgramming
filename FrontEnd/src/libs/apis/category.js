const allowedOrigins = "http://localhost:3000, http://192.168.100.63:3000";
var category = {
  async create({ name, desc, imageUrl }) {
    const res = await fetch("http://localhost:3001/category/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, desc, imageUrl }),
    });

    const result = await res.json();
    return result;
  },
  async all() {
    const res = await fetch("http://localhost:3001/category/all", {
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
  async edit(item) {
    const res = await fetch(`http://localhost:3001/category/update/${item.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: item.name, desc: item.desc, imageUrl: item.imageUrl }),
    });

    const result = await res.json();
    return result;
  },

  async remove(id) {
    const res = await fetch(`http://localhost:3001/category/delete/${id}`, {
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
    const res = await fetch(`http://localhost:3001/category/${id}`, {
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
  async categorizedItem() {
    const res = await fetch("http://localhost:3001/category/categorized-items", {
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
  }
}

export default category
