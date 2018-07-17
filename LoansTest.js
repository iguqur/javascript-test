let repayment = 4311.63
let ratio = 0.9957346812224394 // 0.95

let monthGiveBack = (month) => {
    let money = repayment
    for (let i=0; i<month; ++i) {
        money *= ratio
    }

    return money
}

let sum = 0
let index = 0
for (let year=0; year<30; ++year) {
    for (let month=0; month<12; ++month) {
        ++index
        sum += monthGiveBack(index)
    }
}

console.log(sum)
console.log(360)