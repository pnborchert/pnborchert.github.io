/**
* Interactive Bubbles — Organic, morphing, dissolved shapes that appear on hover.
*/
(function () {
    const canvas = document.getElementById('nodes-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let bubbles = [];
    let mouse = { x: -9999, y: -9999 };
    let animationId;

    // Configuration
    const BUBBLE_COUNT_FACTOR = 0.00006;
    const MIN_BUBBLES = 20;
    const MAX_BUBBLES = 60;

    // Interaction
    const HOVER_DISTANCE = 120;
    const DRIFT_SPEED = 0.15;

    const COLORS = {
        blue: { r: 37, g: 99, b: 235 },
        cranberry: { r: 155, g: 27, b: 48 },
        ice: { r: 224, g: 242, b: 254 }
    };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initBubbles();
    }

    function initBubbles() {
        const count = Math.min(MAX_BUBBLES, Math.max(MIN_BUBBLES, Math.floor(width * height * BUBBLE_COUNT_FACTOR)));
        bubbles = [];
        for (let i = 0; i < count; i++) {
            const rand = Math.random();
            const color = rand > 0.6 ? COLORS.blue : (rand > 0.3 ? COLORS.ice : COLORS.cranberry);

            // Smaller size: 20px - 50px
            const r = 20 + Math.random() * 30;

            const radii = [r, r, r, r];
            const targetRadii = [r, r, r, r];

            bubbles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * DRIFT_SPEED,
                vy: (Math.random() - 0.5) * DRIFT_SPEED,
                r: color.r,
                g: color.g,
                b: color.b,
                baseSize: r,
                radii: radii,
                targetRadii: targetRadii,
                morphSpeed: 0.02 + Math.random() * 0.03,
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.005,
                currentAlpha: 0.0,
                targetAlpha: 0.0,
                morphTimer: Math.random() * 100
            });
        }
    }

    function updateMorph(b) {
        b.morphTimer++;
        if (b.morphTimer > 100) {
            b.morphTimer = 0;
            // Variance: 0.5x to 1.5x of base size
            for (let i = 0; i < 4; i++) {
                b.targetRadii[i] = b.baseSize * (0.5 + Math.random() * 1.0);
            }
        }

        for (let i = 0; i < 4; i++) {
            b.radii[i] += (b.targetRadii[i] - b.radii[i]) * b.morphSpeed;
        }
    }

    function drawOrganicBlob(ctx, x, y, radii, angle, alpha, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Nested layers for "landscape" / multidimensional effect
        const layers = [
            { scale: 1.0, opacityMult: 0.1, blurMult: 1.5, stroke: true }, // Glassy base
            { scale: 0.75, opacityMult: 0.15, blurMult: 1.0, stroke: true },
            { scale: 0.5, opacityMult: 0.25, blurMult: 0.5, stroke: false }
        ];

        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const s = layer.scale;

            ctx.beginPath();
            const k = 0.55228;

            const r0 = radii[0] * s;
            const r1 = radii[1] * s;
            const r2 = radii[2] * s;
            const r3 = radii[3] * s;

            ctx.moveTo(0, -r0);
            ctx.bezierCurveTo(r1 * k, -r0, r1, -r1 * k, r1, 0);
            ctx.bezierCurveTo(r1, r2 * k, r1 * k, r2, 0, r2);
            ctx.bezierCurveTo(-r3 * k, r2, -r3, r2 * k, -r3, 0);
            ctx.bezierCurveTo(-r3, -r0 * k, -r3 * k, -r0, 0, -r0);

            // Fill
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * layer.opacityMult})`;
            ctx.shadowBlur = (r0 + r1 + r2 + r3) / 4 * layer.blurMult;
            ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
            ctx.fill();

            // Glassy stroke
            if (layer.stroke) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        ctx.restore();
    }

    function update() {
        for (const b of bubbles) {
            b.x += b.vx;
            b.y += b.vy;
            b.angle += b.rotationSpeed;
            updateMorph(b);

            // Soft wrap
            if (b.x < -100) b.x = width + 100;
            if (b.x > width + 100) b.x = -100;
            if (b.y < -100) b.y = height + 100;
            if (b.y > height + 100) b.y = -100;

            // Hover interaction
            const dx = b.x - mouse.x;
            const dy = b.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < HOVER_DISTANCE) {
                const hoverFactor = 1 - (dist / HOVER_DISTANCE);
                const smooth = hoverFactor * hoverFactor * (3 - 2 * hoverFactor);
                b.targetAlpha = 0.2 + (smooth * 0.4);
            } else {
                b.targetAlpha = 0.0;
            }

            if (dist < HOVER_DISTANCE) {
                b.currentAlpha += (b.targetAlpha - b.currentAlpha) * 0.08;
            } else {
                b.currentAlpha *= 0.94;
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'screen';

        for (const b of bubbles) {
            if (b.currentAlpha < 0.005) continue;

            // Draw via organic blob function which now handles shadow
            drawOrganicBlob(ctx, b.x, b.y, b.radii, b.angle, b.currentAlpha, b);
        }

        ctx.globalCompositeOperation = 'source-over';
    }

    function loop() {
        update();
        draw();
        animationId = requestAnimationFrame(loop);
    }

    // Event listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
    });
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    });

    resize();
    loop();
})();
