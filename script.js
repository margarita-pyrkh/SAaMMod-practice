const mathExpectation = (sequenceSum, sequenceLength) => sequenceSum / sequenceLength;

const variance = (sequenceOfValues, mathExp) => {
  let sum = 0;
  sequenceOfValues.forEach(element => {
    sum += Math.pow(element - mathExp, 2);
  });
  return sum / sequenceOfValues.length;
};

const meanSquareDeviation = (variance) => Math.sqrt(variance);

const lemereGenerator = (a, R0, m, n) => {
  let array = Array(n);
  array[0] = R0;
  for (let index = 1; index < array.length; index++) {
    array[index] = (a + array[index -  1]) % m; 
  }
  return array;
};

const getNormalizedArray = (array, m) => array.map(element => element / m);

const context = document.getElementById("myChart").getContext('2d');
const myChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      datasets: [{
          label: 'Criteria',
          data: [12, 19, 17, 16, 13, 18, 12, 19, 17, 16, 13, 18, 12, 19, 17, 16, 13, 18, 12, 19, 17],
          backgroundColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0,
      }]
    },
    options: {
      scales: {
          xAxes: [{
              categoryPercentage: 1.0,
              barPercentage: 1.0
          }]
      },
      title: {
        display: true,
        text: 'Гистограмма распределения', // in english later
        fontSize: 20
      },
      legend: {
        display: false
      }
    }
});

const updateMyChart = () => {
  myChart.update();
};

const getPeriodLength = (array) => {
  const DELTA = 0.00001;
  const lastValueOfArray = array[array.length - 1];
  let positions = [];
  let isFirst = false;
  array.forEach((element, index) => {
    if (Math.abs(array[index] - lastValueOfArray) < DELTA) {
      if (isFirst) {
        positions[1] = index;
      } else {
        isFirst = true;
        positions[0] = index;
      }
    }
  });
  const periodLength = positions[1] - positions[0];
  return periodLength;
};

const getAperiodicLength = (array, periodLength) => {
  let aperiodicPrefix = 0;
  for (let index = 0; index + periodLength < array.length; index++) {
    if (Math.abs(array[index] - array[index + periodLength]) < DELTA) {
      aperiodicPrefix = index;
      break;
    }
  };
  return periodLength + aperiodicPrefix;
};

const getNumber = (stringValue) => Number.parseInt(stringValue);

const getValuesFromInputs = () => {
  const r0Value = getNumber(document.getElementById('r_value').value);
  const aValue = getNumber(document.getElementById('a_value').value);
  const mValue = getNumber(document.getElementById('m_value').value);
  const nValue = getNumber(document.getElementById('n_value').value);
  return [r0Value, aValue, mValue, nValue];
}

const getRealAndDesiredValues = (array, n) => {
  let count = 0;
  for (let index = 1; index < n / 2; index++) {
    if ((Math.pow(array[2 * index - 1], 2) + Math.pow(list[index * 2], 2)) < 1) {
      count++;
    }
  };
  const realValue = count * 2 / n;
  const desiredValue = Math.PI / 4;
  return [realValue, desiredValue];
};

const main = () => {
  let [r0Value, aValue, mValue, nValue] = getValuesFromInputs();
  const lemereArray = lemereGenerator(aValue, r0Value, mValue, nValue);
  const normalizedArray = getNormalizedArray(lemereArray, mValue);
  const mathExp = mathExpectation(
    normalizedArray.reduce((prev, curr) => prev + curr), 
    normalizedArray.length
  );
  const dispertion = variance(normalizedArray, mathExp);
  const sqrDeviation = meanSquareDeviation(dispertion);

  const periodLength = getPeriodLength(normalizedArray);
  const aperiodicLength = getAperiodicLength(normalizedArray, periodLength);

  const [realValue, desiredValue] = getRealAndDesiredValues(normalizedArray, nValue);

};



