<template>
    <div class="card">
      <img
        class="card-img"
        src="https://th.bing.com/th/id/OIP.U26PeG_AJe_Ow3mpNMQvmAAAAA?pid=ImgDet&w=128&h=128&rs=1"
        alt=""
      />
      <div class="card-title">{{ products.title }}</div>
      <br />
      <div class="card-price">{{ products.desc }}</div>
    </div>
  </template>
  
  <script>
  export default {
      props: ["products"]
  };
  </script>
  
  <style scoped>
  .card {
    width: 160px;
    height: 220px;
    border: 1px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .card-img {
    text-align: center;
    width: 80%;
  }
  
  .card-title {
    text-align: center;
  }
  
  .card-price {
    color: red;
    font-weight: bold;
    text-align: center;
  }
  </style>