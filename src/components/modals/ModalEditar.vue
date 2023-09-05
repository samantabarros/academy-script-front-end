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
          <q-btn color="green" label="Confirmar" />
          <q-btn color="red" label="Cancelar" v-close-popup />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ModalEditar",
  setup() {
    return {
      //alert: ref(false),
    };
  },
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