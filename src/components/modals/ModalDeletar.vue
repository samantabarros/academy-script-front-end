<template>
  <q-card style="border-left: 3px solid #5f2680">
    <q-card-section class="row items-center">
      <q-avatar icon="warning" color="orange" text-color="white" />
      <p class="q-ml-sm">
        Você tem certeza que deseja excluir esse aluno? <br />
        Ao confirmar essa ação, você não poderá desfazê-la.
      </p>
    </q-card-section>

    <q-card-actions align="right" @submit.prevent="submitDelete">
      <q-btn
        flat
        label="Sim, excluir"
        color="green"
        type="submit"
        v-close-popup
      />
      <q-btn flat label="Cancelar" color="red" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ModalDeletar",
  setup() {
    /*const remove = async (id){
      try{
        const data = await api.delete(`users/${id}`);
        return data.data;
      }catch( error){
        throw new Error(error);
      }
    };

    const DeleteUser = async (id) => {
      try {
        onOk(async () => {
          await remove(id);
          $q.notify({message: 'Usuário excluido'});
        });
      }catch(error){
        $q.notify({ message: 'Error User delete'})
      }
    };


    const submitDelete = async () => {
      try {
        //const data = await post(cadastro.value);
        const { data } = await api.delete("alunos/:id");
        console.log(data);
        //console.log(response);
        console.log("Chegou aqui");
      } catch (error) {
        console.log(error);
      }
    };*/

    return {
      //alert: ref(false),
      //submitDelete,
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
