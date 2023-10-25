<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
//Mudar a fonte para Inter.
export default defineComponent({
  name: 'App'
})
</script>

<style>
.app{
  font-family: 'Inter', sans-serif;
}
</style>
