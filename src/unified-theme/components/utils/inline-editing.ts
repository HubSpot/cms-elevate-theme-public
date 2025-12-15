export function getDataHSToken(moduleName?: string, fieldPath?: string): string | undefined {
  if (!moduleName || !fieldPath) {
    return undefined;
  }
  return `module.${moduleName}.${fieldPath}`;
}
