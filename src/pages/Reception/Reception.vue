<template>
  <div>
    <Header
      :SlideBarToggle="SlideBarToggleState"
      @switchToggle="SlideBarToggleState = $event"
    ></Header>
    <SlideBar
      :UserID="'receptionist'"
      :List="List"
      :SlideBarToggle="SlideBarToggleState"
      @switchToggle="SlideBarToggleState = $event"
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
  props:{
    id:Number
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
        title: "RoomInfo",
        icon: "mdi-door",
        link: "RoomInfo"
      },
      {
        title: "Bill",
        icon: "mdi-account-cash-outline",
        link: "Bill"
      },
      // {
      //   title: "Aircondition",
      //   icon: "mdi-air-conditioner",
      //   link: "/Aircondition/"
      // }
    ]
  }),
};
</script>
