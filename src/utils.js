export function shiftBy(arr, step) {
    const copy = [...arr]

    if (step > 0) {
        for(let i = 0; i < step; i++) {
            const last = copy.pop()
            copy.unshift(last)
        }
    } else if (step < 0) {
        for(let i = 0; i < Math.abs(step); i++) {
            const first = copy.shift()
            copy.push(first)
        }
    }

    return copy
}

//agreement of a number and a Russian noun
// usage: declensionOfNumber(2, ['штука', 'штуки', 'штук']])
export function declensionOfNumber(n, titles) {  
    return titles[(n%10 == 1 && n%100 !== 11 ? 0 : n%10 >= 2 && n%10 <= 4 && (n%100 <10 || n%100 >= 20) ? 1 : 2)];
}

export function encodeObject(obj) {
    const str = JSON.stringify(obj)
    const base64 = btoa(encodeURIComponent(str))

    return base64
}

export function getOrderTotal(items) {
    return items.reduce((sum, cur) => {
        sum += cur.price * cur.quantity;
        return sum;
    }, 0)
}
