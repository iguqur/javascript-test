{
    console.log('---------------------------------new operator------------------------------------------')
    function Graph() {
        this.vertices = [];
        this.edges = [];
    }

    Graph.prototype = {
        addVertex: function(v){
            this.vertices.push(v);
        }
    };

    var g = new Graph();
// g是生成的对象,他的自身属性有'vertices'和'edges'.
// 在g被实例化时,g.[[Prototype]]指向了Graph.prototype.

    console.log(g)
}

{
    console.log('---------------------------------new operator------------------------------------------')
    var a = {a: 1};
// a ---> Object.prototype ---> null

    var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
    console.log(b.a); // 1 (继承而来)

    var c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null

    var d = Object.create(null);
// d ---> null
    console.log(d.hasOwnProperty); // undefined, 因为d没有继承Object.prototype
}

{
    console.log('------------------------------------inherit---------------------------------------')

    function A(a) {
        this.varA = a;
    }

// 以上函数 A 的定义中，既然 A.prototype.varA 总是会被 this.varA 遮蔽，
// 那么将 varA 加入到原型（prototype）中的目的是什么？
    A.prototype = {
        varA: 1,
        /*
        既然它没有任何作用，干嘛不将 varA 从原型（prototype）去掉 ?
        也许作为一种在隐藏类中优化分配空间的考虑 ?
        https://developers.google.com/speed/articles/optimizing-javascript
        如果varA并不是在每个实例中都被初始化，那这样做将是有效果的。
        */
        doSomething: function () {
            // ...
        }
    }

    function B(a, b) {
        A.call(this, a);
        this.varB = b;
    }

    B.prototype = Object.create(A.prototype, {
        varB: {
            value: null,
            enumerable: true,
            configurable: true,
            writable: true
        },
        doSomething: {
            value: function () { // override
                A.prototype.doSomething.apply(this, arguments);
                // call super
                // ...
            },
            enumerable: true,
            configurable: true,
            writable: true
        }
    });
    B.prototype.constructor = B;

    var b = new B(1, 2);
    console.log(b)
    console.log(b.__proto__.__proto__.varA)

    var bb = new B(3, 4)

    b.__proto__.__proto__.varA = 2
    console.log(b.__proto__.__proto__.varA)

    console.log(bb.__proto__.__proto__.varA) // prototype内容相当于C++中的static，可以多个共享

    let a1 = new A()
    let a2 = new A()
    console.log(a1.doSomething() === a2.doSomething())
}

