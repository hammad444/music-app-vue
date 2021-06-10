import { createStore } from 'vuex'
import {Auth,userCollection} from '@/includes/firebase'
import {Howl} from 'howler'
import helper from '../includes/helper'

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong:{},
    sound:{},
    seek:'00:00',
    duration:'00:00',
    playerProgress:'0%'
  },
  mutations:{
    toggleAuthModal:(state)=>{
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth:(state)=> state.userLoggedIn = !state.userLoggedIn,
    newSong(state,payload){
      state.currentSong = payload;
      console.log(payload.url,"song url");
      state.sound = new Howl({
        src:[payload.url],
        html5:true
      })
    },
    updatePosition(state){
      state.seek = helper.formatTime(state.sound.seek())
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgress = `${(state.sound.seek()/state.sound.duration())*100}%`
    }
  },
  getters:{
    playing:(state)=>{
      if(state.sound.playing){
        return state.sound.playing()
      }
      return false
    }
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
    },
    async newSong({commit,state,dispatch},payload){
      if(state.sound instanceof Howl){
        state.sound.unload()
      }
      commit('newSong',payload)
      // console.log(state.sound,"sound");
      state.sound.play();
      state.sound.on('play',()=>{
        requestAnimationFrame(()=>{
          dispatch('progress')
        })
      })
    },
    progress({commit,state,dispatch}){
      commit('updatePosition')
      if(state.sound.playing){
        requestAnimationFrame(()=>{
          dispatch('progress')
        })
      }
    },
    async toggleAudio({state}){
      if(!state.sound.playing) return;
      if(state.sound.playing()){
        state.sound.pause();
      }else{
        state.sound.play();
      }
    }
  }
})
