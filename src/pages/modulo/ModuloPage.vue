<template>
  <div class="q-pa-md text-body1">
    <div class="row q-pt-xs q-pb-md justify-end">
      <q-input
        class="col-4"
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
          @click="showModalCadastroModulo = true"
          class="q-pa-xs q-ml-md self-center"
          style="height: 50px; width: 90px; font-size: 12px"
        />
      </div>

      <q-dialog v-model="showModalCadastroModulo" persistent>
        <modal-cadastro-modulo />
      </q-dialog>
      <q-dialog v-model="showModalEditarModulo" persistent>
        <modal-editar-modulo />
      </q-dialog>
      <q-dialog v-model="showModalDeletar" persistent>
        <modal-deletar />
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
          <q-btn
            icon="edit"
            color="info"
            dense
            size="sm"
            @click="showModalEditarModulo = true"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="showModalDeletar = true"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
//import { api } from "boot/axios";
import postsService from "src/services/reqModulos.js";
import ModalCadastroModulo from "src/components/modals/ModalCadastroModulo.vue";
import ModalEditarModulo from "src/components/modals/ModalEditarModulo.vue";
import ModalDeletar from "src/components/modals/ModalDeletar.vue";

export default {
  name: "ModuloPage",
  components: { ModalCadastroModulo, ModalEditarModulo, ModalDeletar },

  methods: {},
  setup() {
    const { list } = postsService();
    const columns = [
      {
        name: "name",
        field: "nome_modulo",
        label: "Nome",
        sortable: false,
        align: "left",
      },
      {
        name: "nota-um",
        field: "nota1",
        label: "Nota 1",
        align: "center",
      },
      {
        name: "nota-dois",
        field: "nota2",
        label: "Nota 2",
        align: "center",
      },
      {
        name: "nota-tres",
        field: "nota3",
        label: "Nota 3",
        align: "center",
      },
      {
        name: "status",
        field: "status",
        label: "Status",
        sortable: false,
        align: "center",
      },
      {
        name: "acoes",
        field: "acoes",
        label: "Ações",
        sortable: false,
        align: "center",
      },
    ];
    const showModalCadastroModulo = ref(false);
    const showModalEditarModulo = ref(false);
    const showModalDeletar = ref(false);
    const search = ref("");

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
      showModalCadastroModulo,
      showModalEditarModulo,
      showModalDeletar,
      search,
    };
  },
};
</script>
