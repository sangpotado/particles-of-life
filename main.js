window.addEventListener('DOMContentLoaded', init);
let groups = [];
var START = false
var RGB;
var WIDTH = 700, HEIGHT = 400

// function updateDimensions() {
//     WIDTH = window.innerWidth;
//     HEIGHT = window.innerHeight;
//     console.log(`Width: ${WIDTH}, Height: ${HEIGHT}`);
// }
// // Update dimensions on window resize
// window.onresize = updateDimensions;

function init() {
    // updateDimensions()
    start()
    reset()
    preset()
    addGroup()
}

function addGroup() {
    document.getElementById('add-group-btn').addEventListener('click', () => {
        let groupName = document.getElementById('group-name').value;
        let numParticles = document.getElementById('num-particles').value;
        // let groupColor = document.getElementById('group-color').value;
        let groupColor = RGB

        if (groupName && numParticles && groupColor) {
            groups.push(new Group(groupName, numParticles, groupColor));
            updateHTMLTable();
        }
    });
}
function updateHTMLTable() {
    // Select the table head element
    let tableHead = document.querySelector('#relationship-table thead');
    // Start the table row with the header for the first empty cell
    let headHTML = '<tr><th>Empty cell</th>';
    // Loop through groups to create table headers for group names
    for (let i = 0; i < groups.length; i++) {
        headHTML += `<th>${groups[i].name}</th>`;
    }
    // Close the table row
    headHTML += `</tr>`;
    tableHead.innerHTML = headHTML;

    // Select the table body element
    let tableBody = document.querySelector('#relationship-table tbody');
    // Clear the table body to prevent appending to existing rows on subsequent calls
    tableBody.innerHTML = '';

   // Loop through groups to create table rows for group names
   for (let i = 0; i < groups.length; i++) {
    // Start a new row with the group name in the first column
    let rowHTML = `<tr><td>${groups[i].name}</td>`;
    
    // Loop through groups again to create input range sliders for each cell
    for (let j = 0; j < groups.length; j++) {
        rowHTML += `<td>
                        <input type="range" min='-2.00' max='2.00' class='slider' step="0.1" value='0' oninput="addRelationshipFromHTML()">
                    </td>`;
    }

    // Close the table row
    rowHTML += `</tr>`;

    // Append the row to the table body
    tableBody.innerHTML += rowHTML;
    }
        // for (let j = 0; j < groups.length; j++) {
        //     tableBody.innerHTML += `<tr><td>${groups[i].name}</td><td>${groups[j].name}</td><td><input type="range" min='-2.00' max='2.00' class='slider' step="0.1" value='0' oninput="addRelationshipFromHTML()"></td></tr>`
        // }

}

function addRelationshipFromHTML() {
    // Select all rows in the table body
    let tableRows = document.querySelectorAll('#relationship-table tbody tr');
// Iterate through each row
tableRows.forEach(row => {
    // Get the group name from the first cell in the row (row group)
    let rowGroup = row.querySelector('td').textContent;

    // Select all cells in the row
    let cells = row.querySelectorAll('td');

    // Iterate through each cell starting from the second cell
    for (let i = 1; i < cells.length; i++) {
        // Get the column group name from the header (column group)
        let columnGroup = document.querySelector(`#relationship-table thead th:nth-child(${i + 1})`).textContent;

        // Get the gravity value from the input slider
        let gravity = parseFloat(cells[i].querySelector('input').value);

        // Find the row group object
        let rowGroupObject = groups.find(group => group.name === rowGroup);

        // Update the relationship for the row group
        if (rowGroupObject) {
            rowGroupObject.addRelationship(columnGroup, gravity);
        }
    }
});
}
function start() {
    document.getElementById('start-btn').addEventListener('click', () => {
        // console.log('Start button clicked');
        if (!START) {
            START = true
            document.getElementById('start-btn').textContent = "Pause"
            addRelationshipFromHTML()
        }
        else {
            START = false
            document.getElementById('start-btn').textContent = "Start"
        }

        })
}

function reset() {
    document.getElementById('reset-btn').addEventListener('click', () => {
        console.log('Reset button clicked');
        if (START) {START = false}
        // AllParticles = []
        groups = []
        console.log(groups)
    });
}

function preset() {
    document.getElementById('preset-btn').addEventListener('click', () => {
    groups.push(new Group("red", 100, color('red')));
    groups.push(new Group('yellow', 100,color('yellow')))
    groups.push(new Group('blue', 100, color('blue')))
    updateHTMLTable();
    })
}
