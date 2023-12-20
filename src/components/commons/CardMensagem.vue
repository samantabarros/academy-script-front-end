<template>
  <q-card
    class="bg-grey-2 card-mensagem"
    style="width: 620px; height: 330px"
    persistent
  >
    <div class="row q-pl-md q-mt-md">
      <div class="col-12">
        <div class="q-pl-md">
          <q-img
            class="fixed q-mt-xs "
            src="/img/warning.svg"
            alt="imagem de alerta"
            style="height: 35px; max-width: 40px"
          />
        </div>
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
    <div class="q-pa-md">
      <slot></slot>
    </div>
    <!-- </q-card-section> -->
  </q-card>
</template>

<script setup>
const props = defineProps(["titulo"]);
</script>

<style></style>
