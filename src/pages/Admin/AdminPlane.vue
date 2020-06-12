<template>
  <v-container grid-list-xs>
    <v-layout row wrap justify-center>
      <v-flex v-for="room of PlaneData.Rooms" :key="room.id" xs6 sm3>
        <v-layout column wrap align-center class="elevation-5 rounded-xl mx-5 my-5 py-5">
          <v-flex v-for="itemKey of TranslatedDataKey" :key="itemKey.id" xs2>
            {{ TranslatedDataKeyContent[itemKey] }}:{{ translateInfo(room)[itemKey] }}
            <v-spacer />
          </v-flex>
          <v-flex>
            <v-btn color="primary" @click="clickSwitcher(room)">{{ room["powerOn"]?"关机":"开机" }}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="elevation-10 mx-5 my-5">
      <v-flex
        v-for="(itemVal,itemKey) of ControlPlane.Data"
        :key="itemKey"
        xs6
        md3
        class="elevation-1"
      >
        <v-layout column wrap align-center my-3>
          <v-flex xs3>{{ itemVal.Title }}</v-flex>
          <v-flex v-for="(sec_val,sec_key) of itemVal.Data" :key="sec_key" xs3>
            <v-layout column wrap align-center>
              <v-flex xs1>{{ sec_val.key }}:</v-flex>
              <v-flex>
                <v-btn-toggle v-model="value" mandatory multiple>
                  <v-btn @click="sec_val.value-=itemVal.perUnit" small dark class="white--text" color="primary">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>

                  <v-text-field
                    v-model="sec_val.value"
                    min="1"
                    dense
                    hide-details
                    size="2"
                    class="text-align-center"
                  >
                    <!-- <v-icon slot="append" color="red"></v-icon>
                    <v-icon slot="prepend" color="primary"></v-icon>-->
                  </v-text-field>
                  <v-btn @click="sec_val.value+=itemVal.perUnit" small dark class="white--text" color="red">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6 md3 class="elevation-1">
        <v-layout column wrap justify-center align-center my-3>
          <v-flex xs3>
            <v-layout column align-center wrap>
                <nav>工作模式:</nav>
                <v-btn-toggle
                  dense
                  small
                  mandatory
                  v-model="mode"
                  color="primary"
                  background-color="white"
                >
                  <v-btn small>制冷</v-btn>
                  <v-btn small>暖气</v-btn>
                </v-btn-toggle>
                <nav>预设风速:</nav>
                <v-btn-toggle
                  dense
                  small
                  mandatory
                  v-model="mode"
                  color="primary"
                  background-color="white"
                >
                  <v-btn small>低</v-btn>
                  <v-btn small>中</v-btn>
                  <v-btn small>高</v-btn>
                </v-btn-toggle>

            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout row wrap justify-center>
      <v-btn color="primary" class="px-5 px-md-10">确认</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
//Admin共享数据区
import Data from "@/pages/Admin/PlaneData.js";
export default {
  data() {
    return {
      PlaneData: Data,
      //are same key,
      TranslatedDataKey: [
        "RoomID",
        "curTemp",
        "windSpeed",
        "powerOn",
        "runningTime",
        "costs"
      ],
      TranslatedDataKeyContent: {
        RoomID: "房间号",
        curTemp: "当前温度",
        windSpeed: "当前风速",
        powerOn: "空调状态",
        runningTime: "累计时长",
        costs: "累计费用"
      },
      TranslatedDataValueContent: undefined,
      ControlPlane: {
        // Titles: ["温度(°C)", "费率(元/分钟)", "变温率(°C/分钟)"],
        // Icons:["mdi"],
        Data: {
          Temperture: {
            // CalUnit: "°C",
            Title: "温度(°C)",
            Data: {
              minTemp: { key: "最小温度", value: 16 },
              maxTemp: { key: "最大温度", value: 30 },
              defaultTemp: { key: "默认温度", value: 25 }
            },
            perUnit:1
          },
          WindFee: {
            // CalUnit: "元/分钟",
            Title: "费率(元/分钟)",
            Data: {
              week: { key: "低风速", value: 0.5 },
              normal: { key: "中风速", value: 1.0 },
              strong: { key: "高风速", value: 1.5 }
            },
            perUnit:0.5
          },
          ChangeTempRate: {
            // CalUnit: "°C/分钟",
            Title: "变温率(°C/分钟)",
            Data: {
              week: { key: "低风速", value: 0.5 },
              normal: { key: "中风速", value: 1.0 },
              strong: { key: "高风速", value: 1.5 }
            },
            perUnit:0.5
          }
        }
      }
    };
  },
  mounted() {
    // this.getPlaneInfo();
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
    },
    translateInfo: (function() {
      const windStateOptions = ["低风", "中风", "强风"];
      const powerStateOptions = { true: "开", false: "关" };
      let translatedRoom = {
        RoomID: undefined,
        curTemp: undefined,
        windSpeed: undefined,
        powerOn: undefined,
        runningTime: undefined,
        costs: undefined
      };
      return function(Room) {
        if (Room.RoomID !== translatedRoom.RoomID) {
          (translatedRoom.RoomID = Room.RoomID),
            (translatedRoom.curTemp = Room.curTemp + "°C"),
            (translatedRoom.windSpeed = windStateOptions[Room.windSpeed]),
            (translatedRoom.powerOn = powerStateOptions[Room.powerOn]),
            (translatedRoom.runningTime = Room.runningTime),
            (translatedRoom.costs = Room.costs + "元");
        }
        return translatedRoom;
      };
    })(),
    clickSwitcher(room) {
      room["powerOn"] = !room["powerOn"];
    }
  }
};
</script>

<style>
/* .v-text-field__slot {
  max-height: 1rem;
}

.v-text-field-line-height {
  max-width: 1rem;
} */

/* .v-input__slot{
  justify-content: center;
  justify-self: center;
  
  text-align: center;
} */

.text-align-center {
  text-align-last: center;
}
</style>
