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
          style="height: 50px; width: 90px; font-size: 12px"
        />
      </div>

      <q-dialog v-model="showModalCadastro" persistent>
        <modal-cadastro />
      </q-dialog>
      <q-dialog v-model="showModalEditar" persistent>
        <modal-editar />
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
            @click="showModalEditar = true"
          />
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="DeleteUser(props.row.id)"
          />
          <q-btn
            icon="folder"
            color="orange"
            dense
            size="sm"
            @click="openModulo"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { api } from "boot/axios";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import ModalCadastro from "src/components/modals/ModalCadastro.vue";
import ModalEditar from "src/components/modals/ModalEditar.vue";
import ModalDeletar from "src/components/modals/ModalDeletar.vue";

export default {
  name: "AlunoPage",
  components: { ModalCadastro, ModalEditar, ModalDeletar },

  methods: {
    /*openModal(){
      this.showModal = true;
    },*/
    openModulo() {
      this.$router.push({ name: "modulo-aluno" });
    },
  },
  setup() {
    //const posts = ref([]);
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
    const showModalCadastro = ref(false);
    const showModalEditar = ref(false);
    //const showModalDeletar = ref(false);
    const search = ref("");
    const $q = useQuasar();
    const rows = ref([]);
    const $router = useRouter();

    onMounted(() => {
      getAlunos();
    });

    const getAlunos = async () => {
      try {
        //Não precisa das chaves pois já está retornando os dados direto
        const { data } = await api.get("alunos");

        console.log(data);
        rows.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    // eslint-disable-next-line consistent-return
    const remove = async (id) => {
      try {
        const data = await api.delete(`rows/${id}`);
        return data.data;
      } catch (error) {
        throw new Error(error);
      }
    };

    const DeleteUser = async (id) => {
      try {
        $q.dialog({
          dark: true,
          title: "Confirmar",
          message:
            "Tem certeza que deseja excluir esse aluno? Ao realizar essa ação você não poderá desfazê-la!",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(id);
          $q.notify({
            message: "Usuário deletado",
            icon: "check",
            color: "positive",
          });
          $router.push({ name: "home-aluno" });
        });
      } catch (error) {
        $q.notify({
          message: "Erro ao deletar o aluno!",
          icon: "times",
          color: "negative",
        });
      }
    };

    return {
      columns,
      rows,
      showModalCadastro,
      showModalEditar,
      //showModalDeletar,
      search,
      DeleteUser,
    };
  },
};
</script>
