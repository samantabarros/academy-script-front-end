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

  //Verificar se o token existe
  async function checkToken(){
    try{
      const tokenAuth = 'Bearer' + token.value;
      const { data } = await axios.get("/auth/verify", {
        Headers: {
          Authorization: tokenAuth,
        },
      });
      return data;
    }catch(error){
      console.log(error.response.data);
    }
  }

  return {
    token,
    user_email,
    user_id,
    setToken,
    setUserEmail,
    setUserId
  }
})
