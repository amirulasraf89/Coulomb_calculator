interface Props {
  label: string;
  color: 'blue' | 'rose';
  q: string;
  x: string;
  y: string;
  z: string;
  onChange: (field: 'q' | 'x' | 'y' | 'z', value: string) => void;
}

const accent = {
  blue: {
    header: 'bg-blue-600',
    ring: 'focus:ring-blue-400 focus:border-blue-400',
    badge: 'bg-blue-100 text-blue-700',
  },
  rose: {
    header: 'bg-rose-600',
    ring: 'focus:ring-rose-400 focus:border-rose-400',
    badge: 'bg-rose-100 text-rose-700',
  },
};

export function ChargeCard({ label, color, q, x, y, z, onChange }: Props) {
  const a = accent[color];

  const Field = ({ id, field, placeholder, sub }: { id: string; field: 'q' | 'x' | 'y' | 'z'; placeholder: string; sub: string }) => (
    <div className="flex flex-col gap-1">
      <input
        id={id}
        type="number"
        step="any"
        placeholder={placeholder}
        value={field === 'q' ? q : field === 'x' ? x : field === 'y' ? y : z}
        onChange={e => onChange(field, e.target.value)}
        className={`w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm shadow-sm focus:outline-none focus:ring-2 ${a.ring} transition`}
      />
      <span className="text-xs text-gray-400 text-center">{sub}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className={`${a.header} px-5 py-3 flex items-center gap-2`}>
        <span className="text-white font-bold text-base">{label}</span>
        <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${a.badge}`}>
          {color === 'blue' ? 'q₁' : 'q₂'}
        </span>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Charge (C)
          </label>
          <Field id={`${color}-q`} field="q" placeholder="e.g. 1e-6" sub="coulombs" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Position (m)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <Field id={`${color}-x`} field="x" placeholder="0" sub="x" />
            <Field id={`${color}-y`} field="y" placeholder="0" sub="y" />
            <Field id={`${color}-z`} field="z" placeholder="0" sub="z" />
          </div>
        </div>
      </div>
    </div>
  );
}
