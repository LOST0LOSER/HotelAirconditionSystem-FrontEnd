import Vue from "vue";
import VueRouter from "vue-router";
const User = () => import("@/pages/User/User.vue");
const UserDashBoard = () => import("@/pages/User/UserDashBoard.vue");
const UserLogin = () => import("@/pages/User/UserLogin.vue");
const Admin = () => import("@/pages/Admin/Admin.vue");
const AdminLogin = () => import("@/pages/Admin/AdminLogin.vue");
const AdminPlane = () => import("@/pages/Admin/AdminPlane.vue");
const Manager = () => import("@/pages/Manager/Manager.vue");
const ManagerLogin = () => import("@/pages/Manager/ManagerLogin");
const ManagerPlane = () => import("@/pages/Manager/ManagerPlane.vue");
const AccountInfo = () => import("@/pages/Manager/AccountInfo.vue");
const LogInfo = () => import("@/pages/Manager/LogInfo.vue");
const Register = () => import("@/pages/Manager/Register.vue");
const Bill = () => import("@/pages/Reception/Bill.vue");
const Reception = () => import("@/pages/Reception/Reception");
const ReceptionLogin = () => import("@/pages/Reception/ReceptionLogin");
const RoomInfo = () => import("@/pages/Reception/RoomInfo");
const Entrance = () => import("@/pages/Entrance.vue");
const Login = () => import("@/pages/Login.vue");
Vue.use(VueRouter);

const routes = [{
    path: "/UserLogin",
    name: "UserLogin",
    component: UserLogin,
    meta: {
      isPublic: true
    }
  },
  {
    path: "/User/:id",
    component: User,
    props: true,
    meta: {
      isPublic: true
    },
    children: [{
        path: "",
        name: "User",
        component: UserDashBoard,
        props: true
      },
      {
        path: "UserDashBoard",
        name: "UserDashBoard",
        component: UserDashBoard,
        meta: {
          isPublic: true
        },
        props: true
      }
    ]
  },
  {
    path: "/AdminLogin",
    name: "AdminLogin",
    component: AdminLogin
  },
  {
    path: "/Admin",
    component: Admin,
    children: [{
        path: "",
        name: "Admin",
        component: AdminPlane
      },
      {
        path: "AdminPlane",
        name: "AdminPlane",
        component: AdminPlane
      }
    ],
    meta: {
      isPublic: true
    }
  },
  {
    path: "/ManagerLogin",
    name: "ManagerLogin",
    component: ManagerLogin
  },
  {
    path: "/Manager",
    component: Manager,
    children: [{
        path: "",
        name: "Manager",
        component: AccountInfo
      },
      {
        path: "ManagerPlane",
        name: "ManagerPlane",
        component: ManagerPlane
      },
      {
        path: "AccountInfo",
        name: "AccountInfo",
        component: AccountInfo
      },
      {
        path: "LogInfo",
        name: "LogInfo",
        component: LogInfo
      },
      {
        path: "Register",
        name: "Register",
        component: Register,
        meta: {
          isPublic: true
        }
      }
    ],
    meta: {
      isPublic: true
    }
  },
  {
    path: "/ReceptionLogin",
    name: "ReceptionLogin",
    component: ReceptionLogin
  },
  {
    path: "/Reception",
    component: Reception,
    children: [{
        path: "",
        name: "Reception",
        component: RoomInfo
      },
      {
        path: "RoomInfo",
        name: "RoomInfo",
        component: RoomInfo
      },
      {
        path: "Bill",
        name: "Bill",
        component: Bill,
        meta: {
          isPublic: true
        }
      }
    ],
    meta: {
      isPublic: true
    }
  },
  {
    path: "/Entrance",
    name: "Entrance",
    component: Entrance
  },
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    //错误页面
    path: "*",
    redirect: "/Entrance"
  }

  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
];

const router = new VueRouter({
  routes
  // mode: 'history',
});

export default router;