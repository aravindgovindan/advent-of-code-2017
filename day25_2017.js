firstStar = () => {
    const steps = 12208951;
    let input = new Array(steps * 2 + 1).fill(0)
    let currentMarker = steps;
    let currentState = 'a';

    const blueprint = {
        'a': [
            { write: 1, change: 1, next: 'b' },
            { write: 0, change: -1, next: 'e' },
        ],
        'b': [
            { write: 1, change: -1, next: 'c' },
            { write: 0, change: 1, next: 'a' },
        ],
        'c': [
            { write: 1, change: -1, next: 'd' },
            { write: 0, change: 1, next: 'c' },
        ],
        'd': [
            { write: 1, change: -1, next: 'e' },
            { write: 0, change: -1, next: 'f' },
        ],
        'e': [
            { write: 1, change: -1, next: 'a' },
            { write: 1, change: -1, next: 'c' },
        ],
        'f': [
            { write: 1, change: -1, next: 'e' },
            { write: 1, change: 1, next: 'a' },
        ],
    }

    for (let i=0; i<steps; i++) {
        let index = input[currentMarker]
        let instructions = blueprint[currentState][index]
        input[currentMarker] = instructions.write;
        currentMarker += instructions.change;
        currentState = instructions.next;
    }

    const checkSum  = input.reduce((acc, curr) => acc+curr, 0)
    console.log(checkSum)
}