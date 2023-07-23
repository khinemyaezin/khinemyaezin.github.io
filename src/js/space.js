class Particle {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.pastZ = 0;
    }
}

export default class SpaceAnimation {
    constructor(canvas) {
        this.PARTICLE_NUM = 500;
        this.PARTICLE_BASE_RADIUS = 0.5;
        this.FL = 500;
        this.DEFAULT_SPEED = 2;
        this.BOOST_SPEED = 300;
        this.canvas = canvas;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.context = null;
        this.centerX = 0;
        this.centerY = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.speed = this.DEFAULT_SPEED;
        this.targetSpeed = this.DEFAULT_SPEED;
        this.particles = [];
    }

    load() {
        this.resizeCanvas();
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        this.mouseX = this.centerX;
        this.mouseY = this.centerY;
        this.initParticles();

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }, false);

        document.addEventListener('mousedown', (e) => {
            this.targetSpeed = this.BOOST_SPEED;
        }, false);

        document.addEventListener('mouseup', (e) => {
            this.targetSpeed = this.DEFAULT_SPEED;
        }, false);

        setInterval(this.loop.bind(this), 1000 / 60);
    }

    resizeCanvas() {
        this.canvasWidth = this.canvas.width = window.innerWidth;
        this.canvasHeight = this.canvas.height = window.innerHeight;
        this.centerX = this.canvasWidth * 0.5;
        this.centerY = this.canvasHeight * 0.5;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = 'rgb(255, 255, 255)';
    }

    initParticles() {
        for (let i = 0; i < this.PARTICLE_NUM; i++) {
            this.particles[i] = this.randomizeParticle(new Particle());
            this.particles[i].z -= 500 * Math.random();
        }
    }

    loop() {
        this.context.save();
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.context.restore();

        this.speed += (this.targetSpeed - this.speed) * 0.01;

        let cx, cy;
        let rx, ry;
        let f, x, y, r;
        let pf, px, py, pr;
        let a, a1, a2;

        const halfPi = Math.PI * 0.5;
        const atan2 = Math.atan2;
        const cos = Math.cos;
        const sin = Math.sin;

        this.context.beginPath();
        for (let i = 0; i < this.PARTICLE_NUM; i++) {
            const p = this.particles[i];

            p.pastZ = p.z;
            p.z -= this.speed;

            if (p.z <= 0) {
                this.randomizeParticle(p);
                continue;
            }

            cx = this.centerX - (this.mouseX - this.centerX) * 1.25;
            cy = this.centerY - (this.mouseY - this.centerY) * 1.25;

            rx = p.x - cx;
            ry = p.y - cy;

            f = this.FL / p.z;
            x = cx + rx * f;
            y = cy + ry * f;
            r = this.PARTICLE_BASE_RADIUS * f;

            pf = this.FL / p.pastZ;
            px = cx + rx * pf;
            py = cy + ry * pf;
            pr = this.PARTICLE_BASE_RADIUS * pf;

            a = atan2(py - y, px - x);
            a1 = a + halfPi;
            a2 = a - halfPi;

            this.context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
            this.context.arc(px, py, pr, a1, a2, true);
            this.context.lineTo(x + r * cos(a2), y + r * sin(a2));
            this.context.arc(x, y, r, a2, a1, true);
            this.context.closePath();
        }
        this.context.fill();
    }

    randomizeParticle(p) {
        p.x = Math.random() * this.canvasWidth;
        p.y = Math.random() * this.canvasHeight;
        p.z = Math.random() * 1500 + 500;
        return p;
    }
}
