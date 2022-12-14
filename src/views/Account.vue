<template>
  <Nav/>
  <div class="profile">
    <div class="card">
        <div class="card_background_img"></div>
        <div class="card_profile_img">
          <img class="avatar"
            :src="
            avatar_url
            ? avatar_url
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
            "
            alt="Profile picture"
            />
        </div>
        <div class="user_details">
            <h3>{{username? username : "Enter you username"}}</h3>
            <div class="containerEdit">
              <div v-show="editPerfil" class="editProfile">
                <input type="text" class="editProfile-input" v-model="username" />
              </div>
            </div>
            <div class="containerEdit">
              <div v-show="editPerfil" class="editProfile">
                <input type="text" class="editProfile-input" v-model="avatar_url" placeholder="Enter URL avatar"/>
              </div>
            </div>
            <div v-show="editPerfil">
              <button class="button-changeProfile" @click="changePerfil">Save</button>
            </div>
        </div>
        <div class="card_count">
            <div class="count">
                <div class="pending">
                    <h3>{{taskIncompleted}}</h3>
                    <p>pending tasks</p>
                </div>
                <div class="done">
                    <h3>{{taskCheck}}</h3>
                    <p>Tasks done</p>
                </div>
            </div>
            <button @click="changeEditPerfil" class="btn">Edit</button>
        </div>
    </div>
  </div>
</template>

<script setup>
// import { supabase } from "../supabase";
import { onMounted, reactive, ref, toRefs } from "vue";
import Nav from "../components/Nav.vue";
import { useUserStore } from "../stores/user.js"
import { useTaskStore } from "../stores/task";

const userStore = useUserStore();
const taskCheck = ref(0);
const taskIncompleted = ref(0);
const tasks = ref("");
const taskStore = useTaskStore();

const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();

  taskCheck.value = tasks.value.filter(task => task.is_complete).length

  taskIncompleted.value = tasks.value.filter(task => !task.is_complete).length
  console.log('getTsaks!!!!!')
};
getTasks();

// Variable para guardar el perfil de supabase
const profile = ref({
  avatar_url: "",
  created_at: "",
  name: "",
  user_id: "",
  username: "",
  website: "",
});
const username = ref(null);
const avatar_url = ref(null);
const user_id = ref(null);
const name=ref(null)

// PREFILE
const getProfile = async () => {
  await userStore.fetchUser();
  profile.value = userStore.profile;
  username.value = profile.value.username;
  name.value = profile.value.name;
  console.log(profile);
  avatar_url.value = profile.value.avatar_url;
  user_id.value = profile.value.user_id;

};
getProfile();

//Editar Perfil
let editPerfil = ref(false);
const changeEditPerfil = () => {
  editPerfil.value = !editPerfil.value;
};


const changePerfil = async () => {
  changeEditPerfil();
  await userStore.changeProfiles(
    username.value,
    avatar_url.value,
    user_id.value,
    name.value
  );
};



</script>

<style></style> 
