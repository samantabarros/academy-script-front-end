<template>
  <card-base titulo="Cadastrar Disciplina" tamanho="pequeno">
    <div class="col-12 col-4-md">
      <q-form
        @submit.prevent="submitForm"
        style="height: 100%; display: flex; flex-direction: column"
      >
        <q-card-section class="q-pt-xs" style="flex: 1">
          <div style="height: 100%">
            <q-input
              outlined
              class="q-mb-xs"
              v-model="cadastro.nome_modulo"
              label="Nome"
              :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
            />
          </div>
        </q-card-section>
        <div class="btn-modal q-pa-md q-gutter-md flex justify-end">
        <q-btn
            dense
            class="q-pa-sm text-white"
            label="Cancelar"
            v-close-popup
            size="12px"
            icon="close"
            style="background-color: #991B1B; "
          />
          <q-btn
            dense
            class="q-pa-sm text-white"
            type="submit"
            label="Confirmar"
            size="12px"
            icon="check"
            style="background-color: #174933; "

          />
        </div>
      </q-form>
    </div>
  </card-base>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import CardBase from "../commons/CardBase.vue";
import { Notify, useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const cadastro = ref({
  nome_modulo: "",
});

const submitForm = async () => {
  try {
    const { data } = await api.post("modulos", cadastro.value);
    $q.notify({
      message: "Módulo cadastrado com sucesso!",
      color: "positive",
      icon: "check_circle_outline",
      position: "top",
    });
    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    if (error.response) {
      $q.notify({
        message: error.response.data.message,
        color: "negative",
        icon: "error",
        position: "top",
      });
    } else {
      $q.notify({
        message: "Erro ao cadastrar módulo!",
        color: "negative",
        icon: "error",
        position: "top",
      });
    }
  }
};
</script>

