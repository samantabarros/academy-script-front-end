<template>
  <q-card

    :style="`max-height: 900px; height: 100%`"
  >
    <q-card-section class="row bg-grey-2 q-py-sm ">
      <div class="flex col-8">
        <q-icon size="md" :name="icone" />
        <p class="text-h6 q-ml-xs q-ma-none">{{ titulo }}</p>
      </div>

      <div class="col-4  button-container">
        <slot class="button-content" name="button" />
      </div>
    </q-card-section>
    <q-separator />
    <div class="q-pa-md">
      <slot />
    </div>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
export default defineComponent({
  props: {
    titulo: {
      type: String,
      required: true,
    },
    icone: {
      type: String,
      required: true,
    },
    max_height: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const $q = useQuasar();
  },
});
</script>

<style>
.button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

</style>
