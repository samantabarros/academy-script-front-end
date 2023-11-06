<template>
<div class="row">
  <div class="q-pa-md">
    <router-link to="/alunos" style="text-decoration: none">
      <div class="bg-blue-5 row justify-center items-center card-aluno" style="width: 320px; height: 180px;">
        <div class="column items-center">
          <q-icon name="groups" size="100px" color="white" />
          <p class="text-white" style="font-size: 30px">Alunos</p>
        </div>
      </div>
    </router-link>
  </div>
  <div class="q-pa-md">
    <router-link to="/modulos" style="text-decoration: none">
      <div class="bg-orange-5 row justify-center items-center card-aluno" style="width: 320px; height: 180px;">
        <div class="column items-center">
          <q-icon name="auto_stories" size="100px" color="white" />
          <p class="text-white" style="font-size: 30px">Módulos</p>
        </div>
      </div>
    </router-link>
  </div>
</div>
</template>

<script setup>
</script>
<style scoped>


.card-aluno:hover {
  transform: scale(1.05);
}

</style>
