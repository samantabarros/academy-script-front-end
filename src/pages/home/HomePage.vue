<template>
  <div class="row" style="height: 100vh">
    <div v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.sm }"
      class="col flex content-center">
      <q-card class="bg-deep-purple absolute-center rounded" v-bind:style="$q.screen.lt.sm
        ? { width: '20%', height: '30%' }
        : { width: '20%', height: '25%' }
        ">
        <q-card-section>
          <div class="q-pt-lg">
            <div class=" col flex justify-center content-center">
              <q-avatar size="80px" class="shadow-18" square>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </div>
            <div class="col flex justify-center">
              <p class="text-h4 q-my-none text-weight-regular text-white content-center">
                alunos</p>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="row flex justify-center content-center">
    <div class="card-aluno">
      <p class="text-h3">Alunos</p>
      <p class="h6"> Cadastre, edite e remova alunos</p>
      <img class="icone-aluno" src="/img/aluno.ico" alt="aluno" />
    </div>
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
  box-shadow: 7px 7px 13px 0px rgba(50, 50, 50, 0.22);
  padding: 30px;
  margin: 20px;
  width: 400px;
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
