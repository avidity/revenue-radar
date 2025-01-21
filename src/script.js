// Global chart variable to reference later
let chart;

const DATA_COUNT = 23; // Initial count of months
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

// Initial data setup for chart
const labels = Utils.months({ count: DATA_COUNT });
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: 'rgb(172, 172, 172)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 3,
      stack: 'Stack 0',
      animations: {
        animation: {
          duration: 1000,
          easing: 'linear',
          loop: false,
        },
      },
    },
    {
      label: 'Dataset 2',
      data: Utils.whites(NUMBER_CFG),
      backgroundColor: 'rgb(228, 228, 228)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 3,
      stack: 'Stack 0',
      animations: {
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad',
          delay: 1000,
          loop: false,
        },
      },
    },
  ],
};


// Chart initialization
window.onload = function () {

    fetch("../sample-data/last-30-days.json")
    .then(response => response.json())
    .then(data => {
    console.log(data); // Logs the entire data object

    // Access the individual properties
    const days = data.data.labels; // Array of labels
    const datasets = data.data.datasets; // Array of datasets

    // Set the innerHTML of the element after the data is fetched
    document.getElementById('a').innerHTML = days; 
    })
    .catch(error => console.error('Error loading JSON:', error));


  const ctx = document.getElementById('myChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', etc.
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked',
        },
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            callback: () => '',
          },
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            usePointStyle: true,
            boxWidth: 45,
            padding: 25,
          },
        },
      },
    },
  });
};

// Function to update chart with new data based on selected option
function addData() {


  const timeSelect = document.getElementById('time-select');
  const selectedOption = timeSelect.value;

  let newLabelCount = DATA_COUNT; // Default to 23 months

  // Determine the new label count based on the selected option
  switch (selectedOption) {
    case '30days':
      newLabelCount = 30;
      break;
    case '90days':
      newLabelCount = 90;
      break;
    case '6month':
      newLabelCount = 6;
      break;
    case 'year':
      newLabelCount = 12;
      break;
    default:
      newLabelCount = DATA_COUNT; // Default to the original 23 months
      break;
  }

  // Update the labels with the new number of months

  const newMonths = Utils.months({ count: newLabelCount });
  chart.data.labels = newMonths;

  // Update the datasets with new data points (matching the new label count)
  chart.data.datasets[0].data = Utils.numbers({ count: newLabelCount, min: -100, max: 100 });
  chart.data.datasets[1].data = Utils.whites({ count: newLabelCount, min: -100, max: 100 });

  // Update the chart with the new data
  chart.update();
}

