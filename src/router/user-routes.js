const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{
      path: "",
      name: "login",
      component: () => import("pages/login/login.vue")
    }]
  },
    {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{
      path: "",
      name: "login",
      component: () => import("pages/login/login.vue")
    }]
  },
    {
    path: "/logout",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{
      path: "",
      name: "login",
      component: () => import("pages/login/logout.vue")
    }]
  },
  {
    path: "/account",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      name: "myaccount",
      component: () => import("pages/users/account.vue")
    }]
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      name:"home",
      component: () => import("pages/Index.vue")
    }]
  },
  {
    path: "/finans",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      name:"finans",
      component: () => import("pages/cariler/userIndex.vue")
    }]
  },

  {
    path: "/reservation",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
        path: "",
        name: "reservationList",
        component: () => import("pages/reservation/index.vue")
      },
      {
        path: "create",
        name: "reservationCreate",
        component: () => import("pages/reservation/create.vue")
      },
      {
        path: "update/:id",
        name: "reservationUpdate",
        component: () => import("pages/reservation/update.vue")
      }
    ]
  },
  {
    path: "/voucher/:data",
    component:() => import("layouts/Print.vue"),
    children: [{
      path: "",
      name: "voucherPage",
      component: () => import("pages/voucher/index.vue")
    }
    ]
  },  {
    path: "/extre",
    component:() => import("layouts/Print.vue"),
    children: [{
      path: "",
      name: "ekstre",
      component: () => import("pages/voucher/extre.vue")
    }
    ]
  },




  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
