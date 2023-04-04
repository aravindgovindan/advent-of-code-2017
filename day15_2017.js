getMatches = (a_starter, b_starter) => {
    const A_FACTOR = 16807;
    const B_FACTOR = 48271;
    const MODULUS = 2147483647;
    const A_START = a_starter;
    const B_START = b_starter;
    const NUM_ITERATIONS = 40000000;
    const BINARY_MASK = 0xFFFF;

    let aValue = A_START;
    let bValue = B_START;
    let numMatches = 0;

    for (let i = 0; i < NUM_ITERATIONS; i++) {
        aValue = (aValue * A_FACTOR) % MODULUS;
        bValue = (bValue * B_FACTOR) % MODULUS;
        if ((aValue & BINARY_MASK) === (bValue & BINARY_MASK)) {
            numMatches++;
        }
    }

    console.log(numMatches);
}

getNewMatches = (a_starter, b_starter, iter) => {
    const A_FACTOR = 16807;
    const B_FACTOR = 48271;
    const MODULUS = 2147483647;
    const NUM_ITERATIONS = iter ? iter : 5000000;
    const BINARY_MASK = 0xFFFF;
    let aValue = a_starter;
    let bValue = b_starter;
    let a_list = [];
    let b_list = [];
    let count = 0;
    while (count < NUM_ITERATIONS) {
        aValue = (aValue * A_FACTOR) % MODULUS;
        if (aValue % 4 == 0) {
            a_list.push(aValue);
            count++;
        }
    }
    count = 0;
    while (count < NUM_ITERATIONS) {
        bValue = (bValue * B_FACTOR) % MODULUS;
        if (bValue % 8 == 0) {
            b_list.push(bValue);
            count++;
        }
    }
    let numMatches = 0;

    for (let i = 0; i < NUM_ITERATIONS; i++) {
        aValue = a_list[i];
        bValue = b_list[i];
        if ((aValue & BINARY_MASK) === (bValue & BINARY_MASK)) {
            numMatches++;
        }
    }

    console.log(numMatches);
}