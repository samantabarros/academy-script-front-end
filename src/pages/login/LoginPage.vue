<template>
  <div class="q-pa-md fullscreen padding">
    <q-card class="card-principal absolute-center">
      <q-card-section horizontal class="bg-blue">
        <q-card-section class="card-esquerdo col-6 bg-deep-purple-8">
          <div class="text-center q-pa-lg">
            <p class="q-pt-lg q-ma-xs text-h1 text-white">GEMA</p>
            <p class="q-p-lg text-h5 text-white">
              Gerenciamento de Módulos Avaliativos
            </p>
          </div>
          <div class="q-pa-sm">
            <q-img class="" src="/img/estudos.png" />
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="card-direito col-6 bg-grey-3">
          <div class="q-pa-md text-center">
            <q-icon size="lg" name="account_circle" />
            <p class="text-h2 text-light-green-6">Login</p>
          </div>
          <div class="q-pa-md" style="max-width: 90vmax">
            <q-form @submit.prevent.stop="onSubmit" class="q-gutter-md">
              <p class="text-subtitle2">Usuário</p>
              <q-input
                ref="nameRef"
                filled
                v-model="form.name"
                color="deep-purple"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Por favor, digite algo',
                ]"
                class="col-md-12 col-sm-12 col-xs-12"
              >
                <template v-slot:append>
                  <q-icon name="person" />
                </template>
              </q-input>

              <p class="text-subtitle2">Senha</p>
              <q-input
                v-model="form.password"
                color="deep-purple"
                filled
                :type="isPwd ? 'password' : 'text'"
                :rules="[
                  (val) =>
                    (val !== null && val !== '') ||
                    'Por favor, digite sua senha',
                ]"
                class="col-md-12 col-sm-12 col-xs-12"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <p>{{ form.password }}</p>
              <div>
                <q-btn
                  label="ENTRAR"
                  type="submit"
                  color="green"
                  class="full-width"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        name: "",
        password: "",
        isPwd: ref(true),
      },
    };
  },
};
</script>

<style scoped>
.card-principal {
  width: 100%;
  max-width: 1400px;
}
</style>
