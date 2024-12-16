<template>
  <card-mensagem titulo="Excluir aluno?">
    <div class="row">
      <span class="text-h6 q-mxx-md text-center">
        Tem certeza que deseja excluir <span class="text-bold">{{ nome }}</span
        >? Ao confirmar essa ação, você não poderá desfazê-la!</span
      >
    </div>
    <div class="row">
      <div class="col-12 btn-container">
        <div class="btn-mensagem q-pa-md q-gutter-md q-mr-xs flex justify-center">
          <q-btn
            dense
            class="q-pa-sm text-white"
            label="Cancelar"
            v-close-popup
            size="12px"
            icon="close"
            style="background-color: #991b1b"
          />
          <q-btn
            dense
            class="q-pa-sm text-white"
            label="Confirmar"
            size="12px"
            icon="check"
            @click="deletarAluno(id)"
            style="background-color: #174933"
          />
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
  nome: { type: String },
});

//Deletar o aluno
const deletarAluno = async (id) => {
  try {
    const { data } = await api.delete(`alunos/${id}`);
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
</style>
