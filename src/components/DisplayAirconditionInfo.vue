<template>
  <v-card
    class="mx-auto elevation-8"
    max-width="32rem"
    height="40rem"
    align="center"
    outlined
  >
    <v-card-title
      primary-title
      pt-12
      style="height:3rem;"
    />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">
          室内温度:
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title
          class="headline"
        >
          {{ displayData.curTemp }}°C
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">
          目标温度:
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title
          class="headline"
        >
          {{ displayData.targetTemp }}°C
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">
          工作模式:
        </v-list-item-title>
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
        <v-list-item-title class="headline">
          当前风速:
        </v-list-item-title>
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
        <v-list-item-title class="headline">
          空调状态:
        </v-list-item-title>
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
        <v-list-item-title class="headline">
          累计费用:
        </v-list-item-title>
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
  watch: {
    AirconditionInfo: "translateInfo"
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
  }
};
</script>

<style></style>
