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
        path: "/alunos",
        name: "home-aluno",
        component: () => import("pages/aluno/AlunoPage.vue")
      },
      {
        path: "/matriculas/:id",
        name: "matricula",
        component: () => import("pages/matricula/MatriculaPage.vue")
      },
      {
        path: "/modulos",
        name: "modulos",
        component: () => import("pages/modulo/ModuloPage.vue")
      }
    ],
  },
];

export default routes;
