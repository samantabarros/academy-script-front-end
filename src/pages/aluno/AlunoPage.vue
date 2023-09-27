<template>
  <div class="q-pa-md text-body1">
    <div class="row justify-end">
      <q-input
        filled
        dense
        type="search"
        class="q-pr-md"
        v-model="pesquisa"
        color="deep-purple"
        label="Pesquisar aluno"
        style="width: 50%"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        dense
        icon="person_add"
        label="Adicionar"
        style="background: #27dc30; color: white"
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
      row-key="id"
      table-header-style="background-color:  #1976d2; color: #fff"
    >
      <template v-slot:body-cell-acoes="props">
        <q-dialog v-model="showModalEditar" persistent>
          <modal-editar />
        </q-dialog>

        <q-td :props="props">
          <q-btn
            class="q-mr-xs"
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="showModalEditar = true"
          />
          <q-btn
            class="q-mr-xs"
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="confirmDelete(props.row.id)"
          />
          <q-btn
            class="q-mr-xs"
            icon="folder"
            color="orange"
            dense
            size="sm"
            :to="`/modulos/${props.row.id}`"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModalCadastro from "src/components/modals/ModalCadastro.vue";
import ModalEditar from "src/components/modals/ModalEditar.vue";

const router = useRouter();
const route = useRoute();
const pesquisa = ref("");
const rows_alunos = ref([]);
const $q = useQuasar();
const showModalEditar = ref(false);
const showModalCadastrar = ref(false);

const columns = [
  {
    name: "name",
    field: "nome_aluno",
    label: "Nome",
    align: "left",
  },
  {
    name: "cpf",
    field: "cpf",
    label: "CPF",
    align: "center",
  },
  {
    name: "data",
    field: "data_nascimento",
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

// async function openModulo(id) {
//   console.log("Entrou na função openModulo");
//   console.log(id);
//   router.push(`modulos/${id}`);
// }

// const openModulo = async (id) => {
//   //router.push(`/modulos/${id}`);
//   console.log(id);
// };

const getAlunos = async () => {
  try {
    const { data } = await api.get("alunos");
    console.log(data);
    rows_alunos.value = data;
  } catch (error) {
    console.log(error);
  }
};

const confirmDelete = async (id) => {
  $q.notify({
    message: "Tem certeza que deseja excluir esse aluno?",
    color: "gray",
    actions: [
      {
        label: "Confirmar",
        color: "green",
        handler: () => {
          deletarAluno(id);
        },
      },
      {
        label: "Cancelar",
        color: "red",
        handler: () => {},
      },
    ],
  });
};

const deletarAluno = async (id) => {
  try {
    const { data } = await api.delete(`alunos/${id}`);
    getAlunos();
  } catch (error) {
    console.log(error);
  }
};
</script>
