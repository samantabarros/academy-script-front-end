const routes = [
  {
    path: "",
    name: "login",
    component: () => import("pages/login/LoginPage.vue"),
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("pages/home/HomePage.vue"),
        meta: { requiredLogin: true },
      },
      {
        path: "/alunos",
        name: "home-aluno",
        component: () => import("pages/aluno/AlunoPage.vue"),
        meta: { requiredLogin: true },
      },
      {
        path: "/matriculas/:id",
        name: "matricula",
        component: () => import("pages/matricula/MatriculaPage.vue"),
        meta: { requiredLogin: true },
      },
      {
        path: "/modulos",
        name: "modulos",
        component: () => import("pages/modulo/ModuloPage.vue"),
        meta: { requiredLogin: true },
      },
      {
        path: "/alunosPorCurso/:id",
        name: "alunosPorCurso",
        component: () => import("pages/aluno/AlunosPorCurso.vue"),
        meta: { requiredLogin: true },
      },
    ],
  },
];


export default routes;

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });
// router.beforeEach(async (to, from, next) => {
//   console.log("Entrou aqui!")
//   if (to.matched.some(record => record.meta.requiredLogin)) {
//     const auth = useAuthStore();
//     //const token = localStorage.getItem('token');
//     if (auth.token && auth.user_email) {
//       const isAuthenticated = auth.checkToken();
//       console.log(isAuthenticated);
//       if (isAuthenticated) {
//         next();
//       } else {
//         next({ name: 'login' });
//       }
//     } else {
//       next({ name: 'login' })
//     }
//   } else {
//     next();
//   }
// });
