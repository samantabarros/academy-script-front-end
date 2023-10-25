<template>
  <q-card class="modal-cadastro-modulo" :style="`min-height:${$q.screen.height - 120}px`">
    <q-card-section>
      <div class="row justify-end">
        <q-btn round color="negative" icon="close" size="10px" v-close-popup />
      </div>
      <div class="text-h4 q-ml-xs row justify-center" style="font-family: lucyda-caligraphy">
        Cadastrar Módulo
      </div>
    </q-card-section>
    <q-separator />
    <div class="q-pa-md">
      <div clas="col-12 col-4-md">
        <q-form>
          <q-card-section class="q-pt-xs">
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
              <q-btn color="green" label="Cadastrar" />
              <q-btn color="red" label="Cancelar" v-close-popup />
            </div>
          </q-card-section>
        </q-form>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped>
.modal-cadastro-modulo {
  max-width: 100%;
  max-height: 100%;
  height: 550px;
  width: 550px;
}
</style>