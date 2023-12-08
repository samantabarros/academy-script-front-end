import { defineStore } from 'pinia'
import { ref } from 'vue'

// export const useAuthStore = defineStore('auth', () => {
//   const token = ref(localStorage.getItem('acess_token'));
//   const user_email = ref(JSON.parse(localStorage.getItem('email_user')));
//   const user_id = ref(JSON.parse(localStorage.getItem('id_user')));

//   function setToken(tokenValue) {
//     localStorage.setItem('acess_token', tokenValue);
//     token.value = tokenValue;
//   }

//   function setUserEmail(userEmailValue) {
//     localStorage.setItem('email_user', userEmailValue);
//     user_email.value = userEmailValue;
//   }

//   function setUserId(userIdValue) {
//     localStorage.setItem('id_user', JSON.stringify(userIdValue));
//     user_id.value = userIdValue;
//   }

//   function setItems(item, key, dado){
//     localStorage.setItem(key, item);
//     dado.value = item;
//   }

//   //Para verificar a autenticação
//   const login = async () =>{
//     if(localStorage.getItem() === null){
//       logout();
//       router.push("/");
//     }else{
//       //Seta os dados no Pinia
//       const token = ref(localStorage.getItem('acess_token'));
//       const user_email = ref(JSON.parse(localStorage.getItem('email_user')));
//       const user_id = ref(JSON.parse(localStorage.getItem('id_user')));

//       //Seta o auth no axios

//     }

//     return login;
//   }


//   //Verificar se o token existe
//   async function checkToken(){
//     try{
//       const tokenAuth = 'Bearer' + token.value;
//       const { data } = await axios.get("/auth/verify", {
//         Headers: {
//           Authorization: tokenAuth,
//         },
//       });
//       return data;
//     }catch(error){
//       console.log(error.response.data);
//     }
//   }

//   async function logout(){
//     localStorage.removeItem('acess_token');
//     localStorage.removeItem('email_user');
//     localStorage.removeItem('id_user');
//     token.value = undefined;
//     user_email.value = undefined;
//     user_id.value = undefined; 

//   }
//   //Ao recarregar a página precisa verificar se tem alguma informação no Local Storage
//   //Se tiver seta as informações.

//   return {
//     token,
//     user_email,
//     user_id,
//     setToken,
//     setUserEmail,
//     setUserId,
//     logout,
//     checkToken
//   }
// })


export const useAuthStore = defineStore('auth', () => {
  const createAuthStore = () => {
    const state = {
      me: {
        id: "",
      },
      token: '',
      //userId: '',
      isAuthenticated: false
    };
  
    const actions = {
      async doLogin(payload) {
        const response = await api.post('/auth', payload);
        console.log(response.data);
        const { acess_token, id_user} = response.data;
  
        setToken(acess_token);
        setUserId(id_user);
        api.defaults.headers.common.Authorization = "Bearer " + acess_token;
      },

      async init() {
        const token = localStorage.getItem('token');
        if(token) {
          setToken(JSON.parse(token));
        }else{
          removeToken();
        } 
      },

      async logout(){
        api.defaults.headers.common.Authorization = "";
        removeToken;
        removeMe
      },
  
    };
  
    const mutations = {
      setToken(token) {
        state.token = token;
        state.isAuthenticated = true;
        window.localStorage.setitem("token", JSON.stringify(token));
      },
  
      removeToken(token) {
        state.token = "",
        state.isAuthenticated = false;
        window.localStorage.removeItem("token");
        
      },

      setMe(me){
        state.me.id = me;
        window.localStorage.setItem("id_user", JSON_stringify(me));
      },

      removeMe(me){
        state.me = {},
        window.localStorage.removeItem("id_user");

      
      },
    };

    const getters = {
      getMe(state){
        return state.me;
      },
      getToken(state){
        return state.token;
      },
      isAuthenticated(state){
        return state.isAuthenticated;
      },
    };
  
    return  {
      state,
      actions,
      mutations,
      getters
    };
  };
  return createAuthStore; 
})