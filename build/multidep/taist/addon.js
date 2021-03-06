function init() {

  function startModule(requirejs, taistApi, entryPoint) {
    requirejs(["multiver!lodash@^3.0.0","multiver!moment@^2.10.0"], function() {
  var global = window;
  var __global_require__ = require;
  var __args__ = arguments;
  var require = (function() {
    var deps = ["lodash@^3.0.0","moment@^2.10.0"].reduce(function(res, dep, index) {
      res[dep] = index;
      return res;
    }, {});
    return function(name) {
      if (name in deps) {
        return __args__[deps[name]];
      } else if (__global_require__) {
        return __global_require__(name);
      } else {
        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
    }
  })();

  /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Require local modules (will be bundled with multidep-cli)
	var exLib = __webpack_require__(1);

	// Call local module
	exLib('Example');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Require external modules (will not be bundled, but required in runtime on client)
	var _ = __webpack_require__(2);
	var moment = __webpack_require__(3);

	module.exports = function (prefix) {
	  // Use global taistApi object
	  taistApi.log(prefix + ': I use lodash@' + _.VERSION + ', and moment@' + moment.version);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("lodash@^3.0.0");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("moment@^2.10.0");

/***/ }
/******/ ]);
});

  }
  
  function discoverAMD(timeout, cb) {
  var guid = "70152108-2745-4c6a-b529-c4fe10e488a7";
  function discover(key, handler) {
  var discoveredEventsIds = {};
  var publishEventName = guid + ':publish';
  var discoverEventName = guid + ':discover';

  var stop = function () {
    window.removeEventListener(publishEventName, listener);
  };

  var listener = function (ev) {
    ev = ev.detail;
    if (ev && ev.id && ev.key === key && !discoveredEventsIds.hasOwnProperty(ev.id)) {
      discoveredEventsIds[ev.id] = true;
      handler(ev.value, stop);
    }
  };
  window.addEventListener(publishEventName, listener);

  var event = new CustomEvent(discoverEventName, {
    detail: {
      key: key
    }
  });
  window.dispatchEvent(event);

  return {
    stop: stop
  }
}

  var resolved = false;

  var disc = discover('amd:ready', function (data) {
    resolved = true;
    disc.stop();
    cb(null, data);
  });

  setTimeout(function () {
    if (!resolved) {
      disc.stop();
      cb(new Error('Waiting for AMD timeout'));
    }
  }, timeout);
}

  
  return {
    start: function(taistApi, entryPoint) {
      discoverAMD(15000, function (err, amd) {
        if (err) throw err;
        startModule(amd.require, taistApi, entryPoint);
      })
    }
  };
}