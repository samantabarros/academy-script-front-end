<template>
  <div
    class="q-pa-md text-body-1"
    :style="`min-height: ${$q.screen.height - 130}px`"
  >
    <div class="row justify-end">
      <q-input
        filled
        borderless
        dense
        debounce="300"
        type="search"
        class="q-pr-md col-6"
        v-model="filter"
        color="primary"
        label="Pesquisar módulo"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn
        dense
        class="bg-positive text-white"
        icon="add"
        label="Adicionar"
        @click="showModalCadastrar = true"
      ></q-btn>
    </div>
  </div>
  <router-link to="/home" style="text-decoration: none">
    <div class="justify-end-left q-pa-xs q-mb-xs">
      <q-btn outline class="text-orange-10 ">Voltar</q-btn>
    </div>
  </router-link>
</template>
  
<script setup>
</script>