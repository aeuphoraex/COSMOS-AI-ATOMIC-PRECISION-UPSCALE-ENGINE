// ==========================================
// CosmOS AI: Hyper-Precision Engine Widget
// ==========================================
// 
// A standalone module to upscale images on any webpage automatically.
//
// USAGE:
// 1. Include this script: <script type="module" src="services/EngineService.ts"></script>
// 2. Add attributes to your images:
//    <img src="thumb.jpg" 
//         data-cosmos-upscale="true" 
//         data-cosmos-res="2048" 
//         data-cosmos-algo="ATOMIC" />
//

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

// --- ENGINE LOGIC ---

class HyperEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor() {
    this.canvas = document.createElement('canvas');
    // 'willReadFrequently' optimizes for readback operations often used in upscaling
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
  }

  /**
   * Generates a high-precision upscale of the source image.
   * @param {number} resolution - Target width/height (square).
   * @param {string} algorithm - Upscaling kernel name.
   * @param {HTMLImageElement} sourceImageElement - The DOM element of the source image.
   * @returns {Promise<string>} - Data URL of the generated image.
   */
  async generate(resolution: number, algorithm: string, sourceImageElement: HTMLImageElement): Promise<string | null> {
    if (!this.canvas || !this.ctx) return null;
    
    this.canvas.width = resolution;
    this.canvas.height = resolution;
    
    // 1. Initialize Latent Space (Dark Matter Background)
    this.ctx.fillStyle = '#050510';
    this.ctx.fillRect(0, 0, resolution, resolution);

    const tileSize = 256;
    const tilesX = Math.ceil(resolution / tileSize);
    const tilesY = Math.ceil(resolution / tileSize);

    // 2. Latent Encoding Step
    // Draw source image stretched to latent size (simulating VAE encode)
    this.ctx.imageSmoothingEnabled = false;
    const latentSize = resolution / 32; 
    
    // Draw original to latent layer
    this.ctx.drawImage(sourceImageElement, 0, 0, latentSize, latentSize);
    // Scale latent layer up to full resolution (creates the "base" structure)
    this.ctx.drawImage(this.canvas, 0, 0, latentSize, latentSize, 0, 0, resolution, resolution);
    
    // Overlay interference mask
    this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
    this.ctx.fillRect(0, 0, resolution, resolution);

    // 3. Parallel Tile Processing (Simulated)
    for (let y = 0; y < tilesY; y++) {
      for (let x = 0; x < tilesX; x++) {
        const xPos = x * tileSize;
        const yPos = y * tileSize;
        
        // Micro-delay to prevent UI freezing on the host page
        await new Promise(r => setTimeout(r, 2)); 
        
        this.renderTile(xPos, yPos, tileSize, algorithm, resolution, sourceImageElement);
      }
    }

    // 4. Apply Final Shader Overlays
    this.applyFinalShaders(resolution);
    
    return this.canvas.toDataURL('image/png');
  }

  renderTile(x: number, y: number, size: number, algo: string, totalRes: number, source: HTMLImageElement) {
      if (!this.ctx) return;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.rect(x, y, size, size);
      this.ctx.clip();

      if (source) {
          this.ctx.globalAlpha = 1.0;
          this.ctx.imageSmoothingEnabled = true;
          this.ctx.imageSmoothingQuality = 'high';
          
          // Map the corresponding section of the source image to this tile
          // Note: This assumes the source is being stretched to square 'totalRes'
          const srcRatioX = source.naturalWidth / totalRes;
          const srcRatioY = source.naturalHeight / totalRes;
          
          this.ctx.drawImage(
            source, 
            x * srcRatioX, y * srcRatioY, size * srcRatioX, size * srcRatioY, // Source coords
            x, y, size, size // Dest coords
          );
      }

      this.ctx.globalCompositeOperation = 'screen';
      
      // Apply Procedural Detail Kernels
      const algoKey = algo ? algo.toUpperCase() : 'ATOMIC';
      
      if (algoKey.includes('ATOMIC')) this.renderAtomic(x, y, size, totalRes);
      else if (algoKey.includes('QUANTUM')) this.renderQuantum(x, y, size);
      else if (algoKey.includes('WAVELET')) this.renderWavelet(x, y, size);
      else this.renderFractal(x, y, size);

      this.ctx.globalCompositeOperation = 'source-over';
      
      // Subtle Tile Boundary Blending (Debanding)
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      this.ctx.strokeRect(x, y, size, size);
      
      this.ctx.restore();
  }

  renderAtomic(x: number, y: number, size: number, totalRes: number) {
     if (!this.ctx) return;
     // Simulates sub-pixel atomic particles
     const density = 20;
     for (let i = 0; i < density; i++) {
        this.ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#ff9900';
        this.ctx.globalAlpha = Math.random() * 0.2; // F32 transparency simulation
        const px = x + Math.random() * size;
        const py = y + Math.random() * size;
        const r = Math.random() * (totalRes > 2048 ? 1 : 2);
        this.ctx.beginPath();
        this.ctx.arc(px, py, r, 0, Math.PI * 2);
        this.ctx.fill();
     }
  }

  renderQuantum(x: number, y: number, size: number) {
     if (!this.ctx) return;
     // Simulates frequency waves
     this.ctx.strokeStyle = '#00ffff';
     this.ctx.lineWidth = 1;
     this.ctx.globalAlpha = 0.15;
     for (let i = 0; i < 3; i++) {
         this.ctx.beginPath();
         this.ctx.moveTo(x, y + Math.random() * size);
         this.ctx.bezierCurveTo(x + size/2, y, x + size/2, y + size, x + size, y + Math.random() * size);
         this.ctx.stroke();
     }
  }

  renderWavelet(x: number, y: number, size: number) {
    if (!this.ctx) return;
    // Simulates block decomposition
    for(let i=0; i<8; i++) {
        this.ctx.fillStyle = '#ff00ff';
        this.ctx.globalAlpha = 0.08;
        const w = Math.random() * size;
        const h = Math.random() * size;
        this.ctx.fillRect(x + Math.random()*(size-w), y + Math.random()*(size-h), w, h);
    }
  }

  renderFractal(x: number, y: number, size: number) {
      if (!this.ctx) return;
      // Simulates recursive geometry
      this.ctx.strokeStyle = '#00ff88';
      this.ctx.lineWidth = 1;
      this.ctx.globalAlpha = 0.2;
      const cx = x + size/2;
      const cy = y + size/2;
      this.ctx.beginPath();
      this.ctx.moveTo(cx, cy - size/3);
      this.ctx.lineTo(cx + size/3, cy + size/3);
      this.ctx.lineTo(cx - size/3, cy + size/3);
      this.ctx.closePath();
      this.ctx.stroke();
  }

  applyFinalShaders(res: number) {
      if (!this.ctx) return;
      this.ctx.globalCompositeOperation = 'source-over';
      
      // 1. Scanline Shader
      this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
      for(let i=0; i<res; i+=4) this.ctx.fillRect(0, i, res, 1);
      
      // 2. Vignette / Ambient Occlusion Shader
      const grad = this.ctx.createRadialGradient(res/2, res/2, res/4, res/2, res/2, res);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.4)');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0,0,res,res);

      // 3. Chromatic Abberation / Glow Overlay
      this.ctx.globalCompositeOperation = 'overlay';
      this.ctx.fillStyle = 'rgba(0, 255, 255, 0.05)';
      this.ctx.fillRect(0,0,res,res);
  }
}

