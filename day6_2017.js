f = () => {
    input = document.querySelector('pre').innerText.split('\t').map(i => +i);
    let dict = {[input.join(',')]: true};
    let flag = false;
    let cycles = 0;
    let len = input.length;

    while (!flag && cycles < 500000) {
        let max = Math.max(...input);
        let curr = input.indexOf(max);
        input[curr] = 0;
        for(let i=1; i<=max; i++) {
            input[(curr+i)%len]++
        }
        cycles++;
        let str = input.join(',');
        flag = dict[str] || false;
        dict[str] = true;
    }

    console.log(cycles)
}

s = () => {
    input = document.querySelector('pre').innerText.split('\t').map(i => +i);
    let dict = {[input.join(',')]: 0};
    let flag = false;
    let cycles = 0;
    let len = input.length;
    let loop = 0;

    while (!flag && cycles < 500000) {
        let max = Math.max(...input);
        let curr = input.indexOf(max);
        input[curr] = 0;
        for(let i=1; i<=max; i++) {
            input[(curr+i)%len]++
        }
        cycles++;
        let str = input.join(',');
        if(dict[str]) {
            flag = true;
            loop = cycles - dict[str];
        }else {
            dict[str] = cycles;
        }
    }

    console.log(loop)
}