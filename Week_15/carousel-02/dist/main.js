/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Timeline\": () => (/* binding */ Timeline),\n/* harmony export */   \"Animation\": () => (/* binding */ Animation)\n/* harmony export */ });\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar TICK = Symbol(\"tick\");\nvar TICK_HANDLER = Symbol(\"tick-handler\");\nvar ANIMATION = Symbol(\"animation\");\nvar Timeline = /*#__PURE__*/function () {\n  function Timeline() {\n    _classCallCheck(this, Timeline);\n\n    // 做变量的触发\n    this[ANIMATION] = new Set(); // 把 animation 放入这个 Set里面\n  }\n\n  _createClass(Timeline, [{\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n\n      var startTime = Date.now();\n\n      this[TICK] = function () {\n        // 调用自身的一个时间函数\n        var _iterator = _createForOfIteratorHelper(_this[ANIMATION]),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var animation = _step.value;\n            animation.receive(Date.now() - startTime);\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n\n        requestAnimationFrame(_this[TICK]);\n      };\n    } // 播放速率，控制动画快进慢放\n    // set rate() {\n    // }\n    // get rate() {\n    // }\n    // 暂停\n\n  }, {\n    key: \"pause\",\n    value: function pause() {} // 恢复\n\n  }, {\n    key: \"resume\",\n    value: function resume() {} // 重启时间线，清除状态\n\n  }, {\n    key: \"reset\",\n    value: function reset() {} // 管理动画\n\n  }, {\n    key: \"add\",\n    value: function add(animation) {\n      this[ANIMATION].add(animation);\n    }\n  }]);\n\n  return Timeline;\n}();\nvar Animation = /*#__PURE__*/function () {\n  function Animation(object, property, startValue, endValue, duration, timingFunction) {\n    _classCallCheck(this, Animation);\n\n    this.object = object;\n    this.property = property;\n    this.startValue = startValue;\n    this.endValue = endValue;\n    this.duration = duration;\n    this.timingFunction = timingFunction;\n  }\n\n  _createClass(Animation, [{\n    key: \"receive\",\n    value: function receive(time) {\n      console.log(time);\n      var range = this.endValue - this.startValue;\n      this.object[this.property] = this.startValue + range * time / this.duration;\n    }\n  }]);\n\n  return Animation;\n}();\n\n//# sourceURL=webpack://jsx/./animation.js?");

/***/ }),

/***/ "./carousel.js":
/*!*********************!*\
  !*** ./carousel.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Carousel\": () => (/* binding */ Carousel)\n/* harmony export */ });\n/* harmony import */ var _framework__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework */ \"./framework.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\nvar Carousel = /*#__PURE__*/function (_Component) {\n  _inherits(Carousel, _Component);\n\n  var _super = _createSuper(Carousel);\n\n  function Carousel() {\n    var _this;\n\n    _classCallCheck(this, Carousel);\n\n    _this = _super.call(this); // 调用父类的构造函数，构造函数中的this指向当前创建的实例(必须调用)\n\n    _this.attributes = Object.create(null); // 初始化存储属性的对象\n\n    return _this;\n  } // 重写setAttribute\n\n\n  _createClass(Carousel, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.attributes[name] = value; // 存储属性和值\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      this.root = document.createElement(\"div\"); // 默认创建一个 div\n      // 设置样式\n\n      this.root.classList.add('carousel');\n\n      var _iterator = _createForOfIteratorHelper(this.attributes.src),\n          _step;\n\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var record = _step.value;\n          var child = document.createElement('div');\n          child.style.backgroundImage = \"url('\".concat(record, \"')\");\n          this.root.appendChild(child);\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n\n      var position = 0; // 记录当前处于哪一张图（0~4）\n      // 鼠标拖动播放，给root增加一个鼠标事件\n\n      this.root.addEventListener(\"mousedown\", function (event) {\n        var children = _this2.root.children;\n        var startX = event.clientX;\n\n        var move = function move(event) {\n          var x = event.clientX - startX; // 计算鼠标拖动的距离\n\n          /* 优化 */\n          // 计算当前拖动距离对应到哪一个图片了\n\n          var current = position - (x - x % 500) / 500; // x - x % 500的值一定是500的倍数（自己把自己多余的给减去）\n\n          for (var _i = 0, _arr = [-1, 0, 1]; _i < _arr.length; _i++) {\n            var offset = _arr[_i];\n            var pos = current + offset; // 计算当前是哪个图片，可能为负值，所以要把负值转为正值\n\n            pos = (pos + children.length) % children.length; // 把-1转为3，-2转为2，-3转为1\n\n            children[pos].style.transition = \"none\"; // 取消动画\n\n            children[pos].style.transform = \"translateX(\".concat(-pos * 500 + offset * 500 + x % 500, \"px)\");\n          }\n        };\n\n        var up = function up(event) {\n          var x = event.clientX - startX; // 计算鼠标拖动的距离(往左划x为负)\n\n          position = position - Math.round(x / 500); // 拖动的距离如果超过图片的一半宽度就移动到下一个图片，没超过一半则显示当前的图片\n\n          for (var _i2 = 0, _arr2 = [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]; _i2 < _arr2.length; _i2++) {\n            var offset = _arr2[_i2];\n            var pos = position + offset; // 计算当前是哪个图片，可能为负值，所以要把负值转为正值\n\n            pos = (pos + children.length) % children.length; // 把-1转为3，-2转为2，-3转为1\n\n            children[pos].style.transition = \"\"; // 加上css动画\n\n            children[pos].style.transform = \"translateX(\".concat(-pos * 500 + offset * 500, \"px)\");\n          }\n\n          document.removeEventListener('mousemove', move);\n          document.removeEventListener('mouseup', up);\n        };\n\n        document.addEventListener(\"mousemove\", move);\n        document.addEventListener(\"mouseup\", up);\n      }); // 自动播放：加上时间的控制，每3s执行一次\n      // let currentIndex = 0;\n      // setInterval(() => {\n      //   let children = this.root.children;\n      //   let nextIndex = (currentIndex + 1) % children.length;  //\n      //   let current = children[currentIndex];\n      //   let next = children[nextIndex];\n      //   next.style.transition = \"none\";\n      //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`;   // 矫正偏移\n      //   setTimeout(() => {\n      //     next.style.transition = \"\";\n      //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;\n      //     next.style.transform = `translateX(${- nextIndex * 100}%)`;\n      //     currentIndex = nextIndex;\n      //   }, 16);\n      // }, 3000);\n\n      return this.root;\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.render());\n    }\n  }]);\n\n  return Carousel;\n}(_framework__WEBPACK_IMPORTED_MODULE_0__.Component);\n\n//# sourceURL=webpack://jsx/./carousel.js?");

