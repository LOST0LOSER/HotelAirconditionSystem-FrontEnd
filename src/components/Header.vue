<template>
  <v-app-bar
    app
    color="primary"
    dark
    clipped-left
    elevate-on-scroll
    short
    flat
    xs12
    md6
    sm4
  >
    <!-- 侧栏按钮 -->
    <v-app-bar-nav-icon @click.stop="switchToggle" />
    <!-- 小屏幕导航栏 -->
    <v-menu
      offset-y
      activator
    >
      <!-- <v-btn color="primary" dark slot="activator" class="hidden-md-and-up">导航</v-btn> -->
      <template
        v-slot:activator="{ on }"
        class="hidden-md-and-up"
      >
        <v-btn
          color="primary"
          dark
          class="hidden-md-and-up"
          v-on="on"
        >
          导航
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="Page of Pages"
          :key="Page.id"
          :to="Page.Link"
        >
          <v-list-item-title>{{ Page.Name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- 大屏幕导航栏 -->
    <v-btn
      v-for="Page of Pages"
      :key="Page.id"
      :to="Page.Link"
      text
      class="hidden-sm-and-down"
    >
      <v-icon xs>
        {{ Page.Name }}
      </v-icon>
    </v-btn>

    <v-spacer />
    <v-text-field
      size="1"
      dense
      single-line
      solo
      light
      placeholder="Search"
      class="hidden-xs-and-down mt-7 ml-2 mr-2"
    />
    <!-- <input v-model="Search" type="text" /> -->
    <v-btn
      text
      icon
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <!-- <v-btn to="/Login" text>
      <v-icon class="hidden-sm-and-down">登录</v-icon>
      <v-icon class="hidden-sm-and-down" right>mdi-login</v-icon>
      <v-icon class="hidden-md-and-up">mdi-login</v-icon>
    </v-btn>
    <v-btn to="/Register" text>
      <v-icon class="hidden-sm-and-down">注册</v-icon>
      <v-icon class="hidden-sm-and-down" right>mdi-account</v-icon>
      <v-icon class="hidden-md-and-up">mdi-account</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  props: {
    SlideBarToggle: Boolean,
    Pages: Array
  },
  data: () => ({
    Search: undefined
    // Pages: [
    //   {
    //     Name: "控制面板",
    //     Link: "/DashBoard"
    //   },
    //   {
    //     Name: "房间信息",
    //     Link: "/RoomDetail/admin"
    //   },
    //   {
    //     Name: "用户信息",
    //     Link: "/User"
    //   },
    //   {
    //     Name: "计费详情",
    //     Link: "/Bill"
    //   }
    // ]
  }),
  computed: {},
  methods: {
    switchToggle: function() {
      this.SlideBarToggle = !this.SlideBarToggle;
      this.$emit("switchToggle", this.SlideBarToggle);
    }
  }
};
</script>
<style>
.Header {
  margin: 2vh 2vh 2vh 2vh;
  position: flex;
}
.Topbar {
  padding: 1.5vh 1.5vh 1.5vh 1.5vh !important;
}

@media screen and (min-width: 600px) and (max-width: 960px) {
  .Tagdisplay {
    display: none;
  }
}
</style>
