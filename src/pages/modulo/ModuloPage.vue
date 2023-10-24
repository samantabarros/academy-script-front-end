<template>
  <div
    class="q-pa-sm text-body1"
    :style="`min-height: ${$q.screen.height - 120}px`"
  >
    <div class="row justify-end">
      {{ idAluno }}
      {{ nomeAlunoSelecionado }}

      <div class="col subtitle-1 ellipsis"></div>
      <q-input
        dense
        filled
        borderless
        debounce="300"
        class="q-pr-md col-6"
        v-model="filter"
        color="primary"
        type="search"
        label="Pesquisar módulo"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn
        label="Adicionar"
        class="bg-positive text-white"
        dense
        icon="person_add"
        @click="showModalCadastroModulo = true"
      />
    </div>
    <q-dialog v-model="showModalCadastroModulo" persistent>
      <modal-cadastro-modulo />
    </q-dialog>
    <q-table
      class="q-mt-lg"
      :rows="rows"
      :columns="columns"
      :filter="filter"
      row-key="name"
      table-header-style="background-color: #dcdcdc;"
    >
      <template v-slot:body-cell-acoes="props">
        <q-dialog v-model="showModalEditarModulo" persistent>
          <modal-editar-modulo />
        </q-dialog>
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="showModalEditarModulo = true"
          />
          <q-btn icon="delete" color="negative" dense size="sm" />
        </q-td>
      </template>
    </q-table>
  </div>
  <router-link to="/alunos" style="text-decoration: none">
    <div class="justify-end-left q-pa-xs">
      <q-btn flat class="text-primary">Voltar</q-btn>
    </div>
  </router-link>
</template>

// <script setup>
import { defineComponent, ref, onMounted } from "vue";
import { api } from "boot/axios";
import ModalCadastroModulo from "src/components/modals/ModalCadastroModulo.vue";
import ModalEditarModulo from "src/components/modals/ModalEditarModulo.vue";

import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const route = useRoute();
const showModalCadastroModulo = ref(false);
const showModalEditarModulo = ref(false);
const pesquisa = ref("");
const rows = ref([]);
const idAluno = route.params.id;
const nomeAlunoSelecionado = ref("");

const columns = [
  {
    name: "name",
    field: "nome_modulo",
    label: "Nome",
    sortable: false,
    align: "left",
  },
  {
    name: "nota-um",
    field: "nota1",
    label: "Nota 1",
    align: "center",
  },
  {
    name: "nota-dois",
    field: "nota2",
    label: "Nota 2",
    align: "center",
  },
  {
    name: "nota-tres",
    field: "nota3",
    label: "Nota 3",
    align: "center",
  },
  {
    name: "status",
    field: "status",
    label: "Status",
    sortable: false,
    align: "center",
  },
  {
    name: "acoes",
    field: "acoes",
    label: "Ações",
    sortable: false,
    align: "center",
  },
];

onMounted(() => {
  //buscarAlunoSelecionado(idAluno);
});

// const getPosts = async (id) => {
//   try {
//     const { data } = await api.get("alunos/id");
//     console.log(data);
//     rows.value = data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const buscarAlunoSelecionado = async (idAluno) => {
//   try{
//     const response = await api.get(`alunos/${idAluno}`);
//     console.log(response);
//     nomeAlunoSelecionado.value = response.data.nome_aluno;
//   }catch(error) {
//     console.error("Erro ao buscar o nome do aluno:", error);
//   }
// }
</script>
