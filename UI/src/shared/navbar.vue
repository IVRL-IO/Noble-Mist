<script setup>
import {  MediaProvider, titleCase } from "../types/index"
</script>
<template>
  <nav class="navbar fixed-top navbar-expand-lg">
    <a class="navbar-brand" href="#">
      <img src="/src/assets/logo.png" height="30" alt="" />
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="collapse navbar-collapse justify-content-end px-5"
      id="navbarSupportedContent"
    >
      <div class="navbar-nav mr-auto">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            aria-label="Search"
          />
          <div class="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              class="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                  :src="`src/assets/search_providers/${selectedMediaProvider}.png`"
                  height="16" class="px-2"
              />{{ titleCase(selectedMediaProvider) }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  v-on:click.stop="selectedMediaProvider = 'valist'"
                >
                  <img
                    :src="`src/assets/search_providers/${MediaProvider.Valist}.png`"
                    height="16"
                  />Games</a
                >
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href="#"
                  v-on:click.stop="selectedMediaProvider = 'lens'"
                >
                  <img
                    :src="`src/assets/search_providers/${MediaProvider.Lens}.png`"
                    height="16"
                  />
                  Social</a
                >
              </li>
            </ul>
          </div>
        </div>
        <button class="btn btn-outline-primary" type="button">Search</button>
      </div>
    </div>
    <a class="" data-target="#modalLogin" data-toggle="modal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-person"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
        />
      </svg>
    </a>
  </nav>
</template>

<script>
import { defineComponent } from "vue";
// import { MediaProvider } from "../types/modules/mediaProvider";

export default defineComponent({
  name: "navbar",
  params: {
    test: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedMediaProvider: MediaProvider.Valist,
    };
  },
});
</script>

<style scoped></style>
