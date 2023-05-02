f = () => {
    let input = document.querySelector('pre').innerText.split('\n')
    input.pop();
    input = input.map(i => +i);

    let length = input.length;
    let curr = 0;
    let next = 0;
    let steps = 0;

    while(curr>=0 && curr<length) {
        next = curr + input[curr];
        input[curr] += 1;
        curr = next;
        steps++;
    }
    console.log(steps);
}

s = () => {
    let input = document.querySelector('pre').innerText.split('\n')
    input.pop();
    input = input.map(i => +i);

    let length = input.length;
    let curr = 0;
    let next = 0;
    let steps = 0;

    while(curr>=0 && curr<length) {
        next = curr + input[curr];
        input[curr] += input[curr] >= 3 ? -1 : 1;
        curr = next;
        steps++;
    }
    console.log(steps);
}