const fs = require('fs');

const files = [
    'src/app/pages/admin/tnc/Statistik.tsx',
    'src/app/pages/admin/SenaraySumbangan.tsx',
    'src/app/pages/admin/ProdukKebajikan.tsx',
    'src/app/pages/admin/Laporan.tsx',
    'src/app/pages/admin/Dashboard.tsx',
    'src/app/pages/admin/Cetakan.tsx',
    'src/app/pages/admin/bendahari/PermohonanPotongan.tsx',
    'src/app/pages/admin/bendahari/KelulusanPotongan.tsx'
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');

        // Some regex that's totally safe to remove the const glassCard definition
        content = content.replace(/const\s+glassCard(?::\s*React\.CSSProperties)?\s*=\s*\{[\s\S]*?backdropFilter[\s\S]*?\};\n+/g, '');

        // Common replacements
        content = content.replace(/className="([^"]+)"\s*style=\{glassCard\}/g, 'className="$1 glass-panel"');
        content = content.replace(/style=\{glassCard\}\s*className="([^"]+)"/g, 'className="$1 glass-panel"');
        content = content.replace(/<div\s+style=\{glassCard\}/g, '<div className="glass-panel"');

        // Destructuring with overflow hidden
        content = content.replace(/style=\{\{\s*\.\.\.glassCard,\s*overflow:\s*"hidden"\s*\}\}/g, 'style={{ overflow: "hidden" }}');
        content = content.replace(/style=\{\{\s*overflow:\s*"hidden",\s*\.\.\.glassCard\s*\}\}/g, 'style={{ overflow: "hidden" }}');
        content = content.replace(/<div([^>]*?)className="([^"]+)"([^>]*?)style=\{\{\s*overflow:\s*"hidden"\s*\}\}/g, '<div$1className="$2 glass-panel"$3style={{ overflow: "hidden" }}');

        // Cases where it's `<div style={{ ...glassCard, overflow: "hidden" }}>` without a className
        content = content.replace(/<div\s+style=\{\{\s*overflow:\s*"hidden"\s*\}\}/g, '<div className="glass-panel" style={{ overflow: "hidden" }}');

        fs.writeFileSync(f, content);
    }
});
console.log('Fixed glassCard constant across admin files.');
