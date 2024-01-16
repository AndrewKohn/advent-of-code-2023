const fs = require('fs');
const path = require('path');
const sampleFilePath = './galaxyMapSample.txt';
const filePath = './galaxyMap.txt';

function PartOne(file) {
    const input = fs
        .readFileSync(path.resolve(__dirname, file), 'utf8')
        .split('\n');

    // Assuming data's x & y are 1:1
    let galaxyMap = updateMap(input); // add new lines to x spaces
    galaxyMap = transposeMap(galaxyMap); // swap x and y
    galaxyMap = updateMap(galaxyMap); // add new lines to y spaces
    galaxyMap = transposeMap(galaxyMap); // return to original x & y configuration

    const targets = [];
    for (let i = 0; i < galaxyMap.length; i++) {
        if (galaxyMap[i].includes('#')) {
            for (const j in galaxyMap[i]) {
                if (galaxyMap[i][j] === '#')
                    targets.push({ x: Number(j), y: Number(i) });
            }
        }
    }

    let totalAmountOfSteps = 0;
    for (let curr = 0; curr < targets.length; curr++) {
        for (let next = curr + 1; next < targets.length; next++) {
            const a = Math.abs(targets[curr].x - targets[next].x);
            const b = Math.abs(targets[curr].y - targets[next].y);
            totalAmountOfSteps += a + b;
        }
    }

    return totalAmountOfSteps;
}

const updateMap = data => {
    const arr = [];
    for (let row = 0; row < data.length; row++) {
        arr.push(data[row]);
        if (!data[row].includes('#')) arr.push(data[row]);
    }

    return arr;
};

const transposeMap = data => {
    const arr = [];
    for (let col = 0; col < data[0].length; col++) {
        let str = '';
        for (let row = 0; row < data.length; row++) {
            str += data[row][col];
        }
        arr.push(str);
    }

    return arr;
};

console.log('Sample:', PartOne(sampleFilePath));
console.log('Part one:', PartOne(filePath));
