import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { computed, ref } from "vue";


export const useAuthStore = defineStore('auth', () => {
  const token = ref(sessionStorage.getItem('acess_token'));
  const user_email = ref(JSON.parse(sessionStorage.getItem('email_user')));
  const user_id = ref(JSON.parse(sessionStorage.getItem('id_user')));
  //const isAuth = ref(false);

  //Para atualizar os dados do sessionStorage
  function setToken(tokenValue) {
    sessionStorage.setItem('acess_token', tokenValue);
    token.value = tokenValue;
  }

  function setUserEmail(userEmailValue) {
    sessionStorage.setItem('email_user', userEmailValue);
    user_email.value = userEmailValue;
  }

  function setUserId(userIdValue) {
    sessionStorage.setItem('id_user', JSON.stringify(userIdValue));
    user_id.value = userIdValue;
  }

  const isAuthenticated = computed(() => {
    return token.value && id_user.value;
  })

  // function setItems(item, key, dado){
  //   sessionStorage.setItem(key, item);
  //   dado.value = item;
  // }

  //Para verificar a autenticação
  const login = async (usuario) => {
    //const { data } = await api.get("usuarios", { params: { email, senha } });
    const { data } = await api.post("auth", usuario);

    //Armazena o token, o email e o id no sessionStorage
    setToken(data.acess_token);
    setUserEmail(data.email_user);
    setUserId(data.id_user);
    api.defaults.headers.common.Authorization = "Bearer " + data.acess_token;
    

    return data;

  }

  //Verificar se o token existe
  //Token do sessionStorage
  async function checkToken() {
    try {
      const tokenAuth = 'Bearer ' + token.value;
      const { data } = await api.get("usuarios", {
        headers: {
          Authorization: tokenAuth,
        }
      });
      return data;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  //Função para limpar os dados do sessionStorage
  async function logout() {
    sessionStorage.removeItem('acess_token');
    sessionStorage.removeItem('email_user');
    sessionStorage.removeItem('id_user');
    token.value = undefined;
    user_email.value = undefined;
    user_id.value = undefined;
    api.defaults.headers.common.Authorization = "";
  }
  //Ao recarregar a página precisa verificar se tem alguma informação no Local Storage
  //Se tiver seta as informações.

  return {
    token,
    user_email,
    user_id,
    setToken,
    setUserEmail,
    setUserId,
    logout,
    checkToken,
    isAuthenticated,
    login,
  }


})

// export const useAuthStore = defineStore('auth', () => {
//   const createAuthStore = () => {
//     const me = ref({
//       id: "",
//     });
//     const token = ref('');
//     const isAuthenticated = ref(false);

//     const doLogin = async (payload) => {
//       console.log("Entrou em doLogin")
//       const response = await api.post('auth', payload);
//       console.log(response.data);
//       const { acess_token, id_user } = response.data;

//       setToken(acess_token);
//       setUserId(id_user);
//       api.defaults.headers.common.Authorization = "Bearer " + acess_token;
//     };

//     const init = async () => {
//       const token = sessionStorage.getItem('token');
//       if (token) {
//         setToken(JSON.parse(token));
//       } else {
//         removeToken();
//       }
//     };

//     const logout = async () => {
//       api.defaults.headers.common.Authorization = "";
//       removeToken;
//       removeMe
//     };



//     const setToken = async (token) => {
//       state.token = token;
//       state.isAuthenticated = true;
//       window.sessionStorage.setitem("token", JSON.stringify(token));
//     };

//     const removeToken = async (token) => {
//       state.token = "",
//         state.isAuthenticated = false;
//       window.sessionStorage.removeItem("token");

//     };

//     const setMe = async (me) => {
//       state.me.id = me;
//       window.sessionStorage.setItem("id_user", JSON_stringify(me));
//     }

//     const removeMe = async (me) => {
//       state.me = {},
//         window.sessionStorage.removeItem("id_user");


//     };
//   };//fim de doLogin

//   const getMe = async (me) => {
//     return me;
//   };
//   const getToken = async (token) => {
//     return token;
//   };

//   const isAuthenticated = async (isAuthenticated) => {
//     return isAuthenticated;
//   };


//   return {
//     doLogin,
//     init,
//     logout,
//     setToken,
//     removeToken,
//     setMe,
//     removeMe,
//     getToken,
//     getMe,
//     isAuthenticated

//   };

//   return createAuthStore; 
// })