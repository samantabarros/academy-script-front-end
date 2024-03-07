<template>
  <div class="q-pa-md">
    <div
      class="row justify-center card-modulo"
      style="width: 350px; height: 200px"
    >
      <div class="col-4 q-pl-md q-py-md">
        <div class="column items-center">
          <q-icon name="auto_stories" size="100px" color="blue-5" />
        </div>
      </div>

      <div class="col-8 flex flex-center text-center text-blue-5 q-px-lg">
        <p style="font-size: 30px">{{ modulo.nome_modulo }}</p>
      </div>
      <div class="justify-between">
        <q-dialog v-model="showMensagemDeletarModulo" persistent>
          <mensagem-deletar-modulo :id="modulo.id" :nome="modulo.nome_modulo" />
        </q-dialog>
        <q-btn
          class="q-mr-xs"
          icon="delete"
          color="negative"
          border=""
          dense
          size="md"
          @click="iniciarModalDeletar(modulo.id)"
        />
        <q-btn
          class="q-mr-xs"
          icon="group"
          color="grey"
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
};
</script>

<style>
.card-modulo {
  border: 2px solid #24afff;
  border-radius: 20px;
  transition: transform 0.4s;
}

.card-modulo:hover {
  transform: scale(1.05);
}
</style>
