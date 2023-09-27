<template>
  <div>
    <router-link to="/alunos" style="text-decoration: none">
      <div class="card-aluno" to="/home/alunos">
        <p class="text-h3 text-primary">Alunos</p>
        <p class="text-h6 text-black">Cadastre, edite e remova alunos</p>
        <img class="icone-aluno" src="/img/aluno.ico" alt="aluno" />
      </div>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.card-aluno {
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  width: 400px;
  height: 200px;
  transition: all 0.3s ease-out;
  background-color: #c1ccd7;
  border-left: 5px solid #1976d2;
}

.card-aluno:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.icone-aluno {
  float: right;
}
</style>

