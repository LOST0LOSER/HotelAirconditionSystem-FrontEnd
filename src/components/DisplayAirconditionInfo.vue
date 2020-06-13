<template>
  <v-card class="mx-auto elevation-8" max-width="32rem" height="40rem" align="center" outlined>
    <v-card-title primary-title pt-12 style="height:3rem;" />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">室内温度:</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ displayData.curTemp }}°C</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">目标温度:</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ displayData.targetTemp }}°C</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">工作模式:</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{
          displayData.workMode
          }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">当前风速:</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{
          displayData.windSpeed
          }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">空调状态:</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{
          displayData.state
          }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">累计费用:</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{
          displayData.costs
          }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- </v-card-text> -->
  </v-card>
</template>

<script>
export default {
  props: {
    id: String,
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
  },
  data() {
    return {
      displayData: {
        curTemp: Number,
        targetTemp: Number,
        state: String,
        windSpeed: String,
        workMode: String,
        costs: Number
      }
    };
  },
  methods: {
    translateInfo: function() {
      this.displayData.curTemp = this.AirconditionInfo.curTemp;
      this.displayData.targetTemp = this.AirconditionInfo.targetTemp;
      if (this.AirconditionInfo.powerOn === true) {
        this.displayData.state = "运行";
      } else {
        this.displayData.state = "待机";
      }
      switch (this.AirconditionInfo.windSpeed) {
        case 0:
          this.displayData.windSpeed = "小";
          break;
        case 1:
          this.displayData.windSpeed = "中";
          break;
        case 2:
          this.displayData.windSpeed = "大";
          break;
        default:
      }
      this.displayData.workMode = this.AirconditionInfo.isCool
        ? "制冷"
        : "暖气";
      this.displayData.costs = this.AirconditionInfo.costs;
    }
  },
  watch: {
    AirconditionInfo: "translateInfo"
  }
};
</script>

<style></style>
