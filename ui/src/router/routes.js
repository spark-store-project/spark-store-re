
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/list/:category', component: () => import('pages/AppList.vue') },
      { path: '/download', component: () => import('pages/Download.vue') },
      { path: '/details/:app', component: () => import('pages/AppDetail.vue') },
      { path: '/settings', component: () => import('pages/Index.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
