<template>
  <q-card>
    <div class="row">
      <span class="text-h6 q-ml-sm text-center">Tem certeza que deseja excluir esse aluno? Ao confirmar essa ação, você
        não poderá desfazê-la!</span>
    </div>
    <q-card-actions align="center" class="">
      <q-btn flat label="Cancelar" color="negative" v-close-popup />
      <q-btn flat label="Sim, excluir" color="positive" v-close-popup @click="deletarAluno(id)" />
    </q-card-actions>

  </q-card>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";


const $q = useQuasar();
const props = defineProps({
  id: { type: String }
});

//Deletar o aluno
const deletarAluno = async (id) => {
  try {
    const { data } = await api.delete(`alunos/${id}`);
    $q.notify({
      message: "Aluno excluido com sucesso!",
      color: "positive",
      icon: "check_circle_outline",
      position: "top"

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
      position: "top"

    });
  }
};

</script>
