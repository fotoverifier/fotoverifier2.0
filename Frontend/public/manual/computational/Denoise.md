# Denoising: Salt-and-Pepper Noise

---

## Definition

Salt-and-pepper noise is a form of impulse noise that appears as randomly scattered black and white pixels.  
It typically results from sensor malfunctions, transmission errors, or memory corruption during image processing.

This noise degrades image quality and is especially problematic in medical imaging, surveillance, and document scans.

---

## Example

In a grayscale image:

| **Pixel Type**   | **Intensity Value** | **Appearance**        |
|------------------|---------------------|-----------------------|
| Normal Pixel     | 1–254               | Original detail       |
| Salt Noise       | 255                 | Bright white speck    |
| Pepper Noise     | 0                   | Dark black speck      |

---

## Technical Details

| **Method**             | **Description**                                                                 |
|------------------------|---------------------------------------------------------------------------------|
| **Median Filtering**   | Replaces each pixel with the median of its neighborhood to remove outliers.     |
| **Adaptive Filters**   | Adjust window size based on local variance and estimated noise density.         |
| **Morphological Ops**  | Use erosion followed by dilation (or vice versa) to eliminate isolated specks.  |
| **Trade-offs**         | Over-filtering may blur fine details or textures.                               |

---

## Common Algorithms

1. **Standard Median Filter**  
   - Window sizes of 3×3, 5×5, etc.  
   - Effective for low to moderate noise densities.

2. **Adaptive Median Filter**  
   - Dynamically grows the window until the median is not an impulse.  
   - Handles high noise densities without excessive blurring.

3. **Decision-Based Filters**  
   - Identify noisy pixels before filtering; leave uncorrupted pixels intact.  
   - Reduces unnecessary smoothing.

4. **Switching Median Filter**  
   - Switches between mean and median filtering based on local statistics.  
   - Balances detail preservation with noise removal.

---

## Strengths & Limitations

| **Aspect**             | **Notes**                                                                                  |
|------------------------|--------------------------------------------------------------------------------------------|
| **Effectiveness**      | Very effective at removing salt-and-pepper noise when noise density is under ~20 %.         |
| **Detail Preservation**| Adaptive and decision-based approaches better preserve edges and textures.                 |
| **Computational Cost** | Median and morphological filters are fast; adaptive methods incur higher per-pixel cost.   |
| **Artifacts**          | Over-aggressive filtering can create blockiness or loss of fine patterns.                  |

---

## References

- Wikipedia – Salt-and-pepper noise: <https://en.wikipedia.org/wiki/Salt-and-pepper_noise>  
- OpenCV Docs – Image Filtering: <https://docs.opencv.org/4.x/d4/d13/tutorial_py_filtering.html>  
- Scikit-Image: Noise Reduction: <https://scikit-image.org/docs/stable/auto_examples/filters/plot_rank_filters.html>

---

> ✅ *Effective denoising improves visual clarity while preserving critical image details.*  
