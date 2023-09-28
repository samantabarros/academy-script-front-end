<template>
  <q-card class="modal-editar">
    <q-card-section>
      <div align="right">
        <q-btn flat round icon="close" v-close-popup />
      </div>
      <div
        class="text-h4 row justify-center"
        style="font-family: lucyda-caligraphy"
      >
        Editar Aluno
      </div>
    </q-card-section>
    <q-form>
      <q-card-section class="q-pt-none">
        <div class="q-mb-sm">
          <q-input filled v-model="text" label="Nome" color="purple" />
        </div>
        <div class="q-mb-sm">
          <q-input filled v-model="text" label="CPF" color="purple" />
        </div>
        <div class="q-mb-sm">
          <q-input
            filled
            v-model="date"
            type="date"
            label="Data de Nascimento"
            color="purple"
          />
        </div>
        <div class="row q-pa-md q-gutter-lg justify-evenly">
          <q-btn color="green" label="Confirmar" @click="atualizarDados" />
          <q-btn color="red" label="Cancelar" v-close-popup />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter;

const atualizarDados = async (id) => {
  try {
    const { data } = await api.put(`alunos/${id}`).then(data =>
    {
      this.$q.notify({
        type: 'positive',
      message: 'Dados alterados com sucesso!'
      });
    })
  } catch (error) {
    this.$q.notify({
      type: 'negative',
      message: 'Erro ao atualizar os dados!'
    });
  }
  location.reload();
};
</script>

<style scoped>
.modal-editar {
  max-width: 100%;
  width: 500px;
  max-height: 100%;
  height: 500px;
}
</style>