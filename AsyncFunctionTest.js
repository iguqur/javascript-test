function resolveAfter2Seconds() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('reject');
        }, 2000);
    });
}

async function asyncCall(ok) {
    console.log('calling');
    var result
    try {
        result = await resolveAfter2Seconds();
    } catch (e) {
        console.log(e)
    }

    console.log(result);
    // expected output: "resolved"

    if (!ok) {
        throw new Error("failed")
    }
}

asyncCall(true).then(() => console.log('finished'), () => console.log('reject finished'));
console.log('after async call')

console.log('---------------------------------async function reject------------------------------------------')
asyncCall(false).then(() => console.log('finished'), () => console.log('reject finished'));
console.log('after async call')