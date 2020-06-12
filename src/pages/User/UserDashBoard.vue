<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <DisplayAirconditionInfo :AirconditionInfo="AirconditionInfo" />
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <AirconditionWidget
          :asyncFlag="asyncFlag"
          :AirconditionInfo="AirconditionInfo"
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
  created() {
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
            if (this.AirconditionInfo !== res.data.AirconditionInfo) {
              this.AirconditionInfo = Object.assign(
                {},
                res.data.AirconditionInfo
              );
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
