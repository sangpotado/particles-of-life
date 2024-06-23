/**
 * Generates a random number between min (inclusive) and min + val (exclusive).
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} val - The range of random values (exclusive).
 * @return {number} - A random number within the specified range.
 */
function random(min, val) {
    return Math.random() * val + min
}

/**
 * Represents a particle with position and velocity.
 */
class Particle {
        /**
     * Constructs a new Particle object.
     * @param {number} x - The initial x-coordinate of the particle.
     * @param {number} y - The initial y-coordinate of the particle.
     * @param {string} c - The color of the particle.
     */
    constructor(x, y, c) {
        this.x = x
        this.y = y
        this.color = c
        this.vx = 0
        this.vy = 0
        this.fx = 0
        this.fy = 0
    }

    /**
     * Updates the position of the particle based on its interactions with another particle and gravity.
     * @param {Particle} other - Another Particle object representing the interacting particle.
     * @param {number} g - The gravitational constant affecting the interaction.
     */
    update(other, g) { 
        // Calculate distance between this particle and the other particle
        let dx = this.x - other.x
        let dy = this.y - other.y
        let distance = Math.sqrt(dx**2 + dy**2)
        // Apply forces if the distance is within a certain range
        if (distance > 0 && distance < 80) { 
            let F = (g * 1) / distance
            this.fx += F * dx
            this.fy += F * dy
        }
        // Dampen velocities (to simulate friction or air resistance)
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
        // Update position based on velocity
        this.x += this.vx
        this.y += this.vy
        // Reset accumulated forces after updating position
        this.fx = 0
        this.fy = 0
    }
}

/**
 * Represents a group of particles with relationships to other groups.
 */
class Group {
    /**
     * Constructs a new Group object.
     * @param {string} name - The name of the group.
     * @param {number} number - The number of particles in the group.
     * @param {string} color - The color of the particles in the group.
     */
    constructor(name, number, color) {
        this.name = name
        this.group = []
        for (let i=0; i<number; i++) {
            this.group.push(new Particle(random(50,WIDTH), random(50,HEIGHT), color))
        }
        this.color = color
        this.relationship = new Map()
    }
    /**
     * Adds a relationship between this group and another group.
     * @param {string} other - Another Group's name representing the group to add a relationship with.
     * @param {number} g - The strength of the relationship (e.g., gravitational constant).
     */
    addRelationship(other, g) {
        this.relationship.set(other, g)
    }
    /**
     * Updates the particles in this group based on interactions with particles from another group.
     * @param {Group} other - Another Group object representing the group whose particles interact with this group's particles.
     */
    update(other) {
        for (let i=0; i< this.group.length; i++) {
            for (let j=0; j< other.group.length; j++) {
                this.group[i].update(other.group[j], this.relationship.get(other.name))
            }
        }
    } 
}

/**
 * Draws particles from multiple groups on the canvas.
 * @param {Array<Group>} groups - An array of Group objects, each containing particles to be drawn.
 */
function drawParticle(groups) {
    groups.forEach(group => {
        group.group.forEach(p => {
            fill(p.color) // Set the fill color to the particle's color
            noStroke()
            ellipse(p.x, p.y, 5) // Draw each particle as an ellipse
        })
    })
}

/**
 * Updates each group in the array based on interactions with every other group.
 * @param {Array<Group>} groups - An array of Group objects to be updated.
 */
function UpdateGroupsWithRule(groups) {
    // Iterate through each pair of groups to update interactions
    for (let i=0; i< groups.length; i++) {
        for (let j=0; j<groups.length; j++) {
            groups[i].update(groups[j])
        }
    }
}