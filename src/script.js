 

// Function to update chart with new data based on the selected option
function addData() {
  const timeSelect = document.getElementById('time-select');
  const selectedOption = timeSelect.value;

  let databaseDirect = "../sample-data/last--month.json";


  // Determine the new label count based on the selected option
  switch (selectedOption) {
    case '30days':
      databaseDirect = "../sample-data/last-30-days.json";
      break;
    case '90days':
      databaseDirect = "../sample-data/last-90-days.json";
      break;
    case '6month':
      databaseDirect = "../sample-data/last-6-months.json";
      break;
    case 'year':
      databaseDirect = "../sample-data/last-year.json";
      break;
    default:
      databaseDirect = "../sample-data/last-month.json";
      break;
  }


  const newData = (data) => {
    const DATAS = data.data.labels; // Array of labels
    const DATASET1 = data.data.datasetg; // Array of datasets
    const DATASET2 = data.data.datasetw; // Array of datasets

    let theCount;

    if(DATASET1[0].data.length>=DATASET2[0].data.length){
      theCount=DATASET1[0].data.length;
    }
    else{
      theCount=DATASET2[0].data.length
    }

    const JSONSDATASET = {
      days: function (config) {
        const cfg = config || {};
        const count = theCount; // Default to 30
        const section = cfg.section;
        const values = [];
        for (let i = 0; i < count; ++i) {
          values.push(DATAS[i % 30].substring(0, section)); // Get the label substring based on the section
        }
        return values;
      },

      greyData: function (config) {
        const count = theCount; // Default to 30
        const data = [];
        for (let i = 0; i < count; ++i) {
          const value = DATASET1[0].data[i]; // Accessing the data array from the first dataset
          data.push(value);
        }
        return data;
      },

      whiteData: function (config) {
        const count = theCount; // Default to 30
        const data = [];
        for (let i = 0; i < count; ++i) {
          const value = DATASET2[0].data[i]; // Accessing the data array from the first dataset
          data.push(value);
        }
        return data;
      },
    };

    // Initial data setup for chart
    const labels = JSONSDATASET.days({ count: theCount });
    const newdata = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: JSONSDATASET.greyData(),
          backgroundColor: 'rgb(172, 172, 172)',
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: 3,
          stack: 'Stack 0',
         
        },
        {
          label: 'Dataset 2',
          data: JSONSDATASET.whiteData(),
          backgroundColor: 'rgb(228, 228, 228)',
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: 3,
          stack: 'Stack 0',
        },
      ],
    };

    const canvas = document.getElementById('myChart');
    const ctx = canvas.getContext('2d');

    // Check if a chart instance is already attached to the canvas
    if (canvas.dataset.chartInstance) {
      // Destroy the existing chart instance
      const existingChart = Chart.getChart(canvas);
      if (existingChart) existingChart.destroy();
    }

    // Create a new chart instance and attach it to the canvas
    let delayed;
    const chart = new Chart(ctx, {
      type: 'bar', // or 'line', 'pie', etc.
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
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
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
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              callback: () => '',
            },
          },
        },
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

    // Attach the new chart instance to the canvas element
    canvas.dataset.chartInstance = chart.id;
  };


 fetch(databaseDirect)
  .then(response => response.json())
  .then(newData)
  .catch(error => console.error('Error loading JSON:', error));

}
