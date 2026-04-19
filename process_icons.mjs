// Node.js script to download icons and save them
// Then we use the browser to process transparency
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const ICON_SLUGS = [
  '66b0f8-pencil', '628100-notebook', '8c0c80-bookmark', '3d77e2-bookmark-fav',
  '39121b-medal', '49654f-trophy', '54daee-calculator', 'e94351-scissor',
  'e67951-locker', '56180e-lab', '82db59-color-palette', '744cc0-rocket',
  'a0330a-explorer', 'ddbd61-bulb', 'ff5be0-tools', '7e47be-setting',
  '49b6f4-target', '637858-flash', '6bfe8c-fire', '778c78-key',
  '5f20be-computer', 'b4a0af-zoom', 'b91186-shield', '457612-lock',
  '1fded0-mobile', '8924a0-mail', '176980-folder', '8ef1fa-clock',
  '5656e5-camera', 'a68576-puzzle'
];

const BASE_URL = 'https://bvconuycpdvgzbvbkijl.supabase.co/storage/v1/object/public/sizes';
const OUTPUT_DIR = join(process.cwd(), 'public', 'images', 'cursor');

mkdirSync(OUTPUT_DIR, { recursive: true });

let downloaded = 0;
let failed = 0;

for (let i = 0; i < ICON_SLUGS.length; i++) {
  const slug = ICON_SLUGS[i];
  const url = `${BASE_URL}/${slug}/dynamic/400/color.webp`;
  const filename = `raw_${i + 1}.webp`;
  const filepath = join(OUTPUT_DIR, filename);
  
  try {
    console.log(`[${i + 1}/30] Downloading ${slug}...`);
    const response = await fetch(url);
    if (!response.ok) {
      // Try alternate slug format
      console.log(`  ⚠ HTTP ${response.status} - trying alternate...`);
      failed++;
      continue;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    writeFileSync(filepath, buffer);
    console.log(`  ✓ Saved ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
    downloaded++;
  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
    failed++;
  }
}

console.log(`\nDone! Downloaded: ${downloaded}, Failed: ${failed}`);
