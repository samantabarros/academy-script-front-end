const routes = [
  {
    path: "",
    component: () => import("pages/login/LoginPage.vue"),
  },
  
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {path: "/home", name: "home", component: () => import("pages/home/HomePage.vue")},
      {path: "/home/alunos", name: "home-aluno",  component: () => import("pages/aluno/AlunoPage.vue")},
     // {path: "/home/alunos/cadastrar", name:"cadastrar-aluno", component: () => import("../components/modals/ModalCadastro.vue")} 
    ],
  },
];

export default routes;
