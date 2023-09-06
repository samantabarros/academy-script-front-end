<template>
  <q-card class="modal-editar-modulo">
    <q-card-section>
      <div align="right">
        <q-btn flat round icon="close" v-close-popup />
      </div>
      <div
        class="text-h4 row justify-center"
        style="font-family: lucyda-caligraphy"
      >
        Editar Módulo
      </div>
    </q-card-section>
    <q-form>
      <q-card-section class="q-pt-none">
        <div class="q-mb-sm">
          <q-input filled v-model="text" label="Nome" color="purple" />
        </div>
        <div class="q-mb-sm">
          <q-input filled v-model="text" label="Nota 1" color="purple" />
        </div>
        <div class="q-mb-sm">
          <q-input filled v-model="text" label="Nota 2" color="purple" />
        </div>
        <div class="q-mb-sm">
          <q-input filled v-model="text" label="Nota 3" color="purple" />
        </div>
        <div class="row q-pa-md q-gutter-lg justify-evenly">
          <q-btn color="green" label="Atualizar" />
          <q-btn color="red" label="Cancelar" v-close-popup />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ModalEditarModulo",
  setup() {
    return {
      //alert: ref(false),
    };
  },
};
</script>

<style scoped>
.modal-editar-modulo {
  max-width: 100%;
  width: 500px;
  max-height: 100%;
  height: 500px;
}
</style>