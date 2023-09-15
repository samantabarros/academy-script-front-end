<template>
  <q-card style="border-left: 3px solid #5f2680">
    <q-card-section class="row items-center">
      <q-avatar icon="warning" color="orange" text-color="white" />
      <p class="q-ml-sm">
        Você tem certeza que deseja excluir esse aluno? <br />
        Ao confirmar essa ação, você não poderá desfazê-la.
      </p>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        flat
        label="Sim, excluir"
        color="green"
        type="submit"
        v-close-popup
        @click="DeleteUser(idStudent)"
      />
      <q-btn flat label="Cancelar" color="red" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
export default {
  name: "ModalDeletar",
  props: ["idStudent"], //nome da variável que vem pelo parametro
  setup() {
    const DeleteUser = async (id) => {
      const { data } = await api.delete(`alunos/${id}`);
      location.reload();
    };

    return {
      DeleteUser,
    };
  },
};
</script>


<style scoped>
.modal-deletar {
  max-width: 100%;
  width: 500px;
  max-height: 100%;
  height: 500px;
}
</style>
