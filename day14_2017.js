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
    let stdSuffix = [17, 31, 73, 47, 23];
    let lengths = lenString.split('').map(item => item.charCodeAt()).concat(stdSuffix);
    for (let round = 0; round < 64; round++) {
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

    let knotHash = dense.map(item => item.toString(16).padStart(2, '0')).join('')
    return knotHash;
}

const seqHash = (input) => {
    let outArr = [];
    for (let i = 0; i < 128; i++) {
        let hash = getKnot(input + '-' + i);
        outArr.push(hash);
    }
    let binArr = outArr.map(hash => hash
        .split('')
        .map(item => parseInt(item, 16).toString(2).padStart(4, '0'))
        .join('')
    );
    return binArr;
}

const countOnes = (arr) => {
    let ones = arr
        .map(hash => hash
            .split('')
            .filter(i => i === '1')
            .length
        ).reduce((acc, curr) => acc + curr, 0);
    return ones;
}

// const regionize = (binArray) => {
//     let starized = loop ? binArray : binArray.map(row => row.replace(/1/g, '*').split(''))
//     let rows = starized.length
//     let cols = starized[0].length
//     let count = 1
//     let flag = false;
//     if (starized[0][0] === '*') starized[0][c] = count++
//     for (let c = 1; c < cols; c++) {
//         if (starized[0][c] === '0') continue;
//         if (starized[0][c - 1] != '0') starized[0][c] = starized[0][c - 1]
//         else starized[0][c] = count++
//     }
//     for (let r = 1; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//             if (starized[r][c] === '0') continue;
//             let top = r > 0 ? starized[r - 1][c] : NaN;
//             let bot = r < rows - 1 ? starized[r + 1][c] : NaN;
//             let left = c > 0 ? starized[r][c - 1] : NaN;
//             let right = c < cols - 1 ? starized[r][c + 1] : NaN;
//             let adjacents = [left, right, top, bot].filter(i => i > 0)
//             if (adjacents.length === 0) {
//                 starized[r][c] = count++
//             } else {
//                 let minimum = Math.min(...adjacents);
//                 starized[r][c] = minimum;
//                 if (top === '*' || top > 0) {
//                     starized[r - 1][c] = minimum;
//                     flag = true;
//                 }
//                 if (bot === '*' || bot > 0) starized[r + 1][c] = minimum;
//                 if (left === '*' || left > 0) {
//                     starized[r][c - 1] = minimum;
//                     flag = true;
//                 }
//                 if (right === '*' || right > 0) starized[r][c + 1] = minimum;
//             }
//         }
//     }
//     if(flag === false || loop++ > 5000) {
//         console.log(loop);
//         console.log(count-1);
//         return;
//     } else regionize(starized);
// }
const crawl = (input, r, c, touched) => {
    touched[r][c] = 1;
    if (input[r - 1] && input[r - 1][c] > 0 && !touched[r - 1][c]) {
        crawl(input, r - 1, c, touched);
    }
    if (input[r][c + 1] > 0 && !touched[r][c + 1]) {
        crawl(input, r, c + 1, touched)
    }
    if (input[r + 1] && input[r + 1][c] > 0 && !touched[r + 1][c]) {
        crawl(input, r + 1, c, touched)
    }
    if (input[r][c - 1] > 0 && !touched[r][c - 1]) {
        crawl(input, r, c - 1, touched)
    }
    return;
}

const regionize = (inp) => {
    let binArray = inp.map(code => code.split('').map(i => +i));
    let rows = binArray.length;
    let cols = binArray[0].length;
    let touched = [];
    for(let i =0; i<rows; i++) touched.push([]);
    for(let i=0; i<rows;i++) {
        for(let j=0; j<cols; j++) {
            touched[i].push(0)
        }
    }
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let touched1 = [...touched];
            if (binArray[r][c] === 0) continue;
            else if (touched[r][c] === 1) continue;
            else {
                crawl(binArray, r, c, touched);
                count++
            }
        }
    }
    console.log(count)
}