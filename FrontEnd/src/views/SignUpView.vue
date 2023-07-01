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

<template>
  <div style="width: 100%; display: flex; justify-content: center">
    <div style="max-width: 500px">
      <form @submit="onSubmit" style="border: 1px solid #ccc">
        <div class="container">
          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />

          <label for="email"><b>Email</b></label>
          <input
            v-model="email"
            type="text"
            placeholder="Enter Email"
            name="email"
            required
          />

          <label for="username"><b>Username</b></label>
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            name="username"
            required
          />

          <label for="first-name"><b>First name</b></label>
          <input
            v-model="firstName"
            type="text"
            placeholder="First Name"
            name="first-name"
            required
          />

          <label for="last-name"><b>Last name</b></label>
          <input
            v-model="lastName"
            type="text"
            placeholder="Last Name"
            name="last-name"
            required
          />

          <label for="pwd"><b>Password</b></label>
          <input
            v-model="pwd"
            type="password"
            placeholder="Create your Password"
            name="pwd"
            required
          />

          <label for="psw-repeat"><b>Repeat Password</b></label>
          <input
            v-model="repeatPws"
            type="password"
            placeholder="Repeat Password"
            name="psw-repeat"
            required
          />

          <p>
            By creating an account you agree to our
            <a href="#" style="color: dodgerblue">Terms & Privacy</a>.
          </p>

          <div>
            <button type="submit" class="signupbtn">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Full-width input fields */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {
  /* float: left; */
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
</style>