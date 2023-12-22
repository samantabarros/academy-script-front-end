<template>
  <q-card
    class="bg-grey-2 card-mensagem"
    style="width: 620px; height: 400px"
    persistent
  >
    <div class="row q-pl-md q-ma-sm">
      <div class="col-12">
        <div class="text-h4 text-center">
          <p>{{ titulo }}</p>
        </div>

        <div class="q-pa-xs justify-end absolute-top-right">
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
    </div>
    <q-separator />
    <div class="q-pl-md q-py-sm flex flex-center">
      <q-img
        class="q-mt-xs"
        src="/img/warning-grey.png"
        alt="imagem de alerta"
        style="height: 80px; max-width: 70px"
      />
    </div>
    <div class="q-pa-xs">
      <slot></slot>
    </div>
    <!-- </q-card-section> -->
  </q-card>
</template>

<script setup>
const props = defineProps(["titulo"]);
</script>

<style></style>
