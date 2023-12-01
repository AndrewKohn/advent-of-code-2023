// Day 1 - part 2
//
// Combine first digit and last digit to form a single two-digit number, submit the sum of all calibrations.  Numbers as strings now count as well.
//  eg:
//    two1nine = 29
//    eightwothree = 83
//    abcone2threexyz = 13
//    zoneight234 = 14
const ammendedCalibrations = require('./day1-calibrations');

const values = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

function getCalibrations(calibrations) {
  const arr = calibrations.split('\n');

  const getCalibration = string => {
    const regex = new RegExp(`(${Object.keys(values).join('|')}|\\d+)`, 'g'); // checks for keys in the values object as well as digits
    const matches = string.match(regex);
    const matchesMap = matches.flatMap(num => {
      if (/\d+/.test(num) === true) return num.split('');

      return values[num];
    });

    // matchesMap will contain numbers on the order they appear, so we return the first and last elements in the map
    return Number(matchesMap[0] + matchesMap[matchesMap.length - 1]);
  };

  return arr.reduce((acc, curr) => acc + getCalibration(curr), 0);
}

console.log(getCalibrations(ammendedCalibrations));
