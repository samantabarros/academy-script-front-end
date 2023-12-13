import { route } from 'quasar/wrappers'
import routes from './routes'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { useAuthStore } from "src/stores/auth.js";
import { ref } from 'vue';

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE,)
  })

  //Garante que a pessoa que vai entrar tem autorização
  Router.beforeEach(async (to, from, next) => {
    if(to.meta?.requiredLogin){
      const auth = useAuthStore();
      if(auth.token && auth.user_email){     
        if(auth.isAuthenticated) {
          next();
        }else{
          next({name: 'login'});
        }
      }else {
        next({name:'login'})
      }
    }else{
      next();
    }
  });

  return Router;
})
