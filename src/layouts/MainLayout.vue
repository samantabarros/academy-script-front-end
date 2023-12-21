<template>
  <q-layout view="hHh Lpr hFf">
    <q-header elevated class="bg-blue-10" >
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

        <q-btn flat label="Sair" icon="logout" to="/" @click="authStore.logout()"/>
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

    <q-footer elevated class="q-pa-xs text-center bg-blue-10 flex flex-center" style="height: 3em;">
      <span> Samanta Barros &copy; 2023</span>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, onMounted, ref, useAttrs } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();
const isOpen = ref(false);
const linksList = [
  {
    title: "Home",
    caption: "",
    icon: "home",
    route: "/home",
  },
  {
    title: "Alunos",
    caption: "",
    icon: "group",
    route: "/alunos",
  },

  {
    title: "Módulos",
    caption: "",
    icon: "auto_stories",
    route: "/modulos",
  },
];

</script>

<style scoped></style>
