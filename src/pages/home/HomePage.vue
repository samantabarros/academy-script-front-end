<template>
  <div class="q-pa-md">
    <router-link to="/alunos" style="text-decoration: none">
      <q-card
        class="bg-blue-3 row justify-center items-center card-hovered"
        style="width: 320px; height: 180px"
      >
        <div class="column items-center">
          <q-icon name="groups" size="100px" color="white" />
          <p class="text-white" style="font-size: 30px">Alunos</p>
        </div>
      </q-card>
    </router-link>
  </div>
</template>

<script setup>
</script>
<style scoped>
.card-hovered:hover{
  background-color: rgba(0,0,255,0.8)
}

</style>
