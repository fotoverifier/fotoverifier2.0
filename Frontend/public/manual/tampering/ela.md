<div class="text-4xl font-bold text-black  p-6 rounded mb-8">
  Error Level Analysis (ELA)
</div>

---

# Definition

Error Level Analysis (ELA) is a digital image forensics technique that identifies regions with different levels of compression error.  
It is useful for detecting image manipulations such as pasting or cloning objects.

---

# Example

If a JPEG image is saved multiple times, the compression error across regions should be consistent. Edited areas will typically show higher or lower error levels, making them stand out in an ELA heatmap.

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr><th align="left">Region</th><th align="left">Compression Error Level</th><th align="left">Interpretation</th></tr>
  <tr><td>Uniform Background</td><td>Low</td><td>Likely untouched</td></tr>
  <tr><td>Inserted Object</td><td>High</td><td>Possible manipulation</td></tr>
  <tr><td>Text Overlay</td><td>Medium</td><td>Expected due to sharp edges</td></tr>
</table>

---

# Technical Details

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr><th align="left">Aspect</th><th align="left">Description</th></tr>
  <tr>
    <td><strong>Basis</strong></td>
    <td>JPEG images lose data when saved; ELA re-compresses and compares differences</td>
  </tr>
  <tr>
    <td><strong>Visualization</strong></td>
    <td>Pixel-wise absolute difference is often color-coded (heatmap)</td>
  </tr>
  <tr>
    <td><strong>Tools</strong></td>
    <td>jpeg-ela, forensically.io, Python PIL-based scripts</td>
  </tr>
  <tr>
    <td><strong>Limitations</strong></td>
    <td>Ineffective on non-JPEG or heavily recompressed files</td>
  </tr>
  <tr>
    <td><strong>File Type</strong></td>
    <td>Works best with JPEG; may fail with PNG or WebP</td>
  </tr>
</table>

---

# Source

- [Original ELA Concept – Dr. Neal Krawetz](https://www.hackerfactor.com/blog/index.php?/archives/529-Error-Level-Analysis.html)
- [Forensically.io – Online ELA Tool](https://29a.ch/photo-forensics/#error-level-analysis)
- [GitHub – JPEG-ELA Python](https://github.com/dalmia/ELA)

---

> ✅ *ELA is most effective on JPEG files and should be interpreted alongside other forensic tools.*
