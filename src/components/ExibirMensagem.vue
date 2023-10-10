<template>
  <q-card>
    <q-card-section class="q-pa-lg row justify-center">
      <q-avatar icon="info" color="orange" text-color="white" />
      <span class="text-h6 q-ml-sm justify-content"
        >Tem certeza que deseja excluir esse aluno? Ao confirmar essa ação, você não poderá desfazê-la!</span
      >
    </q-card-section>

    <q-card-actions align="center" class="">
      <q-btn flat label="Cancelar" color="negative" v-close-popup />
      <q-btn flat label="Sim, excluir" color="positive" v-close-popup @click="deletarAluno(id)"/>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { api } from "src/boot/axios";

const props = defineProps({
  id:{type:String}
});

//Deletar o aluno
const deletarAluno = async (id) => {
  try {
    const { data } = await api.delete(`alunos/${id}`);
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

</script>
