<template>
  <v-container grid-list-xs>
    <v-layout row wrap justify-center>
      <v-flex xs2 v-for="room of PlaneData.Rooms" :key="room.id">
        <v-layout column wrap justify-center>
          <v-flex
            xs2
            v-for="itemKey of room"
            :key="itemKey.id"
          >{{ TranslatedDataKey[itemKey] }}:{{ room[itemKey] }}</v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//Admin共享数据区
import Data from "@/pages/Admin/PlaneData.js";
export default {
  mounted() {
    this.getPlaneInfo();
  },
  data() {
    return {
      PlaneData: Data,
      //are same key
      TranslatedDataKey: {
        RoomID: "房间号",
        curTemp: "当前温度",
        windSpeed: "当前风速",
        powerOn: "空调状态",
        runningTime: "累计时长",
        costs: "累计费用"
      },
      //are same key
      TranslatedDataValue: []
    };
  },
  methods: {
    getPlaneInfo() {
      this.axios
        .get("api/planeinfo", null)
        .then(res => {
          this.PlaneData = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
};
</script>

<style></style>
