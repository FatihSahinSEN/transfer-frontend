const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/login/login.vue'),
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('pages/login/logout'),
      },
    ],
  },
  {
    path: '/reservation',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'ReservationList',
        path: '',
        component: () => import('pages/reservation/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'ReservationList',
        },
      },
      {
        name: 'ReservationEdit',
        path: 'edit',
        component: () => import('pages/reservation/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'ReservationUpdate',
        },
      },
    ],
  },

  {
    path: '/hotels',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'hotelList',
        component: () => import('pages/SharedTablePages'),
        meta: {
          isAuthenticated: true,
          role: 'HotelList',
          service: 'HotelService',
        },
      },
      {
        path: 'create',
        name: 'hotelCreate',
        component: () => import('pages/hotels/create.vue'),
        meta: {
          isAuthenticated: true,
          role: 'HotelCreate',
        },
      },
      {
        path: 'update/:id',
        name: 'hotelUpdate',
        component: () => import('pages/hotels/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'HotelUpdate',
        },
      },
      {
        path: 'price/:id',
        name: 'hotelPrice',
        component: () => import('pages/hotels/price.vue'),
        meta: {
          isAuthenticated: true,
          role: 'HotelUpdate',
        },
      },
    ],
  },

  {
    path: '/system-settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'settingList',
        component: () => import('pages/settings/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'CariList',
        },
      },
      {
        path: 'create',
        name: 'settingCreate',
        component: () => import('pages/settings/create.vue'),
        meta: {
          isAuthenticated: true,
          role: 'CariList',
        },
      },
      {
        path: 'update/:id',
        name: 'settingUpdate',
        component: () => import('pages/settings/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'CariList',
        },
      },
      {
        path: 'price/:id',
        name: 'settingPrice',
        component: () => import('pages/hotels/price.vue'),
        meta: {
          isAuthenticated: true,
          role: 'CariList',
        },
      },
    ],
  },

  {
    path: '/reservation',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'reservationList',
        component: () => import('pages/reservation/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'ReservationList',
        },
      },
      {
        path: 'new',
        name: 'reservationNew',
        component: () => import('pages/reservation/create_new.vue'),
        meta: {
          isAuthenticated: true,
          role: 'ReservationCreate',
        },
      },
      {
        path: 'create',
        name: 'reservationCreate',
        component: () => import('pages/reservation/create.vue'),
        meta: {
          isAuthenticated: true,
          role: 'ReservationCreate',
        },
      },
      {
        path: 'update/:id',
        name: 'reservationUpdate',
        component: () => import('pages/reservation/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'ReservationUpdate',
        },
      },
    ],
  },
  {
    path: '/finans',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'finans',
        component: () => import('pages/cariler/userIndex.vue'),
        meta: {
          isAuthenticated: true,
          role: 'FinansList',
        },
      },
    ],
  },

  {
    path: '/kasa',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'kasa',
        component: () => import('pages/kasa/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'KasaList',
        },
      },
    ],
  },
  {
    path: '/cars',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'carList',
        component: () => import('pages/cars/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'CarsList',
        },
      },
      {
        path: 'create',
        name: 'carCreate',
        component: () => import('pages/cars/create.vue'),
        meta: {
          isAuthenticated: true,
          role: 'CarsCreate',
        },
      },
      {
        path: 'update/:id',
        name: 'carUpdate',
        component: () => import('pages/cars/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'CarsUpdate',
        },
      },
    ],
  },

  {
    path: '/cariler',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/cariler/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'CarsList',
        },
      },
    ],
  },

  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('pages/SharedTablePages'),
        meta: {
          isAuthenticated: true,
          role: 'UserList',
          service: 'UserService',
        },
      },
      {
        path: 'create',
        name: 'UserCreate',
        component: () => import('pages/users/create.vue'),
        meta: {
          isAuthenticated: true,
          role: 'UserCreate',
          service: 'UserService',
        },
      },
      {
        path: 'update/:id',
        name: 'userUpdate',
        component: () => import('pages/users/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'UserUpdate',
        },
      },
      {
        path: 'myaccount/:id',
        name: 'myaccount',
        component: () => import('pages/users/account.vue'),
        meta: {
          isAuthenticated: true,
        },
      },
    ],
  },

  {
    path: '/area',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'AreaList',
        component: () => import('pages/SharedTablePages'),
        meta: {
          isAuthenticated: true,
          role: 'AreaList',
          service: 'AreaService',
        },
      },
      {
        path: 'create',
        name: 'AreaCreate',
        component: () => import('pages/SharedFormPages'),
        meta: {
          isAuthenticated: true,
          role: 'AreaCreate',
          service: 'AreaService',
        },
      },
      {
        path: 'update/:id',
        name: 'AreaUpdate',
        component: () => import('pages/area/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'AreaUpdate',
          service: 'AreaService',
        },
      },
    ],
  },
  {
    path: '/notice',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'NoticeList',
        component: () => import('pages/notice/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'NoticeList',
          service: 'NoticeService',
        },
      },
      {
        path: 'create',
        name: 'noticeCreate',
        component: () => import('pages/notice/create.vue'),
        meta: {
          isAuthenticated: true,
          role: 'NoticeCreate',
        },
      },
      {
        path: 'update/:id',
        name: 'noticeUpdate',
        component: () => import('pages/notice/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'NoticeUpdate',
        },
      },
    ],
  },

  {
    path: '/prices',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'priceList',
        component: () => import('pages/prices/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'PriceList',
        },
      },
      {
        path: 'create',
        name: 'priceCreate',
        component: () => import('pages/prices/create.vue'),
        meta: {
          isAuthenticated: true,
          role: 'PriceCreate',
        },
      },
      {
        path: 'update/:id',
        name: 'priceUpdate',
        component: () => import('pages/prices/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'PriceUpdate',
        },
      },
    ],
  },
  {
    path: '/phone-book',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'phoneList',
        component: () => import('pages/phones/index.vue'),
        meta: {
          isAuthenticated: true,
          role: 'PhoneBookList',
        },
      },
      {
        path: 'create',
        name: 'phoneCreate',
        component: () => import('pages/phones/create.vue'),
        meta: {
          isAuthenticated: true,
          role: 'PhoneBookCreate',
        },
      },
      {
        path: 'update/:id',
        name: 'phoneUpdate',
        component: () => import('pages/phones/update.vue'),
        meta: {
          isAuthenticated: true,
          role: 'PhoneBookUpdate',
        },
      },
    ],
  },
  {
    path: '/voucher/:data',
    component: () => import('layouts/Print.vue'),
    children: [
      {
        path: '',
        name: 'voucherPage',
        component: () => import('pages/voucher/index.vue'),
      },
    ],
  },
  {
    path: '/extre',
    component: () => import('layouts/Print.vue'),
    children: [
      {
        path: '',
        name: 'ekstre',
        component: () => import('pages/voucher/extre.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
