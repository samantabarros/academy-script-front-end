<template>
  <div class="q-pa-md text-body1">
    <div class="row q-pt-xs q-pb-md justify-end">
      <q-input
        class="col-4 self-center"
        v-model="pesquisa"
        rounded
        filled
        color="deep-purple"
        type="search"
        label="Pesquisar"
        style="height: 50px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div>
        <q-btn
          color="green"
          label="Adicionar"
          @click="showModalCadastro = true"
          class="q-pa-xs q-ml-md self-center"
          style="height: 50px; width: 90px; font-size: 12px"
        />
      </div>
    </div>

    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
      table-header-style="background-color: #7c10e8; color: #fff;"
    >
      <template v-slot:body-cell-acoes="props">
        <q-dialog v-model="showModalCadastro" persistent>
          <modal-cadastro />
        </q-dialog>
        <q-dialog v-model="showModalEditar" persistent>
          <modal-editar />
        </q-dialog>
        <q-dialog v-model="showModalDeletar" persistent>
          <modal-deletar :idStudent="props.row.id" />
        </q-dialog>
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="showModalEditar = true"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="showModalDeletar = true"
          />
          <!-- <q-btn :to="props.row.id">s </q-btn> -->

          <q-btn
            icon="folder"
            color="orange"
            dense
            size="sm"
            @click="openModulo(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, ref, onMounted } from "vue";
import ModalCadastro from "src/components/modals/ModalCadastro.vue";
import ModalEditar from "src/components/modals/ModalEditar.vue";
import ModalDeletar from "src/components/modals/ModalDeletar.vue";

const router = useRouter();
const route = useRoute();
const showModalCadastro = ref(false);
const showModalEditar = ref(false);
const showModalDeletar = ref(false);
const pesquisa = ref("");
const $q = useQuasar();
const rows = ref([]);
const id = route.params.id;
console.log(id);

async function openModulo(id) {
  router.push(`/home/alunos/modulos/${id}`);
}

const columns = [
  {
    name: "name",
    field: "nome_aluno",
    label: "Nome",
    sortable: false,
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
    sortable: false,
    align: "center",
  },
  {
    name: "acoes",
    field: "acoes",
    label: "Ações",
    sortable: true,
    align: "center",
  },
];

onMounted(() => {
  getAlunos();
});

const getAlunos = async () => {
  try {
    const { data } = await api.get("alunos");
    console.log(data);
    rows.value = data;
  } catch (error) {
    console.log(error);
  }
};
</script>
