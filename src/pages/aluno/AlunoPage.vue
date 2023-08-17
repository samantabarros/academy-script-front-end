<template>
  <div class="q-pa-md">
    <div class="col-3">
      <q-input v-model="search" filled type="search" hint="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div>
        <q-btn outline rounded color="deep-purple" label="Adicionar" />
      </div>
    </div>
    <q-table title="Treats" :rows="rows" :columns="columns" row-key="name" />
  </div>
</template>

<script>
export default {
  name: "AlunoPage",
  setup() {
    const columns = [
      { name: "nome", label: "Nome", field: "name", sortable: true },
    ];
  },
};
</script>
