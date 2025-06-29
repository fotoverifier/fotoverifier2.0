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

## Selected Research & Literature

1. [Enhancing Medical Image Quality Using Fractional Order Denoising Integrated with Transfer Learning]  
- Introduces the ETLFOD method, combining transfer learning and fractional order denoising to improve medical image quality while preserving details; demonstrates superior accuracy compared to traditional denoising approaches.  
- Src: https://www.mdpi.com/2504-3110/8/9/511

2. [Image Denoising using Wavelet Transformer]  
- Provides a comprehensive review of traditional (filters, statistical) and modern (machine learning) denoising methods, comparing their strengths, weaknesses, and practical applications across imaging fields.  
- Src: https://www.ijisrt.com/image-denoising-using-wavelet-transformer

3. [Learning Raw Image Denoising With Bayer Pattern Unification and Bayer Preserving Augmentation]  
- Proposes new data pre-processing and augmentation techniques for deep neural network-based raw image denoising, achieving state-of-the-art results by unifying Bayer patterns and preserving raw image structure during augmentation.  
- Src: https://ieeexplore.ieee.org/document/9025466/

4. [Automated Denoising of Diabetic Retinopathy Images for Enhanced Medical Diagnosis]  
- Evaluates four denoising filters (guided, Gaussian-bilateral, Gabor, Haar Wavelet) on diabetic retinopathy datasets, finding guided image filtering most effective for improving lesion visibility and overall image quality.  
- Src: https://ieeexplore.ieee.org/document/10574928/

---

