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

const normalizedArry = (array, m) => array.map(element => element / m);

const context = document.getElementById("myChart").getContext('2d');
const myChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
          label: 'Criteria',
          data: [12, 19, 17, 16, 13, 18],
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