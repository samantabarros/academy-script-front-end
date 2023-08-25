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
                  v-model="login.email"
                  color="deep-purple"
                  label="Usuário*"
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
                  v-model="login.senha"
                  color="deep-purple"
                  label="Senha*"
                  filled
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
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";

export default {
  name: "LoginPage",

  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const login = ref({
      email: "",
      senha: "",
      isPwd: ref(false),
    });

    return {
      login,
    };

    async function onSubmit() {
      const { email, senha } = login.value;
      const { data } = await api.get("/usuarios", { params: { email, senha } });
    }
    async function onReset() {
      await this.resetForm();
      this.$refs.myForm.resetValidation();
    }

    async function resetForm() {
      this.login = {
        nome: "",
        password: "",
      };
    }

    console.log(data);

    if (data.length > 0) {
      router.push("/home");
      $q.notify({
        message: "Login realizado com sucesso!",
        color: "positive",
        icon: "check_circle_outline",
      });
    } else {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Usuário ou senha inválidos",
      });
      onReset();
    }
    //Método para mostrar ou esconder a senha
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
