class MyClass {
    constructor() {
        this.name = 'my class'
        console.log(this)
    }
}

function fun() {
    console.log(this)
    new MyClass()
}

let object = {
    a: 1,
    fun: fun
}
object.fun()