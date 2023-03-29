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

  <div class="about border p-3">
    <div class="w-100 headerSign">
      <h1>Sign Up</h1>
      <div>Please fill in this form to create an account.</div>
      <hr />
    </div>

    <form class="w-100" @submit.prevent="register">
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Enter Email"
          v-model="email" required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          type="text"
          class="form-control"
          id="username" v-model="username"
          placeholder="Username" required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">First name</label>
        <input
          type="text"
          class="form-control"
          id="first-name" v-model="firstName"
          placeholder="First Name" required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Last name</label>
        <input
          type="text"
          class="form-control"
          id="last-name" v-model="lastName"
          placeholder="Last Name" required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="password" v-model="password"
          placeholder="Create your Password" required
        />
      </div>
      <div>
        <div class="mb-1">
          By creating an account you agree to our
          <a href="#" class="text-primary">Terms & Privacy</a>.
        </div>
        <button type="submit" class="btn btn-success w-50" style="border-radius: 0%;">Sign Up</button>
      </div>
    </form>
    <p v-if="error" class="text-danger">{{ error }}</p>
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
      lastName: '',
      firstName: '',
      email: '',
      error: '',
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:3000/register', {
          username: this.username,
          password: this.password,
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
        });
        this.$router.push('/');
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.about form:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.headerSign div:nth-child(2) {
  margin-bottom: -15px;
}
input {
  border-radius: 0 !important;
  border: none !important;
  background-color: rgba(211, 211, 211, 0.436) !important;
}
</style>
