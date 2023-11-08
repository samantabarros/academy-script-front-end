<template>
    <q-card
      :class= "`card-${tamanho}`"
    >
      <q-card-section>
        <div class="row justify-end">
          <q-btn square dense color="grey" icon="close"  size="10px"  v-close-popup />
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
import { computed } from 'vue';


const props = defineProps({"titulo": String, "tamanho": String})

// const modalClass = () => {
//   return `card-${tamanho.value}`
// }
</script>

<style>
.card-pequeno{
  max-width: 100%;
  max-height: 100%;
  height: 350px;
  width: 550px;
}

.card-medio{
  max-width: 100%;
  max-height: 100%;
  height: 500px;
  width: 550px;
}
.card-grande{
  max-width: 100%;
  max-height: 100%;
  height: 600px;
  width: 550px;
}
</style>