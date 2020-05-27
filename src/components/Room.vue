<template>
  <!-- <v-btn> -->
  <v-container grid-list-xs fluid>
    <v-layout row justify-space-around wrap>
      <blockquote>
        <blockquote class="Room blockquote .font-weight-regular">
          <span>房间编号:{{RoomInfo.SerialNumber}}</span>
          <br />
          <span>当前温度:{{RoomInfo.CurrentTemputure}}</span>
          <br />
          <span>目标温度:{{RoomInfo.TargetTemputure}}</span>
          <br />
          <span>当前风速:{{RoomInfo.CurrentWindSpeed}}</span>
          <br />
          <span>状态:{{RoomInfo.CurrentState}}</span>
          <br />
        </blockquote>
        <v-layout justify-center mt-1>
          <v-btn color="primary">详细信息</v-btn>
        </v-layout>
      </blockquote>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Room",
  props: {
    RoomInfo: {
      SerialNumber: undefined,
      CurrentTemputure: undefined,
      TargetTemputure: undefined,
      CurrentWindSpeed: undefined,
      CurrentState: undefined
    }
  },
  data: () => ({})
};
</script>
<style lang="css">
.Room {
  width: 12rem;
  border: black solid 0.3rem;
  /* border-radius:2rem; */
}
.Room {
  border-radius: 1rem;
}
</style>