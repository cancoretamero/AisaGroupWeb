const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const outputDir = path.join(rootDir, '.next');
const filesToCopy = ['index.html', 'styles.css', 'script.js'];
const directoriesToCopy = ['assets', 'images'];

function ensureFreshDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir, { recursive: true });
}

function copyFileToDir(file, dir) {
  const sourcePath = path.join(rootDir, file);
  const targetPath = path.join(dir, file);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Archivo no encontrado: ${file}, se omitirá del build.`);
    return;
  }

  const targetFolder = path.dirname(targetPath);
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  fs.copyFileSync(sourcePath, targetPath);
}

function copyDirectoryToDir(folder, dir) {
  const sourcePath = path.join(rootDir, folder);
  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isDirectory()) {
    return;
  }

  const targetPath = path.join(dir, folder);
  fs.mkdirSync(targetPath, { recursive: true });

  for (const entry of fs.readdirSync(sourcePath, { withFileTypes: true })) {
    const sourceEntry = path.join(sourcePath, entry.name);
    const targetEntry = path.join(targetPath, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryRecursively(sourceEntry, targetEntry);
    } else {
      fs.copyFileSync(sourceEntry, targetEntry);
    }
  }
}

function copyDirectoryRecursively(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourceEntry = path.join(source, entry.name);
    const targetEntry = path.join(target, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryRecursively(sourceEntry, targetEntry);
    } else {
      fs.copyFileSync(sourceEntry, targetEntry);
    }
  }
}

function createNetlifyRedirect(dir) {
  const redirectsPath = path.join(dir, '_redirects');
  const content = `/* /index.html 200`;
  fs.writeFileSync(redirectsPath, content);
}

function run() {
  ensureFreshDir(outputDir);

  filesToCopy.forEach((file) => copyFileToDir(file, outputDir));
  directoriesToCopy.forEach((dirName) => copyDirectoryToDir(dirName, outputDir));

  createNetlifyRedirect(outputDir);

  console.log('Build estático completado en .next');
}

run();
