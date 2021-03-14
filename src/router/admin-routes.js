const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{
      path: "",
      name: "loginHome",
      component: () => import("pages/Index.vue")
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
      name: "logout",
      component: () => import("pages/login/logout.vue")
    }]
  }, {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      name:"home",
      component: () => import("pages/reservation/index.vue")
    }]
},
  {
    path: "/reservation",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      name: "ReservationList",
      path: "",
      component: () => import("pages/reservation/index.vue")
    },{
      name:"ReservationEdit",
      path: "edit",
      component: () => import("pages/reservation/update.vue")
    }]
  },

  {
    path: "/hotels",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      name: "hotelList",
      component: () => import("pages/hotels/index.vue")
    },
      {
        path: "create",
        name: "hotelCreate",
        component: () => import("pages/hotels/create.vue")
      },
      {
        path: "update/:id",
        name: "hotelUpdate",
        component: () => import("pages/hotels/update.vue")
      },
      {
        path: "price/:id",
        name: "hotelPrice",
        component: () => import("pages/hotels/price.vue")
      }
    ]
  },


  {
    path: "/system-settings",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      name: "settingList",
      component: () => import("pages/settings/index.vue")
    },
      {
        path: "create",
        name: "settingCreate",
        component: () => import("pages/settings/create.vue")
      },
      {
        path: "update/:id",
        name: "settingUpdate",
        component: () => import("pages/settings/update.vue")
      },
      {
        path: "price/:id",
        name: "settingPrice",
        component: () => import("pages/hotels/price.vue")
      }
    ]
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
    path: "/finans",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      name:"finans",
      component: () => import("pages/cariler/userIndex.vue")
    }]
  },
  {
    path: "/cars",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
        path: "",
        name: "carList",
        component: () => import("pages/cars/index.vue")
      },
      {
        path: "create",
        name: "carCreate",
        component: () => import("pages/cars/create.vue")
      },
      {
        path: "update/:id",
        name: "carUpdate",
        component: () => import("pages/cars/update.vue")
      }
    ]
  },

  {
    path: "/cariler",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/cariler/index.vue"),
    }]
  },

  {
    path: "/users",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
        path: "",
        name: "userList",
        component: () => import("pages/users/index.vue")
      },
      {
        path: "create",
        name: "userCreate",
        component: () => import("pages/users/create.vue")
      },
      {
        path: "update/:id",
        name: "userUpdate",
        component: () => import("pages/users/update.vue")
      },
      {
        path: "myaccount/:id",
        name: "myaccount",
        component: () => import("pages/users/account.vue")
      },
    ]
  },

  {
    path: "/regions",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
        path: "",
        name: "regionList",
        component: () => import("pages/regions/index.vue")
      },
      {
        path: "create",
        name: "regionCreate",
        component: () => import("pages/regions/create.vue")
      },
      {
        path: "update/:id",
        name: "regionUpdate",
        component: () => import("pages/regions/update.vue")
      }
    ]
  },
  {
    path: "/notice",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
        path: "",
        name: "noticeList",
        component: () => import("pages/notice/index.vue")
      },
      {
        path: "create",
        name: "noticeCreate",
        component: () => import("pages/notice/create.vue")
      },
      {
        path: "update/:id",
        name: "noticeUpdate",
        component: () => import("pages/notice/update.vue")
      }
    ]
  },

  {
    path: "/prices",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
        path: "",
        name: "priceList",
        component: () => import("pages/prices/index.vue")
      },
      {
        path: "create",
        name: "priceCreate",
        component: () => import("pages/prices/create.vue")
      },
      {
        path: "update/:id",
        name: "priceUpdate",
        component: () => import("pages/prices/update.vue")
      }
    ]
  }
  ,{
    path: "/phone-book",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
        path: "",
        name: "phoneList",
        component: () => import("pages/phones/index.vue")
      },
      {
        path: "create",
        name: "phoneCreate",
        component: () => import("pages/phones/create.vue")
      },
      {
        path: "update/:id",
        name: "phoneUpdate",
        component: () => import("pages/phones/update.vue")
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
