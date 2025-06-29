#  Error Level Analysis (ELA)


---

## Definition

**Error Level Analysis (ELA)** is a forensic technique that exposes inconsistencies in JPEG compression by comparing an image to a re-compressed version. Because JPEG recompression introduces small artifacts uniformly across untouched areas, regions that have been pasted, cloned, or heavily edited will exhibit different error levels and “pop” when visualized.

---

## Methodology (Overview)

1. **Recompress** the original JPEG at a known quality level (often between 90–95 %).  
2. **Compare** each pixel of the recompressed image to the original, measuring the absolute difference.  
3. **Visualize** those per-pixel differences as a heatmap—dark tones indicate low error (likely untouched), while bright tones indicate high error (possible edits).

---

## Example Interpretation

| **Region**           | **ELA Response** | **Interpretation**             |
|----------------------|------------------|--------------------------------|
| Uniform Background   | Low (dark)       | No sign of tampering          |
| Inserted Object      | High (bright)    | Likely manipulation           |
| Sharp Text or Edges  | Medium (mid-tone)| Expected due to recompression |

> In an unmodified JPEG, error levels remain consistent. Discrepant patches suggest regions saved or edited under different conditions.

---

## Common Tools

- **Forensically.io** – Web-based suite with ELA, noise analysis, clone detection.  
- **jpeg-ela** – Python scripts leveraging Pillow to automate recompression and diff.  
- **ImageMagick** – Command-line `convert` and `compare` for batch ELA workflows.  
- **OpenCV / MATLAB** – Custom implementations for advanced channel-wise analysis and batch processing.

---

## Strengths & Limitations

| **Aspect**           | **Notes**                                                                          |
|----------------------|------------------------------------------------------------------------------------|
| Applicability        | Best applied to original or minimally processed JPEGs.                              |
| False Positives      | Sharp edges, text overlays, heavy noise can mimic editing artifacts.                |
| Unsupported Formats  | Lossless formats (PNG, TIFF) and heavily recompressed JPEGs yield unreliable results. |
| Complementarity      | Should be paired with metadata checks and noise-pattern analysis for robust forensics. |

---

## Best Practices

- **Choose Quality Carefully**: Match the recompression quality to the original to maximize contrast in edited regions.  
- **Inspect Channels**: Examine individual R/G/B channels to reveal subtler discrepancies.  
- **Batch Review**: Automate ELA across large image sets to flag anomalies for manual inspection.  
- **Corroborate Findings**: Combine ELA with error-level clustering, PRNU (sensor noise) analysis, and metadata examination.

---

## References

- **Neal Krawetz**, “Error Level Analysis,” *Hacker Factor* blog  
  <https://www.hackerfactor.com/blog/index.php?/archives/529-Error-Level-Analysis.html>  
- **Forensically.io** – ELA module overview  
  <https://29a.ch/photo-forensics/#error-level-analysis>  
- **Stamm & Liu**, “Image Forgery Detection via JPEG Ghosts,” *ICASSP* 2010  
- **Li et al.**, “Digital Image Processing and Analysis for Image Forensics,” *IEEE Multimedia* 2016  

---

> ✅ *ELA is most effective on JPEG files and should be interpreted alongside other forensic methods.*  
