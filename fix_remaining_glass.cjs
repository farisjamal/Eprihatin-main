const fs = require('fs');

const filesToFixConst = [
    'src/app/pages/admin/tnc/Statistik.tsx',
    'src/app/pages/admin/SenaraySumbangan.tsx',
    'src/app/pages/admin/ProdukKebajikan.tsx',
    'src/app/pages/admin/Laporan.tsx',
    'src/app/pages/admin/Dashboard.tsx',
    'src/app/pages/admin/Cetakan.tsx',
    'src/app/pages/admin/bendahari/PermohonanPotongan.tsx',
    'src/app/pages/admin/bendahari/KelulusanPotongan.tsx'
];

filesToFixConst.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');

        // Replace const glassCard
        content = content.replace(/const glassCard: React\.CSSProperties = \{[\s\S]*?\};\n/g, '');

        // Sometimes it's without React.CSSProperties
        content = content.replace(/const glassCard = \{[\s\S]*?\};\n/g, '');

        // Replace style={glassCard}
        content = content.replace(/className="([^"]+)"\s*style=\{glassCard\}/g, 'className="$1 glass-panel"');
        content = content.replace(/style=\{glassCard\}\s*className="([^"]+)"/g, 'className="$1 glass-panel"');
        content = content.replace(/<([a-zA-Z0-9]+)\s+style=\{glassCard\}/g, '<$1 className="glass-panel"');

        // Replace style={{ ...glassCard, overflow: "hidden" }}
        content = content.replace(/style=\{\{\s*\.\.\.glassCard,\s*overflow:\s*"hidden"\s*\}\}/g, 'style={{ overflow: "hidden" }}');
        // Ensure we add glass-panel if we just removed glassCard spread
        content = content.replace(/className="([^"]+)"\s*style=\{\{\s*overflow:\s*"hidden"\s*\}\}/g, 'className="$1 glass-panel" style={{ overflow: "hidden" }}');

        fs.writeFileSync(f, content);
    }
});

// AdminLayout.tsx
let adminLayoutFile = 'src/app/components/layout/AdminLayout.tsx';
if (fs.existsSync(adminLayoutFile)) {
    let content = fs.readFileSync(adminLayoutFile, 'utf8');
    content = content.replace(/style=\{\{\n\s*background:\s*"rgba[^"]+",\n\s*backdropFilter:\s*"blur[^"]+",\n\s*borderRight:\s*"[^"]+",\n\s*boxShadow:\s*"[^"]+",\n\s*\}\}/g, 'className="glass-panel"');
    // There is a <aside className={`fixed...`} style={{...}}>
    // We need to inject glass-panel into className.
    // We can just add it to the className string literal
    content = content.replace(/className=\{`fixed([^`]+)`\}\n\s*className="glass-panel"/g, 'className={`fixed$1 glass-panel`}');

    // also 
    content = content.replace(/className=\{`fixed([^`]+)`\}\n\s*style=\{\{[\s\S]*?backdropFilter[\s\S]*?\}\}/g, 'className={`fixed$1 glass-panel`}');

    fs.writeFileSync(adminLayoutFile, content);
}

// Modal.tsx
let modalFile = 'src/app/components/shared/Modal.tsx';
if (fs.existsSync(modalFile)) {
    let content = fs.readFileSync(modalFile, 'utf8');
    content = content.replace(/style=\{\{\n\s*background:\s*"rgba[^"]+",\n\s*backdropFilter:\s*"blur[^"]+",\n\s*border:\s*"[^"]+",\n\s*boxShadow:\s*"[^"]+",\n\s*\}\}/g, '');
    content = content.replace(/className="([^"]+)"\s*>\n\s*\{children\}/g, 'className="$1 glass-panel">\n          {children}');
    // actually just let's use a simpler replace for Modal
    content = content.replace(/className="([^"]+)"\s*style=\{\{[\s\S]*?backdropFilter[\s\S]*?\}\}/g, 'className="$1 glass-panel"');
    fs.writeFileSync(modalFile, content);
}

console.log('Fixed remaining glassmorphism styles.');
