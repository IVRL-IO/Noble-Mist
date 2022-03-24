<template>
  <Navbar test="test" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./shared/navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar
  },

});
</script>

<style scoped></style>
