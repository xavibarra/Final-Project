<template>
  <div class="container-first">
    <div class="head">
      <h3>ToDo</h3>
      <img class="logo" src="../../img/logo.png">
    </div> 
    <div class="sing">

      <div class="header">
        <div class="header-description">
          <h3 class="header-title">Register</h3>
          <p class="header-subtitle">Start organizing your tasks!</p>
        </div>
      </div>

      <form @submit.prevent="signUp">
        <div>
          <div class="form-input">
            <input
              type="email"
              class="input-field"
              placeholder="Enter your email"
              id="email"
              v-model="email"
              required
              autocomplete="off"
            />
          </div>
          <div class="form-input">
            <input
              type="password"
              class="input-field"
              placeholder="Password"
              id="password"
              v-model="password"
              required
            />
          </div>
          <div class="form-input">
            <input
              type="password"
              class="input-field"
              placeholder="Confirm password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
            />
          </div>
          <button class="button" type="submit">Sign Up</button>
          <p class="footer-first">
            Have an account?
            <PersonalRouter
              :route="route"
              :buttonText="buttonText"
              class="sign-link"
            />
          </p>
        </div>
      </form>

      <div v-show="errorMsg">{{errorMsg}}</div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

// Route Variables
const route = "/auth/login";
const buttonText = "Sign In";

// Input Fields
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Error Message
const errorMsg = ref("");

// Router to push user once SignedUp to Log In
const redirect = useRouter();

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const signUp = async () => {
  if (password.value === confirmPassword.value) {
    try {
      // calls the user store and send the users info to backend to logIn
      await useUserStore().signUp(email.value, password.value);
      // redirects user to the homeView
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
  }
  errorMsg.value = "error";
};
</script>

<style></style>
