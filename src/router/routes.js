const routes = [
  {
    path: "",
    name:"login",
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
