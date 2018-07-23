function foo() {
    console.log( 'first' );
    setTimeout( ( function()
    {
        console.log('second')
    } ), 3);
}
for (var i = 0; i < 2; i++) {
    foo();
}

console.time('11')
for (let i=0; i< 1000000; ++i) {
    for (let j=0; j<10000; ++j) {

    }
}
console.timeEnd('11')