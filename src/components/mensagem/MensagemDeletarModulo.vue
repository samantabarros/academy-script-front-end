<template>
  <card-mensagem titulo="Excluir Módulo?">
    <div class="row q-pt-lg q-pb-sm q-mx-sm justify-center">
      <span class="text-h6 q-ml-sm text-center">
        Tem certeza que deseja excluir o módulo <span class="text-bold">{{nome}}</span>? Ao confirmar essa ação, você
        não poderá desfazê-la!
      </span>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="btn-mensagem q-pa-md q-gutter-md q-mr-sm flex justify-end">
          <q-btn
            label="Confirmar"
            color="positive"
            size="12px"
             icon="check" 
            @click="deletarModulo(props.id)"
          />
          <q-btn label="Cancelar" size="12px" color="negative" icon="close" v-close-popup/>
        </div>
      </div>
    </div>
  </card-mensagem>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import CardMensagem from "src/components/commons/CardMensagem.vue";

const $q = useQuasar();
const props = defineProps({
  id: { type: String },
  nome: {type: String}
});

const deletarModulo = async (id_modulo) => {
  try {
    const { data } = await api.delete(`modulos/${id_modulo}`);
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

<style scoped>
.btn-mensagem {
  margin-top: 80px !important;
}
</style>
