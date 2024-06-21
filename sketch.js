function setup() {
    var height = 512;
    var width = 1024;
    createCanvas(width, height)
    frameRate(10)

    // JSgroups = []
    // groups.forEach(group => {

    // })

    // AllParticles = []
    const YELLOW = color(255,255,0)
    const RED = color(255,0,0)
    const BLUE = color(192,192,192)
    const GREEN = color(0,255,0)

    // groupYellow = createGroup(500, YELLOW);
    // groupRed = createGroup(500, RED);
    // groupGreen = createGroup(500, GREEN);

}

function draw() {
    background(0);
    drawParticle(groups)
    if (START) {
        UpdateGroupsWithRule(groups)
        // START = false
    }


}