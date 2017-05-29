export const isValidRgb = (rgbColor) => {
  if (!rgbColor) {
    return false;
  }
  if (rgbColor.r < 0 || rgbColor.r > 255 || (!rgbColor.r && rgbColor.r !== 0)) {
    return false;
  }
  if (rgbColor.g < 0 || rgbColor.g > 255 || (!rgbColor.g && rgbColor.g !== 0)) {
    return false;
  }
  if (rgbColor.b < 0 || rgbColor.b > 255 || (!rgbColor.b && rgbColor.b !== 0)) {
    return false;
  }
  return true;
}

const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// export const hsvToRgb = (h, s, v) => {
// 	let hi = Math.floor(h / 60),
// 		  vmin = (100 - s) * v / 100,
// 		  a = (v - vmin) * (h % 60) / 60,
// 		  vinc = vmin + a,
// 		  vdec = v - a, r, g, b;
// 		switch(hi){
// 			case 0:
// 			    r = v; g = vinc; b = vmin;
// 			break;
// 			case 1:
// 			    r = vdec; g = v; b = vmin;
// 			break;
// 			case 2:
// 			    r = vmin; g = v; b = vinc;
// 			break;
// 			case 3:
// 			    r = vmin; g = vdec; b = v;
// 			break;
// 			case 4:
// 			    r = vinc; g = vmin; b = v;
// 			break;
// 			case 5:
// 			    r = v; g = vmin; b = vdec;
// 			break;
// 		}
// 		return { r: Math.round(r / 100), g: Math.round(g / 100), b: Math.round(b / 100)};
// };
//
// export const rgbToHsv = (r, g, b) => {
// 	let min = Math.min(r, g, b),
// 		  max = Math.max(r, g, b),
// 		  diff = max - min, h, s, v;
//
// 		if (max === min) {
// 			h = 0;
// 		} else if (r === max) {
// 			h = 60 * (g - b) / diff;
// 			if (g < b) {
// 				h += 360;
// 			}
// 		} else if (g === max) {
// 			h = 60 * (b - r) / diff + 120;
// 		} else if(b == max) {
// 			h = 60 * (r - g) / diff + 240;
// 		}
//
// 		s = (max === 0 ? 0 : 1 - min / max) * 100;
// 		v = max * 100;
//
// 		return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
// };

export const rgbToHsv = (r, g, b) => {
  r /= 255, g /= 255, b /= 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;

  let d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return { h: h, s: s, v: v };
}

export const hsvToRgb = (h, s, v) => {
  let r, g, b;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export const rgbToCmy = (r, g, b) => {
  const cmyColor = {
    c: 1 - (r / 255),
    m: 1 - (g / 255),
    y: 1 - (b / 255),
  };
  return  cmyColor;
}

export const cmyToRgb = (c, m, y) => {
  const rgbColor = {
    r: Math.round((1 - c) * 255),
    g: Math.round((1 - m) * 255),
    b: Math.round((1 - y) * 255),
  }

  return rgbColor;
}

const rgbToXyz = (r, g, b) => {
  var r = r / 255;
	var g = g / 255;
	var b = b / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return { x: x * 100, y: y * 100, z: z * 100 };
}

const xyzToRgb = (x, y, z) => {
  var x = x / 100;
	var y = y / 100;
	var z = z / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

const xyzToLab = (x, y, z) => {
  var x = x;
	var y = y;
	var z = z;
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return { l: l, a: a, b: b };
}

const labToXyz = (l, a, b) => {
  var l = l;
	var a = a;
	var b = b;
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return { x: x, y: y, z: z };
}

export const rgbToLab = (r, g, b) => {
  var xyz = rgbToXyz(r, g, b);
  var x = xyz.x;
  var y = xyz.y;
  var z = xyz.z;
  var l;
  var a;
  var b;

  x /= 95.047;
  y /= 100;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

  l = (116 * y) - 16;
  a = 500 * (x - y);
  b = 200 * (y - z);

  return { l: Math.round(l), a: Math.round(a), b: Math.round(b) };
}

export const labToRgb = (l, a, b) => {
  const xyzColor = labToXyz(l, a, b);
  const rgbColor = xyzToRgb(xyzColor.x, xyzColor.y, xyzColor.z);
  return rgbColor;
}
