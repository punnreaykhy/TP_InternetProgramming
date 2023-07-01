<template>
  <header>

    <div class="wrapper">
      <AuthMsg msg="Welcome" />

      <nav>
        <RouterLink to="/login"><h3>Login</h3></RouterLink>
        <RouterLink to="/signup"><h3>Register</h3></RouterLink>
      </nav>
    </div>
  </header>

  <div class="about border p-3">
    <div class="w-100 headerSign">
      <h1>Sign Up</h1>
      <div>Please fill in this form to create an account.</div>
      <hr />
    </div>

    <form class="w-100" @submit="onSubmit">
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
          placeholder="Enter Username" required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">First name</label>
        <input
          type="text"
          class="form-control"
          id="firstName" v-model="firstName"
          placeholder=" Enter First Name" required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Last name</label>
        <input
          type="text"
          class="form-control"
          id="lastName" v-model="lastName"
          placeholder="Enter Last Name" required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="password" v-model="pwd"
          placeholder="Create your Password" required
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Confirm Password</label>
        <input
          type="password"
          class="form-control"
          id="password" v-model="repeatPws"
          placeholder="Re-Input your Password" required
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
  </div>
  
</template>


<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<script>
export default {
  data() {
    return {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      pwd: "",
      repeatPws: "",
    };
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.pwd,
          repeat_password: this.repeatPws,
        }),
      });

      const result = await res.json();
      if (!result.success) {
        alert(result.error);
        return;
      }

      alert("Successfully registered~");
      this.$router.push({ name: "auth/login" });
    },
  },
};
</script>

<style scoped>
@import 'bootstrap/dist/css/bootstrap.css';
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
