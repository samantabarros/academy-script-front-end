<template>
  <div class="q-pa-md text-body1">
    <div class="row q-pt-xs q-pb-md justify-end">
      <q-input
        class="col-4 self-center"
        v-model="search"
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
          style="height: 45px; width: 90px; font-size: 12px"
        />
      </div>

      <q-dialog v-model="showModalCadastro">
        <modal-cadastro />
      </q-dialog>
    </div>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      table-header-style="background-color: #7c10e8; color: #fff;"
    >
      <template v-slot:body-cell-acoes="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" />
          <q-btn icon="delete" color="negative" dense size="sm" />
          <q-btn icon="folder" color="orange" dense size="sm" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
//import { api } from "boot/axios";
import postsService from "src/services/posts.js";
import ModalCadastro from "src/components/modals/ModalCadastro.vue";

export default {
  name: "AlunoPage",
  components: { ModalCadastro },

  methods: {
    /*openModal(){
      this.showModal = true;
    },*/
    /*showModalCadastro() {
      this.$router.push({path: '/home/alunos/cadastrar'})
    }*/
  },
  setup() {
    const posts = ref([]);
    const { list } = postsService();
    const columns = [
      {
        name: "name",
        field: "nome_aluno",
        label: "Nome",
        sortable: true,
        align: "left",
      },
      {
        name: "cpf",
        field: "cpf",
        label: "CPF",
        sortable: true,
        align: "left",
      },
      {
        name: "data",
        field: "data_nascimento",
        label: "Data de nascimento",
        sortable: true,
        align: "left",
      },
      {
        name: "acoes",
        field: "acoes",
        label: "Ações",
        sortable: true,
        align: "left",
      },
    ];
    const showModalCadastro = ref(false);

    const rows = ref([]);

    onMounted(() => {
      getPosts();
    });

    const getPosts = async () => {
      try {
        //Não precisa das chaves pois já está retornando os dados direto
        const data = await list();
        console.log(data);
        rows.value = data;
      } catch (error) {
        console.log(error);
      }
    };
    return {
      columns,
      rows,
      showModalCadastro,
    };
  },
};
</script>
