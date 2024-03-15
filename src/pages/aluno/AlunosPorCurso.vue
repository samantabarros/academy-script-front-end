<template>
  <div
    class="q-pa-md text-body1"
    :style="`min-height: ${$q.screen.height - 130}px`"
  >
    <div class="row justify-end">
      <q-input
        outlined
        borderless
        dense
        debounce="300"
        type="search"
        class="q-pr-md col-6"
        v-model="filter"
        color="primary"
        label="Pesquisar aluno"
      >
        <template v-slot:append>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
    </div>
    <q-table
      class="q-mt-lg"
      :rows="rows_alunos"
      :title="nomeModuloSelecionado"
      :columns="columns"
      row-key="id"
      v-model:pagination="paginacao_inicial"
      no-data-label="Nenhum dado foi encontrado!"
      no-results-label="Nenhum dado foi encontrado!"
    >
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          <span>
            {{ message }}
          </span>
        </div>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td class="flex justify-center items-center">
          <q-badge :color="corStatus(props.row.status)">{{
            props.row.status
          }}</q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-dialog v-model="showModalEditar" persistent>
          <modal-editar :dados_aluno="alunoAtual" />
        </q-dialog>

        <q-dialog v-model="showMensagemDeletarAluno" persistent>
          <mensagem-deletar-aluno :id="alunoAtual.id" />
        </q-dialog>

        <q-td :props="props">
          <q-btn class="q-mr-xs" icon="edit" color="info" dense size="md" />

          <q-btn
            class="q-mr-xs"
            icon="delete"
            color="negative"
            dense
            size="md"
          />
        </q-td>
      </template>
      <template v-slot:bottom>
        <div class="full-width flex justify-center pagination_container">
          <q-pagination
            v-if="max_paginas > 1"
            v-model="pagination.page"
            @input="console.log(pagination.page)"
            color="grey"
            active-color="primary"
            :max="max_paginas"
            :max-pages="max_paginas"
            direction-links
            size="md"
          >
          </q-pagination>
        </div>
      </template>
    </q-table>
  </div>
  <router-link to="/modulos" style="text-decoration: none">
    <div class="justify-end-left q-pa-xs q-mb-xs">
      <q-btn outline class="text-orange-10">Voltar</q-btn>
    </div>
  </router-link>
</template>

<script setup>
import { api } from "src/boot/axios";
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const nomeModuloSelecionado = ref("");
const route = useRoute();
const router = useRouter();
const rows_alunos = ref([]);
const idModulo = route.params.id;
const filter = ref("");

const max_paginas = ref(0);
const rowsPerPage = ref(10);
const itensPorPagina = ref(10);
const paginacao_inicial = ref({
  page: 1,
  rowsPerPage: itensPorPagina,
});

const pagination = ref({
  rowsPerPage,
  maxPages: 0,
  page: paginacao_inicial.value.page,
  pageShow: 1,
});

const columns = [
  {
    name: "name",
    field: (row) => row.alunoId.nome_aluno,
    label: "Nome",
    align: "left",
  },

  {
    name: "nota1",
    field: "nota1",
    label: "Nota 1",
    align: "center",
  },
  {
    name: "nota2",
    field: "nota2",
    label: "Nota 2",
    align: "center",
  },
  {
    name: "nota3",
    field: "nota3",
    label: "Nota 3",
    align: "center",
  },
  {
    name: "status",
    field: "status",
    label: "Status",
    align: "center",
  },
];



//Mostra alunos por curso

const getAlunos = async () => {
  const pagina = pagination.value.page;
  const url = `modulos/${idModulo}/?pagina=${pagina}&itensPorPagina=${itensPorPagina.value}&busca=${filter.value}`;

  try {
    const resp = await api.get(url);
    rows_alunos.value = resp.data.data;
    nomeModuloSelecionado.value = resp.data.nome_modulo;
    calcularMediaStatus(rows_alunos);
    max_paginas.value = resp.data.maxPage;
  } catch (error) {
    console.log(error);
  }
};

async function calcularMediaStatus(rows_alunos) {
  let matriculas = rows_alunos.value;
  rows_alunos.value.forEach((value, index) => {
    const media = ref(0);

    media.value =
      (Number(value.nota1) + Number(value.nota2) + Number(value.nota3)) / 3;

    if (value.nota1 === null || value.nota2 === null || value.nota3 === null) {
      rows_alunos.value[index] = {
        ...rows_alunos.value[index],
        status: "Incompleto",
      };
    } else if (media.value >= 5) {
      rows_alunos.value[index] = {
        ...rows_alunos.value[index],
        status: "Apto",
      };
    } else {
      rows_alunos.value[index] = {
        ...rows_alunos.value[index],
        status: "Inapto",
      };
    }
  });
}

function corStatus(status) {
  if (status == "Apto") {
    return "positive";
  }
  if (status == "Inapto") {
    return "negative";
  }
  if (status == "Incompleto") {
    return "purple";
  }
}

watch(
  () => pagination,
  () => {
    nextTick(async () => {
      await getAlunos();
    });
  },
  { deep: true }
);

//Se alterar o filtro, então chama a função buscaDados novamente
watch(filter, () => {
  nextTick(async () => {
    await getAlunos();
  });
});
onMounted(() => {
  getAlunos();
});
</script>
