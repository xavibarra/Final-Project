<!-- COMPONENTE BOILERPLATE -->
 
<template>

  <div class="container-first">
    <div class="head">
      <h3>ToDo</h3>
      <img class="logo" src="../../img/logo.png">
    </div>
    <div class="sing">

      <div class="header">
        <div class="header-description">
          <h3 class="header-title">Sign In</h3>
          <p class="header-subtitle">Enter to organize your tasks!  </p>
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
          <button class="button" type="submit">Sign Up</button>
          <p class="footer-first">Dont have an account? 
            <PersonalRouter 
            :route="route" 
            :buttonText="buttonText" 
            class="sign-link"/>
          </p>
        </div>
      </form>

      <div v-show="errorMsg">{{errorMsg}}</div>
    </div>
  </div>

</template>

<script setup>
import PersonalRouter from "./PersonalRouter.vue";

// Route Variables
const route = "/auth/signup";
const buttonText = "Sign Up";

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {} catch (error) {}
};
</script>

<style></style>
