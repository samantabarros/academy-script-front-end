<template>
  <div class="row q-pa-md fullscreen items-center justify-center">
    <div
      class="col-6"
      style="height: 100%; max-height: 800px; width: 100%; max-width: 1200px"
    >
      <q-card style="height: 100%; width: 100%">
        <q-card-section horizontal style="height: 100%; width: 100%">
          <q-card-section
            class="card-esquerdo col-6 bg-deep-purple-8 items-center"
          >
            <div class="text-center q-pa-md">
              <p class="q-pt-lg q-ma-xs text-h1 text-white">GEMA</p>
              <p class="q-p-lg text-h5 text-white">
                Gerenciamento de Módulos Avaliativos
              </p>
            </div>
            <div class="q-pa-md">
              <q-img class="gema-imagem" src="/img/estudos.png" />
            </div>
          </q-card-section>

          <q-separator vertical />

          <q-card-section class="card-direito col-6 bg-grey-3 items-center">
            <div class="q-pa-md q-pb-lg text-center">
              <q-img class="user-perfil" src="/img/user-perfil.png" />
              <p class="text-h2 text-light-green-8">Login</p>
            </div>
            <div class="q-pa-md">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
                ref="myForm"
              >
                <q-input
                  ref="nameRef"
                  filled
                  v-model="form.name"
                  color="deep-purple"
                  label="Usuário"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) ||
                      'Você precisa preencher os campos em vermelho',
                  ]"
                  class="col-md-12 col-sm-12 col-xs-12 q-md"
                >
                  <template v-slot:append>
                    <q-icon name="person" />
                  </template>
                </q-input>

                <q-input
                  v-model="form.password"
                  color="deep-purple"
                  filled
                  label="Senha"
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Você precisa preencher os campos em vermelho',
                  ]"
                  class="col-md-12 col-sm-12 col-xs-12 q-md"
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
                  <q-btn
                    label="ENTRAR"
                    type="submit"
                    color="deep-purple"
                    class="full-width q-pa-md"
                  />
                </div>
              </q-form>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
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
  methods: {
    onSubmit() {
      this.$q.notify({
        message: "Login realizado com sucesso!",
        color: "positive",
        icon: "check_circle_outline",
      });
      this.onReset();
    },
    async onReset() {
      await this.resetForm();
      this.$refs.myForm.resetValidation();
    },
    async resetForm() {
      this.form = {
        nome: "",
        password: "",
      };
    },
  },
};
</script>

<style scoped>
.user-perfil {
  width: 100%;
  max-width: 200px;
}

.gema-imagem {
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
}
</style>
