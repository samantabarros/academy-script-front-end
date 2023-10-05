<template>
  <q-card>
    <q-card-section class="q-pa-lg row justify-center">
      <q-avatar icon="info" color="orange" text-color="white" />
      <span class="text-h6 q-ml-sm justify-content"
        >Tem certeza que deseja excluir esse aluno? Ao confirmar essa ação, você não poderá desfazê-la!</span
      >
      {{id}}
    </q-card-section>

    <q-card-actions align="center" class="">
      <q-btn flat label="Cancelar" color="negative" v-close-popup />
      <q-btn flat label="Sim, excluir" color="positive" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup>
const props = defineProps({
  id:{type:String}
});

</script>
