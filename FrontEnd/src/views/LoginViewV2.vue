<!-- LoginView.vue -->
<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="../assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">

      <nav>
        <RouterLink to="/login"><h3>Login</h3></RouterLink>
        <RouterLink to="/signup"><h3>Register</h3></RouterLink>
      </nav>
    </div>
  </header>

  <div class="login">
    <div class="login p-3 border w-100">
      <img
        class="mb-5"
        src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTx_Mvfzz5u4lucj379K7SCTEKuvVNjqcSy0UR-v4mwtRSY3zFf"
        alt="userIMG"
        style="border-radius: 100%"
      />

      <form class="w-100" @submit="onSubmit" method="post">
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            v-model="email" required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control mb-3"
            placeholder="Enter Password"
            v-model="password" required
          />
        </div>
        <button type="submit" class="w-100 btn btn-success">Login</button>
      </form>
      <p v-if="error" class="text-danger">{{ error }}</p>
    </div>

    <!-- <div style="align-self: flex-end">Forgot <a href="#">password?</a></div> -->
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";

</script>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  async mounted() {
    
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      const result = await res.json();
      if (!result.success) {
        alert(result.error);
        return;
      }

      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>


<style scoped>
@import 'bootstrap/dist/css/bootstrap.css';
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