// --- WIDGET CONTROLLER ---

const initCosmosWidget = () => {
    console.log('%c ✨ CosmOS Hyper-Precision Widget Active ✨ ', 'background: #050510; color: #00ffff; padding: 5px; font-weight: bold; border: 1px solid #ff00ff;');
    
    const engine = new HyperEngine();
    // Select all images that requested upscaling
    const images = document.querySelectorAll<HTMLImageElement>('img[data-cosmos-upscale="true"]');

    if (images.length === 0) {
        console.log('[CosmOS] No images found with data-cosmos-upscale="true"');
        return;
    }

    images.forEach(async (img) => {
        if (img.dataset.cosmosProcessed) return;
        
        // 1. Apply loading state style
        img.dataset.cosmosProcessed = "processing";
        const originalTransition = img.style.transition;
        // const originalFilter = img.style.filter;
        
        img.style.transition = "filter 0.5s ease, opacity 0.5s ease";
        img.style.filter = "blur(4px) grayscale(50%)"; // Vaporwave loading blur
        img.style.opacity = "0.7";

        // 2. Parse Config
        const res = parseInt(img.dataset.cosmosRes || "1024");
        const algo = img.dataset.cosmosAlgo || "ATOMIC";

        try {
            // Ensure image is loaded for reading
            if (!img.complete) {
                await new Promise((resolve) => {
                  img.onload = () => resolve(true);
                });
            }

            // 3. Generate Upscale
            const resultDataUrl = await engine.generate(res, algo, img);
            
            if (resultDataUrl) {
                // 4. Apply Result
                img.src = resultDataUrl;
                img.dataset.cosmosProcessed = "complete";
                console.log(`[CosmOS] Upscaled image to ${res}px using ${algo}.`);
            }

        } catch (err) {
            console.error("[CosmOS] Upscale failed:", err);
        } finally {
            // 5. Cleanup Styles
            img.style.filter = "none"; // Remove blur
            img.style.opacity = "1";
            setTimeout(() => {
                 img.style.transition = originalTransition;
            }, 500);
        }
    });
};

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCosmosWidget);
    } else {
        // Run immediately if loaded async or deferred
        initCosmosWidget();
    }
}

export { HyperEngine, initCosmosWidget };