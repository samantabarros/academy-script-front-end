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
        v-model="filter"
        color="primary"
        label="Pesquisar módulo"
        class="q-pr-md col-6"
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
      :filter="filter"
      row-key="id"
    >
      <template v-slot:body-cell-status="props">
        <q-td  class="flex justify-center items-center" >
          <q-badge :color="corStatus(props.row.status)">
          {{ props.row.status }}</q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-dialog v-model="showModalEditarMatricula" persistent>
          <modal-editar-matricula />
        </q-dialog>
        <q-dialog v-model="showMensagemDeletarMatricula" persistent>
          <mensagem-deletar-matricula :id="moduloAtual.id" />
        </q-dialog>
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="md"
            @click="showModalEditarMatricula = true"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="md"
            @click="iniciarDeletarMatricula(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <router-link to="/alunos" style="text-decoration: none">
    <div class="justify-end-left q-pa-xs q-mb-xs">
      <q-btn outline class="text-orange-10">Voltar</q-btn>
    </div>
  </router-link>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import { api } from "boot/axios";
import ModalCadastroMatricula from "src/components/modals/ModalCadastroMatricula.vue";
import ModalEditarMatricula from "src/components/modals/ModalEditarMatricula.vue";
import MensagemDeletarMatricula from "src/components/modals/MensagemDeletarMatricula.vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();
const route = useRoute();
const filter = ref("");
const rows_matriculas = ref([]);
const moduloAtual = ref({});
const idAluno = route.params.id;
const nomeAlunoSelecionado = ref("");
const showModalCadastroMatricula = ref(false);
const showModalEditarMatricula = ref(false);
const showMensagemDeletarMatricula = ref(false);

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
    field: "nota3",
    label: "Ações",
    align: "center",
  },
];

onMounted(() => {
  buscarAlunoSelecionado(idAluno);
  getModulos(idAluno);
  //calcularMediaEStatus(rows_matriculas);
  //calcularMedia(rows_matriculas)
});

// Abre o modal componente para deletar o módulo
const iniciarDeletarMatricula = async (modulo) => {
  moduloAtual.value = modulo;
  showMensagemDeletarMatricula.value = true;
};

const buscarAlunoSelecionado = async () => {
  // console.log(idAluno)
  try {
    const response = await api.get(`alunos/${idAluno}`);
    // console.log(response);
    nomeAlunoSelecionado.value = response.data.nome_aluno;
  } catch (error) {
    console.error("Erro ao buscar o nome do aluno:", error);
  }
};

//Mostrar módulos
const getModulos = async (idAluno) => {
  try {
    const resp = await api.get(`alunos/${idAluno}`);
    console.log(resp);

    resp.data.Matricula.map((modulo) => {
      rows_matriculas.value.push(modulo);
    });
    calcularMedia(rows_matriculas);
  } catch (error) {
    console.error(error);
  }
};

//Função para ver o status do aluno

async function calcularMedia(rows_matriculas) {
  console.log("Entrou em calcularMediaEStatus");
  let matriculas = rows_matriculas.value;
  console.log(rows_matriculas.value);
  rows_matriculas.value.forEach((value, index) => {
    console.log("Testando");
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

  console.log(status);
}
</script>
<style>
</style>