<template>
  <div class="q-pa-md">
    <div class="row q-pt-xs q-pb-md justify-end">
      <q-input
        class="col-4"
        v-model="search"
        rounded
        filled
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
    <q-table :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { api } from "boot/axios";

export default {
  name: "AlunoPage",
  setup() {
    const posts = ref([]);
    const columns = [
      {
        name: "name",
        field: "name",
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
        field: "data",
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
        const { data } = await api.get("/alunos");
        console.log(data);
        rows.value = data;
      } catch (error) {}
    };
    return {
      columns,
      rows,
    };
  },
};
</script>
