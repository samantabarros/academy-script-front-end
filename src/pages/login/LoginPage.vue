<template>
  <q-layout>
    <q-page-container>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="card-login" flat bordered>
          <q-card-section horizontal>
            <q-card-section>
              <h1>Banner</h1>
            </q-card-section>
            <q-separator vertical />
            <q-card-section>
              <h1>Form Login</h1>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LoginPage",
};
</script>

<style scoped>
.card-login{
  width: 100%;
  max-width: 350px;
}
</style>