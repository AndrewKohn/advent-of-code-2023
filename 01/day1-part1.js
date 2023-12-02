// Day 1 - part 1
//
// Combine first digit and last digit to form a single two-digit number, submit the sum of all calibrations.
//  eg:
//    1abc2 = 12
//    pqr3stu8vwx = 38
//    a1b2c3d4e5f = 15
//    treb7uchet = 77
const ammendedCalibrations = require('./day1-calibrations');

function getCalibrations(calibrations) {
  const arr = calibrations.split('\n');

  const getCalibration = string => {
    let leftCount = 0;
    let rightCount = string.length - 1;
    let left = string[leftCount];
    let right = string[rightCount];
    const regex = /\d+/;

    while (!left.match(regex)) {
      if (regex.test(left) === false) {
        leftCount++;
      }
      left = string[leftCount];
    }

    while (!right.match(regex)) {
      if (regex.test(right) === false) {
        rightCount--;
      }
      right = string[rightCount];
    }

    // Combines string then converts to integer
    return Number(left + right);
  };

  return arr.reduce((acc, curr) => acc + getCalibration(curr), 0);
}

console.log(getCalibrations(ammendedCalibrations));
