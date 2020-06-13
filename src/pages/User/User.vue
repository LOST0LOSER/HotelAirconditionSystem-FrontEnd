<template>
  <div>
    <Header
      :slide-bar-toggle="SlideBarToggleState"
      @switchToggle="SlideBarToggleState = $event"
    />
    <SlideBar
      :user-i-d="id"
      :list="List"
      :slide-bar-toggle="SlideBarToggleState"
      :log-out-path="&quot;UserLogin&quot;"
      @switchToggle="SlideBarToggleState = $event"
    />
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
      <router-view />
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
        title: "UserDashBoard",
        icon: "mdi-desktop-mac-dashboard",
        link: "UserDashBoard"
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
