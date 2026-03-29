const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const file = req.url === '/' ? 'dist/index.html' : 'dist' + req.url;
  if (fs.existsSync(file)) {
    const ext = path.extname(file);
    const mimeTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
    res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
    res.end(fs.readFileSync(file));
  } else {
    res.end(fs.readFileSync('dist/index.html'));
  }
});
server.listen(3000);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('console', msg => console.log('Log:', msg.text()));
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  const root = await page.evaluate(() => document.getElementById('root')?.innerHTML);
  console.log('Root:', root);
  await browser.close();
  server.close();
})();
