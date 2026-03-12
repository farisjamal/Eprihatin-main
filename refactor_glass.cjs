const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFile(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

    let content = fs.readFileSync(filePath, 'utf-8');
    let originalContent = content;

    // Case 1: className comes before style
    content = content.replace(/className="([^"]+)"\s*style=\{\{[^}]*?backdropFilter[^}]*?\}\}/g, 'className="$1 glass-panel"');
    // Case 2: style comes before className
    content = content.replace(/style=\{\{[^}]*?backdropFilter[^}]*?\}\}\s*className="([^"]+)"/g, 'className="$1 glass-panel"');
    // Case 3: No className (just <div style={{...}}>)
    content = content.replace(/<([a-zA-Z0-9]+)\s+style=\{\{[^}]*?backdropFilter[^}]*?\}\}/g, '<$1 className="glass-panel"');

    // Same logic for blur(20px) without backdropFilter (though usually they have it)
    // Let's do a catch-all if we missed any `blur(12px)`
    content = content.replace(/className="([^"]+)"\s*style=\{\{[^}]*?blur\([^}]*?\}\}/g, 'className="$1 glass-panel"');
    content = content.replace(/style=\{\{[^}]*?blur\([^}]*?\}\}\s*className="([^"]+)"/g, 'className="$1 glass-panel"');
    content = content.replace(/<([a-zA-Z0-9]+)\s+style=\{\{[^}]*?blur\([^}]*?\}\}/g, '<$1 className="glass-panel"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated glass styles in: ${filePath}`);
    }
}

walkDir('src/app/pages', processFile);
walkDir('src/app/components', processFile);
