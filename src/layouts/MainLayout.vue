<template>
  <q-layout view="hHh Lpr hFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="isOpen = !isOpen"
        />

        <q-toolbar-title> SGMA </q-toolbar-title>

        <q-btn flat dense round label="Sair" icon="logout" to="/" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="isOpen"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-list>
        <q-item-label header class="row justify-left"> Menu </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer elevated class="q-pa-xs text-center bg-primary">
      <span>Samanta Barros &copy; 2023</span>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const isOpen = ref(false);
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
</script>

<style scoped></style>
