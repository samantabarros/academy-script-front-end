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
    logout
  }
})
