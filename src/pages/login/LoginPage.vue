<template>
  <div class="container row" style="min-height: 100vh">
    <!-- <q-img
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
    /> -->
    <div class="col-sm-6 col-md-6 flex flex-center container-login gt-xs">
      <q-img
        src="/img/img_tela_login.png"
        alt="banner da tela inicial de login"
        class="q-ma-none q-px-lg no-repeat gt-sm"
        style="width: 100%; height: 100%; max-height: 100vh; max-width: 100vh"
      />
      <q-img
        src="/img/logo_sem_nome.png"
        alt="Imagem logo para telas menores"
        class="q-mx-xs no-repeat col-shrink lt-md"
        style="width: 100%; height: 100%; max-height: 100vh; max-width: 80vh"
      />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-6 flex flex-center">
      <!-- <q-card
        class="q-ma-md q-px-lg card-login bg-grey-8"
        style="max-width: 700px; min-width: 20vh; background-color: #050a30"
        :style="
          $q.screen.lt.md
            ? { width: '100%', height: '95%' }
            : { width: '100%', height: '95%' }
        "
      > -->
      <!-- <div class="row justify-center items-center container-login"> -->
      <div
        class="col-6"
        :style="
          $q.screen.lt.md
            ? { width: '70%', height: '95%' }
            : { width: '70%', height: '95%' }
        "
      >
        <div class="flex flex-center q-pt-md">
          <q-img
            src="/img/logo_alternativa.png"
            style="max-height: 300px; max-width: 200px"
          />
        </div>
        <div class="flex flex-center q-pt-lg q-pb-md">
          <p class="text-h6 text-grey text-uppercase">Bem-vindo(a) ao SIGMA</p>
        </div>
        <q-form @submit="onSubmit" ref="myForm">
          <div class="col-12 col-sm-4 q-mb-md">
            <q-input
              standout
              color="primary"
              bg-color="grey"
              dense
              v-model="usuario.email"
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
              standout
              dense
              color="primary"
              bg-color="grey"
              label="Insira sua senha*"
              v-model="usuario.password"
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
              color="blue-7"
              type="submit"
              standout
            />
          </div>
          <div class="q-mb-md flex flex-center">
            <router-link
              class="text-blue text-subtitle1 text-weight-regular"
              to="/"
              @click="showMensagemServicoIndisponivel = true"
            >
              Esqueceu a senha?
            </router-link>
            <q-dialog v-model="showMensagemServicoIndisponivel" persistent>
              <mensagem-servico-indisponivel></mensagem-servico-indisponivel>
            </q-dialog>
          </div>
        </q-form>
      </div>
      <!-- </div> -->
      <!-- </q-card> -->
    </div>
  </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { onBeforeMount, onMounted, ref } from "vue";
import { Notify, useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth.js";
import MensagemServicoIndisponivel from "src/components/mensagem/MensagemServicoIndisponivel.vue";

const auth = useAuthStore();
const { login } = auth;
const isPwd = ref(true);
const $q = useQuasar();
const router = useRouter();
const showMensagemServicoIndisponivel = ref(false);

const usuario = ref({
  email: "admin@gmail.com",
  password: "admin",
});

/* quando define-se uma variável dentro de uma função com const ela fica visível só dentro
 * da função, ou seja, ela não vai poder ser acessada fora da função. Tudo o que precisa ser manipulado
 * usando essa constante deverá ser manipulado dentro da função(escopo) onde ela foi definida */
const onSubmit = async () => {
  try {
    const data = await login(usuario.value);
    if (data.acess_token) {
      $q.notify({
        color: "positive",
        textColor: "white",
        icon: "check_circle_outline",
        message: "Login realizado com sucesso!",
        position: "top",
      });
      //setTimeout(() => (message.value = ""), 1000);
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
  } catch (error) {
    if (error.response) {
      $q.notify({
        message: error.response.data.message,
        color: "negative",
        icon: "error",
        position: "top",
      });
    }
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

.container {
  min-height: 75vh;
}

.container-login {
  background-color: #d9d9d9;
}
</style>
