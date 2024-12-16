<template>
  <card-mensagem titulo="Excluir Matrícula?">
    <div class="row">
      <span class="text-h6 q-mx-md text-center">
        Tem certeza que deseja excluir a matrícula de
        <span class="text-bold">{{ nomeAluno }}</span> na disciplina de
        <span class="text-bold">{{ nomeDoModulo }}</span
        >? Ao confirmar essa ação, você não poderá desfazê-la!
      </span>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="btn-mensagem q-pa-md q-gutter-md q-mr-xs flex justify-center">
          <q-btn
            dense
            class="q-pa-sm text-white"
            label="Cancelar"
            v-close-popup
            size="12px"
            icon="close"
            style="background-color: #991b1b"
          />
          <q-btn
            dense
            class="q-pa-sm text-white"
            label="Confirmar"
            size="12px"
            icon="check"
            style="background-color: #174933"
            @click="deletarModulo(id)"
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
  nomeAluno: { type: String },
  nomeDoModulo: { type: String },
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
