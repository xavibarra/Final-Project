<template>
  <div class="div-button-newTask">
    <button id="botonOn" @click="mostrar" class="button-newTask">
      Add a new task
    </button>
    <p>Start organizing your tasks now!</p>
  </div>
  <div id="newTask">
    <div class="addNewTask">
      <h1 class="addNewTask-title">Add a new Task</h1>
      <div v-if="showErrorMessage">
        <p class="error-text">{{ errorMessage }}</p>
      </div>
      <div class="newTask-container">
        <div class="newTask">
          <input
            type="text"
            class="addNewTask-input"
            placeholder="Task Title"
            v-model="name"
          />
        </div>
        <div class="newTask">
          <input
            type="text"
            class="addNewTask-input"
            placeholder="Task Description"
            v-model="description"
          />
        </div>
        <!-- IMPUT TAGS -->
        <div class="tag-input">
          <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
            <span @click='removeTag(index)'>x</span>
            {{ tag }}
          </div>
          <input
            type="text"
            placeholder="Enter a Tag"
            class="tag-input__text"
            @keydown.enter="addTag"
            @keypress.,="addTag"
            @keypress.space="addTag"
            @keydown.delete='removeLastTag'
          />
        </div>
        <!-- FINAL IMPUT TAGS -->
        <div class="button-addNewTask-container">
          <button class="button-addNewTask" @click="addTask">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useTaskStore } from "../stores/task";

// tags task
const tags = reactive([]);
const addTag = (event) => {
  event.preventDefault();
  let val = event.target.value.trim();
  if (val.length > 0) {
    tags.push(val);
    event.target.value = "";
  }
};
const removeTag= (index)=> {
      tags.splice(index, 1)
}
const removeLastTag=(event) =>  {
      if (event.target.value.length === 0) {
        removeTag(tags.length - 1)
      }
}

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref("");
const description = ref("");


// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);
const emit = defineEmits(["emitTask"]);
// Arrow function para crear tareas.
const addTask = async () => {
  if (name.value.length === 0) {
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = "The task title is empty";
    setTimeout(() => {
      showErrorMessage.value = false;
    }, 5000);
  } else {
    // Aquí mandamos los valores a la store para crear la nueva Task.
    await taskStore.addTask(name.value, description.value, tags);
    emit("emitTask", tags);
    name.value = "";
    description.value = "";
    // tags.value = "";
    //console.log(tags);
      for (let i = 0; i <= tags.length; i++) {
        tags.shift(tags);
    }
    
  }
};

const mostrar = () => {
  FbotonOn();
  const x = document.getElementById("newTask");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};
const FbotonOn = () => {
  const uno = document.getElementById("botonOn");
  const dos = document.query;
  if (uno.innerHTML == "Add a new task") {
    uno.innerHTML = "Close";
    uno.style.background = "#BF5D0D";
  } else {
    uno.innerHTML = "Add a new task";
    uno.style.background = "#F4A261";
  }
};
</script>

<style></style>
