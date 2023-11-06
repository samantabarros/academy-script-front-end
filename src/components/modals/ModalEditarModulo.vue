<template>
  <q-card class="modal-editar-modulo"  :style="`min-height:${$q.screen.height - 120}px`">
    <q-card-section>
      <div class="row justify-end">
        <q-btn round color="negative" icon="close" size="10px" v-close-popup />
      </div>
      <div class="text-h4 q-ml-xs row justify-center" style="font-family: lucyda-caligraphy">
        Editar Módulo
      </div>
    </q-card-section>
    <q-separator />
    <div class="q-pa-md">
      <div clas="col-12 col-4-md">
        <q-form>
          <q-card-section class="q-pt-none">
            <div class="q-mb-sm">
              <q-input outlined v-model="text" label="Nome"/>
            </div>
            <div class="q-mb-sm">
              <q-input outlined v-model="text" label="Nota 1"  />
            </div>
            <div class="q-mb-sm">
              <q-input outlined v-model="text" label="Nota 2"  />
            </div>
            <div class="q-mb-sm">
              <q-input outlined v-model="text" label="Nota 3" />
            </div>
            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-btn color="positive" label="Atualizar" />
              <q-btn color="negative" label="Cancelar" v-close-popup />
            </div>
          </q-card-section>
        </q-form>
      </div>
    </div>
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