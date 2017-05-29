export const calculateStepLine = (x1, y1, x2, y2) => {
  let points = [];
  if (Math.abs(x2 - x1) >= Math.abs(y2 - y1)) {
    if (x1 > x2) {
      const bufX = x1, bufY = y1;
      x1 = x2; y1 = y2;
      x2 = bufX; y2 = bufY;
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    for (let x = x1; x < x2; ++x) {
      const y = y1 + dy * (x - x1) / dx;
      points.push([Math.floor(x), Math.floor(y)]);
    }
  } else {
    if (y1 > y2) {
      const bufX = x1, bufY = y1;
      x1 = x2; y1 = y2;
      x2 = bufX; y2 = bufY;
    }
    const dx = x2 - x1;
    const dy = y2 - y1;
    for (let y = y1; y < y2; ++y) {
      const x = x1 + dx * (y - y1) / dy;
      points.push([Math.round(x), Math.round(y)]);
    }
  }
  return points;
};

export const calculateDdaLine = (x1, y1, x2, y2) => {
  const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  let x = x1, y = y1, dx = (x2 - x1) / steps, dy = (y2 - y1) / steps;
  let points = [];
  for (let i = 0; i < steps; ++i) {
      points.push([Math.round(x), Math.round(y)]);
      x += dx; y += dy;
  }
  return points;
};

// export const calculateStepLine = (x1, y1, x2, y2) => {
//   let x = x1;
//   let y = y1;
//   let k = (y - y2) / (x - x2);
//   let b = y - k * x;
//   let points = [];
//   points.push([x, y]);
//   while (x != x2) {
//     if (x2 > x) {
//       x++;
//     } else {
//       x--;
//     }
//     let newY = Math.round(k * x + b);
//     while (y != newY) {
//       if (newY > y) {
//         y++;
//       } else {
//         y--;
//       }
//       points.push([x, y]);
//     }
//   }
//   return points;
// };

export const calculateCircle = (x1, y1, r) => {
  let x = 0;
  let y = r;
  let points = [];
  points.push([x1 - x, y1 - y]);
  points.push([x1 + x, y1 + y]);
  points.push([x1 - x, y1 + y]);
  points.push([x1 + x, y1 - y]);
  while (y > 0) {
    const xr = x + 1;
    const xv = x;
    const xd = x + 1;
    const yr = y;
    const yv = y - 1;
    const yd = y - 1;
    const diffR = Math.abs(xr * xr + yr * yr - r * r);
    const diffV = Math.abs(xv * xv + yv * yv - r * r);
    const diffD = Math.abs(xd * xd + yd * yd - r * r);
    if (diffR < diffD && diffR < diffV) {
      x = xr;
      y = yr;
      points.push([x1 - x, y1 - y]);
      points.push([x1 + x, y1 + y]);
      points.push([x1 - x, y1 + y]);
      points.push([x1 + x, y1 - y]);
    } else if (diffV < diffD && diffV < diffD) {
      x = xv;
      y = yv;
      points.push([x1 - x, y1 - y]);
      points.push([x1 + x, y1 + y]);
      points.push([x1 - x, y1 + y]);
      points.push([x1 + x, y1 - y]);
    } else {
      x = xd;
      y = yd;
      points.push([x1 - x, y1 - y]);
      points.push([x1 + x, y1 + y]);
      points.push([x1 - x, y1 + y]);
      points.push([x1 + x, y1 - y]);
    }
  }
  return points;
};
