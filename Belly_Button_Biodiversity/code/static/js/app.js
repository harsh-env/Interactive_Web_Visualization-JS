// Using url to use data in this app
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Identifying the data structure using console.log
d3.json(url).then(function(data){
    // console.log(data);

    let metadata = data.metadata;
    let ID_names = data.names;
    let samples = data.samples;
    // console.log("ID_Names:",ID_names);
function init() {
    console.log("Initialize the graphs on webpage");
    // Build a list in dropdownmenu, appending it in list "option" & Value equal to Sub ID
    let dropdownMenu = d3.select("#selDataset");
    for (let i = 0; i < ID_names.length; i++){
      dropdownMenu.append("option").text(ID_names[i]).attr("value", ID_names[i]);
    // dropdownMenu.append("option").text(ID_names[i]);
    };
    createBar(ID_names[0]);
    createBubble(ID_names[0])
    createSummary(ID_names[0])
    crgaugechart(ID_names[0])

    d3.selectAll("#selDataset").on("change", function(){
        let dp_menu = d3.select("#selDataset");
        let dp_ID = dp_menu.property("value");
        console.log(dp_ID);
        createBar(dp_ID);
        createBubble(dp_ID)
        createSummary(dp_ID)
        crgaugechart(dp_ID)

    });
    
};

    function createBar(dp_ID){
        for (let i = 0; i < ID_names.length; i++){
      // finds the index where the current id is
            if (dp_ID == ID_names[i]){
        // Stores top 10 OTU data at current id
            let sample_values = samples[i].sample_values.slice(0, 10);
            let temp = samples[i].otu_ids.slice(0, 10);
            let otu_ids = temp.map(function (x) {
            return "OTU " + x;
            });
            let otu_labels = samples[i].otu_labels.slice(0, 10);
            // Sets up the data for horizontal bar chart at current id
            let data1 = [{
                type: 'bar',
                x: sample_values,
                y: otu_ids,
                yaxis: otu_labels,
                transforms: [{
                type: 'sort',
                target: 'x',
                order: 'ascending'
                }],
                orientation: 'h'
                }];
        //Creates the bar chart with plotly at id='bar'
            Plotly.newPlot("bar", data1);
        //Exits the loop
            break;
            };
        };
    // checking to see if function is running
        console.log(`This function generates bar chart of ${dp_ID} `);
    };

    // Function to create a bubble chart at a specific id
    function createBubble(dp_ID){
        for (let i = 0; i < ID_names.length; i++){
        // finds the index where the current id is
        if (dp_ID == ID_names[i]){
            // Stores OTU data at current id
            let sample_values = samples[i].sample_values;
            let otu_ids = samples[i].otu_ids;
            let otu_labels = samples[i].otu_labels;
            // Sets up the data for bubble chart at current id
            let data2 = [{
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth",
            }
            }];
            let layout = {
            xaxis:{title: "OTU_ID"},
            yaxis:{title: "Sample Values"},

            }
            //Creates the bar chart with plotly with id='bubble'
            Plotly.newPlot("bubble", data2, layout);
            //Exits the loop
            break;
        };
        };
        // checking to see if function is running
        console.log(`This function generates bubble plot of ${dp_ID} `);
    };

    function createSummary(dp_ID){
        d3.select("#sample-metadata").selectAll("p").remove();
        for (let i = 0; i < ID_names.length; i++){
          // finds the index where the current id is
          if (dp_ID == ID_names[i]){
            // code that sets up demographic info at id='sample-meta'
            d3.select("#sample-metadata").append("p").text(`id: ${metadata[i].id}`);
            d3.select("#sample-metadata").append("p").text(`ethnicity: ${metadata[i].ethnicity}`);
            d3.select("#sample-metadata").append("p").text(`gender: ${metadata[i].gender}`);
            d3.select("#sample-metadata").append("p").text(`age: ${metadata[i].age}`);
            d3.select("#sample-metadata").append("p").text(`location: ${metadata[i].location}`);
            d3.select("#sample-metadata").append("p").text(`bbtype: ${metadata[i].bbtype}`);
            d3.select("#sample-metadata").append("p").text(`wfreq: ${metadata[i].wfreq}`);
          };
        };
        // checking to see if function is running
        console.log(`This function generates summary info of ${dp_ID} `);
      };

    function crgaugechart(dp_ID){
        for (let i = 0; i < ID_names.length; i++){
            // finds the index where the current id is
            if (dp_ID == ID_names[i]){
                // Stores OTU data at current id
                let wash_freq = metadata[i].wfreq;
            
                let data3 = [
                    {
                      type: "indicator",
                      mode: "gauge+number",
                      value: wash_freq,
                      title: { text: "<b>Belly Button Washing Frequency</b><br></br> Scrubs per Week" },
                      
                    //   delta: { reference: 0, increasing: { color: "greygreen" } },
                      gauge: {
                        axis: { range: [null, 10], dtick:"1", tickwidth: 2, tickcolor: "black" },
                        bar: { 'color': "black", 'width':.2 },
                        bgcolor: "white",
                        borderwidth: 1,
                        bordercolor: "gray",
                        // colorscale:"Earth",
                        steps: [
                          { range: [0, 1], color: "white" },
                          { range: [1, 2], color: "lightyellow" },
                          { range: [2, 3], color: "lightblue" },
                          { range: [3, 4], color: "lightgreen" },
                          { range: [4, 5], color: "yellow" },
                          { range: [5, 6], color: "green" },
                          { range: [6, 7], color: "violet" },
                          { range: [7, 8], color: "indigo" },
                          { range: [8, 9], color: "purple" },
                          { range: [9, 10], color: "blue" },
                        ],
                        // threshold: {
                        //   line: { color: "red", width: 10 },
                        //   thickness: 0.75,
                        //   value: 490
                        // }
                      }
                    }
                  ];
                  
                  var layout = {
                    width: 500,
                    height: 500,
                    margin: { t: 25, r: 25, l: 25, b: 25 },
                    paper_bgcolor: "white",
                    font: { color: "black", family: "Arial" },
                    
                  };
                  
                  Plotly.newPlot('gauge', data3, layout);
                
            }

        }
    }

    init();
});