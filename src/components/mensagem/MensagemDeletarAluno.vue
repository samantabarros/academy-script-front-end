<template>
  <card-mensagem titulo="Excluir aluno?">
    <div class="row q-pt-lg q-pb-sm justify-center">
      <span class="text-h6 q-ml-sm text-center">
        Tem certeza que deseja excluir <span class="text-bold">{{nome}}</span>? Ao confirmar essa ação, você
        não poderá desfazê-la!</span
      >
    </div>
    <div class="row">
      <div class="col-12 btn-container">
        <div class="btn-mensagem q-pa-md q-gutter-md q-mr-xs flex justify-end">
          <q-btn
            class="q-pa-sm"
            dense
            label="Confirmar"
            color="blue-7"
            size="12px"
            @click="deletarAluno(id)"
            icon="check"
            v-close-popup
          />
          <q-btn dense class="q-pa-sm" label="Cancelar" color="grey-7" size="12px" icon="close" v-close-popup />
        </div>
      </div>
    </div>
  </card-mensagem>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import CardMensagem from "src/components/commons/CardMensagem.vue";

const $q = useQuasar();
const props = defineProps({
  id: { type: String },
  nome: {type: String},
});

//Deletar o aluno
const deletarAluno = async (id) => {
  try {
    const { data } = await api.delete(`alunos/${id}`);
    console.log("O valor de data em DeletarAluno é " + data);
    $q.notify({
      message: "Aluno excluido com sucesso!",
      color: "positive",
      icon: "check_circle_outline",
      position: "top",
    });
    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    console.log(error);
    $q.notify({
      message: error.response.data.message,
      color: "negative",
      icon: "error",
      position: "top",
    });
  }
};
</script>

<style>
.card-deletar {
  border: 2px solid rgba(31, 61, 195, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.btn-mensagem {
  margin-top: 80px !important;
}

</style>
