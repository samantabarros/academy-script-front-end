<template>
  <div class="q-pa-md">
    <router-link to="/alunos" style="text-decoration: none">
      <div class="bg-blue-3 row justify-center items-center card-aluno" style="width: 320px; height: 180px;">
        <div class="column items-center">
          <q-icon name="groups" size="100px" color="white" />
          <p class="text-white" style="font-size: 30px">Alunos</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
</script>
<style scoped>


.card-aluno:hover {
  box-shadow: 0px 0px 20px 2px #c96f153f;
  transform: scale(1.05);
}

</style>
