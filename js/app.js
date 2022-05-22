// import the data from data.js
const tableData = data;

// reference the HTML table using D3
var tbody = d3.select("tbody");

// build the function that iterates through the data to build the table
function buildTable(data) {
    // create a blank canvas and clear out any data from the table
    tbody.html("");
    // loop through each object in the data
    //and append a row, and cells for each value in the row
    data.forEach((dataRow) => {
        // append a row to the table body
        let row = tbody.append("tr");

        // loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });

}

// build the function to filter the table by date
function handleClick() {
    // grab the datetime value from the filter and store in a variable
    let date = d3.select("#datetime").property("value");

    // set a default filter (original, raw data in this case, 
    // allows us to start with a blank slate)
    let filteredData = tableData;

    // check to see if a date was entered and filter the data using that date
    if (date) {
        // apply `filter` to the table data to only keep the 
        // rows where the `datetime` value matches the filter value
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    // rebuild the table using filteredData as the argument
    // @NOTE if no date was entered. filteredData will just be the og tableData
    buildTable(filteredData);
}

// listen for a click
d3.selectAll("#filter-btn").on("click", handleClick);

// have the orignal table populate with the webpage initially
buildTable(tableData);