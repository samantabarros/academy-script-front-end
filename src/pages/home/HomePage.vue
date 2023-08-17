<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-deep-purple">
      <q-toolbar>
        <q-toolbar-title> GEMA </q-toolbar-title>
        <div>
          <q-btn
            flat
            dense
            round
            label="Sair"
            icon="logout"
            @click="toggleLeftDrawer"
          />
        </div>
      </q-toolbar>
    </q-header>

    <div class="row q-col-gutter" style="width: 100%">
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
    <q-footer elevated class="bg-deep-purple">
      <q-toolbar>
        <q-toolbar-title class="text-center"
          >Samanta Barros 2023</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
  </q-layout>
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
