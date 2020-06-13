<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        lg="6"
      >
        <DisplayAirconditionInfo :aircondition-info="AirconditionInfo" />
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="6"
      >
        <AirconditionWidget
          :async-flag="asyncFlag"
          :aircondition-info="AirconditionInfo"
          @updateAirconditionInfo="updateAirconditionInfo"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DisplayAirconditionInfo from "@/components/DisplayAirconditionInfo";
import AirconditionWidget from "@/components/AirconditionWidget";
export default {
  name: "UserDashBoard",
  components: {
    DisplayAirconditionInfo,
    AirconditionWidget
  },
  props: {
    id: String
  },
  data: () => ({
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
    asyncFlag: false
  }),
  mounted() {
    this.getAirconditonInfo();
    //定时取数据
    this.timer = setInterval(this.getAirconditonInfo, 5000);
    // console.log(this.id);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    getAirconditonInfo: function() {
      this.axios
        .get("api/getAirconditionInfo", {
          params: { userID: this.id }
        })
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            if (this.AirconditionInfo !== data) {
              this.AirconditionInfo = Object.assign({}, data);
              //null处理
              this.AirconditionInfo.powerOn = this.AirconditionInfo.powerOn
                ? this.AirconditionInfo.powerOn
                : null;
              this.AirconditionInfo.curTemp = this.AirconditionInfo.curTemp
                ? this.AirconditionInfo.curTemp
                : null;
              this.AirconditionInfo.targetTemp = this.AirconditionInfo
                .targetTemp
                ? this.AirconditionInfo.targetTemp
                : null;
              this.AirconditionInfo.windSpeed = this.AirconditionInfo.windSpeed
                ? this.AirconditionInfo.windSpeed
                : null;
              this.AirconditionInfo.sweeping = this.AirconditionInfo.sweeping
                ? this.AirconditionInfo.sweeping
                : null;
              this.AirconditionInfo.timerSet = this.AirconditionInfo.timerSet
                ? this.AirconditionInfo.timerSet
                : null;
              this.AirconditionInfo.timerDuration = this.AirconditionInfo
                .timerDuration
                ? this.AirconditionInfo.timerDuration
                : null;
              this.AirconditionInfo.costs = this.AirconditionInfo.costs
                ? this.AirconditionInfo.costs
                : null;
              this.AirconditionInfo.isCool = this.AirconditionInfo.isCool
                ? this.AirconditionInfo.isCool
                : null;
              this.AirconditionInfo.defaultTemp = this.AirconditionInfo
                .defaultTemp
                ? this.AirconditionInfo.defaultTemp
                : null;
              this.AirconditionInfo.highLimitedTemp = this.AirconditionInfo
                .highLimitedTemp
                ? this.AirconditionInfo.highLimitedTemp
                : null;
              this.AirconditionInfo.lowLimitedTemp = this.AirconditionInfo
                .lowLimitedTemp
                ? this.AirconditionInfo.lowLimitedTemp
                : null;
              //若管理员修改了设定
              //异步传输延迟
              this.asyncFlag = !this.asyncFlag;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    updateAirconditionInfo: function(InfoPack) {
      this.axios
        .post("api/changeAirconditionInfo", InfoPack)
        .then(res => {
          if (res.status === 200) {
            this.AirconditionInfo = InfoPack;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style></style>
