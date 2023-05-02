f = (i) => {
    const input = i || 325489;
    let arr = [[0]];
    let maxCol = 0;
    let maxRow = 0;
    let col = 0;
    let row = 0;
    let num = 1;
    let dir = 'u';
    let nextDir = { r: 'd', d: 'l', l: 'u', u: 'r' }
    let count = 1;
    let current = 0;

    while (count < input) {
        switch (dir) {
            case 'r':
                if (++col > maxCol) {
                    maxRow = -maxRow + 1;
                    col--;
                    dir = nextDir[dir];
                } else {
                    arr[row][col] = Math.abs(row) + Math.abs(col);
                    current = arr[row][col];
                    count++;
                }
                break;
            case 'd':
                if (++row > maxRow) {
                    maxCol = -maxCol;
                    row--;
                    dir = nextDir[dir]
                } else {
                    arr[row] = arr[row] ? arr[row] : []
                    arr[row][col] = Math.abs(row) + Math.abs(col);
                    current = arr[row][col];
                    count++;
                }
                break;
            case 'l':
                if (--col < maxCol) {
                    maxRow = -maxRow;
                    col++;
                    dir = nextDir[dir]
                } else {
                    arr[row][col] = Math.abs(row) + Math.abs(col);
                    current = arr[row][col];
                    count++;
                }
                break;
            case 'u':
                if (--row < maxRow) {
                    maxCol = -maxCol + 1;
                    row++;
                    dir = nextDir[dir]
                } else {
                    arr[row] = arr[row] ? arr[row] : []
                    arr[row][col] = Math.abs(row) + Math.abs(col);
                    current = arr[row][col];
                    count++;
                }
                break;
        }
    }
    console.log(current)
}


s = (i) => {
    const input = i || 325489;
    let arr = [[1]];
    let maxCol = 0;
    let maxRow = 0;
    let col = 0;
    let row = 0;
    let num = 1;
    let dir = 'u';
    let nextDir = { r: 'd', d: 'l', l: 'u', u: 'r' }
    let current = 1;

    while (current < input) {
        switch (dir) {
            case 'r':
                if (++col > maxCol) {
                    maxRow = -maxRow + 1;
                    col--;
                    dir = nextDir[dir];
                } else {
                    current = sumAdj(arr, row, col);
                    arr[row][col] = current;
                }
                break;
            case 'd':
                if (++row > maxRow) {
                    maxCol = -maxCol;
                    row--;
                    dir = nextDir[dir]
                } else {
                    arr[row] = arr[row] ? arr[row] : []
                    current = sumAdj(arr, row, col);
                    arr[row][col] = current;
                }
                break;
            case 'l':
                if (--col < maxCol) {
                    maxRow = -maxRow;
                    col++;
                    dir = nextDir[dir]
                } else {
                    current = sumAdj(arr, row, col);
                    arr[row][col] = current;
                }
                break;
            case 'u':
                if (--row < maxRow) {
                    maxCol = -maxCol + 1;
                    row++;
                    dir = nextDir[dir]
                } else {
                    arr[row] = arr[row] ? arr[row] : []
                    current = sumAdj(arr, row, col);
                    arr[row][col] = current;
                }
                break;
        }
    }
    console.log(current)
}

sumAdj = (arr, row, col) => {
    arr[row+1] = arr[row+1] ? arr[row+1] : [];
    arr[row-1] = arr[row-1] ? arr[row-1] : [];
    let sum = 0;
    for (let i = row -1; i<row+2; i++) {
        for (let j = col-1; j<col+2; j++) {
            sum+=arr[i][j] || 0
        }
    }
    return sum;
}