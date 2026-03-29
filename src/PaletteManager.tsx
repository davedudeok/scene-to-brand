import React from 'react';

// Color theory utility: Generate harmonious palettes
const generateHarmoniousPalette = (baseColors: string[]) => {
  // Logic to expand 10-15 base colors into:
  // 1. Primary Palette (Web UI)
  // 2. Print Palette (CMYK conversion for business cards)
  // 3. Apparel Palette (Pantone-like matching for merchandise)
  
  // Implementation will follow color theory: monochromatic, analogous, complementary
  return {
    web: [...baseColors.slice(0, 5)],
    print: [...baseColors.slice(5, 10)],
    apparel: [...baseColors.slice(10, 15)],
  };
};

interface PaletteProps {
  baseColors: string[];
}

export default function PaletteManager({ baseColors }: PaletteProps) {
  const palette = generateHarmoniousPalette(baseColors);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {/* Web Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Web UI</h2>
        <div className="space-y-2">
          {palette.web.map((c, i) => (
            <div key={i} className="h-12 rounded" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>

      {/* Business Cards Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Print/Cards</h2>
        <div className="space-y-2">
          {palette.print.map((c, i) => (
            <div key={i} className="h-12 rounded border" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>

      {/* Apparel Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Apparel</h2>
        <div className="space-y-2">
          {palette.apparel.map((c, i) => (
            <div key={i} className="h-12 rounded" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
EOF
