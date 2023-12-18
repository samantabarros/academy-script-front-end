<template>
  <q-card
    class="bg-white card-mensagem bordered"
    style="width: 400px; height: 250px"
    persistent
  >
    <div class="flex justify-between q-pb-sm q-py-md q-px-sm">
      <q-img
        class="q-ml-xs"
        src="/img/alerta.png"
        alt="imagem cérebro animado"
        style="height: 30px; max-width: 30px"
      />
      <span class="title text-h5"> Serviço Indisponível</span>
      <q-btn square dense color="grey" icon="close" size="10px" v-close-popup />
    </div>
    <q-separator />
    <p class="text-subtitle1 q-pt-lg q-px-md">
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

    <!-- <q-card-section>
      <div class="row justify-end">
        <q-btn
          square
          dense
          color="grey"
          icon="close"
          size="10px"
          v-close-popup
        />
      </div>
      <div class="row q-pl-sm q-py-sm justify-evenly">
        <div class="col-2">
          <q-img
            src="/img/alerta.png"
            alt="imagem cérebro animado"
            style="height: 30px; max-width: 30px"
          />
        </div>
        <div class="text-h5 q-ml-xs flex items-center">
          <p>Serviço Indisponível</p>
        </div>
       
      </div>
      <q-separator />
      <div class="q-pa-md">
        <div>
          <p class="text-h6">
            No momento essa solicitação está indisponível. Tente novamente mais
            tarde!
          </p>
          <div class="q-mb-md flex flex-center items-end">
            <p class="text-primary text-subtitle1 text-weight-regular cursor-pointer" v-close-popup>
               Voltar para a página de login
            </p>
              
          </div>
        </div>
      </div>
    </q-card-section> -->
  </q-card>
</template>

<script setup>
const props = defineProps(["titulo"]);
</script>

<style>
.descricao{
  text-decoration: underline
}
</style>
