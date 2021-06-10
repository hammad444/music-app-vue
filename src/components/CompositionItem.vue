<template>
    <div class="border border-gray-200 p-3 mb-4 rounded">
              <div v-show="!showForm">
                <h4 class="inline-block text-2xl font-bold">{{song.modified_name}}</h4>
                <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right" @click.prevent="deleteSong">
                  <i class="fa fa-times"></i>
                </button>
                <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right" @click="showForm=!showForm">
                  <i class="fa fa-pencil-alt"></i>
                </button>
              </div>
              <div class="text-white text-center font-bold p-4 mb-4" v-if="show_alert" :class="alert_variant">
                  {{alert_message}}
              </div>
              <div>
                <vee-form v-show="showForm" :validation-schema="schema" :initial-values="song" @submit="formSubmited">
                  <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <vee-field type="text" name="modified_name"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Song Title" />
                      <ErrorMessage class="text-red-400" name="modified_name" />
                  </div>
                  <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <vee-field type="text" name="genre"
                      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                      placeholder="Enter Genre" />
                      <ErrorMessage class="text-red-400" name="genre"/>
                  </div>
                  <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600" :disabled="in_submission">
                    Update
                  </button>
                  <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600" :disabled="in_submission" @click.prevent="showForm = false">
                    Cancel
                  </button>
                </vee-form>
              </div>
            </div>
</template>

<script>
import {songsCollection,storage} from '../includes/firebase'
export default {
    name:"CompositionItem",
    props:{
        song: Object,
        updateSong: Function,
        index:Number,
        updatedDeletedSong:Function
    },
    data(){
        return{
            showForm:false,
            schema:{
                modified_name:'required',
                genre:'required'
            },
            in_submission:false,
            show_alert:false,
            alert_variant:'bg-blue-500',
            alert_message:"Please wait! updating song info."
        }
    },
    methods:{
        async formSubmited(value){
            console.log(value,"Submited");
            this.in_submission = true;
            this.show_alert = true;
            this.alert_variant = 'bg-blue-500';
            this.alert_message = "Please wait! updating song info.";

            try{
                await songsCollection.doc(this.song.docID).update(value);
            }catch(error){
                this.in_submission = false;
                this.alert_variant = 'bg-red-500';
                this.alert_message = "Error: "+error;
                return;
            }

            this.in_submission = false;
            this.alert_variant = 'bg-green-500';
            this.alert_message = "Success! Imformation is updated"
            this.updateSong(this.index,value)

        },
        async deleteSong(){
            const storageRef = storage.ref();
            const songRef = storageRef.child(`songs/${this.song.original_name}`)

            await songRef.delete();
            await songsCollection.doc(this.song.docID).delete();

            this.updatedDeletedSong(this.index);
        }
    },
    
}
</script>

