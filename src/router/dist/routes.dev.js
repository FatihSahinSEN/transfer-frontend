"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  path: "/home",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/Index.vue"));
      });
    }
  }]
}, {
  path: "/reservation",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/reservation/index.vue"));
      });
    }
  }]
}, {
  path: "/hotels",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    name: "hotelList",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/hotels/index.vue"));
      });
    }
  }, {
    path: "create",
    name: "hotelCreate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/hotels/create.vue"));
      });
    }
  }, {
    path: "update/:id",
    name: "hotelUpdate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/hotels/update.vue"));
      });
    }
  }]
}, {
  path: "/reservation",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    name: "reservationList",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/reservation/index.vue"));
      });
    }
  }, {
    path: "create",
    name: "reservationCreate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/reservation/create.vue"));
      });
    }
  }, {
    path: "update/:id",
    name: "reservationUpdate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/reservation/update.vue"));
      });
    }
  }]
}, {
  path: "/cariler",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/cariler/index.vue"));
      });
    }
  }]
}, {
  path: "/users",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    name: "userList",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/users/index.vue"));
      });
    }
  }, {
    path: "create",
    name: "userCreate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/users/create.vue"));
      });
    }
  }, {
    path: "update/:id",
    name: "userUpdate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/users/update.vue"));
      });
    }
  }]
}, {
  path: "/area",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    name: "regionList",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/area/index.vue"));
      });
    }
  }, {
    path: "create",
    name: "regionCreate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/area/create.vue"));
      });
    }
  }, {
    path: "update/:id",
    name: "regionUpdate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/area/update.vue"));
      });
    }
  }]
}, {
  path: "/prices",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("layouts/MainLayout.vue"));
    });
  },
  children: [{
    path: "",
    name: "priceList",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/prices/index.vue"));
      });
    }
  }, {
    path: "create",
    name: "priceCreate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/prices/create.vue"));
      });
    }
  }, {
    path: "update/:id",
    name: "priceUpdate",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("pages/prices/update.vue"));
      });
    }
  }]
}, // Always leave this as last one,
// but you can also remove it
{
  path: "*",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("pages/Error404.vue"));
    });
  }
}];
var _default = routes;
exports["default"] = _default;
