// Using url to use data in this app
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Identifying the data structure using console.log
d3.json(url).then(function(data){
    // console.log(data)

    let metadata = data.metadata;
    let ID_names = data.names;
    let samples = data.samples;
    // console.log("ID_Names:",ID_names)

    // Build a list in dropdownmenu:
    let dropdownMenu = d3.select("#selDataset");
    for (let i = 0; i < ID_names.length; i++){
    //   dropdownMenu.append("option").text(ID_names[i]).attr("value", ID_names[i]);
    dropdownMenu.append("option").text(ID_names[i]).attr("value", ID_names[i]);
    };
   
});
d3.selectAll("#selDataset").on("change", optionChanged)
function optionChanged(){
    // code that updates graphics
    let id = d3.select("#selDataset").property("value");
        console.log(id);
    // createBar(id);
};

function createBar(id){
    for (let i = 0; i < names.length; i++){
      // finds the index where the current id is
      if (id == ID_names[i]){
        // Stores top 10 OTU data at current id
        let sample_values = samples[i].sample_values.slice(0, 10);
        let temp = samples[i].otu_ids.slice(0, 10);
        let otu_ids = temp.map(function (x) {
          return "OTU " + x;
        });
        let otu_labels = samples[i].otu_labels.slice(0, 10);
        // Sets up the data for horizontal bar chart at current id
        let data = [{
        type: 'bar',
        x: sample_values,
        y: otu_ids,
        text: otu_labels,
        transforms: [{
          type: 'sort',
          target: 'x',
          order: 'ascending'
        }],
        orientation: 'h'
        }];
        //Creates the bar chart with plotly at id='bar'
        Plotly.newPlot("bar", data);
        //Exits the loop
        break;
      };
    };
    // checking to see if function is running
    console.log(`This function generates bar chart of ${id} `);
  };