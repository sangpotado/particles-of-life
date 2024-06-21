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

    update(other, g) { 
        let dx = this.x - other.x
        let dy = this.y - other.y
        let distance = Math.sqrt(dx**2 + dy**2)

        if (distance > 0 && distance < 80) { 
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

class Group {
    constructor(name, number, color) {
        this.name = name
        this.group = []
        for (let i=0; i<number; i++) {
            this.group.push(new Particle(random(50,400), random(50,400), color))
            // AllParticles.push(this.group[i])
        }
        this.color = color
        this.relationship = new Map()
    }

    addRelationship(other, g) {
        this.relationship.set(other, g)
    }

    update(other) {
        for (let i=0; i< this.group.length; i++) {
            for (let j=0; j< other.group.length; j++) {
                this.group[i].update(other.group[j], this.relationship.get(other.name))
            }
        }
    } 
}

function drawParticle(groups) {
    groups.forEach(group => {
        group.group.forEach(p => {
            fill(p.color)
            noStroke()
            ellipse(p.x, p.y, 5)
        })
    })
}


function UpdateGroupsWithRule(groups) {
    //
    for (let i=0; i< groups.length; i++) {
        for (let j=0; j<groups.length; j++) {
            groups[i].update(groups[j])
        }
    }
}