let array = []
console.log(typeof array)

array.push(1)
array.push(2)
console.log(array)

console.log('---------------------------------数组浅拷贝------------------------------------------')
let arr = [1,2,3,4,5]
let arr2 = copyArr(arr)
function copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i])
    }
    return res
}

arr[0] = 100
console.log(arr)
console.log(arr2)

{
    console.log('---------------------------------splice------------------------------------------')
    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let val of array) {
        array.splice(0, 1)
        console.log(val)
    }
}