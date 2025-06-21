export function getColorFromDiffucultyFloat(level: number): string {
  // Define color stops for each range
  const colors = [
    { value: 1, color: [135, 206, 235] }, // Sky
    { value: 2, color: [0, 255, 255] },   // Cyan
    { value: 3, color: [0, 255, 0] },     // Green
    { value: 4, color: [255, 255, 0] },   // Yellow
    { value: 5, color: [255, 0, 0] },     // Red
    { value: 6, color: [255, 105, 180] }, // Pink
    { value: 7, color: [128, 0, 128] },   // Purple
    { value: 8, color: [75, 0, 130] },    // Dark Purple
    { value: 9, color: [0, 0, 139] },     // Dark Blue
    { value: 10, color: [0, 0, 0] },      // Black
  ];

  // Clamp level between 0 and 10
  if (level <= 0) return `rgb(${colors[0].color.join(",")})`;
  if (level >= 10) return `rgb(${colors[colors.length - 1].color.join(",")})`;

  // Find lower and upper bounds
  for (let i = 0; i < colors.length - 1; i++) {
    const lower = colors[i];
    const upper = colors[i + 1];

    if (level < upper.value) {
      const ratio = (level - lower.value) / (upper.value - lower.value);
      const interpolated = lower.color.map((c, idx) =>
        Math.round(c + (upper.color[idx] - c) * ratio)
      );
      return `rgb(${interpolated.join(",")})`;
    }
  }

  return `rgb(${colors[colors.length - 1].color.join(",")})`; // fallback
}
