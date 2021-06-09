<template>
   <div class="text-white text-center font-bold p-4 mb-4"
    v-if="reg_show_alert" :class="reg_alert_variant">
    {{ reg_alert_msg }}
  </div>
   <!-- Login Form -->
          <vee-form @submit="login" :validation-schema="loginSchema">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
              <ErrorMessage class="text-red-600" name="email" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field type="password" name="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" />
                <ErrorMessage class="text-red-600" name="password" />
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </vee-form>
</template>

<script>
export default {
    name:"LoginFrom",
    data(){
        return{
            loginSchema:{
                email:"required|email",
                password:"required"
            },
            reg_in_submission: false,
            reg_show_alert: false,
            reg_alert_variant: 'bg-blue-500',
            reg_alert_msg: 'Please wait! Your account is being Verifing.',
        }
    },
    methods:{
        async login(values){

          this.reg_show_alert = true;
          this.reg_in_submission = true;
          this.reg_alert_variant = 'bg-blue-500';
          this.reg_alert_msg = 'Please wait! Your account is being created.';
          
          try{
            await this.$store.dispatch("login",values)
          }catch(error){
              this.reg_in_submission = false; 
              this.reg_alert_variant = 'bg-red-500';
              this.reg_alert_msg = "Error: "+error.message;
          }
          console.log(values);
          this.reg_alert_variant = 'bg-green-500';
          this.reg_alert_msg = 'Success! Your account has been logged In.';

          window.location.reload();
        }
    }
}
</script>

