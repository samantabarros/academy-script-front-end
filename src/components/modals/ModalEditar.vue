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
        Editar Aluno
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
            unmasked-value
            label="CPF"
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
          <q-btn color="green" label="Confirmar" @click="onSubmit(id, dados_aluno)" />
          <q-btn color="red" label="Cancelar" v-close-popup />
        </div>
      </q-card-section>
    </q-form>
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
  data_nascimento: (new Date( props.dados_aluno.data_nascimento).toISOString()).split('T', 1)
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
  try{
    console.log("Antes da função formatar " + formularioEditar.value.data_nascimento);
    formularioEditar.value.data_nascimento = new Date(formularioEditar.value.data_nascimento).toISOString();
    console.log("Depois da função formatar " + formularioEditar.value.data_nascimento);
    const {data} = await api.put(`alunos/${id}`, formularioEditar.value)
    console.log("Depois da requisição put " +formularioEditar.value.data_nascimento);

  }catch(error){
    console.log(error);
  }
  setTimeout(() => {
    location.reload()
  }, 2000);

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
