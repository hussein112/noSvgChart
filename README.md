# noSvgChart
Basic **one dimensional** line chart using **pure** HTML, CSS, JS, without using svg.

<img src="https://hussein112.github.io/Images/noSvgChart/demo.png">


# What is a Line Chart? 
line chart, is a type of charts used to visualize the value of something over time. For example, a company may plot the sales of a specific product over 1 year, month, day or week.

The chart have two axes:
1. x-axis, called independent axis because its values do not depend on anything. e.g., time is always placed on the x-axis since it continues to move forward regardless of anything else.
2. y-axis, called the dependent axis because its values depend on those of the x-axis


The result is each x value only has one y value e.g., each month have a *discrete* number of sales. i.e., it cannot be:
- At 'July', we sold '20' hoodies, and at 'july', we sold '45' hoodies!

Thus, You read the line chart:
- At 'x' time we sold 'y' products.


# About Linechart Plugin

## How it Works
    1. Partition the n y-axis values, into n intervals.
    2. create the n-intervals.
    3. insert the necessary HTML elements to hold the chart.
        a. plot the points.
    4. connect the points: for each two points, draw a "virtual" right triangle, that is:
        - current x (Xn) and next x (Xn+1) will be the adjacent side.
        - current y (Yn) and next y (Yn+1) will be the opposite side.
        - the hypotenuse (which will be calculated by pythagoras theorem) will be the line that connect the two points with X degree rotations.

# IMPORTANT (PLEASE READ)

this chart functionallity is limited becuase no svg is used. Accordingly, the following rules should be followed carefully:

    - X valus should be equal in distance(step). e.g., 10, 20, 30
    - X axis values should be no-numeric
    - Numeric Values should be positive
    - X & Y values should be sorted
    - X & Y length should be equal

## Implementation
> Download the or through <a href="#cdn">CDN</a>
1. Insert a `<div>` into your page with class "charts-container".
2. Configure the chart

    ```
        const config = {
            title: "Line Chart Title",

            // x-axis
            x: {
                values: ["dec", "nov", "oct", "feb", "jan"],
                label: "x axis tilte e.g., Month"
            },

            // y-axis
            y: {
                values: [10, 20, 30, 40, 50],
                label: "y axis tilte e.g., Payed Vouchers"
            },

            // (x, y)
            points: [
                ["dec", 5],
                ["nov", 10],
                ["oct", 20],
                ["feb", 50],
                ["jan", 2]
            ],

            options: {
                animated: true,
                colors: {
                    graph: "#0dffe4",
                    points: "#004637",
                    lines: "#814A84",
                    axes: "#9C27B0",
                    text: "#1396F3",
                }
            }
        }

    ```

3. Instantiate class and give the above object as parameter.
    - `new lineChart(config);`
4. Done !

### <h3 id="cdn">CDN</h3>
- JS: <br> 
> ``<script src="https://cdn.jsdelivr.net/gh/hussein112/noSvgChart@1.0.0/main.js">``
- JS Minified: <br> 
> `` <script src="https://cdn.jsdelivr.net/gh/hussein112/noSvgChart@1.0.0/main.min.js"> ``
- CSS: <br> 
> `` <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/hussein112/noSvgChart@1.0.0/style.css"> ``
- JS Minified: <br> 
> `` <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/hussein112/noSvgChart@1.0.0/style.min.css"> ``