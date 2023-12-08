<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/auth'

//Mudar a fonte para Inter.
export default defineComponent({
  // name: 'App',
  
  // //beforeCreate é chamado antes da criação da instância do componente Vue;
  // // beforeCreate(){
  // //   const authStore = useAuthStore();
  // //   authStore.init(); 

  // //   const token = authStore.getToken;
    
  // //   /*Verifica se o token está presente 
  // //    * Se sim, configura o cabeçalho da instância do axios ('api') com o token de autorização 
  // //    * usando o esquema Bearer
  // //    * Se não, o cabeçalho de autorização é definido como vazio
  // //    */
  // //   if(token) {
  // //     api.defaults.headers.common.Authorization = 'Bearer' + token.acess_token;
  // //   }else{
  // //     api.defaulta.headers.common.Authorization = '';
  // //   }
  // },
});

</script>

<style>

</style>
