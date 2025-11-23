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

<script type="module">
import('https://cdn.jsdelivr.net/gh/aeuphoraex/COSMOS-AI-ATOMIC-PRECISION-UPSCALE-ENGINE/EngineServiceFinalv1.01.js')
.then(module => {
const { HyperEngine } = module;

HyperEngine.prototype.upscaleAll = async function() {
console.log('[HyperEngine] upscaleAll function started.');
const nodeList = document.querySelectorAll('img[data-upscale="true"]');
if (nodeList.length === 0) {
console.log('[HyperEngine] No images found with data-upscale="true"');
return;
}
for (let i = 0; i < nodeList.length; i++) {
const img = nodeList[i];
const statusEl = document.getElementById(`status-${img.id}`);
if (img.dataset.cosmosProcessed) continue;

statusEl.textContent = 'Converting to blob...';
statusEl.style.color = '#ff9900';

try {
const blob = await fetch(img.src, { mode: 'cors' }).then(response => response.blob());
const blobImg = new Image();
blobImg.crossOrigin = 'anonymous';

await new Promise((resolve, reject) => {
blobImg.onload = resolve;
blobImg.onerror = () => reject(new Error('Failed to load blob as image'));
blobImg.src = URL.createObjectURL(blob);
});

statusEl.textContent = 'Upscaling...';
img.dataset.cosmosProcessed = "processing";

const originalTransition = img.style.transition;
img.style.transition = "filter 0.5s ease, opacity 0.5s ease";
img.style.filter = "blur(4px) grayscale(50%)";
img.style.opacity = "0.7";

const scale = parseInt(img.dataset.scale || "2");
const sourceWidth = blobImg.naturalWidth || blobImg.width;
const targetWidth = sourceWidth * scale;
const algo = "ATOMIC";

console.log(`[HyperEngine] Upscaling image #${img.id} to ${targetWidth}px...`);
const resultDataUrl = await this.generate(targetWidth, algo, blobImg);

if (resultDataUrl) {
img.src = resultDataUrl;
img.dataset.cosmosProcessed = "complete";
statusEl.textContent = `Upscaled ${scale}x successfully`;
statusEl.style.color = '#00cc00';
console.log(`[HyperEngine] Successfully upscaled image #${img.id}.`);
}

img.style.filter = "none";
img.style.opacity = "1";
setTimeout(() => { img.style.transition = originalTransition; }, 500);
URL.revokeObjectURL(blobImg.src);

} catch (err) {
console.error("[HyperEngine] Upscale failed for image:", img, err);
img.dataset.cosmosProcessed = "error";
statusEl.textContent = `Error: ${err.message}`;
statusEl.style.color = '#ff0000';
}
}
};

const engine = new HyperEngine();
document.getElementById('upscaleBtn').addEventListener('click', () => {
engine.upscaleAll();
});
console.log('Engine initialized and ready. Click the button to upscale images.');
})
.catch(err => {
console.error('Failed to load the HyperEngine module:', err);
});
</script>

</div>