/***/ }),

/***/ "./framework.js":
/*!**********************!*\
  !*** ./framework.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement),\n/* harmony export */   \"Component\": () => (/* binding */ Component)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction createElement(type, attribute) {\n  var element;\n\n  if (typeof type === \"string\") {\n    // element = document.createElement(type);\n    element = new ElementWrapper(type);\n  } else {\n    element = new type();\n  }\n\n  for (var name in attribute) {\n    element.setAttribute(name, attribute[name]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  if (children.length > 0) {\n    var _iterator = _createForOfIteratorHelper(children),\n        _step;\n\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var child = _step.value;\n\n        if (typeof child === \"string\") {\n          //child = document.createTextNode(child);\n          child = new TextWrapper(child);\n        }\n\n        element.appendChild(child);\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n  }\n\n  return element;\n}\nvar Component = /*#__PURE__*/function () {\n  function Component() {// this.root = this.render();\n\n    _classCallCheck(this, Component);\n  }\n\n  _createClass(Component, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      this.root.setAttribute(name, value);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      child.mountTo(this.root);\n    }\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Component;\n}();\n\nvar ElementWrapper = /*#__PURE__*/function (_Component) {\n  _inherits(ElementWrapper, _Component);\n\n  var _super = _createSuper(ElementWrapper);\n\n  function ElementWrapper(type) {\n    var _this;\n\n    _classCallCheck(this, ElementWrapper);\n\n    _this.root = document.createElement(type);\n    return _possibleConstructorReturn(_this);\n  }\n\n  return ElementWrapper;\n}(Component);\n\nvar TextWrapper = /*#__PURE__*/function (_Component2) {\n  _inherits(TextWrapper, _Component2);\n\n  var _super2 = _createSuper(TextWrapper);\n\n  function TextWrapper(content) {\n    var _this2;\n\n    _classCallCheck(this, TextWrapper);\n\n    _this2.root = document.createTextNode(content);\n    return _possibleConstructorReturn(_this2);\n  }\n\n  return TextWrapper;\n}(Component);\n\n//# sourceURL=webpack://jsx/./framework.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _framework_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./framework.js */ \"./framework.js\");\n/* harmony import */ var _carousel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel.js */ \"./carousel.js\");\n/* harmony import */ var _animation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animation.js */ \"./animation.js\");\n\n\n\nvar d = ['https://pics5.baidu.com/feed/63d0f703918fa0eccf953e747b90c5e63d6ddb0d.jpeg?token=7d2d3d9497b0b8bea9319988a84d5375', 'https://pics5.baidu.com/feed/a044ad345982b2b767accc3b6daa57e776099b2a.jpeg?token=d7296f48c6b65020fc3a246a7a9f3715', 'https://pics5.baidu.com/feed/38dbb6fd5266d016f413188605774f0f34fa35ff.jpeg?token=48e1d7d0851b89495f8d8b5f296ac5bc'];\nvar a = (0,_framework_js__WEBPACK_IMPORTED_MODULE_0__.createElement)(_carousel_js__WEBPACK_IMPORTED_MODULE_1__.Carousel, {\n  src: d\n});\na.mountTo(document.body);\nvar tl = new _animation_js__WEBPACK_IMPORTED_MODULE_2__.Timeline();\nvar am = new _animation_js__WEBPACK_IMPORTED_MODULE_2__.Animation({}, \"a\", 0, 100, 1000, null);\ntl.add(am);\ntl.start();\n\n//# sourceURL=webpack://jsx/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;