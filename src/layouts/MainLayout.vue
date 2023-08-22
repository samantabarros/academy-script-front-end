<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-deep-purple">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="isOpen = !isOpen"
        />

        <q-toolbar-title> GEMA </q-toolbar-title>

        <q-btn flat dense round label="Sair" icon="logout" to="/" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="isOpen" bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer elevated class="bg-deep-purple">
      <q-toolbar>
        <q-toolbar-title class="text-center"
          >Samanta Barros 2023</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Alunos",
    caption: "",
    icon: "group",
    route: "/home",
  },

  {
    title: "Logout",
    caption: "",
    icon: "exit_to_app",
    route: "/",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    //const leftDrawerOpen = ref(true);
    const isOpen = ref(false);

    return {
      essentialLinks: linksList,
      isOpen,
    };
  },
});
</script>
