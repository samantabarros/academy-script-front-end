<template>
  <q-card
    class="bg-grey-2 card-mensagem"
    style="width: 500px; height: 300px"
    persistent
  >
    <q-card-section>
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
            style="height: 50px; max-width: 60px"
          />
        </div>
        <div class="text-h4 q-ml-xs flex items-center">
          <h5>Serviço Indisponível</h5>
        </div>
        <div class="col-2">
          <q-img
            src="/img/atencao.png"
            alt="imagem cérebro animado"
            style="height: 50px; max-width: 60px"
          />
        </div>
      </div>
      <q-separator />
      <div class="q-pa-md">
        <div>
          <span
            >No momento essa solicitação está indisponível. Tente novamente mais
            tarde!
          </span>
          <div class="q-mb-md flex flex-center items-end">
            <p class="text-primary text-subtitle1 text-weight-regular cursor-pointer" v-close-popup>
               Voltar para a página de login
            </p>
              
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps(["titulo"]);
</script>

<style>
.card-mensagem {
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.card-mensagem:hover {
  transform: scale(1.05);
}
</style>
