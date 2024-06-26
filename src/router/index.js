import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('../views/menu/index.vue'),
      children: [
        {
          path: 'restful',
          name:'restful',
          component: () => import('../views/restful/index.vue'),
          redirect: '/restful/get',
          children:[
            {
              path: 'get',
              name: 'get',
              component: () => import('../views/restful/get.vue')
            },
            {
              path: 'post',
              name: 'post',
              component: () => import('../views/restful/post.vue')
            },
            {
              path: 'file-upload',
              name: 'file-upload',
              component: () => import('../views/restful/file-upload.vue')
            },
            {
              path: 'json-view',
              name: 'json-view',
              component: () => import('../views/restful/JsonViewPage.vue')
            }
          ]
        },{
          path: 'split-file',
          name: 'SplitFile',
          component: () => import('@/components/Layout.vue'),
          children: [
            {
              path: 'download',
              name: 'FileDownload',
              component: () => import('../views/SplitFile/download/index.vue')
            },
            {
              path: 'upload',
              name: 'FileUpload',
              component: () => import('../views/SplitFile/upload/index.vue')
            },
          ]
        }  
      ]
    }
  ]
})

export default router
