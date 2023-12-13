const fs = require('fs');
const path = require('path');
const filePath = 'day5_almanac.txt';

function partOne(filePath) {
  const results = [];
  const input = fs
    .readFileSync(path.resolve(__dirname, filePath), 'utf8')
    .split('\n\n');

  // seeds
  const seeds = input[0]
    .split(': ')[1]
    .split(' ')
    .map(seed => parseInt(seed));

  // category blocks
  const categories = input.slice(1).map(x =>
    x
      .split('\n')
      .slice(1)
      .map(y => y.split(' ').map(z => parseInt(z)))
  );

  function translateAlmanac(index, seed) {
    if (index == categories.length) return seed;

    for (const [destination, source, range] of categories[index]) {
      if (source <= seed && seed < source + range)
        return translateAlmanac(index + 1, destination + seed - source);
    }

    return translateAlmanac(index + 1, seed);
  }

  for (const seed of seeds) {
    results.push(translateAlmanac(0, seed));
  }

  return Math.min(...results);
}

console.log(partOne(filePath));
