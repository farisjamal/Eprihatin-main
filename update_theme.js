const fs = require('fs');

let css = fs.readFileSync('src/styles/theme.css', 'utf-8');

const newUtilities = `
@layer utilities {
  .glass-panel {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    border-radius: 16px;
    transition: all 0.3s ease;
  }

  .glass-nav {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(226, 232, 240, 0.8);
    box-shadow: 0 4px 20px rgba(30, 58, 138, 0.03);
  }

  .glass-card-hover:hover {
    border-color: rgba(30, 58, 138, 0.2);
    box-shadow: 0 12px 32px rgba(30, 58, 138, 0.08);
    transform: translateY(-2px);
  }

  .btn-primary,
  .btn-secondary,
  .btn-danger {
    font-weight: 600;
    height: 40px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    gap: 8px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .btn-primary {
    background-color: var(--primary);
    color: var(--primary-foreground);
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
    border: none;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #172554;
    box-shadow: 0 6px 16px rgba(30, 58, 138, 0.3);
    transform: translateY(-1px);
  }

  .btn-secondary {
    background-color: var(--secondary);
    color: var(--secondary-foreground);
    border: none;
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: #BFDBFE;
    transform: translateY(-1px);
  }

  .btn-danger {
    background-color: var(--destructive);
    color: var(--destructive-foreground);
    border: none;
  }

  .btn-danger:hover:not(:disabled) {
    background-color: #B91C1C;
    transform: translateY(-1px);
  }

  .btn-ghost {
    background: transparent;
    border: none;
    color: var(--primary);
    box-shadow: none;
    height: 40px;
    font-weight: 600;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    gap: 8px;
    border-radius: 12px;
  }

  .btn-ghost:hover:not(:disabled) {
    background-color: rgba(30, 58, 138, 0.05);
  }

  .btn-solid-gold {
    background-color: var(--accent);
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    font-weight: 600;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    gap: 8px;
    box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
    transition: all 0.2s ease;
  }

  .btn-solid-gold:hover:not(:disabled) {
    background-color: #D97706;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
  }

  button:disabled,
  .btn-disabled {
    background: var(--muted) !important;
    color: var(--muted-foreground) !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
    border: 1px solid var(--border) !important;
    transform: none !important;
  }

  .badge-lulus,
  .badge-gagal,
  .badge-menunggu,
  .badge-draf {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }

  .badge-lulus {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  .badge-gagal {
    background: rgba(239, 68, 68, 0.1);
    color: var(--destructive);
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .badge-menunggu {
    background: rgba(245, 158, 11, 0.1);
    color: var(--warning);
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  .badge-draf {
    background: rgba(100, 116, 139, 0.1);
    color: var(--muted-foreground);
    border: 1px solid rgba(100, 116, 139, 0.2);
  }
}
`;

css = css.replace(/@layer utilities\s*\{[\s\S]*\}\s*$/, newUtilities);
fs.writeFileSync('src/styles/theme.css', css);
console.log('theme.css updated.');
