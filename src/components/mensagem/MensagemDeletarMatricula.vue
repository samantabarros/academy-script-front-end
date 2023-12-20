<template>
  <card-mensagem titulo="Excluir Matrícula?">
    <div class="row q-pt-lg q-pb-sm justify-center">
      <span class="text-h6 q-ml-sm text-center">
        Tem certeza que deseja excluir a matrícula desse aluno? Ao confirmar
        essa ação, você não poderá desfazê-la!
      </span>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="btn-mensagem q-pa-md q-gutter-md q-mr-md flex justify-end">
          <q-btn
            label="Confirmar"
            color="positive"
            size="12px"
            icon="check"
            @click="deletarModulo(id)"
          />
          <q-btn
            label="Cancelar"
            color="negative"
            size="12px"
            icon="close"
            v-close-popup
          />
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
});

const deletarModulo = async (id) => {
  try {
    const { data } = await api.delete(`matricula/${id}`);
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
  margin-top: 50px !important;
}
</style>
