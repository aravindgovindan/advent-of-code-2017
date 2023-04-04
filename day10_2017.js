let input = [0, 1, 2, 3, 4];
let curr = 0;
let skip = 0;
let lengths = lenString.split('').map(item => item.charCodeAt());
// 
// 
// 
// 
// 
const reverse = (arr, curr, len) => {
    let temp = [];
    for (let i = 0; i < len; i++) temp.push(arr[(curr + i) % arr.length])
    temp = temp.reverse()
    let newArr = arr.map(i => i);
    for (let i = 0; i < len; i++) {
        let index = (curr + i) % arr.length
        newArr[index] = temp[i]
    }
    return newArr;
};
const getKnot = (lenString) => {
    let input = Array.from(Array(256).keys());
    let curr = 0;
    let skip = 0;
    let stdSuffix = [17, 31, 73, 47, 23]
    let lengths = lenString.split('').map(item => item.charCodeAt()).concat(stdSuffix);
    for (let round = 0; round < 1; round++) {
        lengths.forEach((l) => {
            input = reverse(input, curr, l);
            curr = (curr + l + skip++) % input.length;
        })
    }

    let sparse = input;
    let dense = [];
    for (let i = 0; i < 16; i++) {
        let block = sparse.slice(i * 16, (i + 1) * 16)
        let output = block.reduce((acc, curr) => acc ^ curr, 0)
        dense.push(output)
    }

    let knotHash = dense.map(item => item.toString(16).padStart(2,'0')).join('')
    console.log(knotHash);
}