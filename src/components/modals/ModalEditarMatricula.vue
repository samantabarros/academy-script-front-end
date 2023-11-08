<template>
  <card-base titulo="Editar Matrícula" tamanho="medio">
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
        </q-card-section>
        <div class="row q-pa-md q-gutter-lg justify-end">
          <q-btn color="positive" label="Atualizar" size="13px" />
          <q-btn color="negative" label="Cancelar" size="13px" v-close-popup />
        </div>

      </q-form>
    </div>
  </card-base>
</template>

<script setup>
import CardBase from "../commons/CardBase.vue";

import { ref } from "vue";

</script>
