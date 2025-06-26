<div class="text-4xl font-bold text-black p-6 rounded mb-8">
  Color Filter Array (CFA)
</div>

---

# Definition

A Color Filter Array (CFA) is a mosaic of color filters placed over the pixels of an image sensor.  
It allows the sensor to capture color information by filtering light into separate red, green, and blue components.

CFA is essential in digital cameras because image sensors (like CMOS or CCD) detect only brightness — not color — without a color filter.

---

# Example

The Bayer filter is the most common CFA layout. It uses a repeating 2×2 pattern of green, red, and blue filters.

<table style="width:100%; border-collapse: separate; border-spacing: 0.5em;">
  <tr>
    <th align="left">Pattern</th>
    <th align="left">Description</th>
  </tr>
  <tr>
    <td>RGGB</td>
    <td>2 green, 1 red, 1 blue – most widely used Bayer CFA layout</td>
  </tr>
  <tr>
    <td>GRBG / GBRG / BGGR</td>
    <td>Alternative Bayer arrangements based on sensor design</td>
  </tr>
  <tr>
    <td>X-Trans</td>
    <td>Fuji’s proprietary CFA with 6×6 pattern to reduce moiré</td>
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
    <td><strong>Purpose</strong></td>
    <td>Enable color image capture using monochrome sensors</td>
  </tr>
  <tr>
    <td><strong>Common Types</strong></td>
    <td>Bayer (RGGB), X-Trans, CMY filters</td>
  </tr>
  <tr>
    <td><strong>Demosaicing</strong></td>
    <td>Process of interpolating missing color information from CFA data</td>
  </tr>
  <tr>
    <td><strong>Drawbacks</strong></td>
    <td>Aliasing, moiré, and false color artifacts if not properly processed</td>
  </tr>
</table>

---

# Source

- [Bayer Filter Explanation – Cambridge in Colour](https://www.cambridgeincolour.com/tutorials/camera-sensors.htm)
- [X-Trans Sensor – Fujifilm](https://fujifilm-x.com/global/technology/x-trans-sensor/)
- [Wikipedia: Color Filter Array](https://en.wikipedia.org/wiki/Color_filter_array)

---

> ✅ *CFA technology enables color imaging by combining hardware filtering and software reconstruction.*
