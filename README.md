#COSMOS AI: ATOMIC PRECISION UPSCALE ENGINE

A cutting-edge, client-side JavaScript engine for upscaling images directly in the browser. This project demonstrates a serverless approach to AI-powered image enhancement, leveraging advanced algorithms and modern web APIs to deliver stunning results without any backend processing.

KEY FEATURES

Serverless & Standalone: Runs entirely in the browser. No server, no API keys, no uploads required.
High-Resolution Upscaling: Supports a wide range of target resolutions, from 256x256 up to a massive 8192x8192 pixels.
Multiple AI-Inspired Algorithms: Choose from unique upscaling kernels like Atomic Super-Resolution, Quantum Frequency, and more.
Blob-Based Processing: Intelligently converts remote images to Blob objects to bypass CORS restrictions and ensure smooth processing.
Beautiful Web 2.0 Demos: Includes both a simple widget and a hyper-advanced, interactive demo showcasing all features.
Zero Dependencies: The demos are self-contained HTML files that dynamically load the core engine from a CDN.

LIVE DEMO

See the engine in action with our interactive demos!

QUICK START
The easiest way to see the engine work is to run one of the demos locally. No installation needed!

Clone or download this repository.

git clone https://github.com/aeuphoraex/COSMOS-AI-ATOMIC-PRECISION-UPSCALE-ENGINE.git

Open a demo file in your favorite modern web browser (Chrome, Firefox, Safari, Edge).

Core Engine (EngineServiceFinalv1.01.js): The heart of the upscaling logic is hosted on a CDN (jsDelivr). It contains the HyperEngine class with methods for tile-based rendering, procedural detail generation, and final shader effects.

Controller (The HTML File): The standalone HTML file acts as the controller. It dynamically imports the remote engine.

Dynamic Method Extension: Since the core engine is a generic module, the HTML file cleverly adds the missing upscaleAll method to the HyperEngine class at runtime. This allows the core engine to remain lightweight while the demos provide the specific implementation logic.

Blob Conversion: To handle images from different origins (like Picsum Photos) without running into CORS errors, the demo first fetches the image, converts it into a Blob, and then creates a local Image object from that Blob. This ensures the engine has full, unrestricted access to the pixel data.

USAGE
To upscale an image on your own page, simply add the data-upscale attribute to any <img> tag.

<img src="path/to/your/image.jpg"
data-upscale="true"
data-scale="4"
crossorigin="anonymous">

Attributes: 

data-upscale="true" (Required): Flags the image to be processed by the engine.

data-scale="N" (Optional): The integer scale factor (e.g., 2 for 2x, 4 for 4x). Defaults to 2.

crossorigin="anonymous" (Recommended): Required for fetching images from external domains (CDNs).

Then, import the engine and call the upscaleAll() method:

<script type="module">
  import { HyperEngine } from "https://cdn.jsdelivr.net/gh/aeuphoraex/COSMOS-AI-ATOMIC-PRECISION-UPSCALE-ENGINE/EngineServiceFinalv1.01.js";
  const engine = new HyperEngine();
  engine.upscaleAll(); // See our demos for the full implementation of this method
</script>

Atomic Super-Resolution (ATOMIC): Simulates sub-pixel atomic particles for sharp, detailed enhancements. (Default)
Quantum Frequency (QUANTUM): Applies frequency wave patterns for a smooth, almost liquid-like detail reconstruction.
Wavelet Decomposition (WAVELET): Uses block-based decomposition to add structural detail and texture.
Fractal Upsampling (FRACTAL): Employs recursive geometric patterns for a unique, artistic enhancement.

TROUBLESHOOTING & FAQ
Q: I get an error: Uncaught TypeError: engine.upscaleAll is not a function
A: This error occurs if the upscaleAll method hasn't been defined. The core engine file on the CDN does not include it by design. You must use one of the provided demo HTML files, as they contain the necessary code to dynamically add this method to the HyperEngine class.

Q: I get a CORS error when trying to process an image.
A: This is a common browser security issue. Our demos solve this by: Adding the crossorigin="anonymous" attribute to the <img> tag. Using fetch() to convert the image into a Blob before processing. Ensure you are following this pattern for any external images.

Q: The upscaling process is slow.
A: The engine performs complex calculations on the client side. Processing time depends on:

The target resolution (8192x8192 will take significantly longer than 1024x1024).
The power of your device's CPU/GPU.
The number of images being processed concurrently.
The engine includes micro-delays to prevent the browser UI from freezing.

LICENSE
Distributed under the MIT License. See LICENSE for more information.
