<template>
  <div>
    <!-- $event代表组件emit消息传递出来的变量 -->
    <Header :SlideBarToggle="SlideBarToggleState" @switchToggle="SlideBarToggleState = $event"></Header>
    <SlideBar
      :UserID="'Admin'"
      :List="List"
      :SlideBarToggle="SlideBarToggleState"
      @switchToggle="SlideBarToggleState = $event"
      :LogOutPath="'AdminLogin'"
    ></SlideBar>
    <!-- <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs9>
          <v-slider label="label" :max="255" v-model="value"></v-slider>
        </v-flex>
        <v-flex xs3>
          <v-text-field v-model="value" type="number"></v-text-field>
        </v-flex>F
      </v-layout>
    </v-container>-->
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Header from "@/components/Header";
import SlideBar from "@/components/SlideBar";
export default {
  name: "App",
  components: {
    Header,
    SlideBar
  },
  props: {
    id: String
  },
  data: () => ({
    SlideBarToggleState: false,

    // Pages: [
    //   {
    //     Name: "用户面板",
    //     Link: "'/User/' + $route.params.id + '/UserDashBoard'"
    //   }
    // ],
    List: [
      {
        title: "AdminPlane",
        icon: "mdi-desktop-mac-dashboard",
        link: "AdminPlane"
      }
      // {
      //   title: "MyRoomInfo",
      //   icon: "mdi-door",
      //   link: "/RoomDetail/"
      // },
      // {
      //   title: "Aircondition",
      //   icon: "mdi-air-conditioner",
      //   link: "/Aircondition/"
      // }
    ]
  })
};
</script>
