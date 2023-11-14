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
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <q-table
      class="q-mt-lg"
      :rows="rows_alunos"
      :title="nomeModuloSelecionado"
      :columns="columns"
      :filter="filter"
      row-key="id"
    >
      <template v-slot:body-cell-status="props">
        <q-td class="flex justify-center items-center">
          <q-badge :color="corStatus(props.row.status)">{{ props.row.status }}</q-badge>
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const nomeModuloSelecionado = ref("");
const route = useRoute();
const rows_alunos = ref([]);
const idModulo = route.params.id;
const filter = ref("");

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

onMounted(() => {
    getAlunos(idModulo);
});
//Mostra alunos por curso

const getAlunos = async (idModulo) => {
    try{
        const resp = await api.get(`modulos/${idModulo}`);
        console.log(resp);
        resp.data.Matricula.map((aluno) => {
            rows_alunos.value.push(aluno);
        });
        nomeModuloSelecionado.value = resp.data.nome_modulo
        calcularMediaStatus(rows_alunos)

    }catch(error){
        console.log(error);
    }
}

async function calcularMediaStatus(rows_alunos) {
  console.log("Entrou em calcularMediaStatusEStatus");
  let matriculas = rows_alunos.value;
  console.log(rows_alunos.value);
  rows_alunos.value.forEach((value, index) => {
    console.log("Testando");
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

  console.log(status);
}


</script>