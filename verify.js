const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join('dist', req.url === '/' ? 'index.html' : req.url);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css'
    };
    res.setHeader('Content-Type', mimeTypes[ext] || 'text/plain');
    res.end(fs.readFileSync(filePath));
  } else {
    // SPA: Fallback to index.html for unknown routes
    res.setHeader('Content-Type', 'text/html');
    res.end(fs.readFileSync('dist/index.html'));
  }
});
server.listen(3000);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Console logs
  page.on('console', msg => console.log('Browser Log:', msg.text()));
  page.on('pageerror', err => console.log('Page Error:', err.message));
  
  await page.goto('http://localhost:3000/');
  
  await page.waitForLoadState('networkidle');
  const content = await page.textContent('#root');
  console.log('App Content:', content);
  
  // Take screenshot if needed
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Screenshot taken.');
  
  await browser.close();
  server.close();
})();
