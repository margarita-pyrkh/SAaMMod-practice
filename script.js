const mathExpectation = (sequenceSum, sequenceLength) => sequenceSum / sequenceLength;

const variance = (sequenceOfValues, mathExp) => {
  let sum = 0;
  sequenceOfValues.forEach(element => {
    sum += Math.pow(element - mathExp, 2);
  });
  return sum / sequenceOfValues.length;
};

const meanSquareDevation = (variance) => Math.sqrt(variance);

const lemereGenerator = (a, R0, m, n) => {
  let array = Array(n);
  array[0] = R0;
  for (let index = 1; index < array.length; index++) {
    array[index] = (a + array[index -  1]) % m; 
  }
  return array;
};

const normalizedArry = (array, m) => array.map(element => element / m);
