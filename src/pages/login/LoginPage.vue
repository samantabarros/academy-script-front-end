<template>
  <main class="row fullscreen">
    <div class="col-xs-12 col-md-6 flex flex-center">
      <div>
        <div class="row text-center">
          <!-- <div class="col-12 q-my-xl">
            <img src="/img/logo_alternativa.png" alt="Logo"  style="max-height: 300px; max-width: 200px">
          </div> -->
          <div class="col-12 q-my-md">
           <img src="../../assets/images/logo.png" alt="Academy Script logo">

          </div>
        </div>
        <div class="row justify-center">
          <q-form @submit="onSubmit" ref="myForm">
            <div class="row q-pa-md">
              <div class="col-12 q-mb-xs">
                <q-input
                  standout
                  color="primary"
                  bg-color="secondary"
                  dense
                  v-model="usuario.email"
                  label="Usuário*"
                  lazy-rules
                  :rules="usuarioRules"
                >
                  <template v-slot:prepend>
                    <q-icon name="mail" />
                  </template>
                </q-input>
              </div>
              <div class="col-12 q-mb-md">
                <q-input
                  standout
                  dense
                  color="primary"
                  bg-color="secondary"
                  label="Senha*"
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
              <div class="col-12 q-mb-md">
                <q-btn
                  class="full-width"
                  label="Entrar"
                  color="primary"
                  type="submit"
                  standout
                />
              </div>
              <div class="col-12 q-mb-md flex flex-center">
                <router-link
                  class="blue-secondary text-subtitle1 text-weight-regular no-underline"
                  to="/"
                  @click="showMensagemServicoIndisponivel = true"
                >
                  Esqueceu a senha?
                </router-link>
                <q-dialog v-model="showMensagemServicoIndisponivel" persistent>
                  <mensagem-servico-indisponivel></mensagem-servico-indisponivel>
                </q-dialog>
              </div>
            </div>
          </q-form>
        </div>
      </div>

    </div>
    <div class="aside col-xs-0 col-md-6 column justify-center ">
      <div class="flex flex-center q-mb-md">
        <img src="../../assets/images/background.png" alt="Background login">
      </div>
    </div>
  </main>
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
  password: "123456",
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

.aside{
  background: linear-gradient(
      to bottom,
      #104D87,
      #d9d9d9
    ),
    url(../assets/images/imagem-de-fundo.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  height: 100vh;
}

.blue-secondary {
  color: #104D87;
}

.no-underline{
  text-decoration: none;
}
</style>
