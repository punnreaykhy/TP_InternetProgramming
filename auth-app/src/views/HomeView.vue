<template>
  <div v-if="isLogin === true" class="myHome" style="width:88vw; margin:auto;">
    <div class="nav1 d-flex justify-content-between align-items-center w-100">
      <div class="myLogo">
        <a class="text-black gap-4 pe-4 d-flex fs-1 fw-semibold align-items-center" href="#"><img src="https://gic.itc.edu.kh/img/logo.png" alt="myLogo" style="width:82px; height:64px">GIC</a>
      </div>
      <div class="menu h-100 d-flex align-items-center">
        <ul style="list-style-type:none" class="d-flex gap-3 mt-3">
          <li><a href="#">ABOUT US</a></li>
          <li><a href="#">ACADEMICS</a></li>
          <li><a href="#">WHY GIC</a></li>
          <li><a href="#">LIFESTYLE</a></li>
          <li><a href="#">CONTACT</a></li>
        </ul>
      </div>
      <div class="search-logout d-flex gap-4 align-items-center">
        <i class="bi bi-search btn"></i>
        <div class="bg-black" style="width: 2px; height:1.5rem;"></div>
        <button class="btn" @click="logout">Logout</button>
      </div>
    </div>

    <div class="container d-flex h-75">
      <div class="content1 d-flex flex-column justify-content-center" style="width:45%; height: 90;">
        <h1 class="fw-bold">Deep Learning Through Deep Connections.</h1>
        <p class="fst-italic fs-5 my-2">Taking a deep dive.</p>
        <p>The hero's journey starts here. Become a learing legend.</p>
        <button class="btn w-50 py-2 my-4">GET STARTED</button>
        <p class="my-3">Elevate your experience. Empower the next generation.</p>
        <a href="#" style="width:fit-content">JOIN OUR TEAM</a>
      </div>

      <div style="width: 90%;">
        <img src="../assets/Home-Page-Header.png" alt="" class="w-100">
      </div>
    </div>



    <!-- <h1>Home</h1>
    <p>Welcome, {{ username }}!</p>
    <button @click="logout">Logout</button> -->
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLogin: false
    };
  },
  computed: {
    username() {
      if(this.isLogin){
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username;
      }
    },
  },
  methods: {
    logout() {
      this.isLogin = false;
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
  created() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/');
    }else{
      this.isLogin = true;
    }
  },
};
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
button:hover{
  background-color: rgba(169, 248, 255, 0.912) !important;
}

.myHome{
  width: 100%;

}
.nav1{
height: 5rem;
}
.nav1 a{
text-decoration: none;
color: black;
font-weight: bold;
}

.search-logout button{
font-weight: bold;
font-size: 1.2rem;
color: #EA708B;
}

.content1 a{
font-weight: bold;
color: black;
text-decoration-line: underline;
text-decoration-style: solid;
text-underline-offset: 5px;
}

.content1 button{

color: white;
background-color:#EA708B;
}


</style>