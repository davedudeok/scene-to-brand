import React, { useState } from 'react';
import PaletteManager from './PaletteManager';

const getDominantColors = async (imgSrc: string) => {
  return new Promise<string[]>((resolve) => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve([]);
      canvas.width = 100;
      canvas.height = 100;
      ctx.drawImage(img, 0, 0, 100, 100);
      const data = ctx.getImageData(0, 0, 100, 100).data;
      const colors = [];
      for (let i = 0; i < data.length; i += 4) {
        colors.push(`#${((1 << 24) + (data[i] << 16) + (data[i + 1] << 8) + data[i + 2]).toString(16).slice(1)}`);
      }
      resolve([...new Set(colors)].slice(0, 15));
    };
  });
};

export default function App() {
  const [baseColors, setBaseColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const img = e.target?.result as string;
        const colors = await getDominantColors(img);
        setBaseColors(colors);
      } catch (err) {
        setError('Failed to process image.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-light">
      <nav className="p-8 flex justify-between items-center border-b border-neutral-100">
        <h1 className="text-xl tracking-tighter uppercase">scene-to-brand</h1>
        <button className="text-xs uppercase tracking-widest hover:text-neutral-500">Support</button>
      </nav>

      <section className="px-8 py-24 text-center max-w-2xl mx-auto">
        <h2 className="text-5xl font-extralight tracking-tight mb-12">Extract identity from your environment.</h2>
        
        <div className="relative inline-block">
          <label className="inline-block px-10 py-5 bg-[#1A1A1A] text-white rounded-sm cursor-pointer hover:bg-neutral-800 transition uppercase text-xs tracking-widest">
            {loading ? 'Analyzing...' : 'Choose File'}
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
          </label>
        </div>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </section>

      {baseColors.length > 0 && (
        <section className="px-8 pb-24 animate-in fade-in duration-1000">
          <PaletteManager baseColors={baseColors} />
        </section>
      )}
    </main>
  );
}
