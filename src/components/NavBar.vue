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
  </q-layout>
</template>

<script>
export default {
  name: "NavBar",
};
</script>
