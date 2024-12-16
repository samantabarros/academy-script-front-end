<template>
  <div class="row flex justify-center items-center menu-cards" v-if="!isMobile">
    <div class="q-pa-md">
      <router-link to="/alunos" style="text-decoration: none">
        <div
          class="row justify-center items-center card-aluno"
          style="width: 400px; height: 300px; background-color: #14577d"
        >
          <div class="column items-center">
            <q-icon name="groups" size="100px" color="white" />
            <p class="text-white" style="font-size: 30px">Alunos</p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="q-pa-md">
      <router-link to="/modulos" style="text-decoration: none">
        <div
          class="btn-color row justify-center items-center card-aluno"
          style="width: 400px; height: 300px; background-color: #581c87"
        >
          <div class="column items-center">
            <q-icon name="auto_stories" size="100px" color="white" />
            <p class="text-white" style="font-size: 30px">Disciplinas</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  <div class=" flex justify-center items-center menu-cards"  v-if="isMobile">
      <router-link to="/alunos" style="text-decoration: none">
        <div
          class="row justify-center items-center card-aluno"
          style="width: 300px; height: 200px; background-color: #14577d"
        >
          <div class="column items-center">
            <q-icon name="groups" size="100px" color="white" />
            <p class="text-white" style="font-size: 30px">Alunos</p>
          </div>
        </div>
      </router-link>
      <router-link to="/modulos" style="text-decoration: none">
        <div
          class="btn-color row justify-center items-center card-aluno"
          style="width: 300px; height: 200px; background-color: #581c87"
        >
          <div class="column items-center">
            <q-icon name="auto_stories" size="100px" color="white" />
            <p class="text-white" style="font-size: 30px">Disciplinas</p>
          </div>
        </div>
      </router-link>
  
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { computed } from "vue";

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.md);
</script>
<style scoped>
.card-aluno:hover {
  transform: scale(1.05);
}

.card-aluno {
  transition: transform 0.4s;
}

.menu-cards {
  min-height: calc(100vh - 50px - 42px);
}
</style>
