<template>
  <q-card class="modal-deletar" style="border-left: 3px solid #5f2680">
    <q-card-section class="row items-center">
      <div class="icon-aviso">
        <q-avatar icon="warning" color="orange" text-color="white" />
      </div>

      <div class="q-pa-md items-center justify-content">
        <p class="time-text">
          Você tem certeza que deseja excluir esse aluno? <br />
          Ao confirmar essa ação, você não poderá desfazê-la.
        </p>
      </div>
    </q-card-section>

    <p>{{ id }}</p>

    <!-- emite um evento quando o usuário confirma a exclusão -->
    <q-card-actions align="right">
      <q-btn
        flat
        label="Sim, excluir"
        color="green"
        type="submit"
        v-close-popup
        @click="confirmDeletion"
      />
      <q-btn flat label="Cancelar" color="red" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { defineProps, ref, toRefs, defineEmits } from "vue";

const { id } = toRefs(defineProps(["id"]));
const emit = defineEmits(["confirmDelete"]); //problema: defineProp is not defined
const confirmDeletion = () => {
  emit("confirmDelete", id.value);
};
</script>
