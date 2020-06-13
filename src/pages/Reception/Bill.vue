<template>
  <v-container fluid>
    <v-layout
      row
      wrap
      justify-center
    >
      <h1>账单</h1>
    </v-layout>

    <v-row align="center">
      <v-col
        cols="2"
        md="4"
      />
      <v-col
        class="d-flex"
        md="4"
      >
        <v-select
          v-model="RoomID"
          :items="SignInRoom"
          label="Room"
          outlined
          dense
          class="mt-3"
        />
      </v-col>
      <v-col
        cols="2"
        md="4"
      >
        <v-btn
          color="primary"
          class="mb-4"
          @click="getBillInfo(RoomID)"
        >
          查询
        </v-btn>
      </v-col>
    </v-row>

    <v-col
      v-show="showBill"
      align="center"
    >
      <v-row align="center">
        <v-col>
          <!-- <v-card class="mx-auto elevation-8" max-width="2000" outlined> -->
          <v-data-table
            class="mx-6 px-0 elevation-8"
            max-width="1000px"
            outlined
            :headers="BillInfo.headers"
            :items="BillInfo.dataList"
            :items-per-page="5"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col align="end">
          <v-btn class="px-6">
            打印详单
          </v-btn>
        </v-col>
        <v-col align="start">
          <v-btn class="px-6">
            打印账单
          </v-btn>
        </v-col>
        <v-col align="start">
          <v-btn class="px-12">
            结账
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import Data from "@/pages/Reception/RoomData";
export default {
  data: () => ({
    RoomData: Data,
    SignInRoom: [],
    showBill: false,
    BillInfo: {
      headers: [
        {
          text: "开始时间",
          align: "center",
          width: "8rem",
          value: "startTime"
        },
        {
          text: "结束时间",
          align: "center",
          width: "8rem",
          value: "endTime"
        },
        {
          text: "风速",
          align: "center",
          width: "8rem",
          value: "windSpeed"
        },
        {
          text: "开始温度(°C)",
          align: "center",
          width: "8rem",
          value: "startTemp"
        },
        {
          text: "结束温度(°C)",
          align: "center",
          width: "8rem",
          value: "endTemp"
        },
        {
          text: "费率(元/分钟)",
          align: "center",
          width: "8rem",
          value: "chargeRate"
        },
        {
          text: "费用(元)",
          align: "center",
          width: "8rem",
          value: "costs"
        }
      ],
      dataList: [
        {
          startTime: String,
          endTime: String,
          windSpeed: String,
          startTemp: Number,
          endTemp: Number
        }
      ]
    }
  }),
  mounted() {
    this.getSignInRoom();
  },
  methods: {
    getSignInRoom() {
      for (let Room of this.RoomData) {
        if (Room.RoomSignInState === true) {
          this.SignInRoom.push(Room.RoomID);
        }
      }
    },
    getBillInfo(sentRoomID) {
      this.axios
        .get("api/getBillInfo", { params: { RoomID: sentRoomID } })
        .then(res => {
          const dataList = res.data;
          this.BillInfo.dataList = [];
          for (let itemIndex in dataList) {
            this.BillInfo.dataList.push(dataList[itemIndex]);
          }
          this.showBill = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    printInvoice() {
      this.axios
        .get("api/frontdesk/invoice", null)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    },
    payBill(sentRoomID) {
      this.axios
        .delete("api/room/payBill", { params: { RoomID : sentRoomID }})
        .then(res => {
          if (res.status === 200) {
            for (let room of this.RoomData) {
              if (room.RoomID === sentRoomID) {
                room.RoomSignInState = false;
                alert( sentRoomID +"房间完成结账");
                break;
              }
            }
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
