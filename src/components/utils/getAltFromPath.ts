export function getAltFromPath(path: string) {
  const match = path.match(/placeholder_(\d+)\./);
  if (match) {
    return `[Alt_Imagen_${match[1]}]`;
  }
  if (path.includes("hero")) {
    return "[Alt_Imagen_3]";
  }
  return "[Alt_Imagen_1]";
}
