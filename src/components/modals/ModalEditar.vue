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
        Editar Aluno {{dados_aluno}}
      </div>
    </q-card-section>
    <q-form color="primary">
      <q-card-section class="q-pt-none">
        <div class="q-mb-sm">
          <q-input filled v-model="formularioEditar.nome_aluno" label="Nome" />
        </div>
        <div class="q-mb-sm">
          <q-input
            filled
            v-model="formularioEditar.cpf"
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
            v-model="formularioEditar.data_nascimento"
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
const props = defineProps(["dados_aluno"]);
const text = ref("");

const formularioEditar = ref({
  nome_aluno: props.dados_aluno.nome_aluno,
  cpf: props.dados_aluno.cpf,
  data_nascimento: props.dados_aluno.data_nascimento

})

onMounted(() => {
 formularioEditar
}) 

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
