<template>
  <q-card
    class="modal-cadastro"
    :style="`min-height:${$q.screen.height - 120}px`"
  >
    <q-card-section>
      <div class="row justify-end">
        <q-btn round color="negative" icon="close"  size="10px"  v-close-popup />
      </div>
      <div class="text-h4 q-ml-xs row justify-center" style="font-family: lucyda-caligraphy"> 
        Cadastrar Aluno
      </div>
    </q-card-section>
    <q-separator/>
    <div class="q-pa-md">
      <div class="col-12 col-4-md">
        <q-form @submit.prevent="submitForm">
          <q-card-section class="q-pt-xs">
            <div>
              <q-input 
                outlined
                class="q-mb-xs"
                v-model="cadastro.nome_aluno"
                label="Nome"
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo obrigatório',
                ]"
              />
            </div>
            <div>
              <q-input
                outlined
                ref="cpfRef"
                v-model="cadastro.cpf"
                mask="###.###.###-##"
                unmasked-value
                label="CPF"
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo obrigatório',
                ]"
              />
            </div>
            <div>
              <q-input
                outlined
                class="q-mb-lg"
                v-model="cadastro.data_nascimento"
                type="date"
                :max="maximumDate"
                label="Data de Nascimento"
                rules="[dateRules]"
              >
              </q-input>
            </div>
            <div class="row q-pa-l q-gutter-lg justify-center">
              <q-btn color="positive" type="submit" label="Cadastrar" />
              <q-btn color="negative" label="Cancelar" v-close-popup />
            </div>
          </q-card-section>
        </q-form>
      </div>
    </div>
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
    cadastro.value.data_nascimento = new Date(
      cadastro.value.data_nascimento
    ).toISOString();
    const { data } = await api.post("alunos", cadastro.value);
    console.log(data);
    $q.notify({
      message: "Aluno cadastrado com sucesso!",
      color: "positive",
      icon: "check_circle_outline",
      position: "top",
    });
    // const { data } = await api.post("alunos", cadastro.value).then((res) => {
    //   console.log(data);
    //   $q.notify({
    //     message: "Aluno cadastrado com sucesso!",
    //     color: "positive",
    //     icon: "check_circle_outline",
    //   });
    // });
  } catch (error) {
    if (error.response) {
      $q.notify({
        message: error.response.data.message,
        color: "negative",
        icon: "error",
        position: "top",
      });
    } else {
      $q.notify({
        message: "Erro ao cadastrar aluno!",
        color: "negative",
        icon: "error",
        position: "top",
      });
    }
  }

  setTimeout(() => {
    location.reload();
  }, 2000);

  // Regras para a data de nascimento

  // const maximumDate = today();
  // const date = ref(null);

  // function dateRules(val) {
  //   if (!val) {
  //     return "Data de nascimento é obrigatória";
  //   }
  //   return true;
  // }
  // function today() {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Adiciona um zero à esquerda se necessário
  //   const day = String(currentDate.getDate()).padStart(2, '0');        // Adiciona um zero à esquerda se necessário
  //   return `${year}-${month}-${day}`;
  // }
};
</script>

<style scoped>
.modal-cadastro {
  max-width: 100%;
  max-height: 100%;
  height: 550px;
  width: 550px;
}
</style>
