
function getPath(config){
  const selectedOption = document.querySelector(config.dropdownRef);
  const selectedIndex = selectedOption.selectedIndex;

  let databaseDirect;
  switch (selectedIndex) {
    case 1:
      databaseDirect = config.datasetPaths[1];
      break;
    case 2:
      databaseDirect = config.datasetPaths[2];
      break;
    case 3:
      databaseDirect = config.datasetPaths[3];
      break;
    case 4:
      databaseDirect = config.datasetPaths[4];
      break;
    default:
      databaseDirect = config.datasetPaths[0];
      break;
  }
  return databaseDirect;
}

function setupChart(newdata, config, chartType, canvasID){
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
          legend: chartType === 'pie' ? {
            display: true,
            position: 'top',
            align: 'start',
            labels: {
              // Customize legend labels if needed
              filter: (legendItem, chartData) => {
                  // Make sure only the two datasets (grey and white) show in the legend
                  return ['Grey Data', 'White Data'].includes(legendItem.text);
              }
          },
          }: {
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
        responsive: true,
        scales: chartType === 'pie' ? {} : {
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
        
      },
    });

    // Attach the new chart instance to the canvas element
    canvas.dataset.chartInstance = chart.id;
}

function processData(data, config, chartType) {
  const labels = data.data.labels; // Array of labels
    const dataset1 = data.data.datasetg; // Array of datasets
    const dataset2 = data.data.datasetw; // Array of datasets

    let theCount;

    if(dataset1[0].data.length>=dataset2[0].data.length){
      theCount=dataset1[0].data.length;
    }
    else{
      theCount=dataset2[0].data.length
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
    
    if (chartType === 'pie') {
      return {
        labels: JSONSDATASET.days({ count: theCount }), // Keep the labels
        datasets: [{
            label: 'Comparison',
            data: [...JSONSDATASET.greyData(), ...JSONSDATASET.whiteData()], // Concatenate greyData and whiteData
            backgroundColor: [
                ...JSONSDATASET.greyData().map(() => config.colors.backgroundColor1), // Color for greyData
                ...JSONSDATASET.whiteData().map(() => config.colors.backgroundColor2) // Color for whiteData
            ], // Assign alternating colors to the concatenated data
            borderColor: [
              ...JSONSDATASET.greyData().map(() => config.colors.borderColor1), // Color for greyData
              ...JSONSDATASET.whiteData().map(() => config.colors.borderColor2) // Color for whiteData
          ],
            borderWidth: 2,
            hoverOffset: 4
        }],
        options: {
          plugins: {
              legend: {
                  labels: {
                      // Customize legend labels if needed
                      filter: (legendItem, chartData) => {
                          // Make sure only the two datasets (grey and white) show in the legend
                          return ['Grey Data', 'White Data'].includes(legendItem.text);
                      }
                  }
              }
          }
      }
    };
    
  }
  
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
  

// Function to update chart with new data based on the selected option
function runChart(config) {  // eslint-disable-line no-unused-vars

  const databaseDirect = getPath(config);

 fetch(databaseDirect)
  .then(response => response.json())
  .then(data => {
    const canvasRefs = config.canvasRef; // Array of canvas IDs
    setupChart(processData(data, config, 'bar'), config, 'bar', canvasRefs[0]);
    setupChart(processData(data, config, 'line'), config, 'line', canvasRefs[1]);
    setupChart(processData(data, config, 'pie'), config, 'pie', canvasRefs[2]);
})
  .catch(error => console.error('Error loading JSON:', error));

}
