<template>
  <card-base titulo="Editar módulo">
    <div clas="col-12 col-4-md">
      <q-form>
        <q-card-section class="q-pt-xs">
          <div class="q-mb-sm">
            <q-input outlined v-model="text" label="Nome" />
          </div>
          <div class="q-mb-sm">
            <q-input outlined v-model="text" label="Nota 1" />
          </div>
          <div class="q-mb-sm">
            <q-input outlined v-model="text" label="Nota 2" />
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
  </card-base>
</template>

<script setup>
import CardBase from "../commons/CardBase.vue";

import { ref } from "vue";

</script>

<style scoped>
.modal-editar-modulo {
  max-width: 100%;
  width: 500px;
  max-height: 100%;
  height: 500px;
}
</style>