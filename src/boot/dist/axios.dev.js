"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.axiosInstance = exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var axiosInstance = _axios["default"].create({
  baseURL: "http://192.168.1.40/transfer/api/v1/",
  headers: {
    Accept: "json/application",
    "Content-Type": "json/application",
    Token: "TESTTOKEN"
  },
  timeout: 10000
});

exports.axiosInstance = axiosInstance;

var _default = function _default(_ref) {
  var Vue = _ref.Vue;
  Vue.prototype.$axios = axiosInstance;
};

exports["default"] = _default;
