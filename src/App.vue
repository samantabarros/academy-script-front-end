<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { api } from './boot/axios';
import { useAuthStore } from './stores/auth'

//Mudar a fonte para Inter.
export default defineComponent({
  name: 'App',
  
  //beforeCreate é chamado antes da criação da instância do componente Vue;
  beforeCreate(){
    const auth = useAuthStore();
    //Corrigir essa parte
    auth.init();
  },
});

</script>

<style>

</style>
