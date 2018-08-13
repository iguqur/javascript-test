(function(){
    console.log('---------------------------------箭头函数是不会绑定函数、块作用于的上下文的------------------------------------------')
    function fun () {
    let a = 2
    let nestFun = () => {
        // console.log(this) // result: node
        this.a = 3
    }
    nestFun()

    console.log(a) // result: 2
    }

fun()
});

(function(){
    console.log('----------------------------------------------------------获取函数参数-------------------------------------------------------------------')
    let fun = (obj, str, num) => {
        console.log(arguments)
    }

    fun({a: 1, b: 2}, 'str', 333)
});

{
    console.log('--------------------------------------------------匿名函数---------------------------------------------------------------------------')
    let a = (function (a) {
        console.log(a) // result: => 3
        return 1
    })(3)
    console.log(a) // result: => 1

    let obj = null
    let fun = (function (arg) {
        console.log(arg) // result: => {}
    })(obj || {}) // 若object！==null，传入参数obj，否则传入参数{}

    console.log(fun) // result: => undefined   (fun不是一个函数，而是函数返回的值）
}