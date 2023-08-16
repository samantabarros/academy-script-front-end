<template>
  <div class="q-pa-md fullscreen">
    <q-card class="card-principal q-pa-lg absolute-center">
      <q-card-section horizontal>
        <q-card-section class="card-esquerdo col-6 bg-deep-purple-8">
          <div class="titulo text-center">
            <h1>GEMA</h1>
          </div>
          <div class="titulo-dois text-center">
            <h5>Gerenciamento de Módulos Avaliativos</h5>
          </div>
          <div>
            <q-img src="public/img/estudos.png" />
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="card-direito col-6 bg-grey-3">
          <div class="nome-login text-center">
            <h2>Icon Usuario</h2>
            <h2>Login</h2>
          </div>
          <div class="q-pa-md" style="max-width: 90vmax">
            <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
              <p>Usuário</p>
              <q-input
                ref="nameRef"
                filled
                v-model="name"
                lazy-rules
                :rules="nameRules"
              />
              <p>Senha</p>
              <q-input
                v-model="password"
                filled
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <div>
                <q-btn label="ENTRAR" type="submit" color="green" />
              </div>
            </form>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
};
</script>

<style scoped>
.card-principal {
  width: 100%;
  max-width: 1500px;
}
</style>
