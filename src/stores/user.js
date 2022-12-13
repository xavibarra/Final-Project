import { defineStore } from "pinia";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("user_id", this.user.id);
        // .match({ user_id: this.user.id });

        if (profile) {
          this.profile = profile[0];
        }
      }
    },

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        const { data: profile } = await supabase.from("profile").insert([
          {
            user_id: this.user.id,
            email: email,
          },
        ]);
      }
    },

    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn(
        {
          email: email,
          password: password,
        },
        {
          shouldCreateUser: false,
        }
      );
      if (error) throw error;
      if (user) {
        this.user = user;
        const { data: profile } = await supabase
          .from("profile")
          .select()
          .match({ user_id: this.user.id });
        if (profile) this.profile = profile[0];
      }
    },

    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    // Prefil Editar
    async changeProfiles(username, avatar_url, id) {
      console.log(username + " " + avatar_url + " " + id);
      const { data, error } = await supabase
        .from("profile")
        .update({
          username: username,
          avatar_url: avatar_url,
        })
        .match({
          user_id: id,
        });
    },



    // ==============================FIN DEL ACTIONS
  },
  

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
