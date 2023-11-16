<template>
  <div class="container">
    <q-img
      src="/img/fundo-1200.jpg"
      alt="banner da tela inicial de login"
      class="q-ma-none fixed no-repeat banner-login"
      style="
        width: 100%;
        max-width: 2500px;
        height: 100%;
        max-height: 1500px;
        min-height: 100vh;
        min-width: 100vh;
      "
    />
    <div class="row">
      <div class="col-12 flex flex-center">
        <q-card
          class="q-ma-md q-px-lg transparent card-login"
          style="
            max-width: 500px;
            max-height: 800px;
            min-height: 95vh;
            min-width: 70vh;
          "
          :style="
            $q.screen.lt.md
              ? { width: '50%', height: '95%' }
              : { width: '70%', height: '95%' }
          "
        >
          <q-card-section>
            <div class="col-12 col-md-6 flex flex-center q-pt-md">
              <q-img
                src="/img/logo/logo_sgma003.png"
                style="max-height: 200px; max-width: 200px"
              />
            </div>
          </q-card-section>
          <div class="q-mb-md q-px-md">
            <div class="flex flex-center q-pt-lg q-pb-md">
              <p class="text-h6 text-white">Entre para continuar</p>
            </div>
            <q-form @submit="onSubmit" ref="myForm">
              <div class="col-12 col-sm-4 q-mb-md">
                <q-input
                  filled
                  ref="nameRef"
                  color="primary"
                  bg-color="white"
                  v-model="login.email"
                  label="Insira seu nome de usuário*"
                  lazy-rules
                  :rules="usuarioRules"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-sm-4 q-mb-md">
                <q-input
                  filled
                  color="primary"
                  bg-color="white"
                  label="Insira sua senha*"
                  v-model="login.senha"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="senhaRules"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-sm-4 q-mb-md">
                <q-btn
                  class="full-width"
                  label="Entrar"
                  color="primary"
                  type="submit"
                />
              </div>
              <div class="q-mb-md flex flex-center">
                <router-link
                  class="text-white text-subtitle1 text-weight-regular"
                  to="/"
                >
                  Esqueceu a senha?
                </router-link>
              </div>
            </q-form>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { Notify, useQuasar } from "quasar";

const isPwd = ref(true);
const $q = useQuasar();
const router = useRouter();

const login = ref({
  email: "",
  senha: "",
});

/* quando define-se uma variável dentro de uma função com const ela fica visível só dentro
 * da função, ou seja, ela não vai poder ser acessada fora da função. Tudo o que precisa ser manipulado
 * usando essa constante deverá ser manipulado dentro da função(escopo) onde ela foi definida */
const onSubmit = async () => {
  const { email, senha } = login.value;
  const { data } = await api.get("usuarios", { params: { email, senha } });
  console.log(data);

  if (data.length > 0) {
    $q.notify({
      color: "positive",
      textColor: "white",
      icon: "check_circle_outline",
      message: "Login realizado com sucesso!",
      position: "top",
    });
    router.push("/home");
  } else {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Usuário ou senha inválidos",
      position: "top",
    });
  }
};

/* Rules */
const usuarioRules = [
  (val) =>
    (val && val.length > 0) || "Você precisa preencher os campos em vermelho",
];

const senhaRules = [
  (val) =>
    (val && val !== null && val !== "") ||
    "Você precisa preencher os campos em vermelho",
];
</script>

<style>
.card-login {
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}
/* border: 2px solid rgba(79, 22, 252, 0.5);
  border-radius: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); */
</style>
