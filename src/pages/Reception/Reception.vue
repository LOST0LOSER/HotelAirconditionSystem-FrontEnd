<template>
  <div>
    <Header
      :slide-bar-toggle="SlideBarToggleState"
      @switchToggle="SlideBarToggleState = $event"
    />
    <SlideBar
      :user-i-d="&quot;receptionist&quot;"
      :list="List"
      :slide-bar-toggle="SlideBarToggleState"
      :log-out-path="&quot;ReceptionLogin&quot;"
      @switchToggle="SlideBarToggleState = $event"
    />
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
    id: Number
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
      }
      // {
      //   title: "Aircondition",
      //   icon: "mdi-air-conditioner",
      //   link: "/Aircondition/"
      // }
    ]
  })
};
</script>
