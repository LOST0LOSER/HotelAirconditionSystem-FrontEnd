<template>
  <v-card class="mx-auto elevation-8" max-width="32rem" height="40rem" outlined>
    <v-layout row wrap justify-center mt-12>
      <v-flex xs4 class="headline text-center">控制器</v-flex>
      <v-flex xs2></v-flex>
      <v-flex xs4 class="headline text-center">
        当前室内温度:
        {{ controller.temperture.curTemp }}°C
      </v-flex>
    </v-layout>

    <v-list-item>
      <!-- <v-list-item-content>
        <v-list-item-title avatar class="headline">控制器</v-list-item-title>
      </v-list-item-content>-->
      <!-- <v-list-item-content>
        <v-list-item-title avatar class="headline">当前室内温度:{{controller.temperture.curTemp}}°C</v-list-item-title>
      </v-list-item-content>-->
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
          >{{ controller.powerSwitcher.msg }}</v-btn>
        </v-col>
        <v-col>
          <v-btn
            style="display:block;margin:0 auto"
            color="primary"
            dark
            fab
            large
            @click="switchTimer"
          >定时:{{ controller.timer.msg }}</v-btn>
        </v-col>
      </v-row>

      <v-row align="center" wrap>
        <v-col cols="3">
          <blockquote class="headline mb-1 text-center">风速</blockquote>
        </v-col>
        <v-col cols="9">
          <v-radio-group v-model="controller.wind.windSpeed">
            <v-row>
              <v-col v-for="item in controller.wind.windSpeedChoices" :key="item.key">
                <v-radio :label="item" :value="item.key"></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <blockquote class="headline text-center">温度</blockquote>
        </v-col>
        <v-col cols="2">
          <v-text-field
            label="°C"
            value="value"
            single-line
            v-model="controller.temperture.targetTemp"
            outlined
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col>
          <v-btn d-flex style="margin: 0 auto" color="success" @click="addTemp">
            <v-icon>mdi-menu-up</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn d-flex style="margin: 0 auto" color="success" @click="minusTemp">
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="5"></v-col>
        <v-col>
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
</template>

