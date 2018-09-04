export function shiftLeft(arr) {
    const copy = [...arr]
    const first = copy.shift()
    copy.push(first)

    return copy
}

export function shiftRight(arr) {
    const copy = [...arr]
    const last = copy.pop()
    copy.unshift(last)

    return copy
}

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

export function getOrderTotal(items) {
    return items.reduce((sum, cur) => {
        sum += cur.price * cur.quantity;
        return sum;
    }, 0)
}
