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
            <div class="q-mb-md">
                
              <q-input outlined v-model="text" label="Nome" />
            </div>
            <div class="q-mb-md">
              <q-input outlined v-model="text" label="Nota 1"  />
            </div>
            <div class="q-mb-md" >
              <q-input outlined v-model="text" label="Nota 2" />
            </div>
            <div class="q-mb-md">
              <q-input outlined v-model="text" label="Nota 3" />
            </div>
            <div class="row q-pa-lg q-gutter-lg justify-center">
              <q-btn color="positive" label="Cadastrar" />
              <q-btn color="negative" label="Cancelar" v-close-popup />
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