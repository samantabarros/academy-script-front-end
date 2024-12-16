<template>
  <q-card :class="`card-${tamanho}`">
    <q-card-section>
      <div class="row q-pl-md ">
        <div class="col-12">
          <div class="q-pl-md">
            <q-icon
              class="fixed q-mt-xs"
              name="edit_document"
              size="35px"
              color="grey"
            />
          </div>
          <div class="text-h4 text-center">
            <p>{{ titulo }}</p>
          </div>

          <div class="q-pa-xs justify-end absolute-top-right">
            <q-btn
              flat
              icon="close"
              size="md"
              @click="atualizaPagina"
              v-close-popup
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <div class="q-pa-md">
      <slot></slot>
    </div>
  </q-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({ titulo: String, tamanho: String });

const atualizaPagina = async () => {
  setTimeout(() => {
    location.reload();
  });
};
// const modalClass = () => {
//   return `card-${tamanho.value}`
// }
</script>

<style>
.card-pequeno {
  max-width: 100%;
  max-height: 100%;
  height: 350px;
  width: 550px;
}

.card-medio {
  max-width: 100%;
  max-height: 100%;
  height: 500px;
  width: 550px;
}
.card-grande {
  max-width: 100%;
  max-height: 100%;
  height: 600px;
  width: 550px;
}

.btn-modal {
  margin-top: 5% !important;
}
</style>
