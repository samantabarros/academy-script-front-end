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
      <q-btn
        dense
        class="bg-blue-7 text-white q-px-md"
        icon="person_add"
        label="Adicionar"
        @click="showModalCadastrar = true"
      ></q-btn>
    </div>
    <q-dialog v-model="showModalCadastrar" persistent>
      <modal-cadastro />
    </q-dialog>

    <q-table
      class="q-mt-lg"
      :rows="rows_alunos"
      :columns="columns"
      :filter="filter"
      row-key="id"
    >
      <template v-slot:body-cell-acoes="props">
        <q-dialog v-model="showModalEditar" persistent>
          <modal-editar :dados_aluno="alunoAtual" />
        </q-dialog>

        <q-dialog v-model="showMensagemDeletarAluno" persistent>
          <mensagem-deletar-aluno
            :id="alunoAtual.id"
            :nome="alunoAtual.nome_aluno"
          />
        </q-dialog>

        <q-td :props="props">        
          <q-btn
            class="q-mr-xs"
            icon="edit"
            color="green"
            dense
            size="md"
            @click="iniciarModalEditar(props.row)"
          />

          <q-btn
            class="q-mr-xs"
            icon="folder"
            color="blue"
            dense
            size="md"
            :to="`/matriculas/${props.row.id}`"
          />
            <q-btn
            class="q-mr-xs"
            icon="delete"
            color="negative"
            dense
            size="md"
            @click="iniciarModalDeletar(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
  <router-link to="/home" style="text-decoration: none">
    <div class="row justify-end-left q-px-xs">
      <div class="col-12 btn-voltar">
        <q-btn outline class="text-orange-10" icon="arrow_back_ios_new">Voltar</q-btn>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalCadastro from "src/components/modals/ModalCadastro.vue";
import ModalEditar from "src/components/modals/ModalEditar.vue";
import MensagemDeletarAluno from "src/components/mensagem/MensagemDeletarAluno.vue";

const router = useRouter();
const route = useRoute();
const filter = ref("");
const rows_alunos = ref([]);
const $q = useQuasar();
const showModalEditar = ref(false);
//const showModal = ref(false);
const showModalCadastrar = ref(false);
const showMensagemDeletarAluno = ref(false);
const alunoAtual = ref({});

const columns = [
  {
    name: "name",
    field: "nome_aluno",
    label: "Nome",
    align: "left",
  },
  {
    name: "cpf",
    field: (row) =>
      row.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
    label: "CPF",
    align: "center",
  },
  {
    name: "data",
    field: (row) =>
      row.data_nascimento.slice(0, 10).split("-").reverse().join("/"),
    label: "Data de nascimento",
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
  getAlunos();
});

// Abre o modal componente para deletar  o aluno
const iniciarModalDeletar = async (aluno) => {
  alunoAtual.value = aluno;
  showMensagemDeletarAluno.value = true;
};

// Abre o modal para editar o aluno
const iniciarModalEditar = async (aluno) => {
  alunoAtual.value = aluno;
  showModalEditar.value = true;
};

//Mostrar alunos
const getAlunos = async () => {
  try {
    const { data } = await api.get("alunos");
    console.log(data);
    rows_alunos.value = data;
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
/* .btn-voltar{
  margin-top: 150px !important;
  position: fixed;
} */
</style>
