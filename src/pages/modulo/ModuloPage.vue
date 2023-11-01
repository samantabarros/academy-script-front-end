<template>
  <div class="q-pa-md text-body1 " :style="`min-height: ${$q.screen.height - 130}px`">
    <div class="row justify-end">
        <q-input 
          filled
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
          class="bg-positive text-white"
          icon="add"
          label="Adicionar"
          @click="showModalCadastroModulo= true">
        </q-btn>
    </div>
    <q-dialog v-model="showModalCadastroModulo" persistent>
      <modal-cadastro-modulo />
    </q-dialog>
    <q-table 
      class="q-mt-lg" 
      :title="nomeAlunoSelecionado" 
      :rows="rows_matriculas" 
      :columns="columns" 
      :filter="filter"
      row-key="id"
    >
      <template v-slot:body-cell-acoes="props">
        <q-dialog v-model="showModalEditarModulo" persistent>
          <modal-editar-modulo />
        </q-dialog>
        <q-td :props="props" class="q-gutter-sm">

          <q-btn icon="edit" color="info" dense size="sm" @click="showModalEditarModulo = true" />
          <q-btn icon="delete" color="negative" dense size="sm" />
        </q-td>
      </template>
    </q-table>
  </div>
  <router-link to="/alunos" style="text-decoration: none">
    <div class="justify-end-left q-pa-xs q-mb-xs">
      <q-btn outline class="text-orange-10 ">Voltar</q-btn>
    </div>
  </router-link>
 
</template>

<script setup>
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
const rows_matriculas = ref([]);
const idAluno = route.params.id;
const nomeAlunoSelecionado = ref("");
const media = ref(0);
const status = ref('');

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

// Valores para teste
// const rows_modulo = [
//   {
//     nome_modulo: 'Quasar',
//     nota1: 5,
//     nota2: 5,
//     nota3: '-',
//     status: 'Incompleto'

//   }
// ]

onMounted(() => {
  buscarAlunoSelecionado(idAluno);
  getModulos(idAluno);
  //statusDoAluno()
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

const buscarAlunoSelecionado = async () => {
  // console.log(idAluno)
  try {
    const response = await api.get(`alunos/${idAluno}`);
    // console.log(response);
    nomeAlunoSelecionado.value = response.data.nome_aluno;
  } catch (error) {
    console.error("Erro ao buscar o nome do aluno:", error);
  }
}


const getModulos = async(idAluno) => {
  try{
    const resp = await api.get(`alunos/${idAluno}`);
    // console.log(resp);
    resp.data.Matricula.map((modulo) => {
      rows_matriculas.value.push(modulo);
    })
  }catch(error){
    console.error(error);
  }
}


//Função para ver o status do aluno

//  const statusDoAluno = (id_modulo) => {
//   media.value = 15 / 3;
//   console.log(media);
//   if(nota1.value == '' || nota2.value == '' || nota3.value == ''){
//     status.value = 'Incompleto';
//   }else if(media.value >= 5){
//     status.value = 'Apto';
//   }else{
//     status.value = 'Inapto';
//   }
//  }
</script>
<style>

</style>