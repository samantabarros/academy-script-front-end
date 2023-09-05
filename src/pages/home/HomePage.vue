<template>
  <div class="row flex justify-right content-center">
    <router-link to="/home/alunos" style="text-decoration: none">
      <div class="card-aluno" to="/home/alunos">
        <p class="text-h3">Alunos</p>
        <p>Cadastre, edite e remova alunos</p>
        <img class="icone-aluno" src="/img/aluno.ico" alt="aluno" />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
<style scoped>
.card-aluno {
  border-radius: 5px;
  padding: 30px;
  margin: 20px;
  width: 400px;
  height: 200px;
  transition: all 0.3s ease-out;
  background-color: #d4d5d6;
  border-left: 3px solid #5f2680;
}

.card-aluno:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.card-aluno p {
  color: #7e479e;
}

.icone-aluno {
  float: right;
}
</style>
