import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/services',
  '/wrap-brands',
  '/pricing',
  '/car-care',
  '/gallery',
  '/faq',
  '/about',
  '/contact'
];

async function generateStatic() {
  const distPath = path.resolve('dist');
  
  // Create static HTML files for each route
  routes.forEach(route => {
    const content = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kustom Auto Wrx | Gainesville's Premier Vehicle Transformation Studio</title>
    <meta name="description" content="Transform your vehicle with Gainesville's premier auto customization studio. Specializing in wraps, paint, and expert bodywork." />
    <link rel="canonical" href="https://kustomautowrx.com${route}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;

    const fileName = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
    const filePath = path.join(distPath, fileName);

    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content);
  });

  // Copy necessary assets
  const publicDir = path.resolve('public');
  if (fs.existsSync(publicDir)) {
    fs.cpSync(publicDir, distPath, { recursive: true });
  }
}

generateStatic().catch(console.error);