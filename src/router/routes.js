
const routes = [
  {
    path: '',
    component: () => import('pages/login/LoginPage.vue'),
  },

  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home/HomePage.vue') }
    ]
  }

]

export default routes
