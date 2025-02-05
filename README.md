# revenue-radar
2025 Avidity DE internship project

# How to run project

Start a web server, for example:

```
$ python -m http.server
```

Or if you don't have Python installed you can download a standalone executable, for example `ran`: https://github.com/m3ng9i/ran/releases/

## Configuration

The `runChart` function accepts a configuration object with the following properties:


  - `dataset`: An array of 5 values which can be both urlsto certain lson files or just json datapassed directly. Each dataset array index refers to the selected option index of the `<select>` tag. Chart will adapt automatically to the quantity of dataset elements in the selected path.
  - `chartType`: Can be 'bar', 'line', or 'pie'.
  - `dropdownRef`: A selector for the dropdown element used to select the dataset.
  - `canvasRef`: A selector for the canvas element used as a space to create the chart.
  - `colors`: An object containing color configurations for the chart. > :warning:  Colors options can't be used for the 'pie' `chartType`!!!
  - `backgroundColor1`: Background color for the first dataset.
  - `borderColor1`: Border color for the first dataset.
  - `backgroundColor2`: Background color for the second dataset.
  - `borderColor2`: Border color for the second dataset.


## Consuming Code Example

Use following script in your HTML file as an example of using the `runChart` function:

```html
<script src="script.js"></script>
<script>
  function updateChart() {
    runChart( {
    chartType: "bar",
      colors: {
        backgroundColor1: '#FF0000',
        borderColor1: 'rgb(15, 03, 123)',
        backgroundColor2: '#00FF00',
        borderColor2: 'green',
      },
      canvasRef: '#myBarChart',
      dropdownRef: "#time-select",
      dataset:  [
          "../sample-data/last-month.json",
          {
              type: "bar",
              data: {
                  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6"],
                  datasetg: [
                      { data: [16000, 16200, 15800, 16400, 16600, 16800] }
                  ],
                  datasetw: [
                      { data: [15500, 15700, 15900, 16100, 16300, 16500] }
                  ]
              }
          },
          {
              type: "bar",
              data: {
                  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
                  datasetg: [
                      { data: [15500, 15700, 15900, 16100, 16300, 16500] }
                  ],
                  datasetw: [
                      { data: [15000, 15200, 15400, 15600, 15800, 16000] }
                  ]
              }
          },
          {
              type: "bar",
              data: {
                  labels: ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6"],
                  datasetg: [
                      { data: [15000, 1200, 15400, 15600, 15800, 16000] }
                  ],
                  datasetw: [
                      { data: [14500, 14700, 14900, 15100, 15300, 15500] }
                  ]
              }
          },
          {
              type: "bar",
              data: {
                  labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
                  datasetg: [
                      { data: [14000, 14500, 15000, 15500] }
                  ],
                  datasetw: [
                      { data: [13500, 14000, 14500, 15000] }
                  ]
              }
          }
      ]
    });
    runChart( {
    chartType: "line",
      colors: {
        backgroundColor1: '#FF0000',
        borderColor1: 'rgb(15, 03, 123)',
        backgroundColor2: '#00FF00',
        borderColor2: 'green',
      },
      canvasRef: '#myLineChart',
      dropdownRef: "#time-select",
      dataset:  ["../sample-data/last-month.json", "../sample-data/last-30-days.json", "../sample-data/last-90-days.json", "../sample-data/last-6-months.json", "../sample-data/last-year.json"]
    });
    runChart( {
    chartType: "PIE",
      canvasRef: '#myPieChart',
      dropdownRef: "#time-select",
      dataset:  ["../sample-data/last-30-days-sales.json", "../sample-data/last-30-days-sales.json", "../sample-data/last-90-days-sales.json", "../sample-data/last-6-month-sales.json", "../sample-data/last-year-sales.json"]
    });
    runChart( {
    chartType: "Pie",
      canvasRef: '#myPieChart2',
      dropdownRef: "#time-select",
      dataset:  [
        {
            data: {
                period: "last_30_days",
                products: ["Laptop", "Smartphone", "Headphones", "Smartwatch", "Tablet"],
                sells: [35, 60, 85, 45, 30]
            }
        },
        {
            data: {
                period: "last_30_days",
                products: ["Laptop", "Smartphone", "Headphones", "Smartwatch", "Tablet"],
                sells: [35, 60, 85, 45, 30]
            }
        },
        {
            data:{
                period: "last_90_days",
                products: ["Laptop", "Smartphone", "Headphones", "Smartwatch", "Tablet"],
                sells: [120, 180, 240, 150, 110]
            }
        },
        {
            data: {
                period: "last_6_months",
                products: ["Laptop", "Smartphone", "Headphones", "Smartwatch", "Tablet"],
                sells: [300, 45, 600, 375, 280]
            }
        },
        {
            data:{
                period: "last_year",
                products: ["Laptop", "Smartphone", "Headphones", "Smartwatch", "Tablet"],
                sells: [6000, 900, 1200, 750, 560]
            }
        }
        ],
    });
  
};

  window.onload = function() {
    updateChart();
  };
</script>
```