function random(min, val) {
    return Math.random() * val + min
}

class Particle {
    constructor(x, y, c) {
        this.x = x
        this.y = y
        this.color = c
        this.vx = 0
        this.vy = 0
        this.fx = 0
        this.fy = 0
    }

    update(other, g, range) { // range experiment
        let dx = this.x - other.x
        let dy = this.y - other.y
        let distance = Math.sqrt(dx**2 + dy**2)

        if (distance > 0 && distance < range) { // range experiment
            let F = (g * 1) / distance
            this.fx += F * dx
            this.fy += F * dy
        }

        this.vx = (this.vx + this.fx) * 0.5
        this.vy = (this.vy + this.fy) * 0.5
        if (this.x <= 0 || this.x >= 1024) { 
            this.vx = -this.vx; 
            // this.x = 500 //experiment
            } 
        if (this.y <= 0 || this.y >= 512) { 
            this.vy = -this.vy; 
            // this.y = 288 //experiment
        } 
        this.x += this.vx
        this.y += this.vy
        this.fx = 0
        this.fy = 0
    }
}

function createGroup(n, color) {
    group = []
    for (let i=0; i<n; i++) {
        group.push(new Particle(random(50,400), random(50,400), color))
        AllParticles.push(group[i])
    }
    return group
}

function rule(group1, group2, g, r) { // range experiment
    for (let i=0; i< group1.length; i++) {
        for (let j=0; j<group2.length; j++) {
            group1[i].update(group2[j], g, r)
        }
    }
}

function drawParticle(P) {
    P.forEach(p => {
        fill(color(p.color))
        noStroke()
        ellipse(p.x, p.y, 5)
    })
}

function UpdateGroupWithRule(groupYellow, groupRed, groupGreen) { // range experiment
    rule(groupGreen, groupGreen, -0.32, 50);
    rule(groupGreen, groupRed, -0.17,100);
    rule(groupGreen, groupYellow, 0.34,150);
    rule(groupRed, groupRed, -0.1,50);
    rule(groupRed, groupGreen, -0.34,50);
    rule(groupYellow, groupYellow, 0.15,100);
    rule(groupYellow, groupGreen, -0.2, 200);
}