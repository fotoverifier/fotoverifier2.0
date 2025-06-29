<div class="text-4xl font-bold text-black">
  JPEG Ghost Detection
</div>

---

# Definition

JPEG Ghost Detection is a forensic technique used to identify regions in an image that have undergone different compression histories.  
It helps expose splicing or tampering by analyzing inconsistencies in JPEG compression artifacts.

---

# Example

Suppose an original image is saved at quality 95, and a region is later inserted and re-saved at quality 75. JPEG ghost detection may reveal this through heatmaps or residual differences.

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr>
    <th align="left">Region</th>
    <th align="left">Compression Quality</th>
    <th align="left">Observed Ghosting</th>
  </tr>
  <tr>
    <td>Original Area</td>
    <td>95</td>
    <td>None</td>
  </tr>
  <tr>
    <td>Tampered Area</td>
    <td>75</td>
    <td>Visible ghosting</td>
  </tr>
</table>

---

# Technical Details

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr>
    <th align="left">Aspect</th>
    <th align="left">Description</th>
  </tr>
  <tr>
    <td><strong>Compression History</strong></td>
    <td>Ghost detection relies on mismatches between primary and secondary quantization tables.</td>
  </tr>
  <tr>
    <td><strong>Analysis Tools</strong></td>
    <td>Often visualized with residual maps, highlighting suspect areas.</td>
  </tr>
  <tr>
    <td><strong>Limitations</strong></td>
    <td>Less effective when recompressed with similar quality or aggressive smoothing.</td>
  </tr>
  <tr>
    <td><strong>Output</strong></td>
    <td>Binary map or heatmap showing likelihood of inconsistency.</td>
  </tr>
</table>

---

# Source

- [JPEG Ghost Detection Paper (Hsu et al.)](https://www.cs.dartmouth.edu/farid/publications/hsu06b.pdf)
- [OpenCV Forensics Guide](https://docs.opencv.org/)
- [Image Forensics Blog](https://www.imageforensics.org/techniques/jpeg-ghost/)

---

> ✅ *JPEG Ghost detection helps uncover hidden edits that might otherwise go unnoticed.*
