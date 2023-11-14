<template>
  <div class="q-pa-md">
    <div
      class="bg-grey-2 row justify-center card-modulo"
      style="width: 320px; height: 180px"
    >
      <div class="col-4 q-pl-md q-py-md">
        <q-img src="/img/brain.png" alt="imagem cérebro animado" size="10px" />
      </div>
      <div class="col-8 flex flex-center">
        <p style="font-size: 30px">{{ modulo.nome_modulo }}</p>
      </div>
      <div class="justify-between">
        <q-dialog v-model="showMensagemDeletarModulo" persistent>
          <mensagem-deletar-modulo :id="moduloAtual.id" />
        </q-dialog>
        <q-btn class="q-mr-xs" icon="delete" color="negative" dense size="md" @click="iniciarModalDeletar(modulo.id)"/>
        <q-btn
          class="q-mr-xs"
          icon="group"
          color="purple"
          dense
          size="md"
          :to="`/alunosPorCurso/${modulo.id}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MensagemDeletarModulo from "src/components/mensagem/MensagemDeletarModulo.vue";
import { ref } from "vue";

const props = defineProps(["modulo"]);
const showMensagemDeletarModulo = ref(false);
const moduloAtual = ref({});

const iniciarModalDeletar = async (id_modulo) => {
    moduloAtual.value = id_modulo;
    showMensagemDeletarModulo.value = true;

}
</script>

<style>
.card-modulo {
  border: 2px solid rgba(31, 61, 195, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.card-modulo:hover {
  transform: scale(1.05);
}
</style>
