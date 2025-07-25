// You can use the built-in moduleName prop available on modules to pass in the module name value to this function. This value works the same as {{ name }} in HubL modules.

export function generateInlineFieldsToken(moduleName: string, fieldPath: string): string {
  return `module.${moduleName}.${fieldPath}`;
}
