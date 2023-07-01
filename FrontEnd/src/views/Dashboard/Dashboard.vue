<script >
import authApi from "@/libs/apis/auth";
export default {
  async mounted() {},
  methods: {
    async onLogout() {
      const result = await authApi.logout();
      if (result) this.$router.push({ name: "auth/login" });
    },
  },
};
</script>

<template >
  <main>
    <div class="bg-gray-500 text-white py-2 text-lg text-center relative">
      <h1>You're in Dashboard Page</h1>
      <div
        v-on:click="onLogout()"
        class="
          absolute
          text-white
          right-2
          top-2
          bg-gray-400
          hover:bg-yellow-400
          px-2
          rounded-md
          cursor-pointer
        "
      >
        Logout
      </div>
    </div>
    <div class="flex flex-row">
      <div class="basis-1/5 p-1">
        <div class="flex flex-col p-2 space-y-2 bg-gray-200">
          <router-link to="/dashboard/category"
            ><div class="">Category</div></router-link
          >
          <router-link to="/dashboard/item"
            ><div class="">Item</div></router-link
          >
          <router-link to="/dashboard/product"
            ><div class="">Product</div></router-link
          >
        </div>
      </div>
      <div class="basic-4/5 p-1 w-full">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<style>
</style>