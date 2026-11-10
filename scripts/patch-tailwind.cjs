const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', '@tailwindcss', 'oxide', 'index.js');
if (!fs.existsSync(target)) {
  process.exit(0);
}

let content = fs.readFileSync(target, 'utf-8');
if (content.includes('// Fallback for environments where native .node is blocked')) {
  process.exit(0);
}

const needle = 'module.exports = nativeBinding\nmodule.exports.Scanner = nativeBinding.Scanner';
const patch = `// Fallback for environments where native .node is blocked by Windows WDAC/AppLocker
// and WASI WASM cannot crawl Windows drive paths.
if (nativeBinding && nativeBinding.Scanner) {
  const origScan = nativeBinding.Scanner.prototype.scan;
  const fs = require('fs');
  const path = require('path');

  function walkFiles(dir) {
    let files = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === '.vite') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files = files.concat(walkFiles(full));
        } else if (/\\.(tsx|ts|jsx|js|html|vue|svelte|mdx)$/.test(entry.name)) {
          files.push(full);
        }
      }
    } catch {}
    return files;
  }

  nativeBinding.Scanner.prototype.scan = function () {
    let result = [];
    try {
      if (origScan) result = origScan.call(this);
    } catch {}
    if (result && result.length > 0) return result;

    try {
      const rootDir = process.cwd();
      const files = walkFiles(path.join(rootDir, 'src')).concat(
        fs.existsSync(path.join(rootDir, 'index.html')) ? [path.join(rootDir, 'index.html')] : []
      );
      this._discoveredFiles = files;
      const inputs = files.map((f) => ({
        content: fs.readFileSync(f, 'utf-8'),
        extension: path.extname(f).slice(1),
      }));
      return this.scanFiles(inputs);
    } catch (err) {
      return [];
    }
  };

  const origFilesGetter = Object.getOwnPropertyDescriptor(nativeBinding.Scanner.prototype, 'files')?.get;
  Object.defineProperty(nativeBinding.Scanner.prototype, 'files', {
    get() {
      if (this._discoveredFiles && this._discoveredFiles.length > 0) {
        return this._discoveredFiles;
      }
      try {
        if (origFilesGetter) return origFilesGetter.call(this);
      } catch {}
      return [];
    },
    configurable: true,
  });
}

module.exports = nativeBinding
module.exports.Scanner = nativeBinding.Scanner
`;

if (content.includes(needle)) {
  content = content.replace(needle, patch);
  fs.writeFileSync(target, content, 'utf-8');
  console.log('[patch-tailwind] Applied Windows WASI file scanner fallback.');
}

