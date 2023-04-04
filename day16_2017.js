getFinalOrder = (input, starter) => {
    let programs = starter;
    input.forEach(item => {
        let params = item.slice(1);
        if (item[0] == 's') {
            params = -params;
            temp = programs.splice(params);
            programs = temp.concat(programs);
        } else if (item[0] == 'x') {
            params = params.split('/').map(i => +i);
            [programs[params[0]], programs[params[1]]] = [programs[params[1]], programs[params[0]]];
        } else {
            params = params.split('/');
            let firstIndex = programs.indexOf(params[0]);
            let secondIndex = programs.indexOf(params[1]);
            programs[firstIndex] = params[1];
            programs[secondIndex] = params[0];
        }
    });
    return programs;
}

function secondStar(inputs){
    let prog = "abcdefghijklmnop".split('');
    let startPoint = prog.join('');

    let iterations = 1000000000;
    for (let i = 0; i < iterations; i++){
        inputs.forEach((move) => parseMove(move, prog));
        if (prog.join('') === startPoint) i += (Math.floor(iterations/(i+1))-1) * (i+1);
    }
    console.log("Second Star: ", prog.join(''));
}

function parseMove(move, prog){
    if (move[0] === 's'){ //spin
        let num = parseInt(move.substr(1));
        prog.unshift(...prog.splice(-num, num));
    } else if (move[0] === 'x') { //position swap
        let pos = move.substr(1).split('/');
        [prog[pos[0]], prog[pos[1]]] = [prog[pos[1]], prog[pos[0]]];
    } else { // program swap
        let pos = move.substr(1).split('/');
        let idx1 = prog.indexOf(pos[0]);
        let idx2 = prog.indexOf(pos[1]);
        [prog[idx1], prog[idx2]] = [pos[1], pos[0]];
    }
}