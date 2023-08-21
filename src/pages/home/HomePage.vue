<template>
  <div class="row" style="height: 100vh">
    <div class="col-12 col-md-6 flex content-center">
      <q-card
        class="bg-deep-purple absolute-center"
        v-bind:style="
          $q.screen.lt.sm
            ? { width: '30%', height: '30%' }
            : { width: '20%', height: '20%' }
        "
      >
        <q-card-section>
          <q-avatar size="100px" class="absolute-center shadow-18" square>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-md">
            <div class="col flex justify-center">
              <q-btn
                flat
                style="color: #ffffff"
                label="Alunos"
                class="text-h4"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
<style scoped>
</style>
