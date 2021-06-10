
<template>
    <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addsong="addSong"></app-upload>
      </div>  
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item v-for="(song,i) in songs" :updateSong="updatesong" :updatedDeletedSong="removeSong" :index="i" :song="song" :key="song.docID"></composition-item>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import Store from '../store/index'
import AppUpload from '../components/Upload.vue'
import {songsCollection,Auth} from '../includes/firebase';
import CompositionItem from '../components/CompositionItem.vue';
export default {
    name:"Manage",
    data(){
      return{
        songs:[]
      }
    },
    components:{
      AppUpload,
      CompositionItem
    },
    methods:{
      updatesong(i,values){
        this.songs[i].modified_name = values.modified_name;
        this.songs[i].genre = values.genre;

      },
      addSong(document){
      // alert('test') 
      // console.log(document);
        const song ={
          ...document.data(),
          docID: document.id
        }
        this.songs.push(song);
      },
      removeSong(i){
      this.songs.splice(i,1);
      }
    },
    async created(){
      const snapshot = await songsCollection.where('uid','==',Auth.currentUser.uid).get();
      snapshot.forEach(this.addSong)
    },
    
    // beforeRouteEnter(to,from,next){
    //     if(Store.state.userLoggedIn){
    //         next()
    //     }else{
    //         next({name:'Home'})
    //     }
    // }
}
</script>