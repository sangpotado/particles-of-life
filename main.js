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
    let tableBody = document.querySelector('#relationship-table tbody');
    tableBody.innerHTML = '';

    for (let i = 0; i < groups.length; i++) {
        for (let j = 0; j < groups.length; j++) {
            tableBody.innerHTML += `<tr><td>${groups[i].name}</td><td>${groups[j].name}</td><td><input type="range" min='-2.00' max='2.00' class='slider' step="0.1" value='0' oninput="addRelationshipFromHTML()"></td></tr>`
        }
    }
}

function addRelationshipFromHTML() {
    // update relationship between groups
    let tableBody = document.querySelectorAll('#relationship-table tbody tr');
    tableBody.forEach(tr => {
        let td = tr.querySelectorAll('td');
        let group1name = td[0].textContent;
        let group2name = td[1].textContent;
        let g = td[2].querySelector('input').value;
        g = parseFloat(g);
        
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].name == group1name) {
                groups[i].addRelationship(group2name, g);
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
