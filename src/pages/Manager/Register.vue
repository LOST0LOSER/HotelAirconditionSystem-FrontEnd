<template>
  <div id="app">
    <v-container justify-center align-center mt-12>
      <v-layout row wrap align-center justify-center>
        <v-flex xs12 sm6>
          <v-card class="elevation-8">
            <!-- ERROR MESSAGE -->
            <v-layout row v-if="error">
              <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
              </v-flex>
            </v-layout>

            <!-- Login/Signin -->
            <v-layout row align-center justify-center class="py-5">
              <v-form @submit.prevent="onSignin">
                <!-- <v-layout row> -->
                <v-flex xs12>
                  <h1 class="text-center mb-5">注册</h1>
                  <v-text-field 
                  name="IDID" 
                  label="ID" 
                  id="ID" 
                  v-model="UserInfo.AccountID" 
                  type="IDID" 
                  required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="UserInfo.Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 class="py-3">
                  <div class="text-center">
                    <v-btn outlined type="submit" :disabled="loading" :loading="loading">
                      注册
                      <v-icon right>mdi-lock-open</v-icon>
                      <span slot="loader" class="custom-loader">
                        <v-icon>cached</v-icon>
                      </span>
                    </v-btn>
                  </div>
                  <div class="text-center mt-3">
                    <v-btn to="Login" color="blue" :disabled="loading" :loading="loading">
                      返回登录
                      <v-icon right>mdi-login</v-icon>
                      <span slot="loader" class="custom-loader">
                        <v-icon>cached</v-icon>
                      </span>
                    </v-btn>
                  </div>
                </v-flex>
              </v-form>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data: () => ({
    UserInfo:{
      AccountID: undefined,
      Password: undefined
    }
  }),
  methods: {
    postRegister: function() {
      axios
        .post("api/storeAccount",this.UserInfo)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style>
</style>