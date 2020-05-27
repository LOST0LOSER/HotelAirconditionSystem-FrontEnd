<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="3" md="4"></v-col>
      <v-col cols="6" md="4">
        <v-select :items="Rooms" v-model="RoomId" label="Room" outlined></v-select>
      </v-col>
      <v-col cols="3" md="4"></v-col>
    </v-row>

    <v-row algin="center">
      <v-col cols="1" md="3"></v-col>
      <v-col>
        <v-card class="mx-auto elevation-8" max-width="1000" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-tile avatar class="headline mb-8">控制器</v-list-item-tile>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-tile
                avatar
                class="headline mb-8"
              >当前设置温度:{{this.AirconditionInfo.curTemp}}°C</v-list-item-tile>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center" wrap justify-center>
              <v-col>
                <v-btn
                  style="display:block;margin:0 auto"
                  id="powerSwitcher"
                  :color="controller.powerSwitcher.switcherColor"
                  @click="switchPower"
                  dark
                  fab
                  large
                >{{controller.powerSwitcher.msg}}</v-btn>
              </v-col>
              <v-col>
                <v-btn 
                style="display:block;margin:0 auto" 
                color="primary" 
                dark 
                fab 
                large
                @click="switchTimer"
                >定时:{{controller.timer.msg}}</v-btn>
              </v-col>
            </v-row>

            <v-row align="center" wrap>
              <v-col cols="3">
                <blockquote class="headline mb-1">风速</blockquote>
              </v-col>
              <v-col cols="9">
                <v-radio-group v-model="AirconditionInfo.windSpeed">
                  <v-row>
                    <v-col v-for="item in controller.wind.windSpeed" :key="item.key">
                      <v-radio :label="item" :value="item.key"></v-radio>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <blockquote class="headline">温度</blockquote>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="°C"
                  value="value"
                  single-line
                  v-model="controller.temperture.curTemp"
                  dense
                  solo
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn style="display:block" color="success" @click="addTemp">
                  <v-icon large>mdi-menu-up</v-icon>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn color="success" @click="minusTemp">
                  <v-icon large>mdi-menu-down</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="5"></v-col>
              <v-col >
                <blockquote>
                  <v-switch label="扫风" v-model="controller.wind.sweeping" dense></v-switch>
                </blockquote>
                <!-- <v-checkbox
                  label="扫风"
                  v-model="controller.wind.sweeping"
                  :value="controller.wind.sweeping"
                  dense
                ></v-checkbox>-->
              </v-col>
              <!-- <v-col></v-col> -->
            </v-row>
            <v-row>
              <v-col cols="3">
                <blockquote class="headline mb-1">计时</blockquote>
              </v-col>
              <v-col>
                <v-slider
                  v-model="controller.timer.timerDuration"
                  :max="8"
                  :tick-labels="controller.timer.timeSelection"
                  class="mx-3"
                  ticks
                ></v-slider>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="1" md="3"></v-col>
    </v-row>

    <v-row algin="center">
      <v-col></v-col>
      <v-col cols="6">
        <v-btn style="display:block" color="primary" large rounded>信息发送</v-btn>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    Rooms: ["307", "308"],
    RoomId: undefined,
    AirconditionInfo: {
      powerOn: false,
      curTemp: 25,
      windSpeed: null,
      sweeping: false,
      timerSet: false,
      timerDuration:0 //计时器时间
    },
    controller: {
      powerSwitcher: {
        powerOn:false,
        switcherColor: "red",
        msg: "关"
      },
      temperture: {
        curTemp: 25
      },
      wind: {
        windSpeed: ["小", "中", "大"],
        sweeping: false
      },
      timer: {
        msg:"关",
        timerSet: false,
        timerDuration:0, //计时器时间
        timeSelection:["0",1,2,3,4,5,6,7,8]
      }
    },
    infoPack: {
      powerSwitcher: undefined,
      windSpeed: undefined,
      sweeping: undefined
    }
  }),
  mounted: () => {
    // this.$nextTick(function() {
    //   //3 sec each time
    //   setInterval(this.getAirconditionInfo, 3000);
    // })();
  },
  methods: {
    getAirconditionInfo: function() {
      if (this.RoomId !== undefined) {
        axios
          .get("127.0.0.1:8081/getAirconditionInfo", this.RoomId)
          .then(res => {
            this.AirconditionInfo = res.AirconditionInfo;
            console.log(res);
            console.log(this.AirconditionInfo)
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    switchPower: function() {
      if (this.AirconditionInfo.powerOn === false) {
        this.AirconditionInfo.powerOn = true;
        this.controller.powerSwitcher.switcherColor = "primary";
        this.controller.powerSwitcher.msg = "开";
        this.infoPack.powerSwitcher = true;
      } else {
        this.AirconditionInfo.powerOn = false;
        this.controller.powerSwitcher.switcherColor = "red";
        this.controller.powerSwitcher.msg = "关";
        this.infoPack.powerSwitcher = false;
      }
    },
    switchTimer: function() {
      if(this.controller.timer.timerSet === false){
        this.controller.timer.timerSet = true;
        this.controller.timer.msg = "开"
      }else{
        this.controller.timer.timerSet = false;
        this.controller.timer.msg = "关"
      }
    },
    addTemp: function() {
      if (
        this.controller.temperture.curTemp !== undefined &&
        this.controller.temperture.curTemp >= 16 &&
        this.controller.temperture.curTemp <= 30
      ) {
        if (
          this.controller.temperture.curTemp >= 16 &&
          this.controller.temperture.curTemp < 30
        ) {
          this.controller.temperture.curTemp++;
        }
      } else {
        this.controller.temperture.curTemp = 25;
      }
    },
    minusTemp: function() {
      if (
        this.controller.temperture.curTemp !== undefined &&
        this.controller.temperture.curTemp >= 16 &&
        this.controller.temperture.curTemp <= 30
      ) {
        if (
          this.controller.temperture.curTemp > 16 &&
          this.controller.temperture.curTemp <= 30
        ) {
          this.controller.temperture.curTemp--;
        }
      } else {
        this.controller.temperture.curTemp = 25;
      }
    },

    packSendInfo: function() {},

    sendInfo: function() {}
  },
  watch:{
    RoomId:'getAirconditionInfo',
  }
};
</script>

<style>
button {
  display: block;
  margin: 0 auto;
}
</style>