<template>
  <q-card class="modal-cadastro-modulo" :style="`min-height:${$q.screen.height - 120}px`">
    <q-card-section>
      <div class="row justify-end">
        <q-btn round color="negative" icon="close" size="10px" v-close-popup />
      </div>
      <div class="text-h4 q-ml-xs row justify-center" style="font-family: lucyda-caligraphy">
        Criar Matrícula
      </div>
    </q-card-section>
    <q-separator />
    <div class="q-pa-md">
      <div clas="col-12 col-4-md">
        <q-form @submit.prevent="submitForm">
          <q-card-section class="q-pt-xs">
            <div>
              <q-input outlined v-model="cadastro.nome_modulo" label="Nome"
               :rules="[
                (val) => (val && val.length > 0) || 'Campo obrigatório'
               ]"
               />
            </div>
            <div class="q-mb-md">
              <q-input outlined v-model="cadastro.nota1" label="Nota 1"  />
            </div>
            <div class="q-mb-md" >
              <q-input outlined v-model="cadastro.nota2" label="Nota 2" />
            </div>
            <div class="q-mb-md">
              <q-input outlined v-model="cadastro.nota3" label="Nota 3" />
            </div>
            <div class="row q-pa-md q-gutter-lg justify-center">
              <q-btn color="positive" type=submit label="Cadastrar" />
              <q-btn color="negative" label="Cancelar" v-close-popup />
            </div>
          </q-card-section>
        </q-form>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const cadastro = ref({
  nome_modulo: "",
  nota1: "",
  nota2: "",
  nota3: ""
});

//Função para cadastrar  módulo
const submitForm = async () => {
  const {data} = await api.post(`matricula`, cadastro.value)
  console.log(data)

}

</script>

<style scoped>
.modal-cadastro-modulo {
  max-width: 100%;
  max-height: 100%;
  height: 550px;
  width: 550px;
}
</style>