<template>
  <q-card >
    <div class="row q-pt-lg q-pb-sm justify-center">
      <q-avatar icon="info" color="orange" text-color="white" />
      <span class="text-h6 q-ml-sm text-center">Tem certeza que deseja excluir esse aluno? Ao confirmar essa ação, você
        não poderá desfazê-la!</span>
    </div>
    <q-card-actions align="center" class="">
      <q-btn flat label="Sim, excluir" color="positive" v-close-popup @click="deletarAluno(id)" />
      <q-btn flat label="Cancelar" color="negative" v-close-popup />
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

.card-deletar {
    border: 2px solid rgba(31, 61, 195, 0.5);
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);

}
