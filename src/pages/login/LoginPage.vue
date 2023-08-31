<template>
  <q-img src="/img/fundo.jpg" class="banner-login" alt="banner da tela inicial de login" />
  <div class="row" style="height: 90vh">
    <div class="col-4 ellipsis flex justify-center content-center">
      <p class="text-h1 text-uppercase q-my-none text-weight-regular text-white">SGMA</p>
    </div>
    <div v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.sm }"
      class="col-12 col-md-6 flex justify-center content-center">
      <q-card v-bind:style="$q.screen.lt.sm ? { width: '50%', height: '50%' } : { width: '70%', height: '80%' }">
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col flex justify-center content-center">
              <q-img class="img-perfil" size="100px" src="/img/user-perfil.png" />
            </div>
            <div class="col flex justify-center">
              <p class="text-h3 text-uppercase q-my-none text-weight-regular text-light-green-8 content-center">Login</p>
            </div>
          </div>
        </q-card-section>
        <div class="q-pa-md">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="myForm">
            <q-input ref="nameRef" filled v-model="login.email" color="deep-purple" label="Usuário*" lazy-rules :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Você precisa preencher os campos em vermelho',
            ]" class="col-md-12 col-sm-12 col-xs-12">
              <template v-slot:append>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input v-model="login.senha" color="deep-purple" label="Senha*" filled :type="isPwd ? 'password' : 'text'"
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Você precisa preencher os campos em vermelho',
              ]" class="col-md-12 col-sm-12 col-xs-12 q-md">
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <div>
              <q-btn class="full-width q-pa-md" label="ENTRAR" type="submit" color="deep-purple" rounded />
              <div class="text-center q-mt-lg q-gutter-lg">
                <router-link class="text-blue" to="/"> Esqueceu a senha?</router-link>
              </div>
            </div>
          </q-form>
        </div>
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
.banner-login {
  position: fixed;
  height: 100%;
  left: 0;
  margin: 0;
  bottom: 0;
  z-index: -1;
}

.img-perfil {
  max-width: 100%;
  max-height: 100%;
  height: 200px;
  width: 200px;
  display: flex;
}
</style>
