

const DATA_COUNT = 23;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = Utils.months({count: 23});
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: 'rgba(128, 128, 128, 0.6)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 4,
      stack: 'Stack 0',
    },
    {
      label: 'Dataset 2',
      data: Utils.whites(NUMBER_CFG),
      backgroundColor: 'rgba(192, 192, 192, 0.6)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 4,
      stack: 'Stack 0',
    },
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked'
      },
    },
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  }
};

const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
      });
      chart.update();
    }
  },
];

window.onload = function() {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
      type: 'bar', // or 'line', 'pie', etc.
      data: data,
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              title: {
                  display: true,
                  text: 'Chart.js Bar Chart'
              }
          }
      }
  });
};