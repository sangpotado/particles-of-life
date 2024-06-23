function setup() {

    createCanvas(WIDTH, HEIGHT)
    frameRate(10)
}

function draw() {
    background(0);
    drawParticle(groups)
    if (START) {
        UpdateGroupsWithRule(groups)
        // START = false
    if (mouseIsPressed === true) {
        noFill()
        stroke(255)
        ellipse(mouseX, mouseY, 100)
        for (let i=0; i<groups.length; i++) {
            for (let j=0; j< groups[i].group.length; j++) {
                let p = groups[i].group[j]
                let d = dist(mouseX, mouseY, p.x, p.y)
                if (d>0 && d < 100) {
                    p.x = mouseX
                    p.y = mouseY
                }
            }
        }
    }
    }
}

