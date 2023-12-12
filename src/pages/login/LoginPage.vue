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
            max-width: 600px;
            max-height: 800px;
            min-height: 95vh;
            min-width: 20vh;
          "
          :style="
            $q.screen.lt.md
              ? { width: '100%', height: '95%' }
              : { width: '100%', height: '95%' }
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
                  filled
                  color="primary"
                  bg-color="white"
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
import { onBeforeMount, onMounted, ref } from "vue";
import { Notify, useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth.js";

const auth = useAuthStore();
const isPwd = ref(true);
const $q = useQuasar();
const router = useRouter();

const usuario = ref({
  email: "admin@gmail.com",
  password: "admin",
});

/* quando define-se uma variável dentro de uma função com const ela fica visível só dentro
* da função, ou seja, ela não vai poder ser acessada fora da função. Tudo o que precisa ser manipulado
* usando essa constante deverá ser manipulado dentro da função(escopo) onde ela foi definida */
const onSubmit = async () => {
  try {
    if(!usuario.value.email || !usuario.value.password){
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Preencha os campos corretamente!",
        position: "top",
      });
    }
    //const { data } = await api.get("usuarios", { params: { email, senha } });
    const {data} = await api.post('auth', usuario.value);
    
    //Armazena o token, o email e o id no localStorage
    auth.setToken(data.acess_token);
    auth.setUserEmail(data.email_user);
    auth.setUserId(data.id_user);
    
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
  }catch(error){
    //console.log(error.response.data.message);
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

// onBeforeMount(() => {
//   console.log("Entrou aqui");

//   if (authStore.isAuthenticated) {
//     console.log("Entrou no if")
//     router.push("/home");
//   }
// });

// /* quando define-se uma variável dentro de uma função com const ela fica visível só dentro
//  * da função, ou seja, ela não vai poder ser acessada fora da função. Tudo o que precisa ser manipulado
//  * usando essa constante deverá ser manipulado dentro da função(escopo) onde ela foi definida */
// const onSubmit = async () => {
//   console.log("Entrou aqui em OnSubmit");
//   try {
//     //const { data } = await api.get("usuarios", { params: { email, senha } });
//     const { data } = await api.post("auth", usuario.value);
//     data.email.validate();
//     data.password.validate();

//     await doLogin(usuario);
//     const toPath = $route.query.to || "/";
//     $router.push(toPath);
//     // authStore.setToken(data.acess_token);
//     // authStore.setUserEmail(data.email_user);
//     // authStore.setUserId(data.id_user);
//     // console.log(data);

//     // if (data.acess_token) {
//     //   $q.notify({
//     //     color: "positive",
//     //     textColor: "white",
//     //     icon: "check_circle_outline",
//     //     message: "Login realizado com sucesso!",
//     //     position: "top",
//     //   });
//     //   router.push("/home");
//     // } else {
//     //   $q.notify({
//     //     color: "red-5",
//     //     textColor: "white",
//     //     icon: "warning",
//     //     message: "Usuário ou senha inválidos",
//     //     position: "top",
//     //   });
//     // }
//   } catch (error) {
//     //console.log(error.response.data.message);
//     if (error.response) {
//       $q.notify({
//         message: error.response.data.message,
//         color: "negative",
//         icon: "error",
//         position: "top",
//       });
//     }
//   }
// };

// /* Rules */
// const usuarioRules = [
//   (val) =>
//     (val && val.length > 0) || "Você precisa preencher os campos em vermelho",
// ];

// const senhaRules = [
//   (val) =>
//     (val && val !== null && val !== "") ||
//     "Você precisa preencher os campos em vermelho",
// ];
</script>

<style>
.card-login {
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}
</style>
