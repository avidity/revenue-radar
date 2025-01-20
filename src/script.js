const date = new Date();


let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let dte;


function deteSelect(){
  dte = document.getElementById('time-select').value;

  /*switch(dte){
    case('30days'):
      document.getElementById(currentValue).innerHTML=da+" "+MONTHS[month]+" - "+
  }*/
}




const DATA_COUNT = 23;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const DISPLAY = true;
const BORDER = true;
const CHART_AREA = true;
const TICKS = true;




const labels = Utils.months({count: 23});
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
      animations:{
        animation: {
          duration: 1000,
          easing: 'linear',
          delay: undefined,
          loop: false,
      }
    },
    },
    {
      label: 'Dataset 2',
      data: Utils.whites(NUMBER_CFG),
      backgroundColor: 'rgb(228, 228, 228)',
      borderColor: 'rgb(0, 0, 0)',
      borderWidth: 3,
      stack: 'Stack 0',
      animations:{
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad',
          delay: 1000,
          loop: false,
      }
    },
    },
  ]
};


window.onload = function() {
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
      type: 'bar', // or 'line', 'pie', etc.
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked'
          },
        },
        responsive: true,
        scales: {
          x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            //option 2, use callback to change labels to empty string
            callback: () => ('')
          }
        }
        },
          responsive: true,
          plugins: {
              legend: {
                display: true,
                  position: 'top',
                  align: 'start',
                  labels:{
                    usePointStyle: true,
                    boxWidth: 45,
                    padding: 25,
                  }
              }
          }
      }
  }
);
};