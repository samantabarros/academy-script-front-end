const routes = [
  {
    path: "",
    component: () => import("pages/login/LoginPage.vue"),
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("pages/home/HomePage.vue")
      },
      {
        path: "/home/alunos",
        name: "home-aluno",
        component: () => import("pages/aluno/AlunoPage.vue")
      },
      {
        path: "/home/alunos/modulos/:id",
        name: "modulo-aluno",
        component: () => import("pages/modulo/ModuloPage.vue")
      }
    ],
  },
];

export default routes;
