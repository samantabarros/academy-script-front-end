<template>
  <q-card
    class="bg-white card-mensagem bordered"
    style="width: 400px; height: 250px"
    persistent
  >
    <div class="row q-pl-md q-my-sm">
      <div class="col-12">
        <div class="q-pl-md">
          <div class="text-h5 text-center">
            <span> Serviço Indisponível</span>
          </div>
          <div class="q-pa-xs justify-end absolute-top-right">
            <q-btn
              flat
              icon="close"
              size="md"
              v-close-popup
            />
          </div>
        </div>
      </div>
    </div>
    <q-separator />
    <div class="q-pl-md q-py-sm flex flex-center">
      <q-img
        class="q-mt-xs"
        src="/img/warning-grey.png"
        alt="imagem de alerta"
        style="height: 50px; max-width: 50px"
      />
    </div>
    <p class="text-subtitle1 q-px-md text-center">
      No momento essa solicitação está indisponível. Tente novamente mais tarde!
    </p>
    <div class="q-px-md text-center">
      <p
        class="descricao absolute-bottom text-primary text-subtitle1 text-weight-regular cursor-pointer text-decoration"
        v-close-popup
      >
        Voltar para a página de login
      </p>
    </div>
  </q-card>
</template>

<script setup>
const props = defineProps(["titulo"]);
</script>

<style>
.descricao {
  text-decoration: underline;
}
</style>
