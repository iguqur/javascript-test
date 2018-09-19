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
});

(function () {
    console.log('----------------------------遍历------------------------------------------')
    let obj = {
        1: {a: 1, b: 3},
        2: [33, 44],
        3: 234
    }

    for (let it in obj) {
        console.log(it)
    }

    Object.values(obj).map(item => console.log(item))
});

(function () {
    console.log('----------------------------Object.defineProperty------------------------------------------')
    const obj = {

    };
    let val = 'cjg'
    Object.defineProperty(obj, 'name', {
        get() {
            console.log('劫持取值操作')
            return val
        },
        set(newVal) {
            console.log('劫持复制操作')
            val = newVal
        }
    })

    console.log(obj.name)
    obj.name = 'aaa'
    console.log(obj.name)
});

(function () {
    console.log('----------------------------Enumerable--------------------------------------------')
    const obj = {
        a: 1,
        b: 2,
        fun () {
            console.log('fun')
        }
    }

    for (let it in obj) {
        console.log(it) // result: => a, b, fun
    }

    console.log('-----------------------------getOwnPropertyDescriptor---------------------------------')
    console.log(Object.getOwnPropertyDescriptor(obj, 'a')) // result: => { value: 1, writable: true, enumerable: true, configurable: true }

    /*
    result:
    { value: [Function: fun],
      writable: true,
      enumerable: true,
      configurable: true }
     */
    console.log(Object.getOwnPropertyDescriptor(obj, 'fun'))

});

(function () {
    console.log('-----------------------------------vue-watch-----------------------------------------------------')
    class Observer {

        constructor(data) {

            // 如果不是对象，则返回

            if (!data || typeof data !== 'object') {

                return;

            }

            this.data = data;

            this.walk();

        }

        // 对传入的数据进行数据劫持

        walk() {

            for (let key in this.data) {

                this.defineReactive(this.data, key, this.data[key]);

            }

        }

        // 创建当前属性的一个发布实例，使用Object.defineProperty来对当前属性进行数据劫持。

        defineReactive(obj, key, val) {

            // 创建当前属性的发布者

            const dep = new Dep();

            /*

            * 递归对子属性的值进行数据劫持，比如说对以下数据

            * let data = {

            *   name: 'cjg',

            *   obj: {

            *     name: 'zht',

            *     age: 22,

            *     obj: {

            *       name: 'cjg',

            *       age: 22,

            *     }

            *   },

            * };

            * 我们先对data最外层的name和obj进行数据劫持，之后再对obj对象的子属性obj.name,obj.age, obj.obj进行数据劫持，层层递归下去，直到所有的数据都完成了数据劫持工作。

            */

            new Observer(val);

            Object.defineProperty(obj, key, {

                get() {

                    // 若当前有对该属性的依赖项，则将其加入到发布者的订阅者队列里

                    if (Dep.target) {

                        dep.addSub(Dep.target);

                    }

                    return val;

                },

                set(newVal) {

                    if (val === newVal) {

                        return;

                    }

                    val = newVal;

                    new Observer(newVal);

                    dep.notify();

                }

            })

        }

    }
// 发布者,将依赖该属性的watcher都加入subs数组，当该属性改变的时候，则调用所有依赖该属性的watcher的更新函数，触发更新。
    class Dep {

        constructor() {

            this.subs = [];

        }

        addSub(sub) {

            if (this.subs.indexOf(sub) < 0) {

                this.subs.push(sub);

            }

        }

        notify() {

            this.subs.forEach((sub) => {

                sub.update();

            })

        }

    }
    Dep.target = null;
// 观察者
    class Watcher {
        /**

         *Creates an instance of Watcher.

         * @param {*} vm

         * @param {*} keys

         * @param {*} updateCb

         * @memberof Watcher

         */

        constructor(vm, keys, updateCb) {

            this.vm = vm;

            this.keys = keys;

            this.updateCb = updateCb;

            this.value = null;

            this.get();
        }

        // 根据vm和keys获取到最新的观察值

        get() {

            Dep.target = this;

            const keys = this.keys.split('.');

            let value = this.vm;

            keys.forEach(_key => {

                value = value[_key];

            });

            this.value = value;

            Dep.target = null;

            return this.value;

        }

        update() {

            const oldValue = this.value;

            const newValue = this.get();

            if (oldValue !== newValue) {

                this.updateCb(oldValue, newValue);

            }

        }

    }
    let data = {

        name: 'cjg',

        obj: {

            name: 'zht',

        },

    };
    new Observer(data);
// 监听data对象的name属性，当data.name发现变化的时候，触发cb函数
    new Watcher(data, 'name', (oldValue, newValue) => {

        console.log(oldValue, newValue);

    })
    data.name = 'zht'
// 监听data对象的obj.name属性，当data.obj.name发现变化的时候，触发cb函数
    new Watcher(data, 'obj.name', (oldValue, newValue) => {

        console.log(oldValue, newValue);

    })
    data.obj.name = 'cwc';
    data.obj.name = 'dmh';
});

(function () {
    Person.prototype = {
        has: [1, 2, 3],
        a: 1
    }
    function Person () {
        this.name = 'lyl';
    }
    var person1 = new Person();
    var person2 = new Person();
    person1.has.push(4);
    person1.__proto__.a = 3
    console.log(person1.__proto__.a)
    console.log(person2.__proto__.a)
    console.log(person1)
    console.log(person2)
    // person1 和 person2都改变了，因为person1的修改影响到了原型，进而影响到了另一个实例对象
    console.log(person1.has); //[1, 2, 3, 4]
    console.log(person2.has); // [1, 2, 3, 4]
})()