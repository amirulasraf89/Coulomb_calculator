import { useState } from 'react';
import { ChargeCard } from './components/ChargeCard';
import { ResultPanel } from './components/ResultPanel';
import { calculate, DEFAULT_K } from './utils/coulomb';
import type { CoulombResult } from './utils/coulomb';

interface ChargeState {
  q: string;
  x: string;
  y: string;
  z: string;
}

const DEFAULTS = {
  c1: { q: '1e-6', x: '0', y: '0', z: '0' },
  c2: { q: '-2e-6', x: '0.5', y: '0', z: '0' },
};

export default function App() {
  const [c1, setC1] = useState<ChargeState>(DEFAULTS.c1);
  const [c2, setC2] = useState<ChargeState>(DEFAULTS.c2);
  const [k, setK] = useState(String(DEFAULT_K));
  const [result, setResult] = useState<CoulombResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [calculated, setCalculated] = useState(false);

  const handleChange = (which: 'c1' | 'c2') => (field: 'q' | 'x' | 'y' | 'z', value: string) => {
    if (which === 'c1') setC1(prev => ({ ...prev, [field]: value }));
    else setC2(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = () => {
    setError(null);
    const p = {
      c1: { q: parseFloat(c1.q) || 0, x: parseFloat(c1.x) || 0, y: parseFloat(c1.y) || 0, z: parseFloat(c1.z) || 0 },
      c2: { q: parseFloat(c2.q) || 0, x: parseFloat(c2.x) || 0, y: parseFloat(c2.y) || 0, z: parseFloat(c2.z) || 0 },
    };
    const kVal = Number(k) || DEFAULT_K;
    const res = calculate(p.c1, p.c2, kVal);
    if (!res) {
      setError('Both charges are at the same position. The Coulomb force is undefined (infinite). Move one charge.');
      setResult(null);
    } else {
      setResult(res);
    }
    setCalculated(true);
  };

  const handleReset = () => {
    setC1(DEFAULTS.c1);
    setC2(DEFAULTS.c2);
    setK(String(DEFAULT_K));
    setResult(null);
    setError(null);
    setCalculated(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
            ⚡ Physics Calculator
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Coulomb's Law Calculator
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Compute the electrostatic force and potential energy between two point charges in 3D space.
          </p>
        </div>

        {/* Charge Inputs */}
        <div className="grid sm:grid-cols-2 gap-4">
          <ChargeCard label="Charge 1" color="blue" {...c1} onChange={handleChange('c1')} />
          <ChargeCard label="Charge 2" color="rose" {...c2} onChange={handleChange('c2')} />
        </div>

        {/* Coulomb Constant */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Coulomb Constant k (N·m²/C²)
          </label>
          <input
            type="text"
            value={k}
            onChange={e => setK(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition font-mono"
          />
          <p className="text-xs text-gray-400 mt-1.5">Default: 8.9875517923 × 10⁹ N·m²/C²</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCalculate}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all"
          >
            ⚡ Calculate
          </button>
          <button
            onClick={handleReset}
            className="bg-white hover:bg-gray-50 text-gray-600 font-semibold py-3 px-5 rounded-xl border border-gray-200 shadow-sm transition-all"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {calculated && <ResultPanel result={result} error={error} />}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 pb-4">
          Built with React + Vite + Tailwind CSS &nbsp;•&nbsp;
          <a href="https://github.com/amirulasraf89/Coulomb_calculator" className="underline hover:text-gray-600">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
