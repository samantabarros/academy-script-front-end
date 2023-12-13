import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('acess_token'));
  const user_email = ref(JSON.parse(localStorage.getItem('email_user')));
  const user_id = ref(JSON.parse(localStorage.getItem('id_user')));

  //Para atualizar os dados do localStorage
  function setToken(tokenValue) {
    localStorage.setItem('acess_token', tokenValue);
    token.value = tokenValue;
  }

  function setUserEmail(userEmailValue) {
    localStorage.setItem('email_user', userEmailValue);
    user_email.value = userEmailValue;
  }

  function setUserId(userIdValue) {
    localStorage.setItem('id_user', JSON.stringify(userIdValue));
    user_id.value = userIdValue;
  }

  const isAuthenticated = async () => {
    if (token.value) {
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
    }
    return isAuthenticated;
  }

  //Para verificar a autenticação
  const login = async (usuario) => {
    const { data } = await api.post("auth", usuario);

    //Armazena o token, o email e o id no localStorage
    setToken(data.acess_token);
    setUserEmail(data.email_user);
    setUserId(data.id_user);

    //Passa o token para cada requisição
    api.defaults.headers.common.Authorization = "Bearer " + data.acess_token;

    return data;
  }

  //Função para limpar os dados do localStorage
  async function logout() {
    localStorage.removeItem('acess_token');
    localStorage.removeItem('email_user');
    localStorage.removeItem('id_user');
    token.value = undefined;
    user_email.value = undefined;
    user_id.value = undefined;
    api.defaults.headers.common.Authorization = "";
  }

  const init = async () => {
    console.log("Entrou em  init");
    //Arrumar essa parte
    const token = ref(localStorage.getItem('acess_token'));
    console.log(token.value);
    console.log(isAuthenticated);
    if (token.value) {
      console.log(token);
      //Armazena o token, o email e o id no localStorage
      setToken(data.acess_token);
      setUserEmail(data.email_user);
      setUserId(data.id_user);
      isAuthenticated.value = true;
      //Passa o token para cada requisição
      api.defaults.headers.common.Authorization = "Bearer " + data.acess_token;
    } else {
      token.value = undefined;
      user_email.value = undefined;
      user_id.value = undefined;
      api.defaults.headers.common.Authorization = "";
      isAuthenticated.value = false;

      //router.push("/");
    }
    return isAuthenticated;
  };

  return {
    token,
    user_email,
    user_id,
    setToken,
    setUserEmail,
    setUserId,
    logout,
    isAuthenticated,
    login,
    init
  }
})