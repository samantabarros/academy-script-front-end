<template>
  <div class="row q-col-gutter" style="heigth: 100%; max-heigth: 500px">
    <div class="col-3 absolute-center">
      <q-card class="my-card q-py-sm">
        <q-item>
          <q-item-section avatar>
            <q-avatar square>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-btn flat style="color: #4a169e" label="Alunos" />
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>
.my-card{
   border: 30px solid deep-purple;
}
<style scoped>
</style>
