<template>
  <v-container grid-list-xs>
    <v-layout
      row
      wrap
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm6
      >
        {{ RoomDetail }}
        <v-card />>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "RoomDetail",
  props: {
    RoomNum: undefined
  },
  data() {
    return {
      msg: "hello",
      sendBackInfo: undefined
    };
  },
  methods: {
    async getRoomInfo() {
      this.axios({
        method: "Get",
        url: "/getRoomInfo",
        data: {
          RoomNum: this.props.RoomNum
        }
      }).then(function(res) {
        if (res.status == 200) {
          this.$data.sendBackInfo = res.data;
        } else {
          alert("获取失败！");
          this.$router.push({ path: "Home" });
        }
      });
    }
  }
};
</script>

<style></style>
