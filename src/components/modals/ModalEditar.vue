<template>
  <card-base titulo="Editar aluno" tamanho="medio">
    <div class="col-12 col-4-md">
      <q-form color="primary">
        <q-card-section class="q-pt-xs">
          <div class="q-mb-md">
            <q-input
              outlined
              v-model="formularioEditar.nome_aluno"
              label="Nome"
            />
          </div>
          <div class="q-mb-md">
            <q-input
              outlined
              v-model="formularioEditar.cpf"
              mask="###.###.###-##"
              unmasked-value
              disable
              label="CPF"
            />
          </div>
          <div>
            <q-input
              outlined
              v-model="formularioEditar.data_nascimento"
              type="date"
              label="Data de Nascimento"
            />
          </div>
        </q-card-section>
        <div class="row">
          <div class="col-12 btn-modal">
            <div class="q-pa-lg q-gutter-md flex justify-end">
              <q-btn
                dense
                class="q-pa-sm text-white"
                label="Cancelar"
                v-close-popup
                size="12px"
                icon="close"
                @click="atualizaPagina"
                style="background-color: #991b1b"
              />
              <q-btn
                dense
                class="q-pa-sm text-white"
                type="submit"
                label="Atualizar"
                @click="onSubmit(id, dados_aluno)"
                size="12px"
                icon="check"
                style="background-color: #174933"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </card-base>
</template>

<script setup>
import { useQuasar } from "quasar";
import { route } from "quasar/wrappers";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CardBase from "../commons/CardBase.vue";

const $q = useQuasar();
const router = useRouter;
const props = defineProps(["dados_aluno"]);
const id = props.dados_aluno.id;

const formularioEditar = ref({
  nome_aluno: props.dados_aluno.nome_aluno,
  cpf: props.dados_aluno.cpf,
  data_nascimento: new Date(props.dados_aluno.data_nascimento)
    .toISOString()
    .split("T", 1),
  //field: (row) => row.data_nascimento.slice(0,10).split("-").reverse().join("/"),
});

onMounted(() => {
  //formularioEditar
});

function onSubmit(id) {
  atualizarDados(id);
}

const atualizarDados = async (id) => {
  try {
    formularioEditar.value.data_nascimento = new Date(
      formularioEditar.value.data_nascimento
    ).toISOString();
    const { data } = await api.put(`alunos/${id}`, formularioEditar.value);
    $q.notify({
      message: "Aluno atualizado com sucesso!",
      position: "top",
      color: "positive",
      icon: "check_circle_outline",
    });
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
        message: error.response.data.message,
        color: "negative",
        icon: "error",
        position: "top",
      });
    }
  }
};

const atualizaPagina = async () => {
  setTimeout(() => {
    location.reload();
  }, 1000);
};
</script>

