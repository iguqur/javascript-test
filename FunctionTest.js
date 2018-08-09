{
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
}

{
    console.log('----------------------------------------------------------获取函数参数-------------------------------------------------------------------')
    let fun = (obj, str, num) => {
        console.log(arguments)
    }

    fun({a: 1, b: 2}, 'str', 333)
}