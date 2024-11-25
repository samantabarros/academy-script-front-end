<template>
    <div class="row card-modulo">
      <div class="col-2 q-pl-md q-mt-sm">
        <img src="../../assets/images/Graph.png" alt="Ícone de disciplina">
      </div>
      <div class="col-6 flex flex-center text-center q-mx-sm q-mt-sm">
        <p style="font-size: 30px">{{ modulo.nome_modulo }}</p>
      </div>
      <div class="col-3 q-mx-md">
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
  border: 2px solid #D9D9D9;
  border-radius: 20px;
  transition: transform 0.4s;
}

.card-modulo:hover {
  transform: scale(1.05);
}
</style>
