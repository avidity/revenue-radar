# revenue-radar
2025 Avidity DE internship project

# How to run project

Start a web server, for example:

```
$ python -m http.server
```

Or if you don't have Python installed you can download a standalone executable, for example `ran`: https://github.com/m3ng9i/ran/releases/

## Configuration

The `addData` function accepts a configuration object with the following properties:

- `colors`: An object containing color configurations for the chart.
  - `backgroundColor1`: Background color for the first dataset.
  - `borderColor1`: Border color for the first dataset.
  - `backgroundColor2`: Background color for the second dataset.
  - `borderColor2`: Border color for the second dataset.
  - `urlDatasets`: An array of paths to JSON files containing the data for the chart. Each dataset array index refers to the selected option index of the `<select>` tag. Chart will adapt automatically to the quantity of dataset elements in the selected path.
  - `inlineDatasets`: works in the same way as `urlDatasets` but with declaring json datasets inside of it instead of getching a directory.
  > :warning: **You can only pass one type of datasets**: You can only declare `urlDatasets` or `inlineDatasets` variable.
  - `urlPiesets` and `inlinePiesets`:Work in exact same way as `urlDatasets` and `inlineDatasets` for the pie chart.
  - `canvasRef`: A selector for the canvas element where the chart will be rendered.
  - `dropdownRef`: A selector for the dropdown element used to select the dataset.


## Consuming Code Example

Include the following script in your HTML file to use the `addData` function:

```html
<script src="script.js"></script>
<script>
  function updateChart() {
    runChart({
      colors: {
        backgroundColor1: '#FF0000',
        borderColor1: 'rgb(15, 03, 123)',
        backgroundColor2: '#00FF00',
        borderColor2: 'green',
      },
      /*inlineDatasets: [
          {
              type: "bar",
              data: {
                  labels: ["January 2025", "February 2025", "March 2025", "April 2025", "May 2025", "June 2025"],
                  datasetg: [
                      { data: [16800, 17200, 18000, 17500, 17000, 16500] }
                  ],
                  datasetw: [
                      { data: [16000, 16500, 17000, 17500, 18000, 18500] }
                  ]
              }
          },
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
      ]*/
      urlDatasets: ["../sample-data/last-month.json", "../sample-data/last-30-days.json", "../sample-data/last-90-days.json", "../sample-data/last-6-months.json", "../sample-data/last-year.json"],
      inlinePiesets: [
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

      //urlPiesets: ["../sample-data/last-30-days-sales.json", "../sample-data/last-90-days-sales.json", "../sample-data/last-6-month-sales.json", "../sample-data/last-year-sales.json"],
      canvasRef: '#myChart',
      dropdownRef: '#time-select',
    });
  };

  window.onload = function() {
    updateChart();
  };
</script>
```