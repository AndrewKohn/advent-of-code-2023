// Day 8
// Haunted Wasteland
//  Follow the map of nodes in order to get out.
//      Any node that ends with A is now a start point.
//      Repeat the process until all starting points reach any endpoints that
//      start end with Z.
//      **A = Start
//      **Z = End
//      Instructions can be repeated from the start as long as the steps reach
//      the end.

const fs = require("fs");
const filePath = "./day8_map.txt";

fs.readFile(filePath, "utf-8", (err, data) => {
    // deconstruct between steps and instructions(nodes)
    let [steps, , ...nodes] = data.split('\n');

    // L & R naming to match the LRLRLRL from text
    const nodesMap = nodes.reduce((acc, x) => {
        const destination = x.substring(0, 3);
        const L = x.substring(7, 10);
        const R = x.substring(12, 15);
        if (destination) acc = { ...acc, [destination]: { L, R } };

        return acc;
    }, {});

    let currentDestinations = Object.keys(nodesMap)
        .filter(node => node.endsWith("A"));
    const stepLengths = [];

    for (let i = 0; i < currentDestinations.length; i++) {
        let numberOfSteps = 0;
        let stepsIndex = 0;
        let currentDestination = currentDestinations[i];
        while (!currentDestination.endsWith("Z")) {
            stepsIndex = stepsIndex % steps.length;
            currentDestination =
                nodesMap[currentDestination][steps[stepsIndex]];
            numberOfSteps++;
            stepsIndex++;
        }

        stepLengths.push(numberOfSteps);
    }

    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const lcm = (a, b) => (a * b) / gcd(a, b);
    const result = stepLengths.reduce((acc, curr) => lcm(acc, curr), 1);

    console.log(result);
});
