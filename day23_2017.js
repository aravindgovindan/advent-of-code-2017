function firstStar() {

    let input = document.querySelector('pre').innerText.split('\n')
    input = input.map(command => {
        const components = command.split(' ')
        const [name, ...args] = components
        return { name, args }
    })
    input.pop()

    let registers = {}
    let index = 0;
    let count = 0;
    let breaker = 0;

    let parse = (a) => isNaN(a) ? registers[a] || 0 : parseInt(a)

    let instructions = {
        'set': (x, y) => { registers[x] = parse(y); index++ },
        'sub': (x, y) => { registers[x] -= parse(y); index++ },
        'mul': (x, y) => { registers[x] *= parse(y); index++; count++ },
        'jnz': (x, y) => { index += parse(x) == 0 ? 1 : parse(y) },
    }


    while (index >= 0 && index < input.length && breaker++ < 10000000) {
        instructions[input[index].name](...input[index].args);
    }
    console.log(count, breaker);
}

function secondStar() {

    // easier to do if you figure out what's going on

    let r = {
        b: 79,
        c: 79,
        d: 0,
        f: 0,
        g: 0,
        h: 0
    }
    r['b'] = r['b'] * 100 + 100000
    r['c'] = r['b'] + 17000
    do {
        r['f'] = 1
        r['d'] = 2
        for (let d = r['d']; d * d < r['b']; ++d) {
            if (r['b'] % d === 0) {
                r['f'] = 0
                break
            }
        }
        if (r['f'] === 0) r['h']++
        r['g'] = r['b'] - r['c']
        r['b'] += 17
    } while (r['g'] !== 0)

    return r['h']
}