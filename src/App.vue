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
    //const {init} = auth.init;
    console.log("Chegou aqui!")
    //Corrigir essa parte
    auth.init();

    // console.log("Em beforeCreate token é igual a  = " + token.value);
    
    // /*Verifica se o token está presente 
    //  * Se sim, configura o cabeçalho da instância do axios ('api') com o token de autorização 
    //  * usando o esquema Bearer
    //  * Se não, o cabeçalho de autorização é definido como vazio
    //  */
    // if(token) {
    //   api.defaults.headers.common.Authorization = 'Bearer' + token.acess_token;
    // }else{
    //   api.defaults.headers.common.Authorization = '';
    // }
  },
});

</script>

<style>

</style>
