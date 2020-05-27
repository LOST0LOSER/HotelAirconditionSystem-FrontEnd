<template>
  <!-- Fork of/Credit to:  https://github.com/aofdev/vue-firebase-auth-vuex/blob/master/src/components/User/Signin.vue -->
  <v-container align-center justify-center mt-12>
    <v-layout row wrap align-center justify-center>
      <v-flex xs10 sm8>
        <v-card class="elevation-8">
          <!-- ERROR MESSAGE -->
          <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
              <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
          </v-layout>

          <!-- Login/Signin -->
          <v-layout row align-center justify-center class="py-5">
            <v-form @submit.prevent="postLogin">
              <!-- <v-layout row> -->
              <v-flex xs12>
                <h1 class="text-center mb-5">登录</h1>
                <v-text-field
                  name="ID"
                  label="ID"
                  id="ID"
                  v-model="UserInfo.AccountID"
                  type="input"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  name="password"
                  label="Password"
                  id="Password"
                  v-model="UserInfo.Password"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 class="py-3">
                <div class="text-center">
                  <v-btn outlined type="submit" :loading="loading">
                    管理员登录
                    <v-icon right>mdi-lock-open</v-icon>
                    <span slot="loader" class="custom-loader">
                      <v-icon>cached</v-icon>
                    </span>
                  </v-btn>
                </div>
                <div class="text-center mt-3">
                  <!-- <div id="my-signin2"></div> -->
                  <v-btn color="blue" :loading="loading" @click.prevent="onSigninGoogle">
                    忘记密码?
                    <v-icon right>mdi-key-variant</v-icon>
                    <span slot="loader" class="custom-loader">
                      <v-icon>cached</v-icon>
                    </span>
                  </v-btn>
                  <!-- Google Sign in https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin -->
                </div>
                <div class="text-center mt-3">
                  <!-- <div id="my-signin2"></div> -->
                  <v-btn color="blue" :loading="loading" to="Register">
                    没有帐号?
                    <v-icon right>mdi-account</v-icon>
                    <span slot="loader" class="custom-loader">
                      <v-icon>cached</v-icon>
                    </span>
                  </v-btn>
                  <!-- Google Sign in https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin -->
                </div>
                <!-- <div class="text-center mt-3">
                                        <v-btn color="info" :loading="loading"
                                            @click.prevent="onResetPassword">Reset Password By Email
                                            <v-icon right>mdi-email</v-icon>
                                            <span slot="loader" class="custom-loader">
                                                <v-icon>cached</v-icon>
                                            </span>
                                        </v-btn>
                </div>-->
              </v-flex>
            </v-form>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    UserInfo: {
      AccountID: undefined,
      Password: undefined
    },
    // loading:true,
    error: false
  }),
  methods: {
    postLogin:function() {
      //   let RecvData = await this.axios.post(this.$route.path + "/authAccount");
      this.axios
        .post("api/authUser",this.UserInfo)
        .then(res => {
          const RecvData = res.data;
          console.log(RecvData);
          if (res.status === 200) {
            alert("登录成功");
            this.$router.push({name:'UserDashBoard',params: {id:RecvData.id}});
          } else {
            if (RecvData.username !== localStorage.getItem("username")) {
              alert("用户名未注册");
            } else if (RecvData.password !== localStorage.getItem("password")) {
              alert("密码错误");
            }
          }
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
.block {
  margin-top: 4rem;
}
</style>