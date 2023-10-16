<template>
  <q-card class="modal-cadastro">
    <q-card-section>
      <div align="right">
        <q-btn flat round icon="close" v-close-popup />
      </div>
      <div
        class="text-h3 row justify-center"
        style="font-family: lucyda-caligraphy"
      >
        Cadastrar Aluno
      </div>
    </q-card-section>
    <q-form @submit.prevent="submitForm">
      <q-card-section class="q-pt-xs">
        <div>
          <q-input
            class="q-mb-xs"
            filled
            v-model="cadastro.nome_aluno"
            label="Nome"
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div>
          <q-input
            class="q-mb-md"
            ref="cpfRef"
            filled
            v-model="cadastro.cpf"
            mask="###.###.###-##"
            unmasked-value
            label="CPF"
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />
        </div>
        <div>
          <q-input class="q-mb-lg" filled v-model="cadastro.data_nascimento"
          type="date" mask=##/##/#### label="Data de Nascimento" rules="[ (val)
          => (val && val.length > 0) || 'Campo obrigatório']" />
        </div>
        <div class="row q-pa-l q-gutter-lg justify-evenly">
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
    //console.log(cadastro.value.data_nascimento);
    //Função para formatar a data
    cadastro.value.data_nascimento = new Date(cadastro.value.data_nascimento).toISOString();
    console.log("data");
    const { data } = await api.post("alunos", cadastro.value);
    console.log(data);
   // location.reload();
    $q.notify({
      message: "Aluno cadastrado com sucesso!",
      color: "positive",
      icon: "check_circle_outline",
    });
    // const { data } = await api.post("alunos", cadastro.value).then((res) => {
    //   console.log(data);
    //   $q.notify({
    //     message: "Aluno cadastrado com sucesso!",
    //     color: "positive",
    //     icon: "check_circle_outline",
    //   });
    // });
    console.log(cadastro.value.data_nascimento);
    //Resolver esse problema de carregar a página
  } catch (error) {
    if (error.response) {
      $q.notify({
        message: error.response.data.message,
        color: "negative",
        icon: "check_circle_outline",
      });
    } else {
      $q.notify({
        message: "Erro ao cadastrar aluno!",
        color: "negative",
        icon: "check_circle_outline",
      });
    }
  }
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
