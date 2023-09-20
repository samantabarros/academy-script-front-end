<template>
  <q-card class="modal-deletar" style="border-left: 3px solid #5f2680">
    <p>{{ idStudent }}</p>

    <q-card-section class="row items-center">
      <div class="icon-aviso">
        <q-avatar
          icon="warning"
          color="red"
          text-color="white"
          class="icon-aviso"
        />
      </div>

      <div class="q-pa-md items-center justify-content">
        <p class="time-text">
          Você tem certeza que deseja excluir esse aluno? <br />
          Ao confirmar essa ação, você não poderá desfazê-la.
        </p>
      </div>
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

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";

const props = defineProps(["idStudent"]);
//props: ["idStudent"], //nome da variável que vem pelo parametro

const DeleteUser = async (id) => {
  console.log(id);
  const { data } = await api.delete(`alunos/${id}`);
  console.log(data);
  location.reload();
};
</script>


<style scoped>
.modal-deletar {
  width: 480px;
  height: 280px;
  background: rgb(17, 4, 134);
  border-radius: 15px;
  display: flex;
  color: white;
  justify-content: center;
  position: relative;
  flex-direction: column;
  background: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}

.time-text {
  padding: 15px 5px 5px 20px;
  font-size: 14px;
  margin-top: 0px;
  margin-left: 15px;
  font-weight: 600;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.icon-aviso {
  padding: 15px 15px 20px 15px;
  font-size: 50px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15px;
  transition: all 0.3s ease-in-out;
}
</style>
