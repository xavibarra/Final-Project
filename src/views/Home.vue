<template>
  <div class="wrapper">
    <Nav />
    <NewTask @emitTask="getTasks" />
       
    <h1 class="tasksTitle">Tasks</h1>
    <div class="filtreContain">
      <div class="filtreDiv">
        <input type="text" v-model="input" placeholder="Filter" class="filtreInput" />
      </div>
      <button @click="filter">FILTRAR!</button> 
    </div>
    <div class="tasksdone-pendind">
      <h2>Tasks done</h2>
      <h2>Pending tasks</h2>
    </div>
    <div class="taskItemContainer">
      <div>
        <TaskItem
        @deleteTask="deleteTask"
        @toogleTask="toogleTask"
        @getTasks="getTasks"
        v-for="task in taskIncompleted"
        :key="task.id"
        :task="task"
        />
    </div>
    <div>
      <TaskItem
        @deleteTask="deleteTask"
        @toogleTask="toogleTask"
        @getTasks="getTasks"
        v-for="task in taskCheck"
        :key="task.id"
        :task="task"
      />
    </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useTaskStore } from "../stores/task";
import { useRouter } from "vue-router";
import Nav from "../components/Nav.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";


const taskStore = useTaskStore();
console.log(taskStore);

// Variable para guardar las tareas de supabase
const tasks = ref([]);
const taskCheck = ref([]);
const taskIncompleted = ref([]);
const taskFilter = ref([]);
const input=ref("")

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
  taskCheck.value = tasks.value.filter(task => task.is_complete)
  taskIncompleted.value = tasks.value.filter(task => !task.is_complete)
  console.log('getTsaks!!!!!')
};
getTasks();

const deleteTask = async () => {
  // tasks.value = await taskStore.fetchTasks();
  getTasks();
};
deleteTask();

const toogleTask = async () => {
  //tasks.value = await taskStore.fetchTasks();
  getTasks();
};
toogleTask();

// Search tags
const searchTags = () => {
  // getTasks()
  console.log("clickado");
};

const filter = () => {
  if (input.value !== '') {
    taskFilter.value =tasks.value.filter(task=>task.tag_array.includes(input.value));
    taskCheck.value = taskFilter.value.filter(task => task.is_complete)
    taskIncompleted.value = taskFilter.value.filter(task => !task.is_complete)
  } else {
    getTasks();
  }
};
</script>

<style></style>
