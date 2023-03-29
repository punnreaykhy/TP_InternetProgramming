<!-- LoginView.vue -->
<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <AuthMsg msg="Welcome" />

      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
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

      <form class="w-100" @submit.prevent="login">
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="username" required
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

    <div style="align-self: flex-end">Forgot <a href="#">password?</a></div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import AuthMsg from "../components/AuthMsg.vue";
</script>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/home');
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>


<style>
@import "../assets/app.css";
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
