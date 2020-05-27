<template>
  <v-container>
    <v-layout column justify-center>
      <!-- <v-layout row wrap justify-center mt-8 mb-8>
        <v-card class="elevation-8">
          <blockquote class="display-2 px-6 py-6">房间信息</blockquote>
        </v-card>
      </v-layout>-->

      <v-row>
        <v-col
          cols="6"
          md="3"
          v-for="Room of RoomData.RoomsGroup[RoomData.GroupOrder]"
          :key="Room.id"
        >
          <v-card class="elevation-8">
            <v-layout row wrap justify-center>
              <div>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title avatar class="headline">房间 : {{Room.RoomID}}</v-list-item-title>
                    <!-- <v-list-item-title avatar class="headline"> 房间 : {{Room.key}}</v-list-item-title> -->
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-layout>
            <v-layout row wrap justify-center v-if="RoomData.RoomSignInState">
              <div>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title avatar class="headline">用户ID : {{Room.UserID}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-layout>
            <v-layout column wrap justify-center>
              <v-flex xs6 class="text-center">
              入住情况 :
              </v-flex>
              <v-flex xs6 class="text-center">
                {{Room.RoomSignInState?"已入住":"未入住"}}    
              </v-flex>
            </v-layout>

            <v-divider></v-divider>

            <v-card-actions>
              <v-layout row wrap justify-center>
                <v-btn disabled v-if="Room.RoomSignInState">
                  <v-icon>mdi-account</v-icon>
                  <nav>已经入住</nav>
                </v-btn>
                <v-btn
                  color="primary"
                  v-if="!Room.RoomSignInState"
                  @click.prevent="startRegisterProgress(Room)"
                >
                  <v-icon left>mdi-login-variant</v-icon>
                  <nav>登记入住</nav>
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- 分页 -->
      <div>
        <v-pagination
          v-model="RoomData.GroupOrder"
          :length="RoomData.Groups"
          :prev-icon="'mdi-chevron-left'"
          :next-icon="'mdi-chevron-right'"
          :total-visible="5"
        ></v-pagination>
      </div>

      <v-divider></v-divider>
      <!-- 分割注册 -->

      <transition name="fade">
        <v-layout row wrap justify-center v-if="registerState">
          <v-flex xs12 sm8 mt-12>
            <v-card class="elevation-8 py-5">
              <v-row mt-8>
                <v-col cols="2" md="2">
                  <v-layout justify-center mt-1>
                    <v-btn icon @click="registerState = false">
                      <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                  </v-layout>
                </v-col>
                <v-col>
                  <v-form @submit.prevent="signIn(selectedRoom,UserInfo)">
                    <v-layout row wrap justify-center>
                      <v-flex xs8>
                        <h1 class="text-center mb-5">房间{{selectedRoom.RoomID}} 入住登记</h1>
                        <v-text-field
                          name="ID"
                          label="ID"
                          id="ID"
                          v-model="UserInfo.AccountID"
                          type="input"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs8>
                        <v-text-field
                          name="password"
                          label="Password"
                          id="Password"
                          v-model="UserInfo.Password"
                          type="password"
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs8 class="py-3">
                        <div class="text-center">
                          <v-btn outlined type="submit" :loading="loading">
                            登记
                            <v-icon right>mdi-key-variant</v-icon>
                            <span slot="loader" class="custom-loader">
                              <v-icon>cached</v-icon>
                            </span>
                          </v-btn>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-form>
                </v-col>
                <v-col cols="2" md="2"></v-col>
              </v-row>
            </v-card>
          </v-flex>
        </v-layout>
      </transition>
    </v-layout>
  </v-container>
</template>

<script>
import shareData from "@/pages/Reception/RoomData";
export default {
  data() {
    return {
      rawRoomData: shareData,
      RoomData: {
        RoomsGroup: [],
        GroupOrder: 1,
        Groups: 0,
        GroupLength: 4
      },

      UserInfo: {
        AccountID: null,
        Password: null
      },
      registerState: false,
      selectedRoom: undefined
    };
  },
  created() {
    this.deliverRoomData(this.rawRoomData);
    console.log(this.RoomData.RoomsGroup);
  },
  methods: {
    getAndDeliverRoomData() {
      this.axios
        .get("api/getRoomInfo")
        .then(res => {
          const rawRoomData = res.data;
          this.deliverRoomData(rawRoomData);
          // console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    },
    deliverRoomData(rawData) {
      if (rawData instanceof Array) {
        this.RoomData.Groups =
          Math.ceil(rawData.length / this.RoomData.GroupLength) || 1;
        // rawData = Array.from(rawData);
        for (let i = 1; i <= this.RoomData.Groups; i++) {
          this.RoomData.RoomsGroup[i] = rawData.slice(
            this.RoomData.GroupLength * (i - 1),
            this.RoomData.GroupLength * i
          );
        }
        console.log(this.RoomData.RoomsGroup[0]);
      }
    },
    startRegisterProgress(room) {
      if (this.registerState === false) {
        this.registerState = true;
      }
      this.selectedRoom = room;
    },
    signIn(room, account) {
      const isNotEmpty = property => {
        return !(
          property === null ||
          property === "" ||
          typeof property === "undefined"
        );
      };
      const roomID = room.RoomID;
      if (
        room !== undefined &&
        isNotEmpty(account.AccountID) &&
        isNotEmpty(account.Password)
      ) {
        this.axios
          .post("api/signIn", { roomID: roomID, account: account })
          .then(res => {
            if (res.status === 200) {
              //已经登录后变更状态
              this.$data.registerState = false;
              room.RoomSignInState = true;
            }
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        if (!isNotEmpty(account.AccountID) && !isNotEmpty(account.Password)) {
          alert("请输入ID和密码");
          console.log(account.AccountID, account.Password);
        } else if (!isNotEmpty(account.AccountID)) {
          alert("ID不能为空");
        } else if (!isNotEmpty(account.Password)) {
          alert("密码不能为空");
        }
      }
    }
  },
  destroyed() {
    this.rawRoomData = null;
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>