f = () => {
    let input = document.querySelector('pre').innerText.split('\n')
    input.pop();
    input = input.map(i => i.split('\t').map(i => +i))
    let checksum = 0;
    input.forEach(row => {
        checksum += Math.max(...row) - Math.min(...row)
    })
    console.log(checksum)
}

s = () => {
    let input = document.querySelector('pre').innerText.split('\n')
    input.pop();
    input = input.map(i => i.split('\t').map(i => +i).sort((a,b) => b-a))
    let checksum = 0;
    input.forEach(row => {
        let quotient;
        for(let i=0; i<row.length; i++) {
            for (let j=i+1; j<row.length; j++) {
                if(row[i]%row[j] ===0) {
                    quotient = row[i]/row[j];
                    break;
                }
            }
            if(quotient) break;
        }
        checksum += quotient;
    })
    console.log(checksum);
}