<template>
  <q-layout view="hHh Lpr hFf">
    <q-header elevated class="bg-primary" style="height: 60px">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="isOpen = !isOpen"
        />
        <div class="row flex justify-between full-width items-center" >
           <img src="../assets/images/logo.png" alt="Academy Script logo" style="max-width: 300px;">
            <p>Bem-vindo(a), usuário </p>
            <div class="flex justify-end q-mx-md">
              <img src="../assets/images/26.png" alt="Avatar do usuário"  style="max-width: 40px; height: 40px;">
              <p class="q-pl-md flex items-center">Usuário</p>
             </div>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="isOpen"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-list class="q-mt-lg q-ml-md">
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-footer elevated class="q-pa-xs text-center bg-primary flex flex-center" style="height: 3em;">
      <span> Todos os direitos reservados &copy; 2024</span>
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
    title: "Dashboard",
    caption: "",
    icon: "home",
    route: "/home",
  },
  {
    title: "Disciplinas",
    caption: "",
    icon: "auto_stories",
    route: "/modulos",
  },
  {
    title: "Alunos",
    caption: "",
    icon: "group",
    route: "/alunos",
  },
  {
    title: "Sair",
    caption: "",
    icon: "logout",
    route: "/",
  },
];

</script>

<style scoped></style>
