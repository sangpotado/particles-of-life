function setup() {
    var height = 512;
    var width = 1024;
    createCanvas(width, height)
    frameRate(10)

    const YELLOW = color(255,255,0)
    const RED = color(255,0,0)
    const BLUE = color(192,192,192)
    const GREEN = color(0,255,0)

    AllParticles = []
    groupYellow = createGroup(500, YELLOW);
    groupRed = createGroup(500, RED);
    groupGreen = createGroup(500, GREEN);
}

function draw() {
    background(0);
    drawParticle(AllParticles)
    UpdateGroupWithRule(groupYellow, groupRed, groupGreen)

}