import { defineStore } from "pinia";
import { reactive } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        // .order("is_complete", { ascending: true })
        // .order("id", { ascending: false });
      
      this.tasks = tasks;
      return this.tasks;
    },

    async addTask(title, description, tags) {
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
          tag_array: tags
        },
      ]);
    },

    async deleteTask(id) {
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },

    async toogleTask(id, boolean) {
      const { data, error } = await supabase
        .from("tasks")
        .update({
          is_complete: !boolean
        })
        .match({
          id: id,
        });
    },
    async refreshTask(title, description, id){
      const { data, error } = await supabase.from("tasks").update([
        {
          title: title,
          description: description,
        },
      ]).match({
        id: id
      });
    }
  },
});
