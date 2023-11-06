<template>
    <q-card
      class="card-estilo"
      :style="`min-height:${$q.screen.height - 120}px`"
    >
      <q-card-section>
        <div class="row justify-end">
          <q-btn round color="negative" icon="close"  size="10px"  v-close-popup />
        </div>
        <div class="text-h4 q-ml-xs row justify-center"> {{ titulo }}</div>
      </q-card-section>
      <q-separator />
      <div class="q-pa-md">
        <slot></slot>
      </div>
    </q-card>
</template>

<script setup>

const props = defineProps(["titulo"])
</script>

<style>
.card-estilo {
  max-width: 100%;
  max-height: 100%;
  height: 550px;
  width: 550px;
}
</style>