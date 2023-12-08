import { route } from 'quasar/wrappers'
import routes from './routes'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE,)
  })

  Router.beforeEach(async (to, from, next) => {
    const auth = store.state.auth;

    if (to.meta.requiredLogin && !auth.isAuthenticated) {
      next({ name: 'login' });
      return;
    }

    if (to.path != '/login') {
      const id = window.localStorage.getItem('id_user');
      const token = window.localStorage.getItem('acess_token');

    }
    next();

    //     if(auth.token && auth.user_email){
    //       const isAuthenticated = auth.checkToken();
    //       console.log(isAuthenticated);
    //       if(isAuthenticated) {
    //         next();
    //       }else{
    //         next({name: 'login'});
    //       }
    //     }else {
    //       next({name:'login'})
    //     }
    //   }else{
    //     next();
    //   }
  });

  return Router;
})
