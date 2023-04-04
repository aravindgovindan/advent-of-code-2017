x = JSON.parse(JSON.stringify(immut))
firstStar = () => {
    input = document.querySelector('pre').innerText.split('\n');
    input.pop();
    input = input.map(row => row.padStart(75, '.').padEnd(125, '.'));
    input = input.map(i => i.split(''));
    let dir = 'u';
    let c = [12, 62];
    let total = 10000;
    let count = 0;
    let i =0;
    try {
        for (i = 0; i < total; i++) {
            if(!input[c[0]]) input[c[0]] = new Array(125).fill('.');
            currChar = input[c[0]][c[1]];
            // currChar ==='#' && console.log(currChar)
            count += currChar === '#' ? 0 : 1;
            dir = turn(dir, currChar);
            input[c[0]][c[1]] = currChar === '#' ? '.' : '#';
            c = increment(dir, c);
        }
    } catch(e) {
        console.log(i, e)
    }
    console.log(count, input);
}
firstStar(x)

turn = (dir, char) => {
    let next;
    switch (dir) {
        case 'd':
            next = char === '#' ? 'l' : 'r';
            break;
        case 'u':
            next = char === '#' ? 'r' : 'l';
            break;
        case 'r':
            next = char === '#' ? 'd' : 'u';
            break;
        case 'l':
            next = char === '#' ? 'u' : 'd';
            break;
        default:
            next = dir;
    }
    return next
}

increment = (dir, curr) => {
    let next;
    switch (dir) {
        case 'd':
            next = [curr[0] + 1, curr[1]];
            break;
        case 'u':
            next = [curr[0] - 1, curr[1]];
            break;
        case 'r':
            next = [curr[0], curr[1] + 1];
            break;
        case 'l':
            next = [curr[0], curr[1] - 1];
            break;
        default:
            next = curr;
    }
    return next;
}

secondStar = () => {
    input = document.querySelector('pre').innerText.split('\n');
    input.pop();
    input = input.map(i => i.replaceAll('#', 'i').replaceAll('.','c').split(''));
    let dir = 'u';
    let maxCols = 25;
    let minCols = 0;
    let c = [12, 12];
    let total = 10000000;
    let states = {
        c: {next: 'w', u:'l', d:'r', l:'d', r:'u'},
        w: {next: 'i', u:'u', d:'d', l:'l', r:'r'},
        i: {next: 'f', u:'r', d:'l', l:'u', r:'d'},
        f: {next: 'c', u:'d', d:'u', l:'r', r:'l'}
    }
    let count = 0;
    let currChar;
    let i =0;
    try {
        for (i = 0; i < total; i++) {
            let x = c[0];
            let y= c[1];
            if(!input[x]) input[x] = new Array(maxCols-minCols).fill('c');
            if(input[x] && !input[x][y]) {
                input[x][y] = 'c';
                maxCols += y<maxCols ? 0 : 1;
                minCols -= y>minCols ? 0 : 1;
            }
            currChar = input[x][y];
            count += currChar === 'w' ? 1 : 0;
            dir = states[currChar][dir];
            input[x][y] = states[currChar].next;
            c = increment(dir, c);
        }
    } catch(e) {
        console.log(i, currChar, c, e)
    }
    console.log(count, input);
}