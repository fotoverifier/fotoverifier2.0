<div class="text-4xl font-bold text-black p-6 rounded mb-8">
  Denoising: Salt-and-Pepper Noise
</div>

---

# Definition

Salt-and-pepper noise is a form of impulse noise that appears as randomly scattered black and white pixels.  
It typically results from sensor malfunctions, transmission errors, or memory corruption during image processing.

This noise degrades image quality and is especially problematic in medical imaging, surveillance, and document scans.

---

# Example

In a grayscale image:

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr>
    <th align="left">Pixel Type</th>
    <th align="left">Intensity Value</th>
    <th align="left">Appearance</th>
  </tr>
  <tr>
    <td>Normal Pixel</td>
    <td>0–255</td>
    <td>Original detail</td>
  </tr>
  <tr>
    <td>Salt Noise</td>
    <td>255</td>
    <td>Bright white speck</td>
  </tr>
  <tr>
    <td>Pepper Noise</td>
    <td>0</td>
    <td>Dark black speck</td>
  </tr>
</table>

---

# Technical Details

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr>
    <th align="left">Method</th>
    <th align="left">Description</th>
  </tr>
  <tr>
    <td><strong>Median Filtering</strong></td>
    <td>Common method that replaces each pixel with the median of its neighborhood</td>
  </tr>
  <tr>
    <td><strong>Adaptive Filters</strong></td>
    <td>Adjust kernel size based on local variation and noise density</td>
  </tr>
  <tr>
    <td><strong>Morphological Ops</strong></td>
    <td>Erosion and dilation can remove isolated black or white pixels</td>
  </tr>
  <tr>
    <td><strong>Trade-offs</strong></td>
    <td>Over-filtering may blur fine details or textures</td>
  </tr>
</table>

---

# Source

- [Wikipedia – Salt-and-pepper noise](https://en.wikipedia.org/wiki/Salt-and-pepper_noise)
- [OpenCV Docs – Image Filtering](https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html)
- [Scikit-Image: Noise Reduction](https://scikit-image.org/docs/stable/auto_examples/filters/plot_rank_filters.html)

---

> ✅ *Effective denoising improves visual clarity and preserves critical image details.*
