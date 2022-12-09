<template>
    <div class="div-button-newTask">
        <button @click="mostrar" class="button-newTask">Add a new task</button>
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
                    <input type="text" class="addNewTask-input" placeholder="Task Title" v-model="name">
                </div>
                <div class="newTask">
                    <input type="text" class="addNewTask-input" placeholder="Task Description" v-model="description">
                </div>
                <div class="button-addNewTask-container"> 
                    <button class="button-addNewTask" @click="addTask">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task"   

const taskStore = useTaskStore();

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);
const emit = defineEmits(["emitTask"]);
// Arrow function para crear tareas.
const addTask = async() => {
if(name.value.length === 0 || description.value.length === 0){
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

} else {
    
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    await taskStore.addTask(name.value, description.value);
    name.value = '';
    description.value = '';
    emit("emitTask")
}
};

const mostrar = () => {
    const x = document.getElementById('newTask');
    if (x.style.display === 'block') {
        x.style.display = 'none';
    } else {
        x.style.display = 'block';
    }
};

</script>

<style></style>
  