// Simple HTTP server that receives base64 icon data and saves to disk
import { createServer } from 'http';
import { writeFileSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), 'public', 'images', 'cursor');
const PORT = 3456;

const server = createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { filename, base64 } = JSON.parse(body);
        const buffer = Buffer.from(base64, 'base64');
        const filepath = join(OUTPUT_DIR, filename);
        writeFileSync(filepath, buffer);
        console.log(`✓ Saved ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, size: buffer.length }));
      } catch (err) {
        console.error(`✗ Error: ${err.message}`);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }
  
  if (req.method === 'POST' && req.url === '/done') {
    console.log('\n✅ All icons saved. Shutting down...');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    setTimeout(() => process.exit(0), 500);
    return;
  }
  
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Save server listening on http://localhost:${PORT}`);
  console.log(`Waiting for icon data...`);
});
