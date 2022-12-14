<template>
  <nav class="navbar">
    <div>
      <button @click="hamburgerMenuChange" class="hamburgerButton">☰</button>
    </div>
    <div class="navbar-logo">
      <h1>ToDo</h1>
      <img class="logo-sign" src="../../img/logo.png" alt="logo ToDo" />
    </div>
    <div class="singOut">
      <button @click="signOut" class="logout-button">
        <img class="logoutImage" src="../../img/logout.png" alt="logout-icon" />
      </button>
    </div>
  </nav>
  <div class="hamburgerContent" v-show="hamburgerMenu">
    <ul>
      <li class="marginlink">
        <router-link class="hamburgerLink" to="/"> Home </router-link>
      </li>
      <li class="marginlink">
        <router-link class="hamburgerLink" to="/account"
          >Your Account</router-link
        >
      </li>
      <li class="marginlink">
        <router-link class="hamburgerLink" to="/calculator"
          >Calculator</router-link
        >
      </li>
      <li class="marginlink">jhgfd</li>
      <li class="marginlink">gfd</li>
    </ul>
  </div>
</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// Error Message
const errorMsg = ref("");

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getUser = useUserStore().user;

// constant that calls user email from the useUSerStore
const userEmail = getUser.email;

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signOut();
    // redirects user to the singin
    redirect.push({ path: "/auth/login" });
  } catch (error) {
    // displays error message
    errorMsg.value = error.message;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
  return;
};
let hamburgerMenu = ref(false);
const hamburgerMenuChange = () => {
  hamburgerMenu.value = !hamburgerMenu.value;
};
</script>

<style></style>
