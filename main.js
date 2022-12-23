class lineChart{
    constructor(config){
        this.config = config;
        this.intervalsNb = config.y.values.length;
        this.intervalBounds = 100 / this.intervalsNb;
        this.intervalMeasure = (config.y.values[1] - config.y.values[0]);       
        this.intervals = [];
       
        this.drawChart();
    }


    drawChart(){
        // create 'n' intervals
        for(let i = 0; i < this.intervalsNb; i++){
            if(i == 0){
                this.intervals[0] = [0, config.y.values[0]];
            }else{
                this.intervals[i] = [config.y.values[i - 1] + 1, config.y.values[i]];
            }
        }

        /*************
         * Create the neccassary HTML elements.
         * 
         */

        let container = document.querySelector(".charts-container");
        let parent = document.createElement("div");
        parent.classList.add("graph");  
        parent.style.backgroundColor = config.options.colors.graph;
        container.appendChild(parent);

        // Chart Title
        let title = document.createElement("h2");
        title.classList.add("title");
        title.innerText = config.title;
        title.style.color = config.options.colors.text;
        parent.appendChild(title);
        
        // Axes Container
        let axesContainer = document.createElement("div");
        axesContainer.classList.add("axes");
        parent.appendChild(axesContainer);
        
        // x-axis
        let xAxis = document.createElement("div");
        xAxis.classList.add("x");
        xAxis.style.borderColor = config.options.colors.axes;
        axesContainer.appendChild(xAxis);

        // x-axis label
        let xTitle = document.createElement("span");
        xTitle.classList.add("title");
        xTitle.innerText = config.x.label;
        xTitle.style.color = config.options.colors.text;
        xAxis.appendChild(xTitle);

        // x-axis data Container
        let xLabels = document.createElement("div");
        xLabels.classList.add("labels");
        xAxis.appendChild(xLabels);

        /**** ./x-axis */



        // y-axis
        let yAxis = document.createElement("div");
        yAxis.classList.add("y");
        yAxis.style.borderColor = config.options.colors.axes;
        axesContainer.appendChild(yAxis);
        
        // y-axis label
        let yTitle = document.createElement("span");
        yTitle.classList.add("title");
        yTitle.innerText = config.y.label;
        yTitle.style.color = config.options.colors.text;
        yAxis.appendChild(yTitle);    
        
        

        // y-axis data Container
        let yLabels = document.createElement("div");
        yLabels.classList.add("labels");
        yAxis.appendChild(yLabels);
    
    
        /**** ./y-axis */



        // create divs for points
        let pointsContainer = document.createElement("div");
        pointsContainer.classList.add("points");
        parent.appendChild(pointsContainer);
        
        
        
        for(let i = 0; i < config.x.values.length; i++){
            // insert x-axis data
            let x = document.createElement("div");
            x.classList.add("label");
            x.style.flex = "calc(100% / " + config.x.values.length  + ")";
            xLabels.appendChild(x);

            let xSpan = document.createElement("span");
            xSpan.style.color = config.options.colors.text;
            xSpan.innerText = config.x.values[i];
            x.appendChild(xSpan);
        
        

            // insert y-axis data
            let y = document.createElement("div");
            y.classList.add("label");
            y.style.flex = "calc(100% / " + config.x.values.length + ")";
            yLabels.appendChild(y);
        
            let ySpan = document.createElement("span");
            ySpan.style.color = config.options.colors.text;
            ySpan.innerText = config.y.values[i];
            y.appendChild(ySpan);
        
        
        
        
        
        
        
        
        
            // Plot Points on the graph
            let point = document.createElement("div");
            point.classList.add("point");
            point.classList.add("point-" + i);
            pointsContainer.appendChild(point);
        
        
            let plot = document.createElement("div");
            plot.classList.add("plot");
            plot.style.backgroundColor = config.options.colors.points;
            

            // Calculate (x, y) coordinates
            let _x = ((i + 1) * this.intervalBounds);
            plot.style.left = "calc(" + _x + "% - 2px)";
            let _y = this.inputPosition(config.points[i][1], this.intervalBounds, this.intervalMeasure);
            plot.style.bottom = "calc(" + _y  + "% - 2px";
            point.appendChild(plot);
        


            // Create the diagonal line element
            let dLine = document.createElement("div");
            dLine.classList.add("diagonal-line");
            dLine.style.backgroundColor = config.options.colors.lines;
            point.appendChild(dLine);
        
        
            // Calculate the next points then, Draw the "virtual" right triangle
            let XnPlus1 = 0;
            let YnPlus1 = 0;
            if(i == this.config.points.length - 1){ // Last Point ==> NO Diagnoal Line Needed.
                continue; 
            }else{
                XnPlus1 = (i + 1) * (this.intervalBounds);                
                YnPlus1 = this.inputPosition(config.points[i+1][1], this.intervalBounds, this.intervalMeasure);
            }
            

            // get current (x, y) coordinates
            let Xn = i * this.intervalBounds;
            let Yn = _y;
            
            // calculate the diagonal line width
            let a = Math.abs(XnPlus1 - Xn);
            let b = Math.abs(YnPlus1 - Yn);
            let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
            let dLineWidth = c;
            dLine.style.width = dLineWidth + "%";
            dLine.style.left = "calc(" + _x + "%";
            dLine.style.bottom = "calc(" + _y + "%)";


            // calculate the angle of rotation of the diagonal line
            let dLineAngle =  (Math.atan(b / a)) * (180 / Math.PI);
            if(YnPlus1 < Yn) dLineAngle = -(Math.acos(a / c)) * (180 / Math.PI);
            dLine.style.rotate = -dLineAngle + "deg";


            // Apply animations if configured
            if(config.options.animated){
                dLine.style.animation = "animate .8s ease-out forwards";
                parent.style.animation = "animate .5s ease-in-out forwards";
                xAxis.style.animation = "animate .3s ease-out forwards";
                yAxis.style.animation = "animate .3s ease-out forwards";
            }
        }
        
    }

    /**
     * Determine the exact vertical position of a given point
     * 
     * @param {mixed} pointY 
     * @param {mixed} intervalHeight 
     * @returns 
     */
    inputPosition(pointY, intervalHeight, intervalMeasure){
        return ((intervalHeight * pointY) / intervalMeasure);
    }
}