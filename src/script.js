








// Chart initialization
window.onload = function () {
  addData();
};

// Function to update chart with new data based on selected option
function addData() {

    // Global chart variable to reference later
    let chart;

  const timeSelect = document.getElementById('time-select');
  const selectedOption = timeSelect.value;

  let newLabelCount=30; 

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
      newLabelCount = 30; 
      break;
  }

  let theCount=newLabelCount;


  const newData = data => {
    console.log(data); // Logs the entire data object

  // Access the individual properties
  const DATAS = data.data.labels; // Array of labels
  const DATASET1 = data.data.datasetg; // Array of datasets
  const DATASET2 = data.data.datasetw; // Array of datasets


  const DATA_COUNT = 20; // Initial count of months
  const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 1000 };


  const JSONSDATASET = {
    days: function(config) {
      const cfg = config || {};
      const count =  theCount; // Default to 30
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
      const count =  theCount; // Default to 30
      const data = [];
  
      // Access the values from your DATASET and push them into the new dataset array
      for (let i = 0; i < count; ++i) {
        // Assuming DATASET[0] is the dataset you're interested in
        // If DATASET is an array of datasets, you may need to modify this
        const value = DATASET1[0].data[i];  // Accessing the data array from the first dataset (adjust if needed)
        data.push(value);
      }
  
      return data;
    },

    whiteData: function(config) {
      const cfg = config || {};
      const min = cfg.min || 0;
      const max = cfg.max || 1;
      const count =  theCount; // Default to 30
      const data = [];
  
      // Access the values from your DATASET and push them into the new dataset array
      for (let i = 0; i < count; ++i) {
        // Assuming DATASET[0] is the dataset you're interested in
        // If DATASET is an array of datasets, you may need to modify this
        const value = DATASET2[0].data[i];  // Accessing the data array from the first dataset (adjust if needed)
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
        data: JSONSDATASET.whiteData(NUMBER_CFG),
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


 fetch("../sample-data/last-30-days.json")
  .then(response => response.json())
  .then(newData)
  .catch(error => console.error('Error loading JSON:', error));

}

  


