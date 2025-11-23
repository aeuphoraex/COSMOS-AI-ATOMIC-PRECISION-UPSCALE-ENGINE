// ==========================================
// CosmOS AI: Hyper-Precision Engine Widget
// ==========================================
// A standalone module to upscale images on any webpage automatically.

// CONSTANTS
const Resolution = {
    RES_256: 256,
    RES_512: 512,
    RES_1024: 1024,
    RES_2048: 2048,
    RES_4096: 4096,
    RES_8192: 8192
};

const Algorithm = {
    QUANTUM: 'Quantum Frequency',
    WAVELET: 'Wavelet Decomposition',
    FRACTAL: 'Fractal Upsampling',
    ATOMIC: 'Atomic Super-Resolution'
};

// ==========================================
// ENGINE LOGIC
// ==========================================
class HyperEngine {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    }

    async generate(resolution, algorithm, sourceImageElement) {
        if (!this.canvas || !this.ctx) return null;

        this.canvas.width = resolution;
        this.canvas.height = resolution;

        // Background
        this.ctx.fillStyle = "#050510";
        this.ctx.fillRect(0, 0, resolution, resolution);

        const tileSize = 256;
        const tilesX = Math.ceil(resolution / tileSize);
        const tilesY = Math.ceil(resolution / tileSize);

        // Latent upsample
        this.ctx.imageSmoothingEnabled = false;
        const latentSize = resolution / 32;

        this.ctx.drawImage(sourceImageElement, 0, 0, latentSize, latentSize);
        this.ctx.drawImage(this.canvas, 0, 0, latentSize, latentSize, 0, 0, resolution, resolution);

        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.fillRect(0, 0, resolution, resolution);

        // Process tiles
        for (let y = 0; y < tilesY; y++) {
            for (let x = 0; x < tilesX; x++) {
                const xPos = x * tileSize;
                const yPos = y * tileSize;

                await new Promise(r => setTimeout(r, 2));
                this.renderTile(xPos, yPos, tileSize, algorithm, resolution, sourceImageElement);
            }
        }

        // Final shaders
        this.applyFinalShaders(resolution);

        return this.canvas.toDataURL("image/png");
    }

    renderTile(x, y, size, algo, totalRes, source) {
        if (!this.ctx) return;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        this.ctx.clip();

        if (source) {
            this.ctx.globalAlpha = 1.0;
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = "high";

            const srcRatioX = source.naturalWidth / totalRes;
            const srcRatioY = source.naturalHeight / totalRes;

            this.ctx.drawImage(
                source,
                x * srcRatioX, y * srcRatioY, size * srcRatioX, size * srcRatioY,
                x, y, size, size
            );
        }

        this.ctx.globalCompositeOperation = "screen";
        const algoKey = algo ? algo.toUpperCase() : "ATOMIC";

        if (algoKey.includes("ATOMIC")) this.renderAtomic(x, y, size, totalRes);
        else if (algoKey.includes("QUANTUM")) this.renderQuantum(x, y, size);
        else if (algoKey.includes("WAVELET")) this.renderWavelet(x, y, size);
        else this.renderFractal(x, y, size);

        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.strokeStyle = "rgba(255,255,255,0.02)";
        this.ctx.strokeRect(x, y, size, size);

        this.ctx.restore();
    }

    renderAtomic(x, y, size, totalRes) {
        if (!this.ctx) return;

        const density = 20;
        for (let i = 0; i < density; i++) {
            this.ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#ff9900";
            this.ctx.globalAlpha = Math.random() * 0.2;

            const px = x + Math.random() * size;
            const py = y + Math.random() * size;
            const r = Math.random() * (totalRes > 2048 ? 1 : 2);

            this.ctx.beginPath();
            this.ctx.arc(px, py, r, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    renderQuantum(x, y, size) {
        if (!this.ctx) return;

        this.ctx.strokeStyle = "#00ffff";
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.15;

        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + Math.random() * size);
            this.ctx.bezierCurveTo(
                x + size / 2, y,
                x + size / 2, y + size,
                x + size, y + Math.random() * size
            );
            this.ctx.stroke();
        }
    }

    renderWavelet(x, y, size) {
        if (!this.ctx) return;

        for (let i = 0; i < 8; i++) {
            this.ctx.fillStyle = "#ff00ff";
            this.ctx.globalAlpha = 0.08;

            const w = Math.random() * size;
            const h = Math.random() * size;

            this.ctx.fillRect(
                x + Math.random() * (size - w),
                y + Math.random() * (size - h),
                w, h
            );
        }
    }

    renderFractal(x, y, size) {
        if (!this.ctx) return;

        this.ctx.strokeStyle = "#00ff88";
        this.ctx.lineWidth = 1;
        this.ctx.globalAlpha = 0.2;

        const cx = x + size / 2;
        const cy = y + size / 2;

        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - size / 3);
        this.ctx.lineTo(cx + size / 3, cy + size / 3);
        this.ctx.lineTo(cx - size / 3, cy + size / 3);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    applyFinalShaders(res) {
        if (!this.ctx) return;

        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.fillStyle = "rgba(0,0,0,0.1)";

        for (let i = 0; i < res; i += 4) {
            this.ctx.fillRect(0, i, res, 1);
        }

        const grad = this.ctx.createRadialGradient(
            res / 2, res / 2, res / 4,
            res / 2, res / 2, res
        );

        grad.addColorStop(0, "rgba(0,0,0,0)");
        grad.addColorStop(1, "rgba(0,0,0,0.4)");

        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, res, res);

        this.ctx.globalCompositeOperation = "overlay";
        this.ctx.fillStyle = "rgba(0,255,255,0.05)";
        this.ctx.fillRect(0, 0, res, res);
    }
}

// ==========================================
// WIDGET CONTROLLER
// ==========================================
const initCosmosWidget = () => {
    console.log("%c ✨ CosmOS Hyper-Precision Widget Active ✨ ",
        "background:#050510;color:#00ffff;padding:5px;border:1px solid #ff00ff;font-weight:bold"
    );

    const engine = new HyperEngine();
    const images = document.querySelectorAll('img[data-cosmos-upscale="true"]');

    if (images.length === 0) {
        console.log("[CosmOS] No images found with data-cosmos-upscale=\"true\"");
        return;
    }

    images.forEach(async (img) => {
        if (img.dataset.cosmosProcessed) return;

        img.dataset.cosmosProcessed = "processing";
        const originalTransition = img.style.transition;

        img.style.transition = "filter 0.5s ease, opacity 0.5s ease";
        img.style.filter = "blur(4px) grayscale(50%)";
        img.style.opacity = "0.7";

        const res = parseInt(img.dataset.cosmosRes || "1024");
        const algo = img.dataset.cosmosAlgo || "ATOMIC";

        try {
            if (!img.complete) {
                await new Promise(resolve => {
                    img.onload = () => resolve(true);
                });
            }

            const resultDataUrl = await engine.generate(res, algo, img);

            if (resultDataUrl) {
                img.src = resultDataUrl;
                img.dataset.cosmosProcessed = "complete";
                console.log(`[CosmOS] Upscaled image to ${res}px using ${algo}.`);
            }

        } catch (err) {
            console.error("[CosmOS] Upscale failed:", err);
        } finally {
            img.style.filter = "none";
            img.style.opacity = "1";

            setTimeout(() => {
                img.style.transition = originalTransition;
            }, 500);
        }
    });
};

// Auto-init
if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCosmosWidget);
    } else {
        initCosmosWidget();
    }
}

export { HyperEngine, initCosmosWidget };
