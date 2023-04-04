firstStar = (input) => {
    let buffer = [0];
    let current = 0;
    for (let i = 1; i<2018; i++) {
        current = (current + input) % i;
        buffer.splice(++current, 0 ,i)
    }
    let index = buffer.findIndex(i => i===2017);
    console.log(buffer[index+1]);
}


secondStar = (input) => {
    let buffer = [0];
    let current = 0;
    for (let i = 1; i<50000000; i++) {
        current = (current + input) % i;
        if(!current++) buffer[1] = i;
    }
    console.log(buffer[1]);
}