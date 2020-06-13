<template>
  <v-card class="mx-auto elevation-8" max-width="32rem" height="40rem" outlined>
    <v-layout row wrap justify-center mt-12>
      <v-flex xs4 class="headline text-center">控制器</v-flex>
      <v-flex xs2 />
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
            id="powerSwitcher"
            style="display:block;margin:0 auto"
            :color="controller.powerSwitcher.switcherColor"
            dark
            fab
            large
            @click="switchPower"
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
                <v-radio :label="item" :value="item.key" />
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
            v-model="controller.temperture.targetTemp"
            label="°C"
            value="value"
            single-line
            outlined
            dense
          />
        </v-col>
        <v-col cols="1" />
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
        <v-col cols="5" />
        <v-col>
          <blockquote>
            <v-switch v-model="controller.wind.sweeping" label="扫风" dense />
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
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// import serverURL from "@/serverURL";
export default {
  props: {
    id: String
    // asyncFlag: Boolean
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
      initedController: false,

      AirconditionInfo: {
        RoomID: Number, //房间号
        powerOn: Boolean, //开关
        curTemp: Number, //当前温度
        targetTemp: Number, //目标温度
        windSpeed: Number, //风速
        sweeping: Boolean, //扫风
        timerSet: Boolean, //计时器开关
        timerDuration: Number, //计时器时间
        costs: Number, //费用
        isCool: Boolean, //制冷制热
        defaultTemp: Number, //默认温度
        highLimitedTemp: Number, //最高限制温度
        lowLimitedTemp: Number, //最低限制温度
        runningTime: String //运行时间
      }
    };
  },
  mounted() {
    //第一次接受数据,初始化控制器
    this.$bus.on("getAirconditionInfo", newAirconditionInfo => {
      if (this.AirconditionInfo !== newAirconditionInfo) {
        this.AirconditionInfo = newAirconditionInfo;
        this.initControllerInfo(newAirconditionInfo);
        this.initedController = true;
      }
    });
  },
  destroyed() {
    this.AirconditionInfo = this.$bus.$off(
      "getAirconditionInfo",
      this.AirconditionInfo
    );
  },
  methods: {
    initControllerInfo: function() {
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

      this.AirconditionInfo = Object.assign({}, this.AirconditionInfo);

      this.AirconditionInfo.powerOn = powerSwitcher.powerOn;
      this.AirconditionInfo.windSpeed = wind.windSpeed;
      this.AirconditionInfo.sweeping = wind.sweeping;
      this.AirconditionInfo.targetTemp = temperture.targetTemp;
      this.AirconditionInfo.timerSet = timer.timerSet;
      this.AirconditionInfo.timerDuration = timer.timerDuration;
    }
  },

  watch: {
    controller: {
      handler() {
        if (this.$data.initedController === true) {
          //抵消第一次初始化的时无必要的post
          if (this.$data.controllerIsSet === true) {
            //深拷贝更新数据对象
            this.packSendInfo();
            this.$bus.$emit(
              "changeAirconditionInfo",
              this.$data.AirconditionInfo
            );
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
