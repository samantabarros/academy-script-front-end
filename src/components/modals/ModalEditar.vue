<template>
  <q-card class="modal-editar">
    <q-card-section>
      <div align="right">
        <q-btn flat round icon="close" v-close-popup />
      </div>
      <div
        class="text-h4 row justify-center"
        style="font-family: lucyda-caligraphy"
      >
        Editar Aluno {{id}}
      </div>
    </q-card-section>
    <q-form color="primary">
      <q-card-section class="q-pt-none">
        <div class="q-mb-sm">
          <q-input filled v-model="text" label="Nome" />
        </div>
        <div class="q-mb-sm">
          <q-input
            filled
            v-model="text"
            mask="###.###.###-##"
            label="CPF"
            :rules="[
              (val) => (val.length > 0 && val.length == 14) || 'cpf inválido',
            ]"
            lazy-rules
          />
        </div>
        <div class="q-mb-sm">
          <q-input
            filled
            v-model="date"
            type="date"
            label="Data de Nascimento"
          />
        </div>
        <div class="row q-pa-md q-gutter-lg justify-evenly">
          <q-btn color="green" label="Confirmar" @submit="onSubmit" />
          <q-btn color="red" label="Cancelar" v-close-popup />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { route } from "quasar/wrappers";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter;
const props = defineProps(["id"]);


onMounted(() => {
  getData();
}) 

const getData = async () => {
  try{
    const {data} = await api.get("alunos/" + id); 
    console.log(data);
  }catch(error){
    console.log(error);
  }
}



function onSubmit(data) {
  console.log("entrou em onSubmit");
  atualizarDados(data);
}
</script>

<style scoped>
.modal-editar {
  max-width: 100%;
  width: 500px;
  max-height: 100%;
  height: 500px;
}
</style>
