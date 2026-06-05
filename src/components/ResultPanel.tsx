import type { CoulombResult } from '../utils/coulomb';
import { fmt } from '../utils/coulomb';

interface Props {
  result: CoulombResult | null;
  error: string | null;
}

function VecBadge({ vec }: { vec: [number, number, number] }) {
  return (
    <span className="font-mono text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
      [{fmt(vec[0])}, {fmt(vec[1])}, {fmt(vec[2])}] N
    </span>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 sm:w-56 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

export function ResultPanel({ result, error }: Props) {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <p className="text-red-700 font-semibold text-sm">⚠️ {error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-8 text-center">
        <div className="text-5xl mb-3">⚡</div>
        <p className="text-gray-400 text-sm">Enter charge values and click <strong>Calculate</strong> to see results.</p>
      </div>
    );
  }

  const { r, rx, ry, rz, ux, uy, uz, F_on_q1, F_on_q2, Fmag, U, attractive } = result;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3">
        <h2 className="text-white font-bold text-base">Results</h2>
      </div>
      <div className="p-5 space-y-1">

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Geometry</p>
        <Row label="Distance r" value={<><span className="font-mono">{fmt(r)}</span> m</>} />
        <Row
          label="Displacement r̂ (q₁ → q₂)"
          value={
            <span className="font-mono text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
              [{fmt(rx)}, {fmt(ry)}, {fmt(rz)}] m
            </span>
          }
        />
        <Row
          label="Unit vector r̂"
          value={
            <span className="font-mono text-sm bg-gray-100 text-gray-700 px-2 py-1 rounded-lg">
              [{fmt(ux, 8)}, {fmt(uy, 8)}, {fmt(uz, 8)}]
            </span>
          }
        />

        <div className="pt-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Forces</p>
        </div>
        <Row label="Force on q₁ due to q₂" value={<VecBadge vec={F_on_q1} />} />
        <Row label="Force on q₂ due to q₁" value={<VecBadge vec={F_on_q2} />} />
        <Row label="|F| magnitude" value={<><span className="font-mono">{fmt(Fmag)}</span> N</>} />
        <Row
          label="Interaction type"
          value={
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${attractive ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {attractive ? '⬇ Attractive' : '⬆ Repulsive'}
            </span>
          }
        />

        <div className="pt-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Energy</p>
        </div>
        <Row label="Potential energy U" value={<><span className="font-mono">{fmt(U)}</span> J</>} />

        <div className="mt-4 bg-indigo-50 rounded-xl p-4 text-xs text-indigo-700 space-y-1">
          <p className="font-semibold mb-1">Formulae used:</p>
          <p>F = k · q₁ · q₂ / r² &nbsp;(vector: F⃗ = F · r̂)</p>
          <p>U = k · q₁ · q₂ / r</p>
          <p>k = 8.9875517923 × 10⁹ N·m²/C²</p>
        </div>
      </div>
    </div>
  );
}
