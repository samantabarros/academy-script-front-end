<template>
  <card-base titulo="Editar Matrícula" tamanho="medio">
    <div clas="col-12 col-4-md">
      <q-form>
        <q-card-section class="q-pt-xs">
          <div class="q-mb-sm">
            <q-input
              outlined
              v-model="formularioEditar.nome_modulo"
              label="Nome"
              disable
            />
          </div>
          <div class="q-mb-sm">
            <q-input outlined v-model="formularioEditar.nota1" label="Nota 1" />
          </div>
          <div class="q-mb-sm">
            <q-input outlined v-model="formularioEditar.nota2" label="Nota 2" />
          </div>
          <div class="q-mb-sm">
            <q-input outlined v-model="formularioEditar.nota3" label="Nota 3" />
          </div>
        </q-card-section>
        <div class="row">
          <div class="col-12 btn-modal">
            <div class="row q-pa-md q-gutter-md justify-end">
              <q-btn
                dense
                class="q-pa-sm text-white"
                label="Cancelar"
                v-close-popup
                size="12px"
                icon="close"
                @click="atualizaPagina"
                style="background-color: #991b1b"
              />
              <q-btn
                dense
                class="q-pa-sm text-white"
                type="submit"
                label="Atualizar"
                @click="onSubmit(id)"
                size="12px"
                icon="check"
                style="background-color: #174933"
              />
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </card-base>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";
import CardBase from "../commons/CardBase.vue";

const $q = useQuasar();

const props = defineProps(["dados_modulo"]);

const formularioEditar = ref({
  id_aluno: props.dados_modulo.id_aluno,
  id_modulo: props.dados_modulo.id_modulo,
  nome_modulo: props.dados_modulo.moduloId.nome_modulo,
  nota1: props.dados_modulo.nota1,
  nota2: props.dados_modulo.nota2,
  nota3: props.dados_modulo.nota3,
});

function onSubmit(id) {
  atualizarDados(id);
}

const atualizarDados = async (id) => {
  try {
    delete formularioEditar.value.nome_modulo;
    formularioEditar.value.nota1 = formularioEditar.value.nota1
      ? Number(formularioEditar.value.nota1)
      : null;
    formularioEditar.value.nota2 = formularioEditar.value.nota2
      ? Number(formularioEditar.value.nota2)
      : null;
    formularioEditar.value.nota3 = formularioEditar.value.nota3
      ? Number(formularioEditar.value.nota3)
      : null;

    const { data } = await api.put(`matricula/${id}`, formularioEditar.value);
    $q.notify({
      message: "Matrícula atualizada com sucesso!",
      color: "positive",
      icon: "check_circle_outline",
      position: "top",
    });
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
        message: error.response.data.message,
        color: "negative",
        icon: "error",
        position: "top",
      });
    }
  }
};

const atualizaPagina = async () => {
  setTimeout(() => {
    location.reload();
  }, 1000);
};
</script>
