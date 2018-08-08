(function () {
    function fun({x, y, z}) {
        console.log(x, y, z)
    }

    let object = {
        x: 1,
        y: 2,
        z: 3,
    }

    fun(object) // => 1 2 3
});

(function () {
    const obj = {
        a: 1,
        b: 2
    }

    const {a, c} = obj
    console.log(a, c) // => 1 undefined
});