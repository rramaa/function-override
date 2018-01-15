'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _callFunc(self, obj, args) {
    var fn = typeof obj === 'function' ? obj : obj.function;
    if (typeof fn !== 'function') {
        return;
    }
    var functionArguments = obj.args;
    var context = obj.ignoreContext ? undefined : self;
    if (!functionArguments) {
        functionArguments = Array.from(args);
    }
    if ((typeof functionArguments === 'undefined' ? 'undefined' : _typeof(functionArguments)) === 'object' && functionArguments.constructor === Array) {
        fn.apply(context, functionArguments);
    }
}

/**
 * @param {object}         self                 The context in which the function is executed
 * @param {function}       functionToReplace    The function which should be replaced
 * @param {options}        options              Options
 */
function overrideFunction(self, functionToReplace, _ref) {
    var before = _ref.before,
        after = _ref.after;

    var oldFunc = self[functionToReplace];
    if (typeof oldFunc !== 'function') {
        throw new Error('Original function not provided');
    }
    var newFunc = function newFunc() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _callFunc(self, before, args);
        oldFunc.apply(self, args);
        _callFunc(self, after, args);
    };
    self[functionToReplace] = newFunc;
    return newFunc;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = overrideFunction;
} else if (typeof define === 'function' && define.amd) {
    define(function () {
        return overrideFunction;
    });
} else {
    global = function () {
        return this || (0, eval)('this');
    }();
    global.overrideFunction = overrideFunction;
}
