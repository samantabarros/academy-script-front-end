<template>
  <q-card
    class="bg-grey-2 card-mensagem"
    style="width: 620px; height: 300px"
    persistent
  >
    <q-card-section>
      <div class="row q-pl-md q-py-sm justify-between">
        <div class="col-10"></div>
        <div class="col-2"></div>
        <div class="col-2">
          <q-img
            src="/img/alerta.png"
            alt="imagem de alerta"
            style="height: 40px; max-width: 40px"
          />
        </div>
        <div class="col-7 text-h4 q-ml-xs text-center">
          <p>{{ titulo }}</p>
        </div>
        <div class="col-2">
          <q-img
            src="/img/atencao.png"
            alt="imagem cérebro animado"
            style="height: 40px; max-width: 40px"
          />
        </div>
        <div class="justify-end">
          <q-btn
            square
            dense
            color="grey"
            icon="close"
            size="10px"
            v-close-popup
          />
        </div>
      </div>
      <q-separator />
      <div class="q-pa-md">
        <slot></slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps(["titulo"]);
</script>

<style></style>
