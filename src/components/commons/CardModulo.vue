<template>
  <div class="row card-modulo q-mb-md flex items-center justify-evenly"  :class="isMobile ? 'card-modulo-mobile flex-column items-start q-pa-md' : ''">
    <div class="col-8 flex q-mx-sm " :class="isMobile ? 'flex-column items-start q-mb-md' : ''">
      <div class="col-2 flex justify-center items-center q-pr-md" :class="isMobile ? 'q-pr-none q-mb-sm' : ''">
        <img src="../../assets/images/Graph.png" alt="Ícone de disciplina">
      </div>
      <div class="column">
        <p :class="isMobile ? 'text-xs' : 'text-lg'"  style="font-size: 30px" class="q-ma-none text-bold">{{ modulo.nome_modulo }}</p>
        <div class="row q-pb-sm q-ma-none" :class="isMobile ? 'flex-wrap text-sm' : ''">
          <p class="text-bold  q-ma-none">Docente:</p>
          <p class="q-pr-md q-pr-md q-pl-xs  q-ma-none">Nome Sobrenome</p>
          <p class="text-bold  q-ma-none"> Carga Horária:</p>
          <p class="q-pr-md q-pr-md q-pl-xs  q-ma-none">60h</p>
        </div>
      </div>
    </div>
    <div class="col-2 q-mx-md flex justify-center items-center">
      <q-dialog v-model="showMensagemDeletarModulo" persistent>
        <mensagem-deletar-modulo :id="modulo.id" :nome="modulo.nome_modulo" />
      </q-dialog>
      <q-btn class="q-pa-none" icon="delete" flat size="lg" style="color: #991b1b"
        @click="iniciarModalDeletar(modulo.id)" />
      <q-btn class="q-pa-none" flat icon="group" dense size="lg"  style="color: #821B4C" :to="`/alunosPorCurso/${modulo.id}`" />
    </div>
  </div>
  
</template>

<script setup>
import MensagemDeletarModulo from "src/components/mensagem/MensagemDeletarModulo.vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { computed } from "vue";

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.md);
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
  min-height: 120px;

}

.card-modulo-mobile {
  border: 2px solid #D9D9D9;
  border-radius: 20px;
  transition: transform 0.4s;
  max-height: 300px;

}

.card-modulo:hover {
  transform: scale(1.02);
}
</style>
