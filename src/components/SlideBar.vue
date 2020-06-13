<template>
  <v-container grid-list-xs>
    <v-navigation-drawer
      ref="SlideBar"
      v-model="SlideBarToggle"
      v-clickoutside="handleClose"
      app
      clipped
      mini-variant
      expand-on-hover
      height="100%"
    >
      <v-list
        class="py-0"
        close-on-click
        close-on-content-click
      >
        <v-list-item
          two-line
          class="px-2"
        >
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ UserID }}</v-list-item-title>
          </v-list-item-content>

          <v-btn
            icon
            @click.stop="SlideBarToggle = !SlideBarToggle"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>

        <v-list-item
          v-if="UserID"
          link
        >
          <v-list-item-content>
            <v-list-item-title class="title">
              房间
            </v-list-item-title>
            <!-- <v-list-item-subtitle></v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />
      <v-divider />

      <v-list
        dense
        nav
        close-on-click
        close-on-content-click
      >
        <v-list-item
          v-for="item of List"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            :to="{name:LogOutPath}"
          >
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "SlideBar",
  //自定义指令
  directives: {
    //点击侧栏外面收起侧栏
    //v-clickoutside
    clickoutside: {
      // 初始化指令
      bind(el, binding) {
        function documentHandler(e) {
          // 这里判断点击的元素是否是本身，是本身，则返回
          if (el.contains(e.target)) {
            return false;
          }
          // 判断指令中是否绑定了函数
          if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
          }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind(el) {
        // 解除事件监听
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  props: {
    SlideBarToggle: Boolean,
    List: Array,
    UserID: String,
    LogOutPath:String
  },
  data() {
    return {};
  },
  watch: {
    SlideBarToggle: function(val) {
      this.$emit("switchToggle", val);
    }
  },
  mounted() {
    // const self = this;
    // document.addEventListener("click", e => {
    //   // 点击空白处让侧栏关闭
    //   console.log(e.target);
    //   console.log(this.$refs["SlideBar"]);
    //   let a = e.target;
    //   if (self.SlideBarToggle === true && this.$refs.SlideBar) {
    //     self.SlideBarToggle = false;
    //   }
    //   e.stopPropagation();
    // });
  },
  methods: {
    handleClose() {
      this.SlideBarToggle = false;
    }
  }
};
</script>
<style lang="css">
/* .slideButton {
  margin: 4rem 0rem 0rem 1rem;
} */
</style>
