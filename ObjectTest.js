let obj = {}

obj['name'] = '血溅五步'
obj.id = 1
console.log(obj)

console.log('---------------------------------对象浅拷贝------------------------------------------')
let obj2 = new Object(obj)
obj2.name = 'sss'
console.log(obj)
console.log(obj2)

{
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
}