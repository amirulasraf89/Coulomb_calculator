export const DEFAULT_K = 8.9875517923e9;

export interface ChargeInput {
  q: number;
  x: number;
  y: number;
  z: number;
}

export interface CoulombResult {
  r: number;
  rx: number;
  ry: number;
  rz: number;
  ux: number;
  uy: number;
  uz: number;
  F_on_q1: [number, number, number];
  F_on_q2: [number, number, number];
  Fmag: number;
  U: number;
  attractive: boolean;
}

export function calculate(c1: ChargeInput, c2: ChargeInput, k: number): CoulombResult | null {
  const rx = c2.x - c1.x;
  const ry = c2.y - c1.y;
  const rz = c2.z - c1.z;
  const r = Math.hypot(rx, ry, rz);

  if (r === 0) return null;

  const ux = rx / r;
  const uy = ry / r;
  const uz = rz / r;

  const Fmag = k * c1.q * c2.q / (r * r);

  const Fx = Fmag * ux;
  const Fy = Fmag * uy;
  const Fz = Fmag * uz;

  const U = k * c1.q * c2.q / r;

  return {
    r,
    rx, ry, rz,
    ux, uy, uz,
    F_on_q1: [Fx, Fy, Fz],
    F_on_q2: [-Fx, -Fy, -Fz],
    Fmag: Math.abs(Fmag),
    U,
    attractive: c1.q * c2.q < 0,
  };
}

export function fmt(x: number, sig = 6): string {
  if (!isFinite(x)) return String(x);
  const abs = Math.abs(x);
  if (abs !== 0 && (abs < 1e-3 || abs >= 1e5)) {
    return x.toExponential(sig - 1);
  }
  const decimals = Math.max(0, sig - Math.floor(Math.log10(abs || 1)) - 1);
  return Number(x.toFixed(decimals)).toString();
}
