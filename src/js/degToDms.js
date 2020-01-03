export default function degToDms(deg) {
  let d = Math.floor(deg);
  const minfloat = (deg - d) * 60;
  let m = Math.floor(minfloat);
  const secfloat = (minfloat - m) * 60;
  let s = Math.round(secfloat);
  // After rounding, the seconds might become 60. These two
  // if-tests are not necessary if no rounding is done.
  if (s === 60) {
    m = 1 + m;
    s = 0;
  }
  if (m === 60) {
    d = 1 + d;
    m = 0;
  }
  return (`${d}° ${m}" ${s}'`);
}
