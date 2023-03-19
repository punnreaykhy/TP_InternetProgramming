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

    <form class="w-100">
      <div class="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="Enter Email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="Username"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">First name</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="First Name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Last name</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          placeholder="Last Name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Create your Password"
        />
      </div>
      <div>
        <div class="mb-1">
          By creating an account you agree to our
          <a href="#" class="text-primary">Terms & Privacy</a>.
        </div>
        <RouterLink to="/home" class="btn btn-success w-50" style="border-radius: 0%;">Sign Up</RouterLink>
      </div>
    </form>
  </div>
  
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import AuthMsg from "../components/AuthMsg.vue";
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
