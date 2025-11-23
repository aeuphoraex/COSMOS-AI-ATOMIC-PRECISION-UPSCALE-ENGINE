<div style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5;">
<h1 style="color: #333; text-align: center;">Atomic Precision Upscale Engine Demo</h1>
<div style="text-align: center;">
  <button id="upscaleBtn" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin: 20px;">Upscale All Images</button>
</div>
<div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: center;">
  <div style="margin: 20px; padding: 15px; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;">
    <img src="https://picsum.photos/seed/demo1/256/256" data-upscale="true" data-scale="4" id="demo1" crossorigin="anonymous" style="width: 300px; height: 300px; object-fit: cover; border: 2px solid #444; margin-bottom: 10px;">
    <div id="status-demo1" style="margin-top: 10px; font-size: 14px; color: #666;">Ready to upscale</div>
  </div>
  <div style="margin: 20px; padding: 15px; background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); text-align: center;">
    <img src="https://picsum.photos/seed/demo2/256/256" data-upscale="true" data-scale="2" id="demo2" crossorigin="anonymous" style="width: 300px; height: 300px; object-fit: cover; border: 2px solid #444; margin-bottom: 10px;">
    <div id="status-demo2" style="margin-top: 10px; font-size: 14px; color: #666;">Ready to upscale</div>
  </div>
</div>
<script>// ==========================================
// CosmOS AI: Hyper-Precision Engine Widget
// ==========================================

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
    QUANTUM: "Quantum Frequency",
    WAVELET: "Wavelet Decomposition",
    FRACTAL: "Fractal Upsampling",
    ATOMIC: "Atomic Super-Resolution"
};

