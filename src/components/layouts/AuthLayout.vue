<template>
  <div>
    <Login />
  </div>
</template>

<script>
import Login from "../pages/auth/Login";
export default {
  name: "AuthLayout",
  data: () => ({}),
  components: {
    Login,
  },
};
</script>
