// Day 8
// Haunted Wasteland
//  Follow the map of nodes in order to get out.
//      AAA = Start
//      ZZZ = End
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

    let currentDestination = 'AAA';
    let numberOfSteps = 0;
    let stepsIndex = 0;

    // Loops until currentDestination reaches ZZZ
    while (currentDestination !== "ZZZ") {
        stepsIndex = stepsIndex % steps.length;
        currentDestination = nodesMap[currentDestination][steps[stepsIndex]];
        numberOfSteps++;
        stepsIndex++;
    }

    console.log(numberOfSteps);
});
