<script >
import TheWelcome from "@/components/TheWelcome.vue";
export default {
  components: {
    TheWelcome,
  },
  setup() {
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  async mounted() {
    console.log("hello world");
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

<template>
  <main>
    <div style="width: 100%; display: flex; justify-content: center">
      <div style="max-width: 500px">
        <form @submit="onSubmit" method="post">
          <div class="imgcontainer">
            <img
              src="https://www.w3schools.com/howto/img_avatar2.png"
              alt="Avatar"
              class="avatar"
            />
          </div>

          <div class="container">
            <label for="email"><b>Username</b></label>
            <input
              v-model="email"
              type="text"
              placeholder="Enter email"
              name="email"
              required
            />

            <label for="psw"><b>Password</b></label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />

            <button type="submit">Login</button>
          </div>

          <div
            class="container"
            style="
              background-color: #f1f1f1;
              display: flex;
              justify-content: end;
            "
          >
            <!-- <span class="psw">Forgot </span> -->
            <RouterLink to="/signup">Create your new account here.</RouterLink>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Bordered form */
form {
  border: 3px solid #f1f1f1;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
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
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>