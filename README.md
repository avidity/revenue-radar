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
- `datasetPaths`: An array of paths to JSON files containing the data for the chart. Each dataset array index refers to the selected option index of the <select> tag. Chart will adapt automatically to the quantity of dataset elements in the selected path.
- `canvasRef`: A selector for the canvas element where the chart will be rendered.
- `dropdownRef`: A selector for the dropdown element used to select the dataset.


## Consuming Code Example

Include the following script in your HTML file to use the `addData` function:

```html

<script src="script.js"></script>
<script>
  function updateChart() {
    addData({
      colors: {
        backgroundColor1: '#FF0000',
        borderColor1: 'rgb(15, 03, 123)',
        backgroundColor2: '#00FF00',
        borderColor2: 'green',
      },
      datasetPaths: ["../sample-data/last-month.json", "../sample-data/last-30-days.json", "../sample-data/last-90-days.json", "../sample-data/last-6-months.json", "../sample-data/last-year.json"], 
      canvasRef: '#myChart',
      dropdownRef: '#time-select',
    });
  };

  window.onload = function() {
    updateChart();
  };
</script>

```
