<template>
  <Nav/>
  <h1>Name: {{username}}</h1>
  <img
    :src="
      avatar_url
        ? avatar_url
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
    "
    alt="Profile picture"
  />
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useProfilesStore } from "../stores/profile";
import Nav from "../components/Nav.vue";
import { useUserStore } from "../stores/user";

const profileStore = useProfilesStore();

// Variable para guardar el perfil de supabase
const profile = ref({});
const username = ref(null);
const avatar_url = ref(null);

// PREFILE
const getProfile = async () => {
  profile.value = await profileStore.fetchProfile();
  username.value = profile.value.username;
};
getProfile();

onMounted(() => {
  //getProfile();
});

</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style> 
