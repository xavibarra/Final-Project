<template>
  <!-- nav-bar signIn/ signUp -->
  <section class="fixed-nav">
    <div class="nav-sign">
      <h1>ToDo</h1>
      <img class="logo-sign" src="../../img/logo.png" alt="logo ToDo" />
    </div>
  </section>
  <div class="first-page">
    <div class="part1-sign">
      <div>
        <img class="img-sign" src="../../img/gif.gif" alt="tasks-gif" />
      </div>
      <div>
        <h1 class="title-sign">ToDo</h1>
      </div>
    </div>
    <!-- Iniciar sesión section -->
    <div class="part2-sign">
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

        <div v-show="errorMsg">{{ errorMsg }}</div>
      </div>
      <div>
        <h2 class="sign-description">
          Create, organize, delete and edit your tasks like never before with
          ToDo!
        </h2>
        <hr class="line-sign" />
      </div>
    </div>
    <div class="part3-sign">
      <img class="mockup" src="../../img/mockup.gif" alt="using app">
    </div>
    <div class="part4-sign">
      <div class="frequently-questions">
        <div>
          <h3>Frequently asked questions</h3>
        </div>
        <div class="questions">
          <p class="question">What is ToDo and how does it works?</p>
          <p class="answer">
            ToDo is an application for you to create, organize, edit and delete
            your tasks, with this application you can do everything you want.
          </p>
          <p class="question">Can I check my tasks from anywhere?</p>
          <p class="answer">
            Yes, once you have created your user you can access it from anywhere
            in the world to check your tasks
          </p>
          <p class="question">Once the task is done, can I check it?</p>
          <p class="answer">
            Yes! You can create, edit, delete and check your tasks whenever you
            want
          </p>
          <p class="question">Is it free forever?</p>
          <p class="answer">
            Of course! This page has been created for academic purposes and is
            totally free.
          </p>
        </div>
      </div>
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
