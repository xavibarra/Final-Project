<template>
  <div class="wrapper">
    <Nav />
    <NewTask @emitTask="getTasks" />
    <!-- <input type="text" v-model="input" placeholder="Search fruits..." />
    <div class="item fruit" v-for="tag in filteredList()" :key="tag">
      <p>{{ tag }}</p>
    </div>
    <div class="item error" v-if="input && !filteredList().length">
      <p>No results found!</p>
    </div>
    <button @click="searchTags">Click me!</button>
    <h1 v-for="task in taskStore.tasks" :key="task.id">{{ task.tag_array }}</h1> -->
    <h1 class="tasksTitle">Tasks</h1>
    <TaskItem
      @deleteTask="deleteTask"
      @toogleTask="toogleTask"
      @getTasks="getTasks"
      v-for="task in taskStore.tasks"
      :key="task.id"
      :task="task"
    />
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
const tasks = reactive([]);

// Creamos una función que conecte a la store para conseguir las tareas de supabase
const getTasks = async () => {
  tasks.value = await taskStore.fetchTasks();
};
getTasks();

const deleteTask = async () => {
  tasks.value = await taskStore.fetchTasks();
};
deleteTask();

const toogleTask = async () => {
  tasks.value = await taskStore.fetchTasks();
};
toogleTask();

// Search tags
const searchTags = () => {
  // getTasks()
  console.log("clickado");
};

// let input = ref("");
// const frutas = reactive(["platano", "manzana"]);

// const filteredList = (input) => {
//   console.log(taskStore.tasks[1].tag_array[0]); 

//      for (const task in taskStore) {
//        console.log(taskStore.tasks);
//        task.filter((tag) =>
//          tag.lowerCase().includes(input.value.toLowerCase()))
//      }
//      return filteredList;  
//    return frutas.filter((tag) =>
//      tag.toLowerCase().includes(input.value.toLowerCase())
//    );
// };
</script>

<style></style>
