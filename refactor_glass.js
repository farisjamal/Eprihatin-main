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

    // Pattern 1: style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px) saturate(160%)", ... }}
    // We want to remove the style prop if it only contains the glass styles, or remove the glass properties from it.
    // Actually, looking at grep results, most of them look like:
    // style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px) saturate(160%)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "16px", boxShadow: "0 4px 24px rgba(100,116,139,0.12)" }}

    // Replace the whole style block with glass-panel class in className.
    // First, find classNames that are attached to this style block.

    // A regex to find elements with backdropFilter inline styles.
    const regex = /style=\{\{\s*background:\s*"rgba[^"]+",\s*backdropFilter:\s*"blur[^"]+",\s*border:\s*"[^"]+",\s*borderRadius:\s*"[^"]+"(?:,\s*boxShadow:\s*"[^"]+")?\s*\}\}/g;

    content = content.replace(regex, '');

    // For the ones missing boxShadow or adding inset:
    const regex2 = /style=\{\{\s*background:\s*"rgba[^"]+",\s*backdropFilter:\s*"blur[^"]+",\s*border:\s*"[^"]+",\s*borderRadius:\s*"[^"]+",\s*boxShadow:\s*"[^"]+"\s*\}\}/g;
    content = content.replace(regex2, '');

    const regex3 = /style=\{\{\s*backdropFilter:\s*"blur[^"]+"\s*\}\}/g;
    content = content.replace(regex3, '');

    // For Nav, maybe glass-nav. There are 2 or 3 places but I can look at the grep.
    // We need to inject "glass-panel" into the className.
    // E.g. <div className="p-5" ...> -> <div className="p-5 glass-panel" ...>
    // However, since we just stripped the style= attribute, we should ensure "glass-panel" is in the className!
    // It's safer to use regex to find the component tags that had style. Let's do a more precise replacement:

}

// walkDir('src', processFile);
