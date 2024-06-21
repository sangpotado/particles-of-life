window.addEventListener('DOMContentLoaded', init);
let groups = [];
let relationshipTable = {}
var START = false

function init() {
    start(groups)
    reset()
    preset()
    document.getElementById('add-group-btn').addEventListener('click', () => {
        let groupName = document.getElementById('group-name').value;
        let numParticles = document.getElementById('num-particles').value;
        let groupColor = document.getElementById('group-color').value;

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
            tableBody.innerHTML += `<tr><td>${groups[i].name}</td><td>${groups[j].name}</td><td><input type="number" value='0'></td></tr>`
        }
    }
}

function start(groups) {
    document.getElementById('start-btn').addEventListener('click', () => {
        console.log('Start button clicked');
        if (!START) {START = true}

        // update relationship between groups
        let tableBody = document.querySelectorAll('#relationship-table tbody tr');
        tableBody.forEach(tr => {
            let td = tr.querySelectorAll('td')
            let group1name = td[0].textContent
            let group2name = td[1].textContent
            let g = td[2].querySelector('input').value
            g = parseFloat(g)
            console.log(group1name, group2name, g)
            for (let i=0; i< groups.length; i++) {
                if (groups[i].name == group1name) {
                    groups[i].addRelationship(group2name, g)
                }
                // console.log(groups[i].relationship)
            }
        })
    });
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
    groups.push(new Group("red", 10, 255*65536+0*256+0));
    groups.push(new Group('yellow', 20, 255*65536+255*256))
    groups.push(new Group('blue', 20, 255))
    updateHTMLTable();
    })
}
