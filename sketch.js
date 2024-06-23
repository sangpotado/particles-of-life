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
    }


}