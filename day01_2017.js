firstStar = () => {
    let input = document.querySelector('pre').innerText.split("")
    input[input.length-1]=input[0]
    let out = 0;
    input.forEach((item, index) => {
        if(+item == +input[index+1]) {
            out += +item;
        }
    })
    console.log(out)
}

secondStar = () => {
    let input = document.querySelector('pre').innerText.split("")
    input.pop()
    let offset = input.length / 2
    let out = 0;
    input.forEach((item, index) => {
        if(+item == +input[(index+offset) % input.length]) {
            out += +item;
        }
    })
    console.log(out)
}
