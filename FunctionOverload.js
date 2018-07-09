/**
 * js函数重载测试
 */

"use strict";

function f(arg1) {
    console.log('in frist function!')
}

function f(arg1, arg2) {
    console.log('in second function')
}

// NOTE：可以说js没有重载，虽然在严格模式下，重载这种形式能编译过去，但是实际上是最后面一个函数覆盖前面一个函数
f(1)        // in second function
f(1, 1)     // in second function