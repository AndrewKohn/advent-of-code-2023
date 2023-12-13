const fs = require('fs');
const path = require('path');
const filePath = 'day5_almanac.txt';

function partTwo(filePath) {
  const results = [];
  const input = fs
    .readFileSync(path.resolve(__dirname, filePath), 'utf8')
    .split('\n\n');

  // seeds
  const seeds = input[0]
    .split(': ')[1]
    .split(' ')
    .map(seed => parseInt(seed))
    .reduce((a, x, i) => {
      if (i % 2 == 0) a.push([]);
      return a[a.length - 1].push(x), a;
    }, []);

  // category blocks
  const categories = input.slice(1).map(x =>
    x
      .split('\n')
      .slice(1)
      .map(y => y.split(' ').map(z => parseInt(z)))
  );

  function translateAlmanac(index, seed) {
    if (index == categories.length) return [seed];

    const result = [];
    for (const [destination, source, range] of categories[index]) {
      if (
        seed[0] < source &&
        seed[0] + seed[1] > source &&
        seed[0] + seed[1] <= source + range
      ) {
        const firstTuple = [seed[0], source - seed[0]];
        const lastTuple = [destination, seed[1] - source + seed[0]];
        result.push(
          ...translateAlmanac(index + 1, lastTuple),
          ...translateAlmanac(index, firstTuple)
        );
        break;
      } else if (
        seed[0] >= source &&
        seed[0] < source + range &&
        seed[0] + seed[1] > source + range
      ) {
        const firstTuple = [
          destination + seed[0] - source,
          source + range - seed[0],
        ];
        const lastTuple = [source + range, seed[0] + seed[1] - source - range];
        result.push(
          ...translateAlmanac(index + 1, firstTuple),
          ...translateAlmanac(index, lastTuple)
        );
        break;
      } else if (seed[0] >= source && seed[0] + seed[1] <= source + range) {
        result.push(
          ...translateAlmanac(index + 1, [
            destination + seed[0] - source,
            seed[1],
          ])
        );
        break;
      } else if (seed[0] < source && seed[0] + seed[1] > source + range) {
        const firstTuple = [seed[0], source - seed[0]];
        const middleTuple = [destination, range];
        const lastTuple = [source + range, seed[0] + seed[1] - source - range];
        result.push(
          ...translateAlmanac(index, lastTuple),
          ...translateAlmanac(index + 1, middleTuple),
          ...translateAlmanac(index, firstTuple)
        );
        break;
      }
    }

    if (result.length == 0) result.push(...translateAlmanac(index + 1, seed));
    return result;
  }

  for (const seed of seeds) {
    results.push(translateAlmanac(0, seed));
  }

  return Math.min(...results.flat().map(x => x[0]));
}

console.log(partTwo(filePath));
