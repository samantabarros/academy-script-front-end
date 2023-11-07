<template>
  <card-base titulo="Criar Matrícula">
    <div class="col-12 col-4-md">
      <q-form @submit.prevent="submitForm">
        <q-card-section class="q-pt-xs">
          <div>
            <q-select outlined v-model="moduloSelecionado" :options="modulos" label="Selecione um módulo" :rules="[
              (val) => (val && val.length > 0) || 'Campo obrigatório'
            ]"> 
            </q-select>
          </div>
          <div class="q-mb-md">
            <q-input outlined v-model="cadastro.nota1" label="Nota 1" />
          </div>
          <div class="q-mb-md">
            <q-input outlined v-model="cadastro.nota2" label="Nota 2" />
          </div>
          <div class="q-mb-md">
            <q-input outlined v-model="cadastro.nota3" label="Nota 3" />
          </div>
          <div class="row q-pa-md q-gutter-lg justify-center">
            <q-btn color="positive" type=submit label="Cadastrar" />
            <q-btn color="negative" label="Cancelar" v-close-popup />
          </div>
        </q-card-section>
      </q-form>
    </div>
  </card-base>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import CardBase from "../commons/CardBase.vue";

const modulos = ref([]);
const moduloSelecionado = ref();
const cadastro = ref({
  nome_modulo: "",
  nota1: "",
  nota2: "",
  nota3: ""
});

const getModulos = async () =>{
  const {data} = await api.get("modulos");
  modulos.value = data;
  console.log(modulos);

}
//Função para cadastrar  módulo
const submitForm = async () => {
  const { data } = await api.post(`matricula`, cadastro.value)
  console.log(data)

}

onMounted(() => {
  getModulos()
});
</script>

<style scoped>
.modal-cadastro-modulo {
  max-width: 100%;
  max-height: 100%;
  height: 550px;
  width: 550px;
}
</style>