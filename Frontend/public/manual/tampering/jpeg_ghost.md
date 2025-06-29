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

## Selected Research & Literature: JPEG Ghost

1. [Image Forgery Detection and Localization using Modified JPEG Ghost]  
- Describes a technique for detecting and localizing image forgery in JPEGs by analyzing compression artifacts, especially after multiple compressions. Modified JPEG Ghost detection is used to identify and pinpoint manipulated regions based on disparities in JPEG block alignment.  
- Src: https://www.ijitee.org/portfolio-item/I8247078919/

2. [Detection of JPEG Ghost in Non-Aligned Spliced Region of JPEG Images]  
- Explores JPEG Ghost as a forensic method for exposing image splicing, especially when copied regions have lower compression quality. Discusses challenges and recovery when spliced regions are not grid-aligned.  
- Src: http://www.ijert.org/view-pdf/13990/detection-of-jpeg-ghost-in-non-aligned-spliced-region-of-jpeg-images

3. [Error Level Analysis Technique for Identifying JPEG Block Unique Signature for Digital Forensic Analysis]  
- Presents a technique using Error Level Analysis (ELA) to identify unique JPEG 8×8 block signatures, aiding in the detection of JPEG fragments and supporting digital forensic investigations.  
- Src: https://www.mdpi.com/2079-9292/11/9/1468

---

