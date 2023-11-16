<template>
  <card-base titulo="Editar aluno" tamanho="medio">
    <div class="col-12 col-4-md">
      <q-form color="primary">
        <q-card-section class="q-pt-xs">
          <div class="q-mb-md">
            <q-input outlined v-model="formularioEditar.nome_aluno" label="Nome"/>
          </div>
          <div class="q-mb-md">
            <q-input outlined v-model="formularioEditar.cpf" mask="###.###.###-##" unmasked-value disable label="CPF" />
          </div>
          <div>
            <q-input outlined v-model="formularioEditar.data_nascimento" type="date" label="Data de Nascimento" />
          </div>
        </q-card-section>
        <div class="row q-pa-md q-gutter-lg flex justify-end">
          <q-btn color="positive" size="12px" label="Atualizar"  @click="onSubmit(id, dados_aluno)" icon="save"/>
          <q-btn color="negative" size="12px" label="Cancelar" icon="close" v-close-popup/>
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
  data_nascimento: (new Date(props.dados_aluno.data_nascimento).toISOString()).split('T', 1)
  //field: (row) => row.data_nascimento.slice(0,10).split("-").reverse().join("/"),

})

onMounted(() => {
  //formularioEditar
})


function onSubmit(id) {
  console.log("Atualizando dados");
  atualizarDados(id);
}
const atualizarDados = async (id) => {
  try {
    //console.log("Antes da função formatar data" + formularioEditar.value.data_nascimento);
    formularioEditar.value.data_nascimento = new Date(formularioEditar.value.data_nascimento).toISOString();
    //console.log("Depois da função formatar data" + formularioEditar.value.data_nascimento);
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

