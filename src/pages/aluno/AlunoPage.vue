<template>
  <div class="q-pa-md">
    <div class="row q-pt-xs q-pb-md justify-end">
      <q-input
        class="col-4"
        v-model="search"
        rounded
        filled
        color="deep-purple"
        type="search"
        label="Pesquisar"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div>
        <q-btn color="deep-purple" label="Adicionar" class="q-pa-md q-ml-md" />
      </div>
    </div>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      table-header-style="background-color: #7c10e8"
      card-container-style="background-color: #cbc1e0"
      class=""
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
//import { api } from "boot/axios";
import postsService from "src/services/posts.js";

export default {
  name: "AlunoPage",
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
    };
  },
};
</script>
