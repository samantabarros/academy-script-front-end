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
          <a href="">
            <q-icon name="search" @click="getModulos(filtro)" />
          </a>
        </template>
      </q-input>
      <q-btn
        dense
        class="bg-blue-7 text-white q-px-md"
        icon="add"
        label="Adicionar"
        @click="showModalCadastrarModulo = true"
      ></q-btn>
    </div>
    <q-dialog v-model="showModalCadastrarModulo" persistent>
      <modal-cadastro-modulo />
    </q-dialog>
    <div class="row justify-center">
      <div v-for="modulo in modulos" :key="modulo.id">
        <card-modulo :modulo="modulo"> </card-modulo>
      </div>
    </div>
  </div>
  <router-link to="/home" style="text-decoration: none">
    <div class="justify-end-left q-px-xs">
      <q-btn outline class="text-orange-10">Voltar</q-btn>
    </div>
  </router-link>
</template>

<script setup>
import { api } from "src/boot/axios";
import CardModulo from "src/components/commons/CardModulo.vue";
import ModalCadastroModulo from "src/components/modals/ModalCadastroModulo.vue";
import { onMounted, ref } from "vue";

const modulos = ref([]);
const showModalCadastrarModulo = ref(false);
const filtro = ref("");

onMounted(() => {
  getModulos();
});


async function getModulos(filtro = "") {
  try {
    const { data } = await api.get("modulos");
    console.log(data);
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
    return
  } catch (error) {
    console.log(error);
  }
}


</script>
