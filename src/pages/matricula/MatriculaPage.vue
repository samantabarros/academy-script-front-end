<template>
  <div
    class="q-pa-md text-body1"
    :style="`min-height: ${$q.screen.height - 150}px`"
  >
    <div class="row justify-end">
      <q-input
        outlined
        borderless
        dense
        debounce="300"
        type="search"
        v-model="filter"
        color="primary"
        label="Pesquisar módulo"
        class="q-pr-md col-6"
      >
        <template v-slot:append>
          <q-icon name="search" color="primary" />
        </template>
      </q-input>
      <q-btn
        dense
        class="text-white q-px-md"
        icon="add"
        style="background-color: #104d87"
        label="Adicionar"
        @click="showModalCadastroMatricula = true"
      >
      </q-btn>
    </div>
    <q-dialog v-model="showModalCadastroMatricula" persistent>
      <modal-cadastro-matricula />
    </q-dialog>
    <q-table
      class="q-mt-lg"
      :title="nomeAlunoSelecionado"
      :rows="rows_matriculas"
      :columns="columns"
      row-key="id"
      v-model:pagination="paginacao_inicial"
      no-data-label="Nenhum dado foi encontrado!"
      no-results-label="Nenhum dado foi encontrado!"
    >
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm">
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          <span> {{ message }} </span>
        </div>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td class="text-center">
          <q-badge :color="corStatus(props.row.status)">
            {{ props.row.status }}</q-badge
          >
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-dialog v-model="showModalEditarMatricula" persistent>
          <modal-editar-matricula :dados_modulo="moduloAtual" />
        </q-dialog>
        <q-dialog v-model="showMensagemDeletarMatricula" persistent>
          <mensagem-deletar-matricula
            :id="moduloAtual.id"
            :nomeAluno="nomeAlunoSelecionado"
            :nomeDoModulo="nomeModulo"
          />
        </q-dialog>
        <q-td :props="props" class="q-gutter-xs">
          <q-btn
            class="q-pa-none"
            icon="edit"
            flat
            size="lg"
            style="color: #581c87"
            @click="iniciarEditarMatricula(props.row)"
          />
          <q-btn
            class="q-pa-none"
            icon="delete"
            flat
            size="lg"
            style="color: #991b1b"
            @click="iniciarDeletarMatricula(props.row)"
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
  <router-link to="/alunos" style="text-decoration: none">
    <div class="justify-end-left q-px-xs">
      <q-btn outline class="text-orange-10" icon="arrow_back_ios_new"
        >Voltar</q-btn
      >
    </div>
  </router-link>
</template>

<script setup>
import { nextTick, defineComponent, ref, onMounted, watch } from "vue";
import { api } from "boot/axios";
import ModalCadastroMatricula from "src/components/modals/ModalCadastroMatricula.vue";
import ModalEditarMatricula from "src/components/modals/ModalEditarMatricula.vue";
import MensagemDeletarMatricula from "src/components/mensagem/MensagemDeletarMatricula.vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const route = useRoute();
const filter = ref("");
const rows_matriculas = ref([]);
const moduloAtual = ref({});
const nomeModulo = ref({});
const idAluno = route.params.id;
const nomeAlunoSelecionado = ref("");
const showModalCadastroMatricula = ref(false);
const showModalEditarMatricula = ref(false);
const showMensagemDeletarMatricula = ref(false);

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
    field: (row) => row.moduloId.nome_modulo,
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
  {
    name: "acoes",
    field: "acoes",
    label: "Ações",
    align: "center",
  },
];

onMounted(() => {
  buscarAlunoSelecionado(idAluno);
  getModulos(idAluno);
});

// Abre o modal componente para deletar o módulo
const iniciarDeletarMatricula = async (modulo) => {
  moduloAtual.value = modulo;
  nomeModulo.value = moduloAtual.value.moduloId.nome_modulo;
  showMensagemDeletarMatricula.value = true;
};

// Abre o modal para editar o módulo
const iniciarEditarMatricula = async (modulo) => {
  moduloAtual.value = modulo;
  showModalEditarMatricula.value = true;
};

const buscarAlunoSelecionado = async () => {
  try {
    const url = `alunos/${idAluno}`;
    const response = await api.get(url);
    nomeAlunoSelecionado.value = response.data.nome_aluno;
  } catch (error) {
    console.error("Erro ao buscar o nome do aluno:", error);
  }
};

//Mostrar módulos
const getModulos = async (idAluno) => {
  const pagina = pagination.value.page;
  const url = `matricula/${idAluno}/?pagina=${pagina}&itensPorPagina=${itensPorPagina.value}&busca=${filter.value}`;
  try {
    const resp = await api.get(url);
    rows_matriculas.value = resp.data.data;
    calcularMediaStatus(rows_matriculas);
    max_paginas.value = resp.data.maxPage;
  } catch (error) {
    console.error(error);
  }
};

//Função para ver o status do aluno
const calcularMediaStatus = async (rows_matriculas) => {
  //async function calcularMediaStatus(rows_matriculas) {
  let matriculas = rows_matriculas.value;
  rows_matriculas.value.forEach((value, index) => {
    const media = ref(0);

    media.value =
      (Number(value.nota1) + Number(value.nota2) + Number(value.nota3)) / 3;

    if (value.nota1 === null || value.nota2 === null || value.nota3 === null) {
      rows_matriculas.value[index] = {
        ...rows_matriculas.value[index],
        status: "Incompleto",
      };
    } else if (media.value >= 5) {
      rows_matriculas.value[index] = {
        ...rows_matriculas.value[index],
        status: "Apto",
      };
    } else {
      rows_matriculas.value[index] = {
        ...rows_matriculas.value[index],
        status: "Inapto",
      };
    }
  });
};

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
      await getModulos(idAluno);
    });
  },
  { deep: true }
);

watch(filter, () => {
  nextTick(async () => {
    await getModulos(idAluno);
  });
});
</script>
<style></style>
