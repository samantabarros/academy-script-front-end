<template>
  <q-card
    class="bg-grey-2 card-mensagem"
    style="width: 620px; height: 430px"
    persistent
  >
    <div class="ro q-ma-md">
      <div class="col-12">
        <div class="text-h4 text-center">
          <p>{{ titulo }}</p>
        </div>

        <div class="q-pa-xs justify-end absolute-top-right">
          <q-btn
            flat
            dense
            icon="close"
            size="md"
            v-close-popup
          />
        </div>
      </div>
    </div>
    <q-separator />
    <div class="q-pa-xs card-container">
      <div class="q-pl-md q-py-sm flex flex-center">
        <q-img
          class="q-mt-xs"
          src="/img/warning-grey.png"
          alt="imagem de alerta"
          style="height: 80px; max-width: 70px"
        />
      </div>
      <slot></slot>
    </div>
  </q-card>
</template>

<script setup>
const props = defineProps(["titulo"]);
</script>

<style>
.card-container {
  min-height: calc(400px - 80px);
}

.btn-mensagem {
  margin-top: 5% !important;
}
</style>
