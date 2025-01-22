// Global chart variable to reference later
let chart;


const DATA_COUNT = 30; // Initial count of months
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 1000 };

const newChart = data => {
  console.log(data); // Logs the entire data object

  // Access the individual properties
  const DATAS = data.data.labels; // Array of labels
  const DATASET = data.data.datasets; // Array of datasets


  const JSONSDATASET = {
    days: function(config) {
      const cfg = config || {};
      const count =  theCount || 30; // Default to 30
      const section = cfg.section;
      const values = [];
      for (let i = 0; i < count; ++i) {
        values.push(DATAS[i % 30].substring(0, section)); // Get the label substring based on the section
      }
      return values;
    },
  
    greyData: function(config) {
      const cfg = config || {};
      const min = cfg.min || 0;
      const max = cfg.max || 1;
      const count =  theCount || 30; // Default to 30
      const data = [];
  
      // Access the values from your DATASET and push them into the new dataset array
      for (let i = 0; i < count; ++i) {
        // Assuming DATASET[0] is the dataset you're interested in
        // If DATASET is an array of datasets, you may need to modify this
        const value = DATASET[0].data[i];  // Accessing the data array from the first dataset (adjust if needed)
        data.push(value);
      }
  
      return data;
    }
  };



  // Initial data setup for chart
  const labels = JSONSDATASET.days({ count: DATA_COUNT });
  const newdata = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: JSONSDATASET.greyData(NUMBER_CFG),
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

  const ctx = document.getElementById('myChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar', // or 'line', 'pie', etc.
    data: newdata,
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

}

function getANewChart(){
  fetch("../sample-data/last-30-days.json")
   .then(response => response.json())
   .then(newChart)
   .catch(error => console.error('Error loading JSON:', error));
 }





// Chart initialization
window.onload = function () {
  getANewChart()
};

// Function to update chart with new data based on selected option
function addData() {


  const timeSelect = document.getElementById('time-select');
  const selectedOption = timeSelect.value;

  let newLabelCount = DATA_COUNT; 

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


  // Update the datasets with new data points (matching the new label count)

  chart.data.datasets[1].data = Utils.whites({ count: newLabelCount, min: -100, max: 100 });

  // Update the chart with the new data
  chart.update();
  theCount=newLabelCount;
  getData();
}

  const newData = data => {
    console.log(data); // Logs the entire data object

    // Access the individual properties
    const DATAS = data.data.labels; // Array of labels
    const DATASET = data.data.datasets; // Array of datasets

    let newLabelCount = DATA_COUNT; // Default to 30 (you can adjust this as needed)

    const JSONSDATASET = {
      days: function(config) {
        const cfg = config || {};
        const count =  theCount || 30; // Default to 30
        const section = cfg.section;
        const values = [];
        for (let i = 0; i < count; ++i) {
          values.push(DATAS[i % 30].substring(0, section)); // Get the label substring based on the section
        }
        return values;
      },
    
      greyData: function(config) {
        const cfg = config || {};
        const min = cfg.min || 0;
        const max = cfg.max || 1;
        const count =  theCount || 30; // Default to 30
        const data = [];
    
        // Access the values from your DATASET and push them into the new dataset array
        for (let i = 0; i < count; ++i) {
          // Assuming DATASET[0] is the dataset you're interested in
          // If DATASET is an array of datasets, you may need to modify this
          const value = DATASET[0].data[i];  // Accessing the data array from the first dataset (adjust if needed)
          data.push(value);
        }
    
        return data;
      }
    };
    
    // Get the updated labels by calling newDatas.days() with the desired configuration
    const updatedLabels = JSONSDATASET.days({ count: newLabelCount, section: 5 }); // Example configuration
    
    // Get the updated data for the grey dataset
    const updatedGreyDataset = JSONSDATASET.greyData({ count: newLabelCount, min: 0, max: 10000 });
    
    // Update the chart's dataset[0] values
    chart.data.datasets[0].data = updatedGreyDataset; // Set the updated dataset values
    
    // Update the chart's labels
    chart.data.labels = updatedLabels; // Set the updated labels
    
    // Refresh the chart to apply the changes
    chart.update();
    

}

function getData(){
 fetch("../sample-data/last-30-days.json")
  .then(response => response.json())
  .then(newData)
  .catch(error => console.error('Error loading JSON:', error));
}

getData();

let theCount;