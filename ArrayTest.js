let array = []
console.log(typeof array)

array.push(1)
array.push(2)
console.log(array)

console.log('---------------------------------数组深拷贝------------------------------------------')
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

{
    console.log('---------------------------------subarray()------------------------------------------')
    var buffer = new ArrayBuffer(8);
    var uint8 = new Uint8Array(buffer);
    uint8.set([1,2,3]);

    console.log(uint8); // Uint8Array [ 1, 2, 3, 0, 0, 0, 0, 0 ]

    var sub = uint8.subarray(1,4);

    console.log(sub);   // Uint8Array [ 2, 3, 0 ]
    console.log(uint8)
}

(function () {
    console.log('----------------------------数组是否相等判断------------------------------------------')
    let a = [1, 2]
    let b = [1, 2]

    console.log(a === b) // result: => false // conclution:只是判断是否为同一个实例

    // Warn if overriding existing method
    if(Array.prototype.equals)
        console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;
        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;
        for (var i = 0, l = this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
// Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});

    console.log(a.equals(b)) // result: => true
})()