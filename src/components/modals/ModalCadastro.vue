<template>
  <card-base titulo="Cadastrar Aluno" tamanho="medio">
    <div class="col-12 col-4-md">
      <q-form @submit.prevent="submitForm">
        <q-card-section class="q-pt-xs">
          <div>
            <q-input
              outlined
              class="q-mb-xs"
              v-model="cadastro.nome_aluno"
              label="Nome"
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
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
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
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
        </q-card-section>
        <div class="btn-modal q-pa-xs q-gutter-md q-mr-md flex justify-end">
          <q-btn
            dense
            class="q-pa-sm text-white"
            label="Cancelar"
            v-close-popup
            size="12px"
            icon="close"
            style="background-color: #991B1B; "
          />
          <q-btn
            dense
            class="q-pa-sm text-white"
            type="submit"
            label="Confirmar"
            size="12px"
            icon="check"
            style="background-color: #174933; "

          />
        </div>
      </q-form>
    </div>
  </card-base>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";
import { api } from "src/boot/axios";
import CardBase from "../commons/CardBase.vue";

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
    //Função para formatar a data
    cadastro.value.data_nascimento = new Date(
      cadastro.value.data_nascimento
    ).toISOString();
    const { data } = await api.post("alunos", cadastro.value);
    $q.notify({
      message: "Aluno cadastrado com sucesso!",
      color: "positive",
      icon: "check_circle_outline",
      position: "top",
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
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
};
</script>

