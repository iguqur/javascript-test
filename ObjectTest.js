(function () {
    let obj = {}

    obj['name'] = '血溅五步'
    obj.id = 1
    console.log(obj)
});

(function () {
    console.log('---------------------------------对象浅拷贝------------------------------------------')
    let obj2 = new Object(obj)
    obj2.name = 'sss'
    console.log(obj)
    console.log(obj2)
});

(function () {
    console.log('---------------------------------对象深拷贝----------扩展运算符实现--------------------------------')
    let obj = {
        name: 'FungLeo',
        sex: 'man',
        old: '18'
    }
    let {...obj2} = obj
    obj.old = '22'
    console.log(obj)
    console.log(obj2)
});

(function () {
    let obj1 = new Object(null)
    let obj2 = new Object(null)
    console.log(obj1 === obj2) // => false
    console.log(obj1) // => {}
    console.log(obj2) // => {}
});

(function () {
    let obj1 = {}
    let obj2 = new Object(null)
    console.log(obj1 === obj2) // => false
    console.log(obj1) // => {}
    console.log(obj2) // => {}
});

(function () {
    console.log('----------------------------类中的成员变量并不会提前初始化------------------------------------------')
    class A {
        constructor () {
            var a = this.a
            console.log(a) // result => undefined
            this.a = 333
        }
    }

    let a = new A()
});

(function () {
    console.log('----------------------------在对象中获取成员函数------------------------------------------')
    class A {
        constructor () {
            let { commit } = this

            commit() // result => 'aaaaaaa'
            this.__proto__.commit() // result => 'aaaaaaa' // conclution: 这样就可以解释为什么每个对象会有相同的成员函数了。（应为__proto__中的内容都是共享的）
        }

        commit () {
            console.log('aaaaaaa')
        }
    }

    let a = new A()
});

(function () {
    console.log('----------------------------判断两个object是否相等------------------------------------------')
    let a = {a: 1, b: 2}
    let b = {a: 1, b: 2}

    console.log(a === b) // result: => false // Object 的=== 操作只是判断两个Object是否是同一个实例

    console.log(a.toString() === b.toString()) // result: => true // conclution: 可以将其转化成字符串再判断，但这样存在一些问问题

    Object.prototype.equals = function(object2) {
        //For the first loop, we only check for types
        for (propName in this) {
            //Check for inherited methods and properties - like .equals itself
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
            //Return false if the return value is different
            if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
                return false;
            }
            //Check instance type
            else if (typeof this[propName] != typeof object2[propName]) {
                //Different types => not equal
                return false;
            }
        }
        //Now a deeper check using other objects property names
        for(propName in object2) {
            //We must check instances anyway, there may be a property that only exists in object2
            //I wonder, if remembering the checked values from the first loop would be faster or not
            if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
                return false;
            }
            else if (typeof this[propName] != typeof object2[propName]) {
                return false;
            }
            //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
            if(!this.hasOwnProperty(propName))
                continue;
            //Now the detail check and recursion
            //This returns the script back to the array comparing
            /**REQUIRES Array.equals**/
            if (this[propName] instanceof Array && object2[propName] instanceof Array) {
                // recurse into the nested arrays
                if (!this[propName].equals(object2[propName]))
                    return false;
            }
            else if (this[propName] instanceof Object && object2[propName] instanceof Object) {
                // recurse into another objects
                //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
                if (!this[propName].equals(object2[propName]))
                    return false;
            }
            //Normal value comparison for strings and numbers
            else if(this[propName] != object2[propName]) {
                return false;
            }
        }
        //If everything passed, let's say YES
        return true;
    }

    console.log(a.equals(b)) // result: => true
})()