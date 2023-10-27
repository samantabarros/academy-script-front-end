<template>
  <q-card class="modal-editar" :style="`min-height:${$q.screen.height - 120}px`">
    <q-card-section>
      <div class="row justify-end">
        <q-btn round color="negative" icon="close" size="10px" v-close-popup />
      </div>
      <div class="text-h4 q-ml-xs row justify-center" style="font-family: lucyda-caligraphy">
        Editar Aluno
      </div>
    </q-card-section>
    <q-separator />
    <div class="q-pa-md row">
      <div class="col-12 col-4-md">
        <q-form color="primary">
          <q-card-section class="q-pt-xs">
            <div class="q-mb-md">
              <q-input outlined v-model="formularioEditar.nome_aluno" label="Nome" />
            </div>
            <div class="q-mb-md">
              <q-input outlined v-model="formularioEditar.cpf" mask="###.###.###-##" unmasked-value label="CPF" />
            </div>
            <div>
              <q-input outlined v-model="formularioEditar.data_nascimento" type="date" label="Data de Nascimento" />
            </div>
            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-btn color="positive" label="Atualizar" @click="onSubmit(id, dados_aluno)" />
              <q-btn color="negative" label="Cancelar" v-close-popup />
            </div>
          </q-card-section>
        </q-form>
      </div>
    </div>

  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { route } from "quasar/wrappers";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter;
const props = defineProps(["dados_aluno"]);
const text = ref("");
const id = props.dados_aluno.id;

const formularioEditar = ref({
  nome_aluno: props.dados_aluno.nome_aluno,
  cpf: props.dados_aluno.cpf,
  data_nascimento: (new Date(props.dados_aluno.data_nascimento).toISOString()).split('T', 1)
  //field: (row) => row.data_nascimento.slice(0,10).split("-").reverse().join("/"),

})

onMounted(() => {
  formularioEditar
})


function onSubmit(id) {
  console.log("Atualizando dados");
  atualizarDados(id);
}
const atualizarDados = async (id) => {
  try {
    console.log("Antes da função formatar " + formularioEditar.value.data_nascimento);
    formularioEditar.value.data_nascimento = new Date(formularioEditar.value.data_nascimento).toISOString();
    console.log("Depois da função formatar " + formularioEditar.value.data_nascimento);
    const { data } = await api.put(`alunos/${id}`, formularioEditar.value)
    console.log("Depois da requisição put " + formularioEditar.value.data_nascimento);
    $q.notify({
      message: "Aluno atualizado com sucesso!",
      position: "top",
      color: "positive",
      icon: "check_circle_outline"
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
      })
    }
  }

}
</script>

<style scoped>
.modal-editar {
  max-width: 100%;
  max-height: 100%;
  height: 550px;
  width: 550px;
}
</style>
