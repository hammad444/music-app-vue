import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '@/views/About.vue'
import Manage from '../views/Manage.vue'
import Songs from '../views/Songs.vue';
import Store from '../store/index'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/songs/:id',
    name:'songs',
    component:Songs
  },
  {
    path: '/about',
    name: 'About',
    component:About
  },
  {
    path:'/manage',
    name:"Manage",
    component:Manage,
    meta:{
      requiredAuth: true
    },
    // beforeEnter:(to,from,next)=>{
    //   console.log("Manage Guard");
    //   next()
    // }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {name:'Home'}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to,from,next)=>{
  console.log("Guard Route");
 if(!to.matched.some(record=>record.meta.requiredAuth))
  {
    next();
    return
  }
  if(Store.state.userLoggedIn){
    next()
  }else{
    next({name:"Home"})
  }
  
})

export default router