// ==========================================
// HYPER ENGINE
// ==========================================
class HyperEngine {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    }

    async generate(resolution, algorithm, img) {
        if (!this.ctx) return null;

        this.canvas.width = resolution;
        this.canvas.height = resolution;

        // Background
        this.ctx.fillStyle = "#050510";
        this.ctx.fillRect(0, 0, resolution, resolution);

        // Latent representation
        const latent = resolution / 32;
        this.ctx.imageSmoothingEnabled = false;

        this.ctx.drawImage(img, 0, 0, latent, latent);
        this.ctx.drawImage(this.canvas, 0, 0, latent, latent, 0, 0, resolution, resolution);

        this.ctx.fillStyle = "rgba(0,0,0,0.5)";
        this.ctx.fillRect(0, 0, resolution, resolution);

        const tileSize = 256;
        const tilesX = Math.ceil(resolution / tileSize);
        const tilesY = Math.ceil(resolution / tileSize);

        // Tile-by-tile incremental rendering (LIVE FEEL)
        for (let y = 0; y < tilesY; y++) {
            for (let x = 0; x < tilesX; x++) {
                await new Promise(r => setTimeout(r, 1));
                this.renderTile(x * tileSize, y * tileSize, tileSize, algorithm, resolution, img);
            }
        }

        // Final shader
        this.applyFinalShaders(resolution);

        return this.canvas.toDataURL("image/png");
    }

    // Add this method to the HyperEngine class in EngineService.js

    /**
     * Upscales all images with data-upscale="true" attribute
     */
    async upscaleAll() {
        // Select all images that requested upscaling
        const images = document.querySelectorAll<HTMLImageElement>('img[data-upscale="true"]');
    
        if (images.length === 0) {
            console.log('[HyperEngine] No images found with data-upscale="true"');
            return;
        }
    
        images.forEach(async (img) => {
            if (img.dataset.cosmosProcessed) return;
            
            // 1. Apply loading state style
            img.dataset.cosmosProcessed = "processing";
            const originalTransition = img.style.transition;
            
            img.style.transition = "filter 0.5s ease, opacity 0.5s ease";
            img.style.filter = "blur(4px) grayscale(50%)";
            img.style.opacity = "0.7";
    
            // 2. Parse Config
            const scale = parseInt(img.dataset.scale || "2");
            const res = img.naturalWidth * scale; // Calculate resolution based on scale
            const algo = "ATOMIC"; // Default algorithm
    
            try {
                // Ensure image is loaded for reading
                if (!img.complete) {
                    await new Promise((resolve) => {
                      img.onload = () => resolve(true);
                    });
                }
    
                // 3. Generate Upscale
                const resultDataUrl = await this.generate(res, algo, img);
                
                if (resultDataUrl) {
                    // 4. Apply Result
                    img.src = resultDataUrl;
                    img.dataset.cosmosProcessed = "complete";
                    console.log(`[HyperEngine] Upscaled image by ${scale}x using ${algo}.`);
                }
    
            } catch (err) {
                console.error("[HyperEngine] Upscale failed:", err);
            } finally {
                // 5. Cleanup Styles
                img.style.filter = "none";
                img.style.opacity = "1";
                setTimeout(() => {
                     img.style.transition = originalTransition;
                }, 500);
            }
        });
    }

    renderTile(x, y, size, algo, totalRes, source) {
        if (!this.ctx) return;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(x, y, size, size);
        this.ctx.clip();

        // Map image into tile - scaled representation
        const srcRatioX = source.naturalWidth / totalRes;
        const srcRatioY = source.naturalHeight / totalRes;

        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = "high";

        this.ctx.drawImage(
            source,
            x * srcRatioX, y * srcRatioY, size * srcRatioX, size * srcRatioY,
            x, y, size, size
        );

        this.ctx.globalCompositeOperation = "screen";
        algo = (algo || "ATOMIC").toUpperCase();

        if (algo.includes("ATOMIC")) this.renderAtomic(x, y, size, totalRes);
        else if (algo.includes("QUANTUM")) this.renderQuantum(x, y, size);
        else if (algo.includes("WAVELET")) this.renderWavelet(x, y, size);
        else this.renderFractal(x, y, size);

        this.ctx.restore();
    }

    renderAtomic(x, y, size, res) {
        for (let i = 0; i < 20; i++) {
            const px = x + Math.random() * size;
            const py = y + Math.random() * size;
            const r = Math.random() * (res > 2048 ? 1 : 2);

            this.ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#ff9900";
            this.ctx.globalAlpha = Math.random() * 0.2;

            this.ctx.beginPath();
            this.ctx.arc(px, py, r, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    renderQuantum(x, y, size) {
        this.ctx.strokeStyle = "#00ffff";
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
        for (let i = 0; i < 8; i++) {
            const w = Math.random() * size;
            const h = Math.random() * size;

            this.ctx.fillStyle = "#ff00ff";
            this.ctx.globalAlpha = 0.08;

            this.ctx.fillRect(
                x + Math.random() * (size - w),
                y + Math.random() * (size - h),
                w, h
            );
        }
    }

    renderFractal(x, y, size) {
        this.ctx.strokeStyle = "#00ff88";
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
        this.ctx.globalAlpha = 1;

        // Scanlines
        this.ctx.fillStyle = "rgba(0,0,0,0.1)";
        for (let i = 0; i < res; i += 4) {
            this.ctx.fillRect(0, i, res, 1);
        }

        // Vignette
        const g = this.ctx.createRadialGradient(
            res / 2, res / 2, res / 4,
            res / 2, res / 2, res
        );
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(1, "rgba(0,0,0,0.4)");

        this.ctx.fillStyle = g;
        this.ctx.fillRect(0, 0, res, res);

        // Glow
        this.ctx.globalCompositeOperation = "overlay";
        this.ctx.fillStyle = "rgba(0,255,255,0.05)";
        this.ctx.fillRect(0, 0, res, res);

        // Reset
        this.ctx.globalCompositeOperation = "source-over";
    }
}

// ==========================================
// AUTO WIDGET
// ==========================================
const initCosmosWidget = () => {
    console.log("✨ Cosmos Hyper-Precision Widget Active ✨");

    const engine = new HyperEngine();
    const images = document.querySelectorAll("img[data-cosmos-upscale='true']");

    images.forEach(async (img) => {
        if (img.dataset.cosmosProcessed === "true") return;

        img.dataset.cosmosProcessed = "true";

        const res = parseInt(img.dataset.cosmosRes || "1024");
        const algo = img.dataset.cosmosAlgo || "ATOMIC";

        // Loading effect
        img.style.opacity = "0.6";
        img.style.filter = "blur(4px) grayscale(50%)";
        img.style.transition = "0.4s ease";

        await new Promise(r => img.complete ? r() : img.onload = r);

        const result = await engine.generate(res, algo, img);

        if (result) {
            img.src = result;    // LIVE REPLACEMENT
        }

        // Reveal final
        img.style.opacity = "1";
        img.style.filter = "none";
    });
};

// Auto-run
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCosmosWidget);
} else {
    initCosmosWidget();
}

export { HyperEngine, initCosmosWidget };

</script>
 
</div>
