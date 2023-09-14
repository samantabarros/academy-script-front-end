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
    <q-form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <div class="q-mb-sm">
          <q-input
            filled
            v-model="cadastro.nome_aluno"
            label="Nome"
            color="purple"
          />
        </div>
        <div class="q-mb-sm">
          <q-input filled v-model="cadastro.cpf" label="CPF" color="purple" />
        </div>
        <div class="q-mb-sm">
          <q-input
            filled
            v-model="cadastro.data_nascimento"
            type="date"
            label="Data de Nascimento"
            color="purple"
          />
        </div>
        <div class="row q-pa-md q-gutter-lg justify-evenly">
          <q-btn color="green" type="submit" label="Cadastrar" />
          <q-btn color="red" label="Cancelar" v-close-popup />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";
import { api } from "src/boot/axios";

export default {
  name: "ModalCadastro",

  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const cadastro = ref({
      nome_aluno: "",
      cpf: "",
      data_nascimento: "",
    });

    const submitForm = async () => {
      try {
        console.log(cadastro.value);
        //const data = await post(cadastro.value);>
        const response = await api.post("alunos", cadastro.value);
        console.log(response.data);
        console.log(response);
        console.log("Chegou aqui");
      } catch (error) {
        console.log(error);
      }
    };

    return {
      //alert: ref(false),
      cadastro,
      submitForm,
    };
  },
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
