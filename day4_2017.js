f = () => {
    let input = document.querySelector('pre').innerText.split('\n');
    input.pop();
    input = input.map(item => item.split(' '));

    let count = 0;
    input.forEach(phrase => {
        let check = new Set(phrase)
        if(check.size === phrase.length) count++;
    })
    console.log(count)
}

s = () => {
    let input = document.querySelector('pre').innerText.split('\n');
    input.pop();
    input = input
        .map(item => item.split(' ').map(word => word.split('').sort().join('')))

    let count = 0;
    input.forEach(phrase => {
        let check = new Set(phrase)
        if(check.size === phrase.length) count++;
    })
    console.log(count)
}