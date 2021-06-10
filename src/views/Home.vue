<template>
    <!-- Introduction -->
  <section class="mb-8 py-20 text-white text-center relative">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/header.png)"></div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus et dolor mollis, congue augue non, venenatis elit.
          Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et
          sapien. Duis sed magna pulvinar, fringilla lorem eget,
          ullamcorper urna.
        </p>
      </div>
    </div>

    <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
      src="assets/img/introduction-music.png" />
  </section>

  <!-- Main Content -->
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200" v-icon>
        <span class="card-title">Songs</span>
        <!-- Icon -->
        
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <li class="flex justify-between items-center p-3 pl-6 cursor-pointer transition 
          duration-300 hover:bg-gray-50" v-for="song in songs" :key="song.docID">
          <div>
            <router-link :to="{name:'songs',params:{id:song.docID}}" class="font-bold block text-gray-600">{{song.modified_name}}</router-link>
            <span class="text-gray-500 text-sm">{{song.display_name}}</span>
          </div>

          <div class="text-gray-600 text-lg">
            <span class="comments">
              <i class="fa fa-comments text-gray-600"></i>
              {{song.comment_count}}
            </span>
          </div>
        </li>
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import {songsCollection} from '../includes/firebase'
export default {
    name:"Home",
    data(){
      return{
        songs:[],
        maxPerPage:10,
        pendingRequest:false
      }
    },
    async created(){
      this.getSongs();
      window.addEventListener('scroll',this.handleScroll)
    },
    beforeUnmount(){
      window.removeEventListener('scroll',this.handleScroll)
    },
    methods:{
      handleScroll(){
        const {scrollTop, offsetHeight} = document.documentElement;
        const {innerHeight} = window;
        const bottomOfwindow = Math.round(scrollTop) + innerHeight === offsetHeight;

        if(bottomOfwindow){
          this.getSongs();
        }
      },
      async getSongs(){
        if(this.pendingRequest){
          return;
        }
        this.pendingRequest = true;
        let snapShot;
        if(this.songs.length){
           const lastDoc = await songsCollection.doc(this.songs[this.songs.length - 1].docID)
          .get();

           snapShot = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
        }else{
           snapShot = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
        }
        snapShot.forEach((document)=>{
            this.songs.push({
            docID: document.id,
            ...document.data()
            })
          })
        this.pendingRequest = false
      }
    }
}
</script>
