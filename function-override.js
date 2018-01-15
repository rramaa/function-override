'use strict'
function _callFunc(self, obj, args){
    const fn = typeof obj === 'function' ? obj : obj.function
    if(typeof fn !== 'function') {
        return
    }
    let functionArguments = obj.args
    const context = obj.ignoreContext ? undefined : self
    if(!functionArguments){
        functionArguments = Array.from(args)
    }
    if(typeof functionArguments === 'object' && functionArguments.constructor === Array) {
        fn.apply(context, functionArguments)
    }
}

/**
 * @param {object}         self                 The context in which the function is executed
 * @param {function}       functionToReplace    The function which should be replaced
 * @param {options}        options              Options
 */
function overrideFunction(self, functionToReplace, {before, after}) {
    const oldFunc = self[functionToReplace]
    if(typeof oldFunc !== 'function'){
        throw new Error('Original function not provided')
    }
    const newFunc = function(...args){
        _callFunc(self, before, args)
        oldFunc.apply(self, args)
        _callFunc(self, after, args)
    }
    self[functionToReplace] = newFunc
    return newFunc
}

if(typeof module !== 'undefined' && module.exports){
    module.exports = overrideFunction
} else if (typeof define === 'function' && define.amd) {
    define(function () {
        return overrideFunction
    })
} else {
    global = (function () {
        return this || (0, eval)('this')
    }())
    global.overrideFunction = overrideFunction
}