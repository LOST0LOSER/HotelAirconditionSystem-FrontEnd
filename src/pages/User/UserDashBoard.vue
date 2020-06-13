<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <DisplayAirconditionInfo :id="id" :AirconditionInfo="AirconditionInfo"/>
      </v-col>
      <v-col cols="12" md="6" lg="6">
        <AirconditionWidget
          :async-flag="asyncFlag"
          :id="id"
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
  data() {
    return {
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
      },
      asyncFlag: false
    };
  },
  mounted() {
    //先向服务器取数据
    this.getAirconditonInfo();
    // //定时取数据
    // this.timer = setInterval(this.getAirconditonInfo, 3000);

    //监听控制器获取数据
    this.$bus.on("changeAirconditionInfo",(newAirconditionInfo)=>{
      if (this.AirconditionInfo !== newAirconditionInfo) {
        this.updateAirconditionInfo(newAirconditionInfo);
        this.AirconditionInfo = newAirconditionInfo;
      }
    })
  },
  destroyed() {
    clearInterval(this.timer);
    this.AirconditionInfo = null;
    this.$bus.$off("changeAirconditionInfo",this.AirconditionInfo)
  },
  methods: {
    getAirconditonInfo: function() {
      this.axios
        .get("api/getAirconditionInfo", {
          params: { RoomID: this.id }
        })
        .then(res => {
          if (res.status === 200) {
            const data = res.data;
            if (this.AirconditionInfo != data) {
              //获取Aircondition对象
              this.AirconditionInfo = Object.assign({},data);

              //取完后告诉空调组件数据,初始化空调控制器
              this.$bus.emit("getAirconditionInfo", this.AirconditionInfo);

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
    updateAirconditionInfo: function(AirconditionInfo) {
      this.axios
        .post("api/changeAirconditionInfo", {RoomID:this.id,AirconditionInfo:AirconditionInfo})
        .then(res => {
          // if (res.status === 200) {
          //   this.AirconditionInfo = AirconditionInfo;
          // }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
};
</script>
<style></style>
