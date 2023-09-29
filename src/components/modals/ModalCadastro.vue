<template>
  <q-card class="modal-cadastro">
    <q-card-section>
      <div align="right">
        <q-btn flat round icon="close" v-close-popup />
      </div>
      <div
        class="text-h4 row justify-center"
        style="font-family: lucyda-caligraphy"
      >
        Cadastrar Aluno
      </div>
    </q-card-section>
    <q-form @submit.prevent="submitForm" color="primary">
      <q-card-section class="q-pt-none">
        <div class="q-mb-sm">
          <q-input
            filled
            v-model="cadastro.nome_aluno"
            label="Nome"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'O nome deve ser preenchido',
            ]"
          />
        </div>
        <div class="q-mb-sm">
          <q-input
            ref="cpfRef"
            filled
            v-model="cadastro.cpf"
            mask="###.###.###-##"
            label="CPF"
            :rules="[
              (val) =>
                (val.length > 0 && val.length == 14) ||
                'cpf inválido',
            ]"
          />
        </div>
        <div class="q-mb-sm">
          <q-input
            filled
            v-model="cadastro.data_nascimento"
            type="date"
            label="Data de Nascimento"
          />
        </div>
        <div class="row q-pa-md q-gutter-lg justify-evenly">
          <q-btn color="positive" type="submit" label="Cadastrar" />
          <q-btn color="negative" label="Cancelar" v-close-popup />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";
import { api } from "src/boot/axios";

name: "ModalCadastro";

const $q = useQuasar();
const router = useRouter();
const cpfRef = ref(null);

const cadastro = ref({
  nome_aluno: "",
  cpf: "",
  data_nascimento: "",
});

const submitForm = async () => {
  try {
    console.log(cadastro.value);
    const { data } = await api.post("alunos", cadastro.value);
    console.log(cadastro.value);
    //console.log(response);
    console.log("Chegou aqui");
  } catch (error) {
    console.log(error);
  }
  location.reload();
};
</script>

<style scoped>
.modal-cadastro {
  max-width: 100%;
  width: 500px;
  max-height: 100%;
  height: 500px;
}
</style>
