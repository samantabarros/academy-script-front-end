<template>
    <card-mensagem titulo="Excluir Módulo?">
     <div class="row q-pt-lg q-pb-sm justify-center">
      <span class = "text-h6 q-ml-sm text-center">
          Tem certeza que deseja excluir esse módulo? Ao confirmar essa ação, você
          não poderá desfazê-la! 
      </span>
  
     </div>
          <q-card-actions align="center">
            <q-btn
              flat
              label="Sim, excluir"
              color="positive"
              @click="deletarModulo(id)"
            />
            <q-btn flat label="Cancelar" color="negative" v-close-popup />
          </q-card-actions>
    </card-mensagem>
  </template>
  
  <script setup>
  import { useQuasar } from "quasar";
  import { api } from "src/boot/axios";
  import CardMensagem from "src/components/commons/CardMensagem.vue";
  
  const $q = useQuasar();
  const props = defineProps({
    id: { type: String },
  });
  
  const deletarModulo = async (id) => {
    try {
      const { data } = await api.delete(`modulos/${id}`);
      $q.notify({
        message: "Módulo excluido com sucesso!",
        color: "positive",
        icon: "check_circle_outline",
        position: "top",
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      $q.notify({
        message: error.response.data.message,
        color: "negative",
        icon: "error",
        position: "top",
      });
    }
  };
  </script>