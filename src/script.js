
function getData(config) {
  const selectedOption = document.querySelector(config.dropdownRef);
  const selectedIndex = selectedOption.selectedIndex;

  let database;
  switch (selectedIndex) {
    case 1:
      database = config.dataset[1];
      break;
    case 2:
      database = config.dataset[2];
      break;
    case 3:
      database = config.dataset[3];
      break;
    case 4:
      database = config.dataset[4];
      break;
    default:
      database = config.dataset[0];
      break;
  }
  return database;
}

function setupChart(newdata, chartType, canvasID) {
  const canvas = document.querySelector(canvasID);
  const ctx = canvas.getContext('2d');

  // Check if a chart instance is already attached to the canvas
  if (canvas.dataset.chartInstance) {
    // Destroy the existing chart instance
    const existingChart = Chart.getChart(canvas); // eslint-disable-line no-undef
    if (existingChart) existingChart.destroy();
  }

  // Create a new chart instance and attach it to the canvas
  let delayed;
  const chart = new Chart(ctx, {  // eslint-disable-line no-undef
    type: chartType, // or 'line', 'pie', etc.
    data: newdata,
    options: {
      animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
      },
      plugins: {
        title: {
          display: false,
          text: 'Chart.js Bar Chart - Stacked',
        },
        legend: {
          display: true,
          position: 'top',
          align: 'start',
          labels: {
            usePointStyle: true,
            boxWidth: 45,
            padding: 25,
          }
        }
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          stacked: chartType === 'line' ? false: true,
          grid: {
            display: false,
          },
          ticks: {
            callback: () => '',
          },
        },
      },
    },
  });

  // Attach the new chart instance to the canvas element
  canvas.dataset.chartInstance = chart.id;
}

function processData(data, config) {
  const labels = data.data.labels; // Array of labels
  const dataset1 = data.data.datasetg; // Array of datasets
  const dataset2 = data.data.datasetw; // Array of datasets

  let theCount;

  if (dataset1[0].data.length >= dataset2[0].data.length) {
    theCount = dataset1[0].data.length;
  } else {
    theCount = dataset2[0].data.length;
  }

  const JSONSDATASET = {
    days: function (config) {
      const cfg = config || {};
      const count = theCount; // Default to 30
      const section = cfg.section;
      const values = [];
      for (let i = 0; i < count; ++i) {
        values.push(labels[i % 30].substring(0, section)); // Get the label substring based on the section
      }
      return values;
    },

    greyData: function () {
      const count = theCount; // Default to 30
      const data = [];
      for (let i = 0; i < count; ++i) {
        const value = dataset1[0].data[i]; // Accessing the data array from the first dataset
        data.push(value);
      }
      return data;
    },

    whiteData: function () {
      const count = theCount; // Default to 30
      const data = [];
      for (let i = 0; i < count; ++i) {
        const value = dataset2[0].data[i]; // Accessing the data array from the first dataset
        data.push(value);
      }
      return data;
    },
  };

  // Initial data setup for chart
  const newdata = {
    labels: JSONSDATASET.days({ count: theCount }),
    datasets: [
      {
        label: 'Dataset 1',
        data: JSONSDATASET.greyData(),
        backgroundColor: config.colors.backgroundColor1,
        borderColor: config.colors.borderColor1,
        borderWidth: 3,
        stack: 'Stack 0',
      },
      {
        label: 'Dataset 2',
        data: JSONSDATASET.whiteData(),
        backgroundColor: config.colors.backgroundColor2,
        borderColor: config.colors.borderColor2,
        borderWidth: 3,
        stack: 'Stack 0',
      },
    ],
  };

  return newdata;
}

function processPieData(pieData) {
  const labels = pieData.data.products; // Array of labels for the pie chart
  const dataset = pieData.data.sells; // Array of data for the pie chart

  const pieDataSet = {
    labels: labels,
    datasets: [{
      data: dataset,
      borderWidth: 1,
    }],
  };

  return pieDataSet;
}

function setupPieChart(pieData, canvasID) {
  const canvas = document.querySelector(canvasID);
  const ctx = canvas.getContext('2d');

  // Check if a chart instance is already attached to the canvas
  if (canvas.dataset.chartInstance) {
    // Destroy the existing chart instance
    const existingChart = Chart.getChart(canvas); // eslint-disable-line no-undef
    if (existingChart) existingChart.destroy();
  }

  // Create a new chart instance for the pie chart and attach it to the canvas
  const pieChart = new Chart(ctx, {  // eslint-disable-line no-undef
    type: 'pie', // Pie chart
    data: pieData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            boxWidth: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw + '%'; // Show percentage
            },
          },
        },
      },
    },
  });

  // Attach the new pie chart instance to the canvas element
  canvas.dataset.chartInstance = pieChart.id;
}

function runChart(config) {  // eslint-disable-line no-unused-vars

  const dataBase = getData(config);
  config.chartType = config.chartType.toLowerCase();
  
  // Handle pie chart
  if(config.chartType.toLowerCase() == "pie"){
    if(typeof dataBase != "string"){
      setupPieChart(processPieData(dataBase), config.canvasRef); // Assuming the 3rd canvas is for the pie chart
    } else{
      fetch(dataBase)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to see if it's being fetched properly
        setupPieChart(processPieData(data), config.canvasRef);
      })
      .catch(error => console.error('Error loading JSON:', error));
  
    }
  }
  else{
    if(typeof dataBase != "string") {
      setupChart(processData(dataBase, config), config.chartType, config.canvasRef);
    } else {
      fetch(dataBase)
      .then(response => response.json())
      .then(data => {
        setupChart(processData(data, config), config.chartType, config.canvasRef);
      })
      .catch(error => console.error('Error loading JSON:', error));
    }
  }
}
