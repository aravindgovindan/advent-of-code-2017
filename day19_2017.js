firstStar = (input) => {
    let output = [];
    let rows = input.length
    let cols = input[0].length
    console.log(rows,cols);
    let current;
    let next;
    let direction = 'd';
    let flag = true;
    let maxLimit = 201*201 + 5;
    let index = 0;

    let startIndex = input[0].indexOf('|');
    
    current = [0,startIndex];
    while(flag && index <= maxLimit) {
        let currentChar = input[current[0]][current[1]]
        switch(input[current[0]][current[1]]) {
            case '|':
                next = increment(direction, current);
                break;
            case '-':
                next = increment(direction, current);
                break;
            case '+':
                let i = current[0];
                let adjacents = [input[i-1], input[i], input[i+1]];
                direction = turn(direction, current[1], adjacents);
                next = increment(direction, current);
                break;
            default:           
                output.push(input[current[0]][current[1]]);
                next = increment(direction, current);
        }
        let nextChar = input[next[0]][next[1]]
        if(!nextChar || nextChar === ' ') flag = false;
        else current = next;
        index++;
    }
    console.log(output, current, index)
}

increment = (dir, curr) => {
    count++;
    let next;
    switch(dir) {
        case 'd':
            next = [curr[0]+1, curr[1]];
            break;
        case 'u':
            next = [curr[0]-1, curr[1]];
            break;
        case 'r':
            next = [curr[0], curr[1]+1];
            break;
        case 'l':
            next = [curr[0], curr[1]-1];
            break;
        default:
            next = curr;
    }
    if(count < 10) console.log(dir, curr, next);
    return next;
}

turn = (dir, index, adj) => {
    let next;
    switch(dir) {
        case 'd':
        case 'u':
            let left = adj[1][index-1];
            if(left && left !== " ") next = 'l';
            else next = 'r';
            break;
        case 'r':
        case 'l':
            let down = adj[2][index];
            if(down && down !== " ") next = 'd';
            else next = 'u';
            break;
        default:
            next = dir;
    }
    return next;
}