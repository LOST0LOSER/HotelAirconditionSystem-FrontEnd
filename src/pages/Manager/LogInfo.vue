<template>
  <v-container grid-list-xs>
    <v-card>
      <v-layout
        row
        wrap
        justify-center
        py-3
      >
        <v-btn-toggle
          v-model="SelectType"
          mandatory
          dense
          color="primary"
          background-color="white"
        >
          <v-btn
            v-for="type of tableType"
            :key="type.id"
          >
            {{ type }}
          </v-btn>
        </v-btn-toggle>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-data-table
          :headers="tableHeaders"
          :items="tableDesserts"
          hide-actions
          class="elevation-1"
          show-select
          item-key="id"
        />
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import Data from "@/pages/Manager/ManagerData.js";
export default {
  data() {
    return {
      LogInfo: Data.LogInfo,
      tableType: ["日报表", "月报表", "年报表"],
      tableHeaders: [
        {
          text: "房间号",
          align: "center",
          sortable: true,
          value: "RoomID"
        },
        {
          text: "时间",
          align: "center",
          sortable: true,
          value: "Time"
        },
        {
          text: "开关次数",
          align: "center",
          sortable: true,
          value: "OpenTimes"
        },
        {
          text: "调度次数",
          align: "center",
          sortable: true,
          value: "ScheduleTimes"
        },
        {
          text: "调温次数",
          align: "center",
          sortable: true,
          value: "ChangeTempTimes"
        },
        {
          text: "调风次数",
          align: "center",
          sortable: true,
          value: "ChangeWindTimes"
        },
        {
          text: "详单数",
          align: "center",
          sortable: true,
          value: "NumberOfForms"
        },
        {
          text: "收入",
          align: "center",
          sortable: true,
          value: "InCome"
        },
        {
          text: "使用时长",
          align: "center",
          sortable: true,
          value: "UsageTime"
        }
      ],
      tableDesserts: undefined
    };
  },
  mounted() {
    this.getTableDesserts(this.LogInfo);
  },
  methods:{
    //daily,weekly,monthly,yearly
    getLogInfo(type){
      this.axios.get("api/LogInfo",{params:{type:type}})
      .then(res => {
        Data.LogInfo = res.data;
      })
      .catch(err => {
        console.error(err); 
      })
    },
    getTableDesserts(Desserts){
      this.tableDesserts = Desserts;
    }
  }
};
</script>

<style>
</style>