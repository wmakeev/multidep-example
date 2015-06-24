function init() {

    function defineModule (define, taistApi, entryPoint) {
define('multidep-example', ["multiver!lodash@3.9.3","multiver!moment@2.10.3"], function() {
    var __global_require = require;
    var require = (function() {
        var args = arguments;
        var deps = ["lodash@3.9.3","moment@2.10.3"].reduce(function(res, dep, index) {
            return res[dep] = index;
        }, {});
        return function(name) {
            if (name in deps) {
                return args[deps[name]];
            } else if (__global_require) {
                return __global_require(name);
            } else {
                var err = new Error("Cannot find module '" + name + "'");
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
        }
    })();

return/******/ (function(modules) { // webpackBootstrap
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

	var _ = __webpack_require__(1);
	var moment = __webpack_require__(2);

	taistApi.log('in addon');

	module.exports = 'I use lodash@' + _.VERSION + ', and moment@' + moment.version;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("lodash@3.9.3");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("moment@2.10.3");

/***/ }
/******/ ]);
});
    }

    return {
        start: function(taistApi, entryPoint) {
            var key = 'AMD_DEFINE';
            var timeout = 15000;
            var guid = "70152108-2745-4c6a-b529-c4fe10e488a7";
            var publishEventName  = guid + ':publish';
            var discoverEventName = guid + ':discover';
            var resolved = false;
            var listener = function (ev) {
                ev = ev.detail;
                if (ev && ev.key === key) {
                    window.removeEventListener(publishEventName, listener);
                    resolved = true;
                    defineModule (ev.value, taistApi, entryPoint)
                }
            };
            window.addEventListener(publishEventName, listener);
            var event = new CustomEvent(discoverEventName, {
                detail: {
                    key: key
                }
            });
            window.dispatchEvent(event);
            setTimeout(function () {
                if (!resolved) {
                    window.removeEventListener(publishEventName, listener);
                    throw new Error('Waiting for define timeout in module [multidep-example]');
                }
            }, timeout)
        }
    };
}