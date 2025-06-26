<div class="text-4xl font-bold text-black p-6 rounded mb-8">
  Edge Detection
</div>

---

# Definition

Edge detection is an image processing technique used to identify boundaries or transitions in brightness between different regions in an image.  
It highlights areas with sharp intensity changes, which often correspond to object outlines or texture changes.

Edge detection is fundamental in computer vision tasks like segmentation, object recognition, and image registration.

---

# Example

In a grayscale image of a face, edge detection can reveal:

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr>
    <th align="left">Feature</th>
    <th align="left">Edge Highlight</th>
  </tr>
  <tr>
    <td>Jawline</td>
    <td>Strong</td>
  </tr>
  <tr>
    <td>Eye contour</td>
    <td>Medium</td>
  </tr>
  <tr>
    <td>Cheek interior</td>
    <td>Weak/none</td>
  </tr>
</table>

Edges are typically visualized as white lines on a black background, marking abrupt intensity transitions.

---

# Technical Details

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr>
    <th align="left">Operator</th>
    <th align="left">Description</th>
  </tr>
  <tr>
    <td><strong>Sobel</strong></td>
    <td>Detects edges by calculating gradient magnitude in horizontal/vertical directions</td>
  </tr>
  <tr>
    <td><strong>Prewitt</strong></td>
    <td>Similar to Sobel but with different kernel coefficients</td>
  </tr>
  <tr>
    <td><strong>Canny</strong></td>
    <td>Multi-stage detector that includes noise reduction and edge thinning</td>
  </tr>
  <tr>
    <td><strong>Laplacian</strong></td>
    <td>Uses second derivative; highlights regions of rapid intensity change</td>
  </tr>
</table>

Edge detection often involves grayscale conversion and may be sensitive to noise, which can result in false edges.

---

# Source

- [Wikipedia – Edge Detection](https://en.wikipedia.org/wiki/Edge_detection)
- [Computer Vision: Edge Concepts](https://www.sciencedirect.com/topics/computer-science/edge-detection)
- [OpenCV Documentation – Edge Detection](https://docs.opencv.org/4.x/da/d22/tutorial_py_canny.html)

---

> ✅ *Edge detection is a core step in extracting structure and meaning from images.*
