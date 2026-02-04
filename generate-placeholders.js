const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'public/sequence');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Minimal 1x1 black pixel WebP base64
const webpData = 'UklGRg4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
const webpBuffer = Buffer.from(webpData, 'base64');

console.log(`Generating 120 frames in ${dir}...`);

for (let i = 0; i < 120; i++) {
    const filePath = path.join(dir, `frame_${i}.webp`);
    fs.writeFileSync(filePath, webpBuffer);
}

console.log('Done! Placeholders generated.');
