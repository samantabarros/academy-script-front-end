<template>
  <p
    class="text-h4 flex justify-center items-center q-ma-none q-my-md text-bold"
    v-if="!isMobile"
  >
    Bacharelado em Ciência da Computação
  </p>
  <p
    class="text-subtitle1 flex justify-center items-center q-ma-none q-my-md text-bold"
    v-if="isMobile"
  >
    Bacharelado em Ciência da Computação
  </p>
  <card-modelo
    :titulo="titulo"
    icone="book_2"
    class="q-my-sm q-mx-lg"
    v-if="!isMobile"
  >
    <div
      class="q-pa-md text-body-1"
      :style="`min-height: ${$q.screen.height - 130}px`"
    >
      <div class="row justify-between q-pb-md">
        <q-btn
          dense
          class="btn-color text-white q-px-md q-mr-md"
          icon="add"
          label="Adicionar"
          @click="showModalCadastrarModulo = true"
        ></q-btn>
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
            <q-icon name="search" @click="getModulos(filtro)" color="primary" />
          </template>
        </q-input>
      </div>
      <q-dialog v-model="showModalCadastrarModulo" persistent>
        <modal-cadastro-modulo />
      </q-dialog>
      <div class="row">
        <div
          v-for="modulo in modulos"
          :key="modulo.id"
          class="col-12 items-center"
        >
          <card-modulo :modulo="modulo"> </card-modulo>
        </div>
      </div>
    </div>
  </card-modelo>
  <div
    class="q-pa-md text-body-1"
    :style="`min-height: ${$q.screen.height - 130}px`"
    v-if="isMobile"
  >
    <div class="row justify-between q-pb-md">
      <q-btn
        dense
        class="btn-color text-white q-px-md q-mr-md"
        icon="add"
        label="Adicionar"
        @click="showModalCadastrarModulo = true"
      ></q-btn>
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
          <q-icon name="search" @click="getModulos(filtro)" color="primary" />
        </template>
      </q-input>
    </div>
    <q-dialog v-model="showModalCadastrarModulo" persistent>
      <modal-cadastro-modulo />
    </q-dialog>
    <div class="row">
      <div
        v-for="modulo in modulos"
        :key="modulo.id"
        class="col-12 items-center"
      >
        <card-modulo :modulo="modulo"> </card-modulo>
      </div>
    </div>
    <router-link to="/home" style="text-decoration: none">
      <div class="justify-end-left">
        <q-btn flat icon="arrow_back_ios_new" style="text-color: #104D87"
          >Voltar</q-btn
        >
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import CardModulo from "src/components/commons/CardModulo.vue";
import ModalCadastroModulo from "src/components/modals/ModalCadastroModulo.vue";
import { onMounted, ref } from "vue";
import CardModelo from "src/components/commons/CardModelo.vue";
import { useQuasar } from "quasar";
import { computed } from "vue";

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.md);

const modulos = ref([]);
const showModalCadastrarModulo = ref(false);
const filtro = ref("");
const titulo = ref("Disciplinas");

onMounted(() => {
  getModulos();
});

async function getModulos(filtro = "") {
  try {
    const { data } = await api.get("modulos");
    modulos.value = data;
    if (filtro != "") {
      let moduloPesquisado = [];
      moduloPesquisado.value = modulos.value.filter((modulo) => {
        return (
          modulo.nome_modulo.toLowerCase().indexOf(filtro.toLowerCase()) > -1
        );
      });
      modulos.value = moduloPesquisado.value;
      return;
    }
    return;
  } catch (error) {
    console.log(error);
  }
}
</script>

<style>
.btn-color {
  background-color: #104d87;
}
</style>
