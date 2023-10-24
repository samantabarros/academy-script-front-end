<template>
  <q-img
    src="/img/fundo-1200.jpg"
    class="banner-login no-repeat"
    alt="banner da tela inicial de login"
    style="width: 100%; max-width: 1900px; height: 100%; max-height: 1200px"
  />
  <div class="row" style="height: 90vh">
    <div class="title-sgma col-6 ellipsis flex justify-center">
      <p
        class="text-h1 text-uppercase q-my-none text-weight-regular text-white"
        style="font-size: 70px; font-family: lucyda-caligraphy"
      >
        SGMA
      </p>
    </div>
    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.sm,
      }"
      class="col-12 col-md-6 flex justify-center content-center"
    >
      <q-card
        v-bind:style="
          $q.screen.lt.sm
            ? { width: '70%', height: '95%' }
            : { width: '70%', height: '98%' }
        "
        class="card-login transparent"
      >
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col flex justify-center content-center">
              <q-img class="img-perfil" src="/img/user-perfil.png" />
            </div>
            <div class="col flex justify-center">
              <p
                class="lb-login text-h4 text-uppercase q-my-none text-weight-regular text-white content-center"
              >
                Login
              </p>
            </div>
          </div>
        </q-card-section>
        <div class="q-pa-md">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            ref="myForm"
          >
            <q-input
              ref="nameRef"
              v-model="login.email"
              style="font-size: 18px"
              color="white"
              label="Usuário*"
              filled
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Você precisa preencher os campos em vermelho',
              ]"
              class="col-md-12 col-sm-12 col-xs-12"
            >
              <template v-slot:append>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              v-model="login.senha"
              style="color: white; font-size: 18px"
              color="white"
              label="Senha*"
              filled
              :type="isPwd ? 'text' : 'login.senha'"
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
                class="full-width q-pa-xs"
                label="ENTRAR"
                type="submit"
                color="primary"
            
              />
              <div class="text-center q-mt-lg q-gutter-lg">
                <router-link
                  class="text-weight-bold"
                  style="color: white; font-size: 18px"
                  to="/"
                >
                  Esqueceu a senha?</router-link
                >
              </div>
            </div>
          </q-form>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { Notify, useQuasar } from "quasar";

const $q = useQuasar();
const router = useRouter();

const login = ref({
  email: "",
  senha: "",
  isPwd: ref(false),
});

const onSubmit = async () => {
  //quando define-se uma variável dentro de uma função com const ela fica visível só dentro
  //da função, ou seja, ela não vai poder ser acessada fora da função. Tudo o que precisa ser manipulado
  //usando essa constante deverá ser manipulado dentro da função(escopo) onde ela foi definida
  const { email, senha } = login.value;
  const { data } = await api.get("usuarios", { params: { email, senha } });
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
};

async function onReset() {
  await this.resetForm();
  this.$refs.myForm.resetValidation();
}

async function resetForm() {
  this.login = {
    email: "",
    senha: "",
  };
}

//Método para mostrar ou esconder a senha
</script>

<style scoped>
.banner-login {
  position: fixed;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  left: 0;
  margin: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  display: flex;
}

.card-login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  align-items: center;
  margin: auto;
  height: 100%;
  width: 100%;
  max-width: 650px;
  max-height: 700px;
}

.img-perfil {
  max-width: 100%;
  max-height: 100%;
  height: 200px;
  width: 200px;
  display: flex;
}

.title-sgma {
  padding: 250px 20px 0 150px;
}

/*Medias queries*/
@media (min-width: 0px) and (max-width: 320px) {
   .title-sgma {
    display: none;
  }
  .lb-login {
    font-size: 30px;
  }
  .img-perfil {
    height: 100px;
    width: 100px;
  }
}
@media (min-width: 320px) and (max-width: 480px) {
  .title-sgma {
    display: none;
  }
  .lb-login {
    font-size: 30px;
  }
  .img-perfil {
    height: 100px;
    width: 100px;
  }
}

/*480px - 768px = tablet */
@media (min-width: 481px) and (max-width: 768px) {
  .lb-login {
    font-size: 30px;
  }
  .img-perfil {
    height: 100px;
    width: 100px;
  }
}

/*768px - 1024px = telas menores, laptops*/
@media (min-width: 769px) and (max-width: 1024px) {
  .lb-login {
    font-size: 30px;
  }
  .title-sgma {
    display: none;
  }
  .card-login {
    max-width: 500px;
    max-height: 700px;
  }
}

/*1024px -1200px = desktop*/
@media (min-width: 1024px) and (max-width: 1200px) {
  .title-sgma {
    display: none;
  }

  .card-login {
    max-width: 600px;
    max-height: 800px;
  }
}
/*1200 e += telas maiores */
@media (min-width: 1201px) {
  .title-sgma {
    padding: 100px 250px 100px 0px;
  }

  .card-login {
    max-width: 600px;
    max-height: 800px;
  }
}
</style>
