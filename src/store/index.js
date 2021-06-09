import { createStore } from 'vuex'
import {Auth,userCollection} from '@/includes/firebase'


export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false
  },
  mutations:{
    toggleAuthModal:(state)=>{
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth:(state)=> state.userLoggedIn = !state.userLoggedIn,
  },
  getters:{
    // authModalShow:(state)=>state.authModalShow
  },
  actions:{
    async register({commit},payload){
      const userCred = await Auth.createUserWithEmailAndPassword(payload.email, payload.password)

      await userCollection.doc(userCred.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country
      })

      await userCred.user.updateProfile({
        displayName: payload.name
      })

      commit('toggleAuth');

    },
    init_login({commit}){
      const user = Auth.currentUser;
      // console.log(user);
      if(user){
        commit('toggleAuth')
      }
    },
    async login({commit},payload){
      console.log("login payload",payload);
      await Auth.signInWithEmailAndPassword(payload.email,payload.password);
      console.log("after auth");
      commit('toggleAuth')
    },
    async signout({commit},payload){
      await Auth.signOut();
      if(payload.route.meta.requiredAuth){
        payload.router.push({name:"Home"})
      }
      commit('toggleAuth')
    }
  }
})
