<template>
  <div
    class="q-pa-md text-body-1"
    :style="`min-height: ${$q.screen.height - 130}px`"
  >
    <div class="row justify-end q-pb-md">
      <q-input
        outlined
        borderless
        dense
        debounce="300"
        type="search"
        class="q-pr-md col-6"
        v-model="filtro"
        color="primary"
        label="Pesquisar módulo"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        dense
        class="bg-positive text-white q-px-md"
        icon="add"
        label="Adicionar"
        @click="showModalCadastrarModulo = true"
      ></q-btn>
    </div>
    <q-dialog v-model="showModalCadastrarModulo">
      <modal-cadastro-modulo />
    </q-dialog>
    <div class="row justify-center">
      <div v-for="modulo in modulos" :key="modulo.id">
        <card-modulo :modulo="modulo"> </card-modulo>
      </div>
    </div>
  </div>
  <router-link to="/home" style="text-decoration: none">
    <div class="justify-end-left q-pa-xs q-mb-xs">
      <q-btn outline class="text-orange-10">Voltar</q-btn>
    </div>
  </router-link>
</template>

<script setup>
import { api } from "src/boot/axios";
import CardModulo from "src/components/commons/CardModulo.vue";
import ModalCadastroModulo from "src/components/modals/ModalCadastroModulo.vue";
import { computed, onMounted, ref } from "vue";

const modulos = ref([]);
const showModalCadastrarModulo = ref(false);
const filtro = ref([]);

onMounted(() => {
  getModulos();
});

const getModulos = async () => {
  try {
    const { data } = await api.get("modulos");
    console.log(data);
    modulos.value = data;
  } catch (error) {
    console.log(error);
  }
};

const filtroDeModulos = computed((modulos) => {
    let moduloPesquisado = [];
    console.log(modulos);
    moduloPesquisado.value= modulos.filter((modulo) => {
      return (
        modulo.nome_modulo.toLowerCase().indexOf(this.filtro.toLowerCase() > -1)
      )
      console.log("Teste");
    });
    return moduloPesquisado;
})


</script>
