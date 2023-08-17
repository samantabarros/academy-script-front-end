const routes = [
  {
    path: "",
    component: () => import("pages/login/LoginPage.vue"),
  },

  {
    path: "/home",
    component: () => import("pages/home/HomePage.vue"),
  },

  {
    path: "/home/alunos",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home-aluno",
        component: () => import("pages/aluno/AlunoPage.vue"),
      },
    ],
  },
];

export default routes;
