import React, { useState } from 'react';
import PaletteManager from './PaletteManager';

export default function App() {
  const [baseColors, setBaseColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    // Simulate extraction for now (Replace with Vibrant.js logic)
    setTimeout(() => {
      setBaseColors([
        '#0f172a', '#334155', '#475569', '#64748b', '#94a3b8',
        '#e2e8f0', '#f1f5f9', '#f8fafc', '#ffffff', '#cbd5e1',
        '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-light">
      <nav className="p-8 flex justify-between items-center">
        <h1 className="text-2xl tracking-tighter">scene-to-brand</h1>
        <button className="text-sm underline decoration-neutral-300">Donate</button>
      </nav>

      <section className="px-8 py-16 text-center">
        <h2 className="text-5xl font-extralight tracking-tight mb-8">From visual input to cohesive identity.</h2>
        <label className="inline-block px-8 py-4 bg-[#1A1A1A] text-white rounded-full cursor-pointer hover:bg-neutral-800 transition">
          Upload Image
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
      </section>

      {loading && <p className="text-center italic text-neutral-500">Analyzing composition...</p>}

      {baseColors.length > 0 && (
        <section className="px-8">
          <PaletteManager baseColors={baseColors} />
        </section>
      )}
    </main>
  );
}
EOF
