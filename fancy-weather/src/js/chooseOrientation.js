export default function chooseOrientation(width, height) {
  if (width < height) {
    return 'portrait';
  }
  return 'landscape';
}
