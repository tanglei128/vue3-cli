import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/restful/index.vue'),
      redirect: '/get',
      children: [
        {
          path: '/get',
          name: 'get',
          component: () => import('../views/restful/get.vue')
        },
        {
          path: '/post',
          name: 'post',
          component: () => import('../views/restful/post.vue')
        },
        {
          path: '/file-upload',
          name: 'file-upload',
          component: () => import('../views/restful/file-upload.vue')
        },
        {
          path: '/json-view',
          name: 'json-view',
          component: () => import('../views/restful/JsonViewPage.vue')
        }
      ]
    }
  ]
})

export default router
