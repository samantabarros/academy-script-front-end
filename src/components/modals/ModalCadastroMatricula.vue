<template>
  <card-base titulo="Criar Matrícula" tamanho="grande">
    <div class="col-12 col-4-md">
    
      <q-form @submit.prevent="submitForm">
        <q-card-section class="q-pt-xs">
          <div class="q-pb-md">
            <q-select
              outlined
              v-model="cadastro.modulo"
              :options="modulos"
              label="Selecione o módulo"
            >
              <!-- :rules="[
              (val) => (val && val.length > 0) || 'Campo obrigatório'
            ]"  -->
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
        </q-card-section>
        <div class="row q-pa-md q-gutter-lg flex justify-end">
          <q-btn color="positive" type="submit" size="13px" label="Cadastrar" />
          <q-btn color="negative" size="13px" label="Cancelar" v-close-popup />
        </div>
      </q-form>
    </div>
  </card-base>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CardBase from "../commons/CardBase.vue";

const route = useRoute();

const { id } = route.params;

const modulos = ref([]);
const cadastro = ref({
  id_aluno: "",
  modulo: "",
  nota1: "",
  nota2: "",
  nota3: "",
});

//Pega todos os módulos que estão cadastrados
const getModulos = async () => {
  const { data } = await api.get("modulos");
  data.map((valor) => {
    modulos.value.push({
      valor: valor.id,
      label: valor.nome_modulo,
    });
  });
};

//Função para cadastrar  módulo
const submitForm = async () => {
  cadastro.value.id_modulo = cadastro.value.modulo.valor;
  cadastro.value.nota1 =  Number(cadastro.value.nota1);
  cadastro.value.nota2 =  Number(cadastro.value.nota2);
  cadastro.value.nota3 =  Number(cadastro.value.nota3);

  delete cadastro.value.modulo;
  console.log(cadastro.value);
  const { data } = await api.post(`matricula`, cadastro.value);
  console.log(data);

  setTimeout(() =>{
    location.reload();
  }, 2000);
};

onMounted(() => {
  getModulos();
  cadastro.value.id_aluno = id;
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