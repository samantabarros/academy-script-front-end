<template>
  <card-base titulo="Criar Matrícula" tamanho="grande">
    <div class="col-12 col-4-md">
      <q-form @submit.prevent="submitForm">
        <q-card-section class="q-pt-xs">
          <div class="q-pb-xs q-pt-md">
            <q-select
              outlined
              v-model="cadastro.modulo"
              :options="modulos"
              label="Selecione o módulo"
              :rules="[
                (val) => (val && val.length !== null) || 'Campo obrigatório',
              ]"
            >
            </q-select>
          </div>
          <div class="q-mb-md">
            <q-input
              outlined
              v-model="cadastro.nota1"
              label="Nota 1"
              type="number"
            />
          </div>
          <div class="q-mb-md">
            <q-input
              outlined
              v-model="cadastro.nota2"
              label="Nota 2"
              type="number"
            />
          </div>
          <div class="q-mb-md">
            <q-input
              outlined
              v-model="cadastro.nota3"
              label="Nota 3"
              type="number"
            />
          </div>
        </q-card-section>
      </q-form>
      <div class="btn-modal row q-pa-md q-gutter-md flex justify-end">
        <q-btn
          dense
          class="q-pa-sm"
          color="blue-7"
          type="submit"
          size="12px"
          label="Cadastrar"
          icon="save"
          @click="submitForm"
        />
        <q-btn
          dense
          class="q-pa-sm"
          color="grey-7"
          size="12px"
          label="Cancelar"
          v-close-popup
          icon="close"
        />
      </div>
    </div>
  </card-base>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import CardBase from "../commons/CardBase.vue";

const $q = useQuasar();
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
  try {
    cadastro.value.id_modulo = cadastro.value.modulo.valor;
    cadastro.value.nota1 = cadastro.value.nota1
      ? Number(cadastro.value.nota1)
      : null;
    cadastro.value.nota2 = cadastro.value.nota2
      ? Number(cadastro.value.nota2)
      : null;
    cadastro.value.nota3 = cadastro.value.nota3
      ? Number(cadastro.value.nota3)
      : null;

    delete cadastro.value.modulo;
    console.log(cadastro.value);
    const { data } = await api.post(`matricula`, cadastro.value);
    console.log(data);
    $q.notify({
      message: "Matrícula realizada com sucesso!",
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
        message: "Erro ao cadastrar a matrícula!",
        color: "negative",
        icon: "error",
        position: "top",
      });
    }
  }
};

onMounted(() => {
  getModulos();
  cadastro.value.id_aluno = id;
});
</script>