<script>
// import serverURL from "@/serverURL";
export default {
  props: {
    AirconditionInfo: {
      powerOn: Boolean,
      curTemp: Number,
      targetTemp: Number,
      windSpeed: Number,
      sweeping: Boolean,
      timerSet: Boolean,
      timerDuration: Number, //计时器时间
      costs: Number,
      isCool: Boolean,
      defaultTemp: Number,
      highLimitedTemp: Number,
      lowLimitedTemp: Number
    },
    asyncFlag: Boolean
  },
  data() {
    return {
      hasGetInfo: false,
      controller: {
        powerSwitcher: {
          powerOn: false,
          switcherColor: "red",
          msg: "关"
        },
        temperture: {
          curTemp: 25,
          targetTemp: 25
        },
        wind: {
          windSpeed: 0,
          windSpeedChoices: ["小", "中", "大"], //对应 0,1,2
          sweeping: false
        },
        timer: {
          msg: "关",
          timerSet: false,
          timerDuration: 0, //计时器时间
          timeSelection: ["0", 1, 2, 3, 4, 5, 6, 7, 8]
        }
      },
      controllerIsSet: false,
      infoPack: undefined
      // {
      //   powerOn: Boolean,
      //   curTemp: this.AirconditionInfo.curTemp,
      //   targetTemp: Number,
      //   windSpeed: Number,
      //   sweeping: Boolean,
      //   timerSet: Boolean,
      //   timerDuration: Number, //计时器时间
      //   costs: this.AirconditionInfo.costs,
      //   isCool: this.AirconditionInfo.isCool
      // }
    };
  },
  mounted() {
    this.getAirconditionInfo();
  },
  methods: {
    getAirconditionInfo: function() {
      const recvInfo = this.AirconditionInfo;
      const controller = this.controller;
      controller.powerSwitcher.powerOn = recvInfo.powerOn;
      if (controller.powerSwitcher.powerOn === true) {
        controller.powerSwitcher.switcherColor = "blue";
        controller.powerSwitcher.msg = "开";
      } else {
        controller.powerSwitcher.switcherColor = "red";
        controller.powerSwitcher.msg = "关";
      }
      controller.temperture.curTemp = recvInfo.curTemp;
      controller.temperture.targetTemp = recvInfo.targetTemp;
      controller.temperture.defaultTemp = recvInfo.defaultTemp;
      controller.temperture.lowLimitedTemp = recvInfo.lowLimitedTemp;
      controller.temperture.highLimitedTemp = recvInfo.highLimitedTemp;

      controller.wind.windSpeed = recvInfo.windSpeed;
      controller.wind.sweeping = recvInfo.sweeping;
      controller.timer.timerSet = recvInfo.timerSet;
      if (controller.timer.timerSet === 1) {
        controller.timer.timerDuration = recvInfo.timerDuration;
      }
    },
    // postControllerSetting: function() {
    //   if (this.RoomId !== undefined) {
    //     this.axios
    //       .post(serverURL + "/changeAirconditionInfo", this.infoPack)
    //       .then(res => {
    //         this.AirconditionInfo = res.AirconditionInfo;
    //       })
    //       .catch(err => {
    //         console.error(err);
    //       });
    //   }
    // },
    switchPower: function() {
      const powerSwitcher = this.controller.powerSwitcher;
      if (powerSwitcher.powerOn === false) {
        powerSwitcher.powerOn = true;
        powerSwitcher.switcherColor = "primary";
        powerSwitcher.msg = "开";
      } else {
        powerSwitcher.powerOn = false;
        powerSwitcher.switcherColor = "red";
        powerSwitcher.msg = "关";
      }
    },
    switchTimer: function() {
      if (this.controller.timer.timerSet === false) {
        this.controller.timer.timerSet = true;
        this.controller.timer.msg = "开";
      } else {
        this.controller.timer.timerSet = false;
        this.controller.timer.msg = "关";
      }
    },
    addTemp: function() {
      if (
        this.controller.temperture.targetTemp !== undefined &&
        this.controller.temperture.targetTemp >=
          this.controller.temperture.lowLimitedTemp &&
        this.controller.temperture.targetTemp <= 30
      ) {
        if (
          this.controller.temperture.targetTemp >=
            this.controller.temperture.lowLimitedTemp &&
          this.controller.temperture.targetTemp < 30
        ) {
          this.controller.temperture.targetTemp++;
        }
      } else {
        this.controller.temperture.targetTemp = 25;
      }
    },
    minusTemp: function() {
      if (
        this.controller.temperture.targetTemp !== undefined &&
        this.controller.temperture.targetTemp >=
          this.controller.temperture.lowLimitedTemp &&
        this.controller.temperture.targetTemp <=
          this.controller.temperture.highLimitedTemp
      ) {
        if (
          this.controller.temperture.targetTemp >
            this.controller.temperture.lowLimitedTemp &&
          this.controller.temperture.targetTemp <=
            this.controller.temperture.highLimitedTemp
        ) {
          this.controller.temperture.targetTemp--;
        }
      } else {
        this.controller.temperture.targetTemp = this.controller.temperture.defaultTemp;
      }
    },

    packSendInfo: function() {
      const powerSwitcher = this.controller.powerSwitcher;
      const temperture = this.controller.temperture;
      const wind = this.controller.wind;
      const timer = this.controller.timer;

      this.infoPack = Object.assign({}, this.AirconditionInfo);

      this.infoPack.powerOn = powerSwitcher.powerOn;
      this.infoPack.windSpeed = wind.windSpeed;
      this.infoPack.sweeping = wind.sweeping;
      this.infoPack.targetTemp = temperture.targetTemp;
      this.infoPack.timerSet = timer.timerSet;
      this.infoPack.timerDuration = timer.timerDuration;
    }
  },
  watch: {
    asyncFlag: {
      handler(newval, oldval) {
        if (oldval !== newval) {
          console.log("outsideChangeThenGet");
          this.getAirconditionInfo();
          this.$data.hasGetInfo = true;

          // this.$data.hasGetInfo = true;
        }
      }
      // immediate:true
    },
    // AirconditionInfo:"getAirconditionInfo",

    controller: {
      handler() {
        if (this.$data.hasGetInfo === true) {
          if (this.$data.controllerIsSet === true) {
            console.log("emitOK");
            this.packSendInfo();
            console.log(this.$data.infoPack == this.AirconditionInfo);
            this.$emit("updateAirconditionInfo", this.infoPack);
          } else {
            this.$data.controllerIsSet = true;
          }
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style></style>
