import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('acess_token'));
  const user_email = ref(JSON.parse(localStorage.getItem('email_user')));
  const user_id = ref(JSON.parse(localStorage.getItem('id_user')));

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

  // function setItems(item, key, dado){
  //   localStorage.setItem(key, item);
  //   dado.value = item;
  // }

  // //Para verificar a autenticação
  // const login = async () =>{
  //   if(localStorage.getItem() === null){
  //     logout();
  //     router.push("/");
  //   }else{
  //     //Seta os dados no Pinia
  //     const token = ref(localStorage.getItem('acess_token'));
  //     const user_email = ref(JSON.parse(localStorage.getItem('email_user')));
  //     const user_id = ref(JSON.parse(localStorage.getItem('id_user')));

  //     //Seta o auth no axios

  //   }

  //   return login;
  // }


  //Verificar se o token existe
  async function checkToken(){
    try{
      const tokenAuth = 'Bearer' + token.value;
      const { data } = await axios.get("/auth/validate", {
        headers: {
          Authorization: tokenAuth,
        },
      });
      return data;
    }catch(error){
      console.log(error.response.data);
    }
  }

  async function logout(){
    localStorage.removeItem('acess_token');
    localStorage.removeItem('email_user');
    localStorage.removeItem('id_user');
    token.value = undefined;
    user_email.value = undefined;
    user_id.value = undefined; 
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
    checkToken
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
//       const token = localStorage.getItem('token');
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
//       window.localStorage.setitem("token", JSON.stringify(token));
//     };

//     const removeToken = async (token) => {
//       state.token = "",
//         state.isAuthenticated = false;
//       window.localStorage.removeItem("token");

//     };

//     const setMe = async (me) => {
//       state.me.id = me;
//       window.localStorage.setItem("id_user", JSON_stringify(me));
//     }

//     const removeMe = async (me) => {
//       state.me = {},
//         window.localStorage.removeItem("id_user");


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